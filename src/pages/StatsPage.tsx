import { Link } from 'react-router-dom'
import { useAppProgress } from '../context/useAppProgress'
import { categories } from '../data/flashcards'
import styles from './StatsPage.module.css'

function accuracyPercent(correct: number, incorrect: number): number {
  const total = correct + incorrect
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

export function StatsPage() {
  const { byCategory, clearWrongCardList, lastSessionWrongIds } = useAppProgress()

  const totals = categories.reduce(
    (acc, { id }) => {
      const s = byCategory[id]
      return {
        studied: acc.studied + s.studied,
        correct: acc.correct + s.correct,
        incorrect: acc.incorrect + s.incorrect,
      }
    },
    { studied: 0, correct: 0, incorrect: 0 },
  )

  const overallAccuracy = accuracyPercent(totals.correct, totals.incorrect)

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Statistics</h1>
        <p className={styles.subtitle}>
          Totals include study and quiz activity. Data is saved in this browser
          (localStorage).
        </p>
      </header>

      <section className={styles.card} aria-label="Overall summary">
        <h2 className={styles.sectionTitle}>Overall</h2>
        <ul className={styles.list}>
          <li>
            <span className={styles.label}>Cards answered</span>
            <span className={styles.value}>{totals.studied}</span>
          </li>
          <li>
            <span className={styles.label}>Correct</span>
            <span className={styles.value}>{totals.correct}</span>
          </li>
          <li>
            <span className={styles.label}>Incorrect</span>
            <span className={styles.value}>{totals.incorrect}</span>
          </li>
          <li>
            <span className={styles.label}>Accuracy</span>
            <span className={styles.value}>
              {totals.correct + totals.incorrect === 0
                ? '—'
                : `${overallAccuracy}%`}
            </span>
          </li>
        </ul>
      </section>

      <section className={styles.card} aria-label="By category">
        <h2 className={styles.sectionTitle}>By category</h2>
        <ul className={styles.catList}>
          {categories.map(({ id, label }) => {
            const s = byCategory[id]
            const acc = accuracyPercent(s.correct, s.incorrect)
            const answered = s.correct + s.incorrect
            return (
              <li key={id} className={styles.catRow}>
                <span className={styles.catName}>{label}</span>
                <span className={styles.catMeta}>
                  {s.studied} answered ·{' '}
                  {answered === 0 ? '—' : `${acc}%`} correct
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      {lastSessionWrongIds.length > 0 ? (
        <section className={styles.card} aria-label="Redo list">
          <h2 className={styles.sectionTitle}>Wrong cards (last session)</h2>
          <p className={styles.muted}>
            {lastSessionWrongIds.length} card
            {lastSessionWrongIds.length === 1 ? '' : 's'} queued for redo. You
            can clear this list without losing historical stats.
          </p>
          <button type="button" className={styles.clearBtn} onClick={clearWrongCardList}>
            Clear wrong list
          </button>
        </section>
      ) : null}

      <footer className={styles.footer}>
        <Link className={styles.back} to="/">
          ← Back home
        </Link>
      </footer>
    </main>
  )
}
