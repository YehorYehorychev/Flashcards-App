import { Navigate, Route, Routes } from 'react-router-dom'
import { CategorySelectionPage } from './pages/CategorySelectionPage'
import { HomePage } from './pages/HomePage'
import { StatsPage } from './pages/StatsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/study" element={<CategorySelectionPage />} />
      <Route path="/quiz" element={<CategorySelectionPage />} />

      <Route path="/stats" element={<StatsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
