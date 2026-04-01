import { useMemo, useState, type FormEvent } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useAppProgress } from '../context/useAppProgress'
import type { Category, Flashcard, Quiz } from '../data/flashcards'
import { categories, flashcardsByCategory } from '../data/flashcards'
import { shuffled } from '../lib/shuffle'
import styles from './QuizPage.module.css'

function isCategory(value: string | undefined): value is Category {
  return value === 'animals' || value === 'food' || value === 'verbs' || value === 'colors'
}

function quizTypeFromParam(value: string | null): Quiz['type'] | null {
  if (value === 'multiple-choice' || value === 'fill-in-the-blank') return value
  return null
}

function answersMatch(expected: string, input: string): boolean {
  return expected.trim().toLowerCase() === input.trim().toLowerCase()
}

function filterCardsForQuizType(
  cards: Flashcard[],
  quizType: Quiz['type'],
): Flashcard[] {
  return cards.filter((c) => c.quiz.type === quizType)
}

export function QuizPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const [searchParams] = useSearchParams()
  const category = isCategory(categoryId) ? categoryId : null
  const quizType = quizTypeFromParam(searchParams.get('type'))
  const { recordQuizAnswer } = useAppProgress()

  const allInCategory = useMemo(
    () => (category ? flashcardsByCategory(category) : []),
    [category],
  )

  const deck = useMemo(() => {
    if (!quizType) return []
    return filterCardsForQuizType(allInCategory, quizType)
  }, [allInCategory, quizType])

  const [index, setIndex] = useState(0)
  const [mcSelection, setMcSelection] = useState<string | null>(null)
  const [fillValue, setFillValue] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null)

  const categoryLabel =
    category && categories.find((c) => c.id === category)?.label

  const current = deck[index]
  const finished = deck.length > 0 && index >= deck.length

  const mcOptions = useMemo(() => {
    if (!current || current.quiz.type !== 'multiple-choice') return []
    return shuffled(current.quiz.options)
  }, [current])

  const resetQuestionState = () => {
    setMcSelection(null)
    setFillValue('')
    setRevealed(false)
    setLastCorrect(null)
  }

  const goNextQuestion = () => {
    setIndex((i) => i + 1)
    resetQuestionState()
  }

  const handleMcPick = (option: string) => {
    if (!current || current.quiz.type !== 'multiple-choice' || revealed) return
    const ok = answersMatch(current.english, option)
    setMcSelection(option)
    setRevealed(true)
    setLastCorrect(ok)
    if (category) recordQuizAnswer(category, ok)
  }

  const handleFillSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!current || current.quiz.type !== 'fill-in-the-blank' || revealed) return
    const ok = answersMatch(current.english, fillValue)
    setRevealed(true)
    setLastCorrect(ok)
    if (category) recordQuizAnswer(category, ok)
  }

  if (!category || !quizType) {
    return (
      <main className={styles.page}>
        <p className={styles.muted}>
          {!category ? 'Unknown category.' : 'Pick a valid quiz type.'}
        </p>
        <Link className={styles.link} to="/quiz">
          ← Back to quiz setup
        </Link>
      </main>
    )
  }

  if (deck.length === 0) {
    return (
      <main className={styles.page}>
        <p className={styles.muted}>
          No {quizType === 'multiple-choice' ? 'multiple choice' : 'fill-in'}{' '}
          cards in this category yet.
        </p>
        <Link className={styles.link} to="/quiz">
          ← Back to quiz setup
        </Link>
      </main>
    )
  }

  if (finished) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Quiz complete</h1>
          <p className={styles.subtitle}>
            {categoryLabel}: you answered {deck.length} question
            {deck.length === 1 ? '' : 's'}.
          </p>
        </header>
        <footer className={styles.footer}>
          <Link className={styles.link} to="/quiz">
            Another quiz
          </Link>
          <Link className={styles.linkMuted} to="/">
            Home
          </Link>
        </footer>
      </main>
    )
  }

  const crumb = (
    <>
      <Link to="/quiz">Quiz</Link>
      <span aria-hidden="true"> / </span>
      <span>{categoryLabel}</span>
    </>
  )

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.crumb}>{crumb}</p>
        <h1 className={styles.title}>
          Question {index + 1} of {deck.length}
        </h1>
      </header>

      <p className={styles.prompt} lang="uk">
        {current.ukranian}
      </p>

      {current.quiz.type === 'multiple-choice' ? (
        <div className={styles.options} role="group" aria-label="Answer choices">
          {mcOptions.map((opt) => {
            const isPicked = mcSelection === opt
            const isAnswer = answersMatch(current.english, opt)
            let extra = ''
            if (revealed) {
              if (isAnswer) extra = styles.optionCorrect
              else if (isPicked) extra = styles.optionWrong
            }
            return (
              <button
                key={opt}
                type="button"
                className={`${styles.option} ${extra}`.trim()}
                disabled={revealed}
                onClick={() => handleMcPick(opt)}
              >
                {opt}
              </button>
            )
          })}
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleFillSubmit}>
          <label htmlFor="fill-answer" className="visually-hidden">
            English translation
          </label>
          <input
            id="fill-answer"
            className={styles.input}
            value={fillValue}
            onChange={(e) => setFillValue(e.target.value)}
            placeholder="Type the English translation"
            autoComplete="off"
            disabled={revealed}
          />
          <button
            type="submit"
            className={styles.submit}
            disabled={revealed || !fillValue.trim()}
          >
            Check answer
          </button>
        </form>
      )}

      {revealed && lastCorrect !== null ? (
        <div
          className={lastCorrect ? styles.feedbackOk : styles.feedbackBad}
          role="status"
        >
          {lastCorrect
            ? 'Correct!'
            : `Not quite — the answer was: ${current.english}`}
        </div>
      ) : null}

      {revealed ? (
        <footer className={styles.footer}>
          <button type="button" className={styles.nextBtn} onClick={goNextQuestion}>
            {index + 1 >= deck.length ? 'Finish' : 'Next question'}
          </button>
        </footer>
      ) : null}

      {!revealed ? (
        <footer className={styles.footer}>
          <Link className={styles.linkMuted} to="/quiz">
            ← Exit to quiz setup
          </Link>
        </footer>
      ) : null}
    </main>
  )
}
