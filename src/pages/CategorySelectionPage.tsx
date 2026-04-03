import { Link } from 'react-router-dom'
import { categories } from '../data/flashcards'
import styles from './CategorySelectionPage.module.css'

export function CategorySelectionPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Choose a category</h1>
        <p className={styles.subtitle}>Study mode — flip cards and learn new words.</p>
      </header>

      <section className={styles.grid} aria-label="Categories">
        {categories.map((c, index) => (
          <Link key={c.id} className={styles.card} style={{ animationDelay: `${index * 100}ms` }} to={`/study/${c.id}`}>
            <div className={styles.cardIcon}>{c.icon}</div>
            <h2 className={styles.cardTitle}>{c.label}</h2>
            <p className={styles.cardBody}>Start session</p>
          </Link>
        ))}
      </section>

      <footer className={styles.footer}>
        <Link className="btn-gamified btn-outline" to="/">
          ← Back home
        </Link>
      </footer>
    </main>
  )
}
