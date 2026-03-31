import { Link, useLocation } from 'react-router-dom'
import { categories } from '../data/flashcards'
import styles from './CategorySelectionPage.module.css'

type Mode = 'study' | 'quiz'

function modeFromPathname(pathname: string): Mode {
  return pathname.startsWith('/quiz') ? 'quiz' : 'study'
}

export function CategorySelectionPage() {
  const { pathname } = useLocation()
  const mode = modeFromPathname(pathname)

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Choose a category</h1>
        <p className={styles.subtitle}>
          Mode: <strong>{mode === 'study' ? 'Study' : 'Quiz'}</strong>
        </p>
        <div className={styles.modeSwitch} role="navigation" aria-label="Mode">
          <Link
            className={mode === 'study' ? styles.modeActive : styles.modeLink}
            to="/study"
          >
            Study
          </Link>
          <Link
            className={mode === 'quiz' ? styles.modeActive : styles.modeLink}
            to="/quiz"
          >
            Quiz
          </Link>
        </div>
      </header>

      <section className={styles.grid} aria-label="Categories">
        {categories.map((c) => {
          const to =
            mode === 'study'
              ? `/study/${c.id}`
              : `/quiz/${c.id}?type=multiple-choice`
          return (
            <Link key={c.id} className={styles.card} to={to}>
              <h2 className={styles.cardTitle}>{c.label}</h2>
              <p className={styles.cardBody}>
                {mode === 'study'
                  ? 'Start a study session'
                  : 'Start a quiz (placeholder)'}
              </p>
            </Link>
          )
        })}
      </section>

      <footer className={styles.footer}>
        <Link className={styles.back} to="/">
          ← Back home
        </Link>
      </footer>
    </main>
  )
}

