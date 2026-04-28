import { useState } from 'react'
import styles from './QuizScreen.module.css'

const ANSWERS = ['Παναθηναϊκός', 'Ολυμπιακός', 'ΠΑΟΚ']
const CORRECT  = 'Παναθηναϊκός'

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
            Ποια ελληνική ομάδα έχει τους περισσότερους τίτλους στην <strong>Ευρωλίγκα</strong>;
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
              <span className={styles.answerText}>{answer}</span>
            </button>
          ))}
        </div>

        <div className={`${styles.retryMsg} ${isWrong ? styles.retryVisible : ''}`}>
          προσπάθησε ξανά
        </div>

      </div>
    </div>
  )
}
