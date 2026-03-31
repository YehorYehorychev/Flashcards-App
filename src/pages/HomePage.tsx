import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Ukrainian Flashcards</h1>
        <p className={styles.subtitle}>
          Study Ukrainian vocabulary by category, then come back later for quizzes
          and stats.
        </p>
      </section>

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

