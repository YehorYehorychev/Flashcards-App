import { useCallback, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StudySession } from '../components/StudySession'
import { useAppProgress } from '../context/useAppProgress'
import type { Category } from '../data/flashcards'
import { categories, flashcardsByCategory } from '../data/flashcards'
import styles from './StudyPage.module.css'

function isCategory(value: string | undefined): value is Category {
  return value === 'animals' || value === 'food' || value === 'verbs' || value === 'colors'
}

export function StudyPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = isCategory(categoryId) ? categoryId : null
  const { recordStudyAnswer, finishStudySession } = useAppProgress()

  const cards = useMemo(
    () => (category ? flashcardsByCategory(category) : []),
    [category],
  )

  const categoryLabel =
    category && categories.find((c) => c.id === category)?.label

  const handleRecordAnswer = useCallback(
    (correct: boolean) => {
      if (category) recordStudyAnswer(category, correct)
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
