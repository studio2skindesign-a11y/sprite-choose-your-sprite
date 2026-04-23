import { useState } from 'react'
import styles from './QuizScreen.module.css'

const ANSWERS = ['Παναθηναικός', 'Ολυμπιακός', 'ΠΑΟΚ']
const CORRECT  = 'Παναθηναικός'

export default function QuizScreen({ onWin }) {
  const [selected, setSelected] = useState(null)
  const [isWrong,  setIsWrong]  = useState(false)

  const handleAnswer = (answer) => {
    if (selected) return
    setSelected(answer)

    if (answer === CORRECT) {
      setTimeout(() => onWin(), 800)
    } else {
      setIsWrong(true)
      setTimeout(() => {
        setSelected(null)
        setIsWrong(false)
      }, 1500)
    }
  }

  return (
    <div className={styles.screen}>
      <img src="/assets/bg-quiz.png" alt="" className={styles.bg} draggable={false} />

      <div className={styles.content}>

        <div className={styles.questionCard}>
          <p className={styles.questionText}>
            Ποια Ελληνική ομάδα έχει τις περισσότερες νίκες στην <strong>Ευρώπη</strong>;
          </p>
        </div>

        <div className={styles.answers}>
          {ANSWERS.map((answer) => (
            <button
              key={answer}
              className={`${styles.answerBtn}
                ${selected === answer && !isWrong  ? styles.selected : ''}
                ${selected === answer &&  isWrong  ? styles.wrong    : ''}
                ${selected && selected !== answer  ? styles.dimmed   : ''}`}
              onClick={() => handleAnswer(answer)}
              aria-label={answer}
            >
              <img src="/assets/btn-answer.png" alt="" className={styles.btnBg} draggable={false} />
              <span className={styles.answerText}>{answer}</span>
            </button>
          ))}
        </div>

        <div className={`${styles.retryMsg} ${isWrong ? styles.retryVisible : ''}`}>
          Προσπαθησε ξανα
        </div>

      </div>
    </div>
  )
}
