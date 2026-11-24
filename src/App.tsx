import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { ProgressProvider, useProgress } from './state/progress'
import { Home, SubjectPage, LessonPage, QuizPage, PracticePage, GlossaryPage, ProgressPage } from './pages/pages'

function Top() {
  const { p } = useProgress()
  return (
    <div className="top">
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 800, fontSize: '1.2em' }}>🧮 ගණිත ගමන</Link>
      <nav>
        <Link to="/practice">🎯 අභ්‍යාස</Link>
        <Link to="/glossary">📖 වචන මාලාව</Link>
        <Link to="/progress">📊 ප්‍රගතිය</Link>
      </nav>
      <div className="row" style={{ minWidth: 160 }}>
        <span>⭐ {p.xp}</span>
        <span>🔥 {p.streak}</span>
        <div className="xp"><div style={{ width: `${Math.min(100, p.xp % 100)}%` }} /></div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Top />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subject/:sid" element={<SubjectPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </HashRouter>
    </ProgressProvider>
  )
}
