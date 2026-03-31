import { Link } from 'react-router-dom'
import styles from './StatsPage.module.css'

export function StatsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Statistics</h1>
        <p className={styles.subtitle}>
          Phase 1 placeholder. Stats tracking is implemented in a later phase.
        </p>
      </header>

      <section className={styles.card}>
        <p className={styles.muted}>
          Once Phase 5 is complete, this page will show total studied cards,
          accuracy, and breakdown by category.
        </p>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.back} to="/">
          ← Back home
        </Link>
      </footer>
    </main>
  )
}

