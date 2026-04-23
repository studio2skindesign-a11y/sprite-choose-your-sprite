import { useState } from 'react'
import { getDashboardData, resetAllData } from '../services/prizeService'
import styles from './BurgerMenu.module.css'

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('el-GR', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })
}

function ProgressBar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className={styles.progressWrap}>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className={styles.progressLabel}>{value} / {max}</span>
    </div>
  )
}

export default function BurgerMenu() {
  const [isOpen, setIsOpen]             = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [data, setData]                 = useState(null)

  const openMenu = () => {
    setData(getDashboardData())
    setIsOpen(true)
  }

  const handleReset = () => {
    resetAllData()
    setData(getDashboardData())
    setConfirmReset(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    setConfirmReset(false)
  }

  return (
    <>
      <button className={styles.burger} onClick={openMenu} aria-label="Open menu">
        <span /><span /><span />
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={handleClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

            <div className={styles.dashHeader}>
              <h2 className={styles.modalTitle}>Prize Dashboard</h2>
              <button className={styles.closeBtn} onClick={handleClose}>✕</button>
            </div>

            {/* Global totals */}
            <div className={styles.totalsCard}>
              <div className={styles.totalItem}>
                <span className={styles.totalValue}>{data.totalGames}</span>
                <span className={styles.totalLabel}>Total Plays</span>
              </div>
              <div className={styles.totalDivider} />
              <div className={styles.totalItem}>
                <span className={styles.totalValue} style={{ color: '#C6F135' }}>{data.bottlesGiven}</span>
                <span className={styles.totalLabel}>Bottles</span>
              </div>
              <div className={styles.totalDivider} />
              <div className={styles.totalItem}>
                <span className={styles.totalValue} style={{ color: '#7ee8a2' }}>{data.stressBallsGiven}</span>
                <span className={styles.totalLabel}>Stress Balls</span>
              </div>
            </div>

            {/* Next bottle indicator */}
            <div className={styles.nextBottleCard}>
              {data.playsUntilNextBottle === null ? (
                <p className={styles.nextBottleText}>All 30 bottles have been distributed.</p>
              ) : data.playsUntilNextBottle === 66 ? (
                <p className={styles.nextBottleText}>
                  🍶 <strong>Bottle just given!</strong> Next bottle in 66 plays.
                </p>
              ) : (
                <p className={styles.nextBottleText}>
                  Next bottle in <strong className={styles.nextBottleCount}>{data.playsUntilNextBottle}</strong> plays
                </p>
              )}
            </div>

            {/* Per-day breakdown */}
            {data.days.length === 0 ? (
              <p className={styles.noData}>No games recorded yet.</p>
            ) : (
              <div className={styles.daysList}>
                <p className={styles.sectionLabel}>Daily Breakdown</p>
                {data.days.map((day, i) => (
                  <div key={day.date} className={styles.dayCard}>
                    <div className={styles.dayHeader}>
                      <span className={styles.dayBadge}>Day {i + 1}</span>
                      <span className={styles.dayDate}>{formatDate(day.date)}</span>
                      <span className={styles.dayGames}>{day.totalGames} plays</span>
                    </div>
                    <div className={styles.prizeRow}>
                      <span className={styles.prizeIcon}>🍶</span>
                      <div className={styles.prizeInfo}>
                        <span className={styles.prizeLabelText}>Sprite Bottles</span>
                        <ProgressBar value={day.bottlesGiven} max={10} color="#C6F135" />
                      </div>
                    </div>
                    <div className={styles.prizeRow}>
                      <span className={styles.prizeIcon}>🟢</span>
                      <div className={styles.prizeInfo}>
                        <span className={styles.prizeLabelText}>Antistress Balls</span>
                        <ProgressBar value={day.stressBallsGiven} max={667} color="#7ee8a2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reset */}
            {!confirmReset ? (
              <button className={styles.resetBtn} onClick={() => setConfirmReset(true)}>
                Reset All Data
              </button>
            ) : (
              <div className={styles.confirmBox}>
                <p className={styles.confirmText}>
                  Are you sure you want to reset the game?<br />
                  <strong>All data will be permanently deleted.</strong>
                </p>
                <div className={styles.confirmBtns}>
                  <button className={styles.cancelBtn} onClick={() => setConfirmReset(false)}>Cancel</button>
                  <button className={styles.confirmOkBtn} onClick={handleReset}>OK, Reset</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  )
}
