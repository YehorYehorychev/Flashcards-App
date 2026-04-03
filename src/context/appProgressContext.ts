import { createContext } from 'react'
import type { Category } from '../data/flashcards'
import type { CategoryStats } from '../lib/statsStorage'

export type AppProgressValue = {
  byCategory: Partial<Record<Category, CategoryStats>>
  lastSessionWrongIds: string[]
  totalXP: number
  streak: number
  /** Counts one study interaction (right or wrong) toward category totals. */
  recordStudyAnswer: (category: Category, correct: boolean, xp?: number) => void
  recordQuizAnswer: (category: Category, correct: boolean, xp?: number) => void
  /** Replaces redo queue with wrong IDs from the session that just finished. */
  finishStudySession: (wrongIds: string[]) => void
  clearWrongCardList: () => void
}

export const AppProgressContext = createContext<AppProgressValue | null>(null)
