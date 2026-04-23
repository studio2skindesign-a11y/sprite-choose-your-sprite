import { useState } from 'react'
import styles from './HomeScreen.module.css'
import BurgerMenu from '../components/BurgerMenu'

const CANS = [
  {
    id: 'zero',
    normal: '/assets/can-zero-normal.png',
    glow:   '/assets/can-zero-glow.png',
    alt:    'Sprite Zero Sugar',
  },
  {
    id: 'regular',
    normal: '/assets/can-regular-normal.png',
    glow:   '/assets/can-regular-glow.png',
    alt:    'Sprite',
  },
]

export default function HomeScreen({ onSelectCan }) {
  const [selected, setSelected] = useState(null)

  const handleTap = (can) => {
    if (selected) return
    setSelected(can.id)
    setTimeout(() => onSelectCan(can.id), 700)
  }

  return (
    <div className={styles.screen}>
      <img
        src="/assets/bg-home.png"
        alt=""
        className={styles.bg}
        draggable={false}
      />

      <BurgerMenu />

      <div className={styles.badge}>
        <img src="/assets/badge-choose.png" alt="Διάλεξε την αγαπημένη σου" />
      </div>

      <div className={styles.cans}>
        {CANS.map((can) => {
          const isSelected = selected === can.id
          const isDimmed   = selected !== null && selected !== can.id
          return (
            <button
              key={can.id}
              className={`${styles.canBtn} ${isDimmed ? styles.dimmed : ''}`}
              onClick={() => handleTap(can)}
              aria-label={can.alt}
            >
              <img
                src={isSelected ? can.glow : can.normal}
                alt={can.alt}
                className={styles.canImg}
                draggable={false}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
