import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../styles/NavBar.module.css'

export default function NavBar({ title }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className={styles.bar}>
      {!isHomePage && (
        <button
          type="button"
          className={styles.backButton}
          aria-label="Go back"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
    </header>
  )
}
