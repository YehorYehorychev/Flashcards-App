import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Category } from '../data/flashcards'
import { loadProgress, saveProgress, type PersistedProgress } from '../lib/statsStorage'
import {
  AppProgressContext,
  type AppProgressValue,
} from './appProgressContext'

export function AppProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<PersistedProgress>(() =>
    loadProgress(),
  )

  const recordStudyAnswer = useCallback((category: Category, correct: boolean, xp: number = 0) => {
    setProgress((prev) => {
      const today = new Date().toISOString().split('T')[0]
      let newStreak = prev.streak
      
      // Update streak
      if (prev.lastActivityDate !== today) {
        if (!prev.lastActivityDate) {
          newStreak = 1
        } else {
          const lastDate = new Date(prev.lastActivityDate)
          const currentDate = new Date(today)
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          
          if (diffDays === 1) {
            newStreak = prev.streak + 1
          } else if (diffDays > 1) {
            newStreak = 1
          }
        }
      }

      const categoryStats = prev.byCategory[category] || { studied: 0, correct: 0, incorrect: 0 }

      const next: PersistedProgress = {
        ...prev,
        totalXP: prev.totalXP + (correct ? xp : 0),
        streak: newStreak,
        lastActivityDate: today,
        byCategory: {
          ...prev.byCategory,
          [category]: {
            studied: categoryStats.studied + 1,
            correct: categoryStats.correct + (correct ? 1 : 0),
            incorrect: categoryStats.incorrect + (correct ? 0 : 1),
          },
        },
      }
      saveProgress(next)
      return next
    })
  }, [])

  const recordQuizAnswer = useCallback(
    (category: Category, correct: boolean, xp: number = 0) => {
      recordStudyAnswer(category, correct, xp)
    },
    [recordStudyAnswer],
  )

  const finishStudySession = useCallback((wrongIds: string[]) => {
    setProgress((prev) => {
      const next: PersistedProgress = {
        ...prev,
        lastSessionWrongIds: [...wrongIds],
      }
      saveProgress(next)
      return next
    })
  }, [])

  const clearWrongCardList = useCallback(() => {
    setProgress((prev) => {
      const next: PersistedProgress = {
        ...prev,
        lastSessionWrongIds: [],
      }
      saveProgress(next)
      return next
    })
  }, [])

  const value = useMemo<AppProgressValue>(
    () => ({
      byCategory: progress.byCategory,
      lastSessionWrongIds: progress.lastSessionWrongIds,
      totalXP: progress.totalXP,
      streak: progress.streak,
      recordStudyAnswer,
      recordQuizAnswer,
      finishStudySession,
      clearWrongCardList,
    }),
    [
      progress.byCategory,
      progress.lastSessionWrongIds,
      progress.totalXP,
      progress.streak,
      recordStudyAnswer,
      recordQuizAnswer,
      finishStudySession,
      clearWrongCardList,
    ],
  )

  return (
    <AppProgressContext.Provider value={value}>
      {children}
    </AppProgressContext.Provider>
  )
}
