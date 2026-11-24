import { useState, type ReactNode } from 'react'
import { Tex } from './Formula'

/** One-sentence big idea banner */
export const BigIdea = ({ children }: { children: ReactNode }) => (
  <div className="bigidea">💡 <b>එක වාක්‍යයෙන්:</b> {children}</div>
)

/** The owl teacher says something */
export const Owl = ({ children }: { children: ReactNode }) => (
  <div className="owl">
    <div className="owl-face">🦉</div>
    <div className="owl-bubble">{children}</div>
  </div>
)

/** Simple word ↔ maths word */
export const WordBox = ({ simple, maths, en }: { simple: string; maths: string; en: string }) => (
  <div className="wordbox">
    <div><span className="en">සරලව කිව්වොත්</span><br /><b>{simple}</b></div>
    <div style={{ fontSize: '1.6em' }}>=</div>
    <div><span className="en">ගණිතයේ නම</span><br /><b>{maths}</b><br /><span className="en">{en}</span></div>
  </div>
)

/** Big picture made of emoji / short caption */
export const Pic = ({ e, caption }: { e: string; caption?: string }) => (
  <div className="pic">
    <div className="pic-e">{e}</div>
    {caption && <div>{caption}</div>}
  </div>
)

/** Numbered recipe with emoji */
export const Recipe = ({ steps }: { steps: ReactNode[] }) => (
  <div className="recipe">
    {steps.map((s, i) => (
      <div key={i} className="recipe-step">
        <span className="recipe-n">{i + 1}</span>
        <span>{s}</span>
      </div>
    ))}
  </div>
)

/** Collapsible "grown-up / exam" way of writing it */
export const Grownup = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="grownup">
      <button className="btn alt" onClick={() => setOpen(!open)}>
        🎓 {open ? 'වසන්න' : 'විභාගයට ලියන ලොකු ක්‍රමය බලන්න'}
      </button>
      {open && <div style={{ marginTop: 10 }}>{children}</div>}
    </div>
  )
}

/** Step-by-step worked example: reveals one line at a time */
export function Worked({ title, start, steps }: { title?: string; start: string; steps: { tex?: string; say: ReactNode }[] }) {
  const [k, setK] = useState(0)
  const done = k >= steps.length
  return (
    <div className="worked">
      <div className="worked-head">✏️ {title ?? 'පියවරෙන් පියවර උදාහරණය'}</div>
      <div style={{ textAlign: 'center', fontSize: '1.25em' }}><Tex t={start} block /></div>
      {steps.slice(0, k).map((s, i) => (
        <div key={i} className="worked-step">
          <span className="recipe-n">{i + 1}</span>
          <div style={{ flex: 1 }}>
            <div>{s.say}</div>
            {s.tex && <div style={{ fontSize: '1.15em' }}><Tex t={s.tex} block /></div>}
          </div>
        </div>
      ))}
      <div className="row" style={{ marginTop: 8 }}>
        {!done && <button className="btn" onClick={() => setK(k + 1)}>👉 ඊළඟ පියවර ({k + 1}/{steps.length})</button>}
        {done && <span style={{ fontWeight: 800 }}>🎉 ඉවරයි!</span>}
        {k > 0 && <button className="btn alt" onClick={() => setK(0)}>🔁 මුල සිට</button>}
        {!done && k > 0 && <button className="btn alt" onClick={() => setK(steps.length)}>⏭ ඔක්කොම පෙන්වන්න</button>}
      </div>
    </div>
  )
}

/** Inline quick check inside a lesson */
export function TryIt({ q, tex, options, answer, why }: { q: string; tex?: string; options: string[]; answer: number; why: string }) {
  const [sel, setSel] = useState<number | null>(null)
  return (
    <div className="tryit">
      <b>🙋 ඔබම උත්සාහ කරන්න:</b> {q}
      {tex && <div style={{ textAlign: 'center', fontSize: '1.2em' }}><Tex t={tex} block /></div>}
      <div className="row" style={{ marginTop: 8 }}>
        {options.map((o, k) => {
          let cls = 'chip'
          if (sel !== null) cls += k === answer ? ' good' : k === sel ? ' wrong' : ''
          return (
            <button key={k} className={cls} disabled={sel !== null} onClick={() => setSel(k)}>{o}</button>
          )
        })}
      </div>
      {sel !== null && (
        <div style={{ marginTop: 8 }}>
          {sel === answer ? '🎉 නියමයි! ' : '🤔 හරි ළඟයි! '}
          {why}
          {sel !== answer && <> <button className="chip" onClick={() => setSel(null)}>🔁 ආයෙත්</button></>}
        </div>
      )}
    </div>
  )
}
