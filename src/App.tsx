import { Navigate, Route, Routes } from 'react-router-dom'
import { CategorySelectionPage } from './pages/CategorySelectionPage'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { QuizSelectionPage } from './pages/QuizSelectionPage'
import { RedoStudyPage } from './pages/RedoStudyPage'
import { StatsPage } from './pages/StatsPage'
import { StudyPage } from './pages/StudyPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/study" element={<CategorySelectionPage />} />
      <Route path="/study/redo" element={<RedoStudyPage />} />
      <Route path="/study/:categoryId" element={<StudyPage />} />

      <Route path="/quiz" element={<QuizSelectionPage />} />
      <Route path="/quiz/:categoryId" element={<QuizPage />} />

      <Route path="/stats" element={<StatsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
