import type { Category } from '../data/flashcards'

/** Persisted snapshot version; bump when shape changes. */
export const STATS_STORAGE_KEY = 'flashcards-app-progress-v1'

export type CategoryStats = {
  studied: number
  correct: number
  incorrect: number
}

export type PersistedProgress = {
  v: 1
  byCategory: Record<Category, CategoryStats>
  /** Card IDs marked wrong in the last completed study/redo session (for redo mode). */
  lastSessionWrongIds: string[]
}

const emptyCategory = (): CategoryStats => ({
  studied: 0,
  correct: 0,
  incorrect: 0,
})

export function defaultProgress(): PersistedProgress {
  return {
    v: 1,
    byCategory: {
      animals: emptyCategory(),
      food: emptyCategory(),
      verbs: emptyCategory(),
    },
    lastSessionWrongIds: [],
  }
}

function isCategoryStats(x: unknown): x is CategoryStats {
  if (x === null || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  return (
    typeof o.studied === 'number' &&
    typeof o.correct === 'number' &&
    typeof o.incorrect === 'number'
  )
}

function parseProgress(raw: string | null): PersistedProgress {
  if (!raw) return defaultProgress()
  try {
    const data = JSON.parse(raw) as unknown
    if (data === null || typeof data !== 'object') return defaultProgress()
    const o = data as Record<string, unknown>
    if (o.v !== 1) return defaultProgress()
    const by = o.byCategory
    if (by === null || typeof by !== 'object') return defaultProgress()
    const animals = (by as Record<string, unknown>).animals
    const food = (by as Record<string, unknown>).food
    const verbs = (by as Record<string, unknown>).verbs
    if (
      !isCategoryStats(animals) ||
      !isCategoryStats(food) ||
      !isCategoryStats(verbs)
    ) {
      return defaultProgress()
    }
    const ids = o.lastSessionWrongIds
    const lastSessionWrongIds = Array.isArray(ids)
      ? ids.filter((id): id is string => typeof id === 'string')
      : []
    return {
      v: 1,
      byCategory: { animals, food, verbs },
      lastSessionWrongIds,
    }
  } catch {
    return defaultProgress()
  }
}

export function loadProgress(): PersistedProgress {
  if (typeof localStorage === 'undefined') return defaultProgress()
  return parseProgress(localStorage.getItem(STATS_STORAGE_KEY))
}

export function saveProgress(progress: PersistedProgress): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Quota or private mode — app still works in memory for the session.
  }
}
