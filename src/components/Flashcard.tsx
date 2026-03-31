import styles from './Flashcard.module.css'

type FlashcardProps = {
  ukranian: string
  english: string
  isFlipped: boolean
  onFlip: () => void
  onRight?: () => void
  onWrong?: () => void
}

export function Flashcard({
  ukranian,
  english,
  isFlipped,
  onFlip,
  onRight,
  onWrong,
}: FlashcardProps) {
  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.flipOuter}
        onClick={onFlip}
        aria-label={isFlipped ? 'Show Ukrainian' : 'Show English translation'}
        aria-pressed={isFlipped}
      >
        <div className={`${styles.flipInner} ${isFlipped ? styles.flipped : ''}`}>
          <div className={`${styles.face} ${styles.front}`}>
            <span className={styles.label}>Ukrainian</span>
            <p className={styles.word}>{ukranian}</p>
            <span className={styles.hint}>Tap to flip</span>
          </div>
          <div className={`${styles.face} ${styles.back}`}>
            <span className={styles.label}>English</span>
            <p className={styles.word}>{english}</p>
            <span className={styles.hint}>Tap to flip</span>
          </div>
        </div>
      </button>

      {isFlipped && onRight && onWrong ? (
        <div className={styles.actions} role="group" aria-label="Mark your answer">
          <button type="button" className={styles.btnRight} onClick={onRight}>
            ✅ I got it right
          </button>
          <button type="button" className={styles.btnWrong} onClick={onWrong}>
            ❌ I got it wrong
          </button>
        </div>
      ) : null}
    </div>
  )
}
