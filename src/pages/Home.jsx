import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import { workouts } from '../data/workouts.js'
import styles from '../styles/Home.module.css'

export default function Home() {
  const cards = [
    ...workouts.map((workout) => ({
      id: workout.id,
      label: workout.label,
      to: `/workout/${workout.id}`,
    })),
    {
      id: 'stretch',
      label: 'Stretch',
      to: '/stretch',
    },
  ]

  return (
    <>
      <NavBar title="Bodyweight Workout" />
      <main className={styles.page}>
        <div className={styles.content}>
          <header className={styles.hero}>
            <p className={styles.kicker}>Workout Timer</p>
          </header>
          <nav className={styles.grid} aria-label="Primary navigation">
            {cards.map((card) => (
              <Link key={card.id} className={styles.card} to={card.to}>
                <span className={styles.cardLabel}>{card.label}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </main>
    </>
  )
}
