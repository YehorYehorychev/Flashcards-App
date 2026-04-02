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
        <h1 className={styles.title}>Your Stats 📈</h1>
        <p className={styles.subtitle}>
          Track your progress over time. Data is saved locally.
        </p>
      </header>

      <div className={styles.gridContainer}>
        <section className={styles.card} aria-label="Overall summary">
          <h2 className={styles.sectionTitle}>🏆 Overall</h2>
          <div className={styles.statCards}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Cards Answered</span>
              <span className={styles.statValue}>{totals.studied}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Correct</span>
              <span className={`${styles.statValue} ${styles.valSuccess}`}>{totals.correct}</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Incorrect</span>
              <span className={`${styles.statValue} ${styles.valDanger}`}>{totals.incorrect}</span>
            </div>
          </div>
          
          <div className={styles.accuracyBlock}>
            <span className={styles.statLabel}>Overall Accuracy</span>
            <div className={styles.accRow}>
              <div className={styles.accBarContainer}>
                <div 
                  className={styles.accBarFill} 
                  style={{ width: `${totals.correct + totals.incorrect === 0 ? 0 : overallAccuracy}%` }}
                ></div>
              </div>
              <span className={styles.accuracyValue}>
                {totals.correct + totals.incorrect === 0 ? '—' : `${overallAccuracy}%`}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.card} aria-label="By category">
          <h2 className={styles.sectionTitle}>📚 By category</h2>
          <ul className={styles.catList}>
            {categories.map(({ id, label }) => {
              const s = byCategory[id]
              const acc = accuracyPercent(s.correct, s.incorrect)
              const answered = s.correct + s.incorrect
              return (
                <li key={id} className={styles.catRow}>
                  <div className={styles.catInfo}>
                    <span className={styles.catName}>{label}</span>
                    <span className={styles.catMeta}>
                      {s.studied} answered
                    </span>
                  </div>
                  <div className={styles.catAcc}>
                    <div className={styles.accBarContainerSmall}>
                      <div 
                        className={styles.accBarFillSmall} 
                        style={{ width: `${answered === 0 ? 0 : acc}%` }}
                      ></div>
                    </div>
                    <span className={styles.catAccText}>
                      {answered === 0 ? '—' : `${acc}%`}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        {lastSessionWrongIds.length > 0 ? (
          <section className={styles.card} aria-label="Redo list">
            <h2 className={styles.sectionTitle}>🚨 Mistakes to review</h2>
            <p className={styles.muted}>
              {lastSessionWrongIds.length} card
              {lastSessionWrongIds.length === 1 ? '' : 's'} queued for redo from your last session.
            </p>
            <div className={styles.redoActions}>
              <Link className="btn-gamified btn-warning" to="/study/redo">
                Review Now
              </Link>
              <button type="button" className="btn-gamified btn-outline" onClick={clearWrongCardList}>
                Clear list
              </button>
            </div>
          </section>
        ) : null}
      </div>

      <footer className={styles.footer}>
        <Link className="btn-gamified btn-outline" to="/">
          ← Back home
        </Link>
      </footer>
    </main>
  )
}
