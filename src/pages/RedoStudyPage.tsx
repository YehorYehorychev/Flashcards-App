import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { StudySession } from '../components/StudySession'
import { useAppProgress } from '../context/useAppProgress'
import type { Flashcard } from '../data/flashcards'
import { flashcards } from '../data/flashcards'
import styles from './StudyPage.module.css'

/**
 * Second pass over cards marked wrong in the last finished study/redo session.
 * See docs/specification.md — Redo mode.
 */
export function RedoStudyPage() {
  const {
    lastSessionWrongIds,
    recordStudyAnswer,
    finishStudySession,
  } = useAppProgress()

  const cards = useMemo(() => {
    const idSet = new Set(lastSessionWrongIds)
    return flashcards.filter((c) => idSet.has(c.id))
  }, [lastSessionWrongIds])

  const handleRecordAnswer = useCallback(
    (correct: boolean, card: Flashcard) => {
      recordStudyAnswer(card.category, correct)
    },
    [recordStudyAnswer],
  )

  const onSessionFinished = useCallback(
    (wrongIds: string[]) => {
      finishStudySession(wrongIds)
    },
    [finishStudySession],
  )

  if (lastSessionWrongIds.length === 0) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Redo wrong cards</h1>
          <p className={styles.subtitle}>
            Finish a study session with at least one wrong answer to build a redo
            list, or clear the list from home if you no longer need it.
          </p>
        </header>
        <footer className={styles.footer}>
          <Link className={styles.link} to="/study">
            Choose a category to study
          </Link>
          <Link className={styles.linkMuted} to="/">
            Home
          </Link>
        </footer>
      </main>
    )
  }

  return (
    <StudySession
      cards={cards}
      categoryLabel="Redo (wrong cards from last session)"
      crumb={
        <>
          <Link to="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <span>Redo</span>
        </>
      }
      exitLinkTo="/"
      exitLinkLabel="← Exit to home"
      onRecordAnswer={handleRecordAnswer}
      onSessionFinished={onSessionFinished}
    />
  )
}
