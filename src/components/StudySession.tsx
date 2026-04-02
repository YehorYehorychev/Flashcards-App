import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Flashcard as FlashcardModel } from '../data/flashcards'
import { Flashcard } from './Flashcard'
import styles from '../pages/StudyPage.module.css'

type StudySessionProps = {
  cards: FlashcardModel[]
  categoryLabel: string
  /** Shown above the title (e.g. Study / Animals or Redo). */
  crumb?: React.ReactNode
  exitLinkTo: string
  exitLinkLabel: string
  onRecordAnswer: (correct: boolean, card: FlashcardModel) => void
  onSessionFinished: (wrongIds: string[]) => void
}

/**
 * Single-card study flow: flip, mark right/wrong, advance until the deck ends.
 * Notifies parent for stats and redo queue when the session completes.
 */
export function StudySession({
  cards,
  categoryLabel,
  crumb,
  exitLinkTo,
  exitLinkLabel,
  onRecordAnswer,
  onSessionFinished,
}: StudySessionProps) {
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [wrongIds, setWrongIds] = useState<string[]>([])

  const current = cards[index]
  const finished = cards.length > 0 && index >= cards.length
  
  // Calculate progress percentage
  const progressPercent = cards.length > 0 ? (index / cards.length) * 100 : 0

  const goNext = (wasWrong: boolean) => {
    if (!current) return
    onRecordAnswer(!wasWrong, current)
    const nextWrongIds =
      wasWrong && !wrongIds.includes(current.id)
        ? [...wrongIds, current.id]
        : wrongIds
    if (wasWrong && !wrongIds.includes(current.id)) {
      setWrongIds(nextWrongIds)
    }
    const nextIndex = index + 1
    
    setIsFlipped(false)
    setIndex(nextIndex)
    if (nextIndex >= cards.length) {
      onSessionFinished(nextWrongIds)
    }
  }

  if (cards.length === 0) {
    return (
      <main className={styles.page}>
        <p className={styles.muted}>No cards in this session.</p>
        <Link className={styles.link} to={exitLinkTo}>
          {exitLinkLabel}
        </Link>
      </main>
    )
  }

  if (finished) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Session complete! 🎉</h1>
          <p className={styles.subtitle}>
            {categoryLabel}: you reviewed {cards.length} card
            {cards.length === 1 ? '' : 's'}.
          </p>
        </header>
        <section className={styles.summary}>
          <p>
            <strong>{cards.length - wrongIds.length}</strong> correct
          </p>
          <p>
            <strong>{wrongIds.length}</strong> to review again
          </p>
          {wrongIds.length > 0 ? (
            <p className={styles.muted}>
              You can review these mistakes from the home screen using the Redo button.
            </p>
          ) : (
            <p className={styles.muted}>
              Perfect score! Awesome job! 🚀
            </p>
          )}
        </section>
        <footer className={styles.footer}>
          {wrongIds.length > 0 ? (
            <Link className={styles.link} to="/study/redo">
              Review Mistakes Now
            </Link>
          ) : null}
          <Link className={styles.link} to="/study">
            Study another category
          </Link>
          <Link className={styles.linkMuted} to="/">
            Back Home
          </Link>
        </footer>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.topBar}>
           {crumb ? <p className={styles.crumb}>{crumb}</p> : null}
        </div>
        
        <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${progressPercent}%` }}></div>
        </div>
        
        <h1 className={styles.title}>
          Card {index + 1} of {cards.length}
        </h1>
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
        <Link className={styles.linkMuted} to={exitLinkTo}>
          {exitLinkLabel}
        </Link>
      </footer>
    </main>
  )
}
