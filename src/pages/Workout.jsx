import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ExerciseBlock from '../components/ExerciseBlock.jsx'
import NavBar from '../components/NavBar.jsx'
import TimerDisplay from '../components/TimerDisplay.jsx'
import { getWorkout } from '../data/workouts.js'
import { useSound } from '../hooks/useSound.js'
import { useTimer } from '../hooks/useTimer.js'
import styles from '../styles/Workout.module.css'

function createCheckboxState(workout) {
  if (!workout) {
    return []
  }

  return workout.exercises.map((exercise) => Array.from({ length: exercise.sets }, () => false))
}

function formatDuration(seconds) {
  const totalSeconds = Math.max(0, Math.floor(Number(seconds) || 0))

  if (totalSeconds < 60) {
    return String(totalSeconds)
  }

  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = String(totalSeconds % 60).padStart(2, '0')

  return `${minutes}:${remainingSeconds}`
}

export default function Workout() {
  const { id } = useParams()
  const workout = getWorkout(id)
  const playAlarm = useSound('/alarm.mp3')
  const { seconds, start, stop } = useTimer(25, playAlarm)
  const [workoutState, setWorkoutState] = useState(() => ({
    workoutId: workout?.id ?? '',
    checkedSets: createCheckboxState(workout),
  }))
  const previousWorkoutIdRef = useRef(workout?.id)

  useEffect(() => {
    if (!workout) {
      return
    }

    if (previousWorkoutIdRef.current === workout.id) {
      return
    }

    previousWorkoutIdRef.current = workout.id
    stop()
  }, [stop, workout])

  if (!workout) {
    return <Navigate to="/" replace />
  }

  const checkedSets =
    workoutState.workoutId === workout.id
      ? workoutState.checkedSets
      : createCheckboxState(workout)

  function handleCheck(exerciseIndex, setIndex) {
    setWorkoutState((currentState) => {
      const baseCheckedSets =
        currentState.workoutId === workout.id
          ? currentState.checkedSets
          : createCheckboxState(workout)

      return {
        workoutId: workout.id,
        checkedSets: baseCheckedSets.map((exerciseSets, currentExerciseIndex) => {
          if (currentExerciseIndex !== exerciseIndex) {
            return exerciseSets
          }

          return exerciseSets.map((isChecked, currentSetIndex) =>
            currentSetIndex === setIndex ? true : isChecked,
          )
        }),
      }
    })

    start(25)
  }

  function handleReset() {
    stop()
    setWorkoutState({
      workoutId: workout.id,
      checkedSets: createCheckboxState(workout),
    })
  }

  return (
    <>
      <NavBar title={workout.label} />
      <main className={styles.page}>
        <div className={styles.content}>
          <section className={styles.timerSection} aria-label="Workout timer">
            <TimerDisplay seconds={seconds} />
            <div className={styles.presets}>
              {workout.restPresets.map((duration) => (
                <button
                  key={duration}
                  type="button"
                  className={styles.presetButton}
                  onClick={() => start(duration)}
                >
                  {formatDuration(duration)}
                </button>
              ))}
            </div>
          </section>
          <section className={styles.exerciseList} aria-label="Exercises">
            {workout.exercises.map((exercise, exerciseIndex) => (
              <ExerciseBlock
                key={`${exercise.name}-${exerciseIndex}`}
                name={exercise.name}
                sets={exercise.sets}
                checked={checkedSets[exerciseIndex] ?? []}
                onCheck={(setIndex) => handleCheck(exerciseIndex, setIndex)}
              />
            ))}
          </section>
        </div>
        <button
          type="button"
          className={styles.resetButton}
          aria-label="Reset workout"
          onClick={handleReset}
        >
          ⏎
        </button>
      </main>
    </>
  )
}
