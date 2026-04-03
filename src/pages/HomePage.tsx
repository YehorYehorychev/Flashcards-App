import { Link } from 'react-router-dom'
import { useAppProgress } from '../context/useAppProgress'
import styles from './HomePage.module.css'

export function HomePage() {
  const { lastSessionWrongIds, clearWrongCardList, totalXP, streak } = useAppProgress()
  const redoCount = lastSessionWrongIds.length

  return (
    <main className={styles.page}>
      <header className={styles.statsBar}>
        <div className={styles.statItem} title="Your current daily streak">
          <span className={styles.statIcon}>🔥</span>
          <span className={styles.statValue}>{streak} day{streak === 1 ? '' : 's'}</span>
        </div>
        <div className={styles.statItem} title="Total Experience Points earned">
          <span className={styles.statIcon}>✨</span>
          <span className={styles.statValue}>{totalXP} XP</span>
        </div>
      </header>

      <header className={styles.hero}>
        <h1 className={styles.title}>Ukrainian Flashcards 🇺🇦</h1>
        <p className={styles.subtitle}>
          Learn new words, review your mistakes, and see your progress grow!
        </p>
      </header>

      {redoCount > 0 ? (
        <section className={styles.redoBanner} aria-label="Redo session">
          <div className={styles.redoContent}>
            <span className={styles.redoIcon}>🚨</span>
            <p className={styles.redoText}>
              You have <strong>{redoCount}</strong> card
              {redoCount === 1 ? '' : 's'} to review from last time!
            </p>
          </div>
          <div className={styles.redoActions}>
            <Link className="btn-gamified btn-warning" to="/study/redo">
              Review Now
            </Link>
            <button
              type="button"
              className="btn-gamified btn-outline"
              onClick={clearWrongCardList}
            >
              Skip
            </button>
          </div>
        </section>
      ) : null}

      <nav className={styles.actions} aria-label="Primary navigation">
        <Link className={styles.cardLink} to="/study">
          <div className={styles.cardIcon}>📚</div>
          <h2 className={styles.cardTitle}>Study Mode</h2>
          <p className={styles.cardBody}>Flip cards and learn at your own pace.</p>
        </Link>
        <Link className={styles.cardLink} to="/quiz">
          <div className={styles.cardIcon}>🎮</div>
          <h2 className={styles.cardTitle}>Quiz Mode</h2>
          <p className={styles.cardBody}>Test your memory and score points!</p>
        </Link>
        <Link className={styles.cardLink} to="/stats">
          <div className={styles.cardIcon}>📈</div>
          <h2 className={styles.cardTitle}>Your Stats</h2>
          <p className={styles.cardBody}>Track your accuracy and progress.</p>
        </Link>
      </nav>
    </main>
  )
}
