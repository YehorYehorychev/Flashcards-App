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

  const recordStudyAnswer = useCallback((category: Category, correct: boolean) => {
    setProgress((prev) => {
      const next: PersistedProgress = {
        ...prev,
        byCategory: {
          ...prev.byCategory,
          [category]: {
            studied: prev.byCategory[category].studied + 1,
            correct: prev.byCategory[category].correct + (correct ? 1 : 0),
            incorrect:
              prev.byCategory[category].incorrect + (correct ? 0 : 1),
          },
        },
      }
      saveProgress(next)
      return next
    })
  }, [])

  const recordQuizAnswer = useCallback(
    (category: Category, correct: boolean) => {
      recordStudyAnswer(category, correct)
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
      recordStudyAnswer,
      recordQuizAnswer,
      finishStudySession,
      clearWrongCardList,
    }),
    [
      progress.byCategory,
      progress.lastSessionWrongIds,
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
