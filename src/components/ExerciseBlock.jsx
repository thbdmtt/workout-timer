import { useId } from 'react'
import CheckboxSet from './CheckboxSet.jsx'
import styles from '../styles/ExerciseBlock.module.css'

export default function ExerciseBlock({ name, sets, checked, onCheck }) {
  const groupLabelId = useId()

  return (
    <section className={styles.block} aria-labelledby={groupLabelId}>
      <p id={groupLabelId} className={styles.name}>
        {name}
      </p>
      <div role="group" aria-labelledby={groupLabelId}>
        <CheckboxSet count={sets} checked={checked} onChange={onCheck} />
      </div>
    </section>
  )
}
