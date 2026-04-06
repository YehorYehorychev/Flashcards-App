import { motion, AnimatePresence } from 'framer-motion'
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
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.div
          key={ukranian}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={styles.wrap}
        >
          <button
            type="button"
            className={styles.flipOuter}
            onClick={onFlip}
            aria-label={isFlipped ? 'Show Ukrainian' : 'Show English translation'}
            aria-pressed={isFlipped}
          >
            <div className={`${styles.flipInner} ${isFlipped ? styles.flipped : ''}`}>
              <div className={`${styles.face} ${styles.front}`} aria-hidden={isFlipped}>
                <span className={styles.label}>Ukrainian</span>
                <p className={styles.word} lang="uk" aria-live="polite">
                  {ukranian}
                </p>
                <span className={styles.hint}>Tap to flip</span>
              </div>
              <div className={`${styles.face} ${styles.back}`} aria-hidden={!isFlipped}>
                <span className={styles.label}>English</span>
                <p className={styles.word} aria-live="polite">
                  {english}
                </p>
                <span className={styles.hint}>Tap to flip</span>
              </div>
            </div>
          </button>

          {isFlipped && onRight && onWrong ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.actions}
              role="group"
              aria-label="How did you do?"
            >
              <button
                type="button"
                className={`btn-gamified btn-success ${styles.btnRight}`}
                onClick={onRight}
                autoFocus
              >
                Got it right
              </button>
              <button
                type="button"
                className={`btn-gamified btn-danger ${styles.btnWrong}`}
                onClick={onWrong}
              >
                Got it wrong
              </button>
            </motion.div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
