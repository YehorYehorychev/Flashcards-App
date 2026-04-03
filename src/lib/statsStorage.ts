import type { Category } from '../data/flashcards'

/** Persisted snapshot version; bump when shape changes. */
export const STATS_STORAGE_KEY = 'flashcards-app-progress-v2'

export type CategoryStats = {
  studied: number
  correct: number
  incorrect: number
}

export type PersistedProgress = {
  v: 2
  byCategory: Partial<Record<Category, CategoryStats>>
  /** Card IDs marked wrong in the last completed study/redo session. */
  lastSessionWrongIds: string[]
  totalXP: number
  streak: number
  lastActivityDate: string | null // ISO date string
}

const emptyCategory = (): CategoryStats => ({
  studied: 0,
  correct: 0,
  incorrect: 0,
})

export function defaultProgress(): PersistedProgress {
  return {
    v: 2,
    byCategory: {
      animals: emptyCategory(),
      food: emptyCategory(),
      verbs: emptyCategory(),
      colors: emptyCategory(),
      family: emptyCategory(),
      numbers: emptyCategory(),
      greetings: emptyCategory(),
      places: emptyCategory(),
      weather: emptyCategory(),
    },
    lastSessionWrongIds: [],
    totalXP: 0,
    streak: 0,
    lastActivityDate: null,
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
    
    // Simple migration/validation
    if (o.v !== 2) {
       // If it's v1 or unknown, just reset to default for now or try to migrate
       // For this exercise, we'll just return default if version mismatch
       return defaultProgress()
    }

    const by = o.byCategory as Record<Category, CategoryStats>
    const validatedBy: Partial<Record<Category, CategoryStats>> = {}
    
    if (by && typeof by === 'object') {
      Object.keys(by).forEach((key) => {
        if (isCategoryStats(by[key as Category])) {
          validatedBy[key as Category] = by[key as Category]
        }
      })
    }

    const lastSessionWrongIds = Array.isArray(o.lastSessionWrongIds)
      ? o.lastSessionWrongIds.filter((id): id is string => typeof id === 'string')
      : []

    return {
      v: 2,
      byCategory: validatedBy,
      lastSessionWrongIds,
      totalXP: typeof o.totalXP === 'number' ? o.totalXP : 0,
      streak: typeof o.streak === 'number' ? o.streak : 0,
      lastActivityDate: typeof o.lastActivityDate === 'string' ? o.lastActivityDate : null,
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
