import styles from './NoPrizesScreen.module.css'

export default function NoPrizesScreen({ onHome }) {
  return (
    <div className={styles.screen}>
      <img src="/assets/bg-home.png" alt="" className={styles.bg} draggable={false} />
      <div className={styles.content}>
        <p className={styles.title}>ΕΥΧΑΡΙΣΤΟΥΜΕ!</p>
        <p className={styles.message}>
          Τα δώρα της ημέρας έχουν τελειώσει.{'\n'}
          Ελάτε ξανά αύριο!
        </p>
        <button className={styles.homeBtn} onClick={onHome}>
          ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ
        </button>
      </div>
    </div>
  )
}
