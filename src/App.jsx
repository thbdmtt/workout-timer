import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Stretch from './pages/Stretch.jsx'
import Workout from './pages/Workout.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/workout/:id" element={<Workout />} />
      <Route path="/stretch" element={<Stretch />} />
    </Routes>
  )
}

export default App
