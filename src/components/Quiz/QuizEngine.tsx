import { useMemo, useState } from 'react'
import type { Question } from '../../content/types'
import { Tex } from '../Lesson/Formula'
import { PASS, starsFor } from '../../state/progress'
import { isCorrect, scorePct } from '../../content/quizLogic'

export interface Tagged extends Question { topic?: string }


interface Props {
  questions: Tagged[]
  onFinish: (pct: number, wrongTopics: string[]) => void
  topicNames?: Record<string, string>
}

export function QuizEngine({ questions, onFinish, topicNames }: Props) {
  const [i, setI] = useState(0)
  const [sel, setSel] = useState<number | string | null>(null)
  const [checked, setChecked] = useState(false)
  const [right, setRight] = useState(0)
  const [wrong, setWrong] = useState<string[]>([])
  const [done, setDone] = useState<number | null>(null)
  const q = questions[i]
  const ok = checked && sel !== null && isCorrect(q, sel)

  const check = () => {
    if (sel === null || sel === '') return
    setChecked(true)
    if (isCorrect(q, sel)) setRight((r) => r + 1)
    else if (q.topic) setWrong((w) => [...w, q.topic as string])
  }
  const next = () => {
    if (i + 1 >= questions.length) {
      const pct = scorePct(right, questions.length)
      setDone(pct)
      onFinish(pct, wrong)
      return
    }
    setI(i + 1); setSel(null); setChecked(false)
  }

  const weak = useMemo(() => Array.from(new Set(wrong)), [wrong])

  if (done !== null) {
    const stars = starsFor(done)
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>{done >= PASS ? '🎉 සුබ පැතුම්!' : '💪 නැවත උත්සාහ කරමු!'}</h2>
        <div className="stars">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
        <p style={{ fontSize: '2em', margin: 0 }}><b>{done}%</b></p>
        <p>{right} / {questions.length} නිවැරදියි</p>
        {done >= PASS ? <p>ඊළඟ පාඩම විවෘත විය! 🔓</p> : <p>සමත් වීමට {PASS}% ක් අවශ්‍යයි. පාඩම නැවත බලා ආයෙත් උත්සාහ කරන්න.</p>}
        {weak.length > 0 && topicNames && (
          <div className="mistake" style={{ textAlign: 'left' }}>
            නැවත ඉගෙන ගන්න: {weak.map((t) => topicNames[t] ?? t).join(', ')}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="progress"><div style={{ width: `${(i / questions.length) * 100}%` }} /></div>
      <div className="en">ප්‍රශ්නය {i + 1} / {questions.length}</div>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>{q.q}</h3>
        {q.tex && <div style={{ textAlign: 'center', fontSize: '1.3em' }}><Tex t={q.tex} block /></div>}
        {q.options ? (
          q.options.map((o, k) => {
            let cls = 'opt'
            if (checked) cls += k === q.answer ? ' good' : k === sel ? ' wrong' : ''
            else if (sel === k) cls += ' sel'
            return (
              <button key={k} className={cls} disabled={checked} onClick={() => setSel(k)}>
                {String.fromCharCode(65 + k)}. {o}
              </button>
            )
          })
        ) : (
          <input type="text" inputMode="decimal" placeholder="ඔබේ පිළිතුර (අංකයක්)" disabled={checked} value={sel === null ? '' : String(sel)} onChange={(e) => setSel(e.target.value)} />
        )}
        {checked && (
          <div className={ok ? 'remember' : 'mistake'} style={{ marginTop: 12 }}>
            <b>{ok ? '✅ නිවැරදියි!' : `❌ වැරදියි. නිවැරදි පිළිතුර: ${q.options ? q.options[q.answer as number] : q.answer}`}</b>
            <div>{q.why}</div>
          </div>
        )}
      </div>
      {!checked ? (
        <button className="btn" disabled={sel === null || sel === ''} onClick={check}>පරීක්ෂා කරන්න</button>
      ) : (
        <button className="btn" onClick={next}>{i + 1 >= questions.length ? 'ප්‍රතිඵලය බලන්න 🏁' : 'ඊළඟ ප්‍රශ්නය →'}</button>
      )}
    </div>
  )
}
