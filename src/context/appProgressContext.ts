import { createContext } from 'react'
import type { Category } from '../data/flashcards'
import type { CategoryStats } from '../lib/statsStorage'

export type AppProgressValue = {
  byCategory: Record<Category, CategoryStats>
  lastSessionWrongIds: string[]
  /** Counts one study interaction (right or wrong) toward category totals. */
  recordStudyAnswer: (category: Category, correct: boolean) => void
  recordQuizAnswer: (category: Category, correct: boolean) => void
  /** Replaces redo queue with wrong IDs from the session that just finished. */
  finishStudySession: (wrongIds: string[]) => void
  clearWrongCardList: () => void
}

export const AppProgressContext = createContext<AppProgressValue | null>(null)
