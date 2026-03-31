import { Link } from 'react-router-dom'
import { useAppProgress } from '../context/useAppProgress'
import styles from './HomePage.module.css'

export function HomePage() {
  const { lastSessionWrongIds, clearWrongCardList } = useAppProgress()
  const redoCount = lastSessionWrongIds.length

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Ukrainian Flashcards</h1>
        <p className={styles.subtitle}>
          Study Ukrainian vocabulary by category, drill quizzes, and track
          accuracy over time.
        </p>
      </section>

      {redoCount > 0 ? (
        <section className={styles.redoBanner} aria-label="Redo session">
          <p className={styles.redoText}>
            You have <strong>{redoCount}</strong> card
            {redoCount === 1 ? '' : 's'} marked wrong in your last session.
          </p>
          <div className={styles.redoActions}>
            <Link className={styles.redoLink} to="/study/redo">
              Redo wrong cards
            </Link>
            <button
              type="button"
              className={styles.clearBtn}
              onClick={clearWrongCardList}
            >
              Clear wrong list
            </button>
          </div>
        </section>
      ) : null}

      <nav className={styles.actions} aria-label="Primary navigation">
        <Link className={styles.cardLink} to="/study">
          <h2 className={styles.cardTitle}>Study Mode</h2>
          <p className={styles.cardBody}>Flip cards and mark right/wrong.</p>
        </Link>
        <Link className={styles.cardLink} to="/quiz">
          <h2 className={styles.cardTitle}>Quiz Mode</h2>
          <p className={styles.cardBody}>Multiple choice or fill in the blank.</p>
        </Link>
        <Link className={styles.cardLink} to="/stats">
          <h2 className={styles.cardTitle}>Stats</h2>
          <p className={styles.cardBody}>See your progress over time.</p>
        </Link>
      </nav>
    </main>
  )
}
