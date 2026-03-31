import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Flashcard } from '../components/Flashcard'
import type { Category } from '../data/flashcards'
import { categories, flashcardsByCategory } from '../data/flashcards'
import styles from './StudyPage.module.css'

function isCategory(value: string | undefined): value is Category {
  return value === 'animals' || value === 'food' || value === 'verbs'
}

export function StudyPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = isCategory(categoryId) ? categoryId : null

  const cards = useMemo(
    () => (category ? flashcardsByCategory(category) : []),
    [category],
  )

  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [wrongIds, setWrongIds] = useState<string[]>([])

  const current = cards[index]
  const finished = category !== null && cards.length > 0 && index >= cards.length

  const categoryLabel =
    category && categories.find((c) => c.id === category)?.label

  const goNext = (wasWrong: boolean) => {
    if (!current) return
    if (wasWrong) {
      setWrongIds((prev) =>
        prev.includes(current.id) ? prev : [...prev, current.id],
      )
    }
    setIndex((i) => i + 1)
    setIsFlipped(false)
  }

  if (!category) {
    return (
      <main className={styles.page}>
        <p className={styles.muted}>Unknown category.</p>
        <Link className={styles.link} to="/study">
          ← Back to categories
        </Link>
      </main>
    )
  }

  if (cards.length === 0) {
    return (
      <main className={styles.page}>
        <p className={styles.muted}>No cards in this category yet.</p>
        <Link className={styles.link} to="/study">
          ← Back to categories
        </Link>
      </main>
    )
  }

  if (finished) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Session complete</h1>
          <p className={styles.subtitle}>
            {categoryLabel}: you reviewed {cards.length} card
            {cards.length === 1 ? '' : 's'}.
          </p>
        </header>
        <section className={styles.summary}>
          <p>
            <strong>{wrongIds.length}</strong> marked wrong this round.
          </p>
          {wrongIds.length > 0 ? (
            <p className={styles.muted}>
              Wrong card IDs are kept in memory for a future redo mode.
            </p>
          ) : null}
        </section>
        <footer className={styles.footer}>
          <Link className={styles.link} to="/study">
            Study another category
          </Link>
          <Link className={styles.linkMuted} to="/">
            Home
          </Link>
        </footer>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.crumb}>
          <Link to="/study">Study</Link>
          <span aria-hidden="true"> / </span>
          <span>{categoryLabel}</span>
        </p>
        <h1 className={styles.title}>Card {index + 1} of {cards.length}</h1>
      </header>

      <Flashcard
        ukranian={current.ukranian}
        english={current.english}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped((f) => !f)}
        onRight={() => goNext(false)}
        onWrong={() => goNext(true)}
      />

      <footer className={styles.footer}>
        <Link className={styles.linkMuted} to="/study">
          ← Exit to categories
        </Link>
      </footer>
    </main>
  )
}
