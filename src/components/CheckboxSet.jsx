import styles from '../styles/CheckboxSet.module.css'

export default function CheckboxSet({ count, checked, onChange }) {
  return (
    <div className={styles.row}>
      {Array.from({ length: count }, (_, index) => {
        const isChecked = checked[index] === true

        return (
          <button
            key={index}
            type="button"
            role="checkbox"
            aria-checked={isChecked}
            aria-label={`Set ${index + 1}`}
            className={styles.button}
            onClick={() => onChange(index)}
          >
            <span
              aria-hidden="true"
              className={`${styles.indicator} ${isChecked ? styles.checked : ''}`}
            />
          </button>
        )
      })}
    </div>
  )
}
