import { useCallback, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StudySession } from '../components/StudySession'
import { useAppProgress } from '../context/useAppProgress'
import type { Category, Flashcard } from '../data/flashcards'
import { categories, flashcardsByCategory } from '../data/flashcards'
import { shuffled } from '../lib/shuffle'
import styles from './StudyPage.module.css'

function isCategory(value: string | undefined): value is Category {
  return categories.some((c) => c.id === value)
}

export function StudyPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = isCategory(categoryId) ? categoryId : null
  const { recordStudyAnswer, finishStudySession } = useAppProgress()

  const SESSION_LIMIT = 15

  const cards = useMemo(() => {
    if (!category) return []
    const all = flashcardsByCategory(category)
    // Shuffle and limit the session
    return shuffled(all).slice(0, SESSION_LIMIT)
  }, [category])

  const categoryLabel =
    category && categories.find((c) => c.id === category)?.label

  const handleRecordAnswer = useCallback(
    (correct: boolean, card: Flashcard) => {
      if (category) recordStudyAnswer(category, correct, card.xp)
    },
    [category, recordStudyAnswer],
  )

  const onSessionFinished = useCallback(
    (wrongIds: string[]) => {
      finishStudySession(wrongIds)
    },
    [finishStudySession],
  )

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

  const crumb = (
    <>
      <Link to="/study">Study</Link>
      <span aria-hidden="true"> / </span>
      <span>{categoryLabel}</span>
    </>
  )

  return (
    <StudySession
      cards={cards}
      categoryLabel={categoryLabel ?? category}
      crumb={crumb}
      exitLinkTo="/study"
      exitLinkLabel="← Exit to categories"
      onRecordAnswer={handleRecordAnswer}
      onSessionFinished={onSessionFinished}
    />
  )
}
