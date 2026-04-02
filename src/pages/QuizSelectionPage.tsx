import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/flashcards'
import styles from './QuizSelectionPage.module.css'

type QuizTypeParam = 'multiple-choice' | 'fill-in-the-blank'

const categoryIcons: Record<string, string> = {
  animals: '🐶',
  food: '🍎',
  verbs: '🏃',
}

export function QuizSelectionPage() {
  const [quizType, setQuizType] = useState<QuizTypeParam>('multiple-choice')

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Quiz Time!</h1>
        <p className={styles.subtitle}>
          Pick a format, then a category to start scoring points.
        </p>
        <div className={styles.typeToggle} role="group" aria-label="Quiz type">
          <button
            type="button"
            className={
              quizType === 'multiple-choice' ? styles.typeBtnActive : styles.typeBtn
            }
            aria-pressed={quizType === 'multiple-choice'}
            onClick={() => setQuizType('multiple-choice')}
          >
            Multiple choice
          </button>
          <button
            type="button"
            className={
              quizType === 'fill-in-the-blank'
                ? styles.typeBtnActive
                : styles.typeBtn
            }
            aria-pressed={quizType === 'fill-in-the-blank'}
            onClick={() => setQuizType('fill-in-the-blank')}
          >
            Fill in the blank
          </button>
        </div>
      </header>

      <section className={styles.grid} aria-label="Categories">
        {categories.map((c, index) => {
          const search = new URLSearchParams({ type: quizType }).toString()
          const to = `/quiz/${c.id}?${search}`
          return (
            <Link key={c.id} className={styles.card} style={{ animationDelay: `${index * 100}ms` }} to={to}>
               <div className={styles.cardIcon}>{categoryIcons[c.id] || '✨'}</div>
              <h2 className={styles.cardTitle}>{c.label}</h2>
              <p className={styles.cardBody}>
                {quizType === 'multiple-choice'
                  ? 'Four English options per Ukrainian word'
                  : 'Type the English translation'}
              </p>
            </Link>
          )
        })}
      </section>

      <footer className={styles.footer}>
        <Link className="btn-gamified btn-outline" to="/">
          ← Back home
        </Link>
      </footer>
    </main>
  )
}
