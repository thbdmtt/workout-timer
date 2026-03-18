import NavBar from '../components/NavBar.jsx'
import { useSound } from '../hooks/useSound.js'
import { useTimer } from '../hooks/useTimer.js'
import styles from '../styles/Stretch.module.css'

function formatElapsed(seconds) {
  const totalSeconds = Math.max(0, Math.floor(Number(seconds) || 0))
  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = String(totalSeconds % 60).padStart(2, '0')

  return `${String(minutes).padStart(2, '0')}:${remainingSeconds}`
}

export default function Stretch() {
  const playAlarm = useSound('/alarm.mp3')
  const { seconds, start, pause, reset } = useTimer(0, undefined, {
    mode: 'stopwatch',
    onTick: (nextSeconds) => {
      if (nextSeconds > 0 && nextSeconds % 30 === 0) {
        playAlarm()
      }
    },
  })

  return (
    <>
      <NavBar title="Stretch" />
      <main className={styles.page}>
        <div className={styles.content}>
          <p className={styles.display}>{formatElapsed(seconds)}</p>
          <div className={styles.controls}>
            <button type="button" className={styles.button} onClick={() => start()}>
              Play
            </button>
            <button type="button" className={styles.button} onClick={pause}>
              Stop
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.danger}`}
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
