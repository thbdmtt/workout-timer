import styles from '../styles/TimerDisplay.module.css'

function formatSeconds(seconds) {
  const totalSeconds = Math.max(0, Math.floor(Number(seconds) || 0))

  if (totalSeconds < 60) {
    return String(totalSeconds)
  }

  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = String(totalSeconds % 60).padStart(2, '0')

  return `${minutes}:${remainingSeconds}`
}

export default function TimerDisplay({ seconds }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.value}>{formatSeconds(seconds)}</p>
    </div>
  )
}
