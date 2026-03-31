import { Link } from 'react-router-dom'
import { categories } from '../data/flashcards'
import styles from './CategorySelectionPage.module.css'

export function CategorySelectionPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Choose a category</h1>
        <p className={styles.subtitle}>Study mode — flip cards and mark right or wrong.</p>
      </header>

      <section className={styles.grid} aria-label="Categories">
        {categories.map((c) => (
          <Link key={c.id} className={styles.card} to={`/study/${c.id}`}>
            <h2 className={styles.cardTitle}>{c.label}</h2>
            <p className={styles.cardBody}>Start a study session</p>
          </Link>
        ))}
      </section>

      <footer className={styles.footer}>
        <Link className={styles.back} to="/">
          ← Back home
        </Link>
      </footer>
    </main>
  )
}
