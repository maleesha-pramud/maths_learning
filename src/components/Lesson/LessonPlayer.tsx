import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Topic } from '../../content/types'

export function LessonPlayer({ topic }: { topic: Topic }) {
  const [i, setI] = useState(0)
  const total = topic.steps.length + 1 // + summary card
  const last = i === total - 1
  const step = topic.steps[i]
  return (
    <div>
      <div className="progress"><div style={{ width: `${((i + 1) / total) * 100}%` }} /></div>
      <div className="en">පියවර {i + 1} / {total}</div>
      <div className="card">
        {step ? (
          <>
            <h2 style={{ marginTop: 0 }}>{step.title}</h2>
            {step.body}
          </>
        ) : (
          <>
            <h2 style={{ marginTop: 0 }}>🧠 මතක තබා ගන්න (Remember)</h2>
            <div className="remember"><ul>{topic.remember.map((r) => <li key={r}>{r}</li>)}</ul></div>
            <h3>⚠️ සාමාන්‍ය වැරදි (Common mistakes)</h3>
            <div className="mistake"><ul>{topic.mistakes.map((r) => <li key={r}>{r}</li>)}</ul></div>
            <p>
              <Link className="btn" to={`/quiz/${topic.id}`}>📝 ප්‍රශ්නාවලියට යන්න (Quiz)</Link>
            </p>
          </>
        )}
      </div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <button className="btn alt" disabled={i === 0} onClick={() => setI(i - 1)}>← ආපසු</button>
        <button className="btn" disabled={last} onClick={() => setI(i + 1)}>ඊළඟ →</button>
      </div>
    </div>
  )
}
