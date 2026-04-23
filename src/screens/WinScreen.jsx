import styles from './WinScreen.module.css'
import { PRIZES } from '../services/prizeService'

export default function WinScreen({ prize, onHome }) {
  const prizeData = PRIZES[prize]
  const isBottle  = prize === 'bottle'

  return (
    <div className={styles.screen}>
      <img src="/assets/GIFTS/GIFT_SCREEN_BG.png" alt="" className={styles.bg} draggable={false} />

      <div className={styles.content}>
        <p className={styles.congrats}>ΣΥΓΧΑΡΗΤΗΡΙΑ<br />ΚΕΡΔΙΣΕΣ</p>

        <div className={`${styles.giftWrap} ${isBottle ? styles.giftWrapBottle : ''}`}>
          <img
            src={prizeData.image}
            alt={prizeData.name}
            className={styles.giftImg}
            draggable={false}
          />
        </div>

        <p className={styles.prizeName}>{prizeData.name}</p>

        <div className={styles.divider} />

        <button className={styles.homeBtn} onClick={onHome}>
          ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ
        </button>
      </div>
    </div>
  )
}
