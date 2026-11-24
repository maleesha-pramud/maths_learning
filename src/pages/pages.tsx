import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { topics, topicById, isUnlocked, buildQuiz, topicNames, sectionTitle } from '../content/topics'
import { LessonPlayer } from '../components/Lesson/LessonPlayer'
import { QuizEngine, type Tagged } from '../components/Quiz/QuizEngine'
import { useProgress, PASS } from '../state/progress'
import { randomPractice, type PracticeMode } from '../content/generators'
import { isCorrect } from '../content/quizLogic'
import { Tex } from '../components/Lesson/Formula'
import { terms } from '../i18n/terms'

const Owl = ({ children }: { children: React.ReactNode }) => (
  <div className="row" style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
    <div style={{ fontSize: '3em' }}>🦉</div>
    <div className="say" style={{ flex: 1 }}>{children}</div>
  </div>
)

export function Home() {
  const { p } = useProgress()
  const special = ['sec-diff', 'sec-int', 'final']
  return (
    <div className="wrap">
      <Owl>ආයුබෝවන්! මම <b>ගුරු බකමූණා</b> 🦉. අපි ගණිතය විනෝදයෙන් ඉගෙන ගමු! පාඩම් එකින් එක විවෘත වෙනවා — ප්‍රශ්නාවලියෙන් {PASS}% ක් ගත්තාම ඊළඟ පාඩම ලැබේ.</Owl>
      <h2>🗺️ අවකලනය (Differential Calculus)</h2>
      <div className="map">{topics.filter((t) => t.section === 'diff').map((t) => <Island key={t.id} id={t.id} to={`/lesson/${t.id}`} icon={t.icon} title={t.si} sub={t.en} n={t.n} />)}</div>
      <p><Island id="sec-diff" to="/quiz/sec-diff" icon="🏅" title={sectionTitle['sec-diff']} sub="15 ප්‍රශ්න" /></p>
      <h2>🗺️ අනුකලනය (Integral Calculus)</h2>
      <div className="map">{topics.filter((t) => t.section === 'int').map((t) => <Island key={t.id} id={t.id} to={`/lesson/${t.id}`} icon={t.icon} title={t.si} sub={t.en} n={t.n} />)}</div>
      <p><Island id="sec-int" to="/quiz/sec-int" icon="🏅" title={sectionTitle['sec-int']} sub="15 ප්‍රශ්න" /></p>
      <h2>🏆 මහා විභාගය</h2>
      <Island id="final" to="/quiz/final" icon="🏆" title={sectionTitle.final} sub="30 ප්‍රශ්න · සියලු පාඩම්" />
      <p className="en">{special.filter((s) => isUnlocked(p, s)).length} / 3 විශේෂ පරීක්ෂණ විවෘතයි</p>
    </div>
  )
}

function Island({ id, to, icon, title, sub, n }: { id: string; to: string; icon: string; title: string; sub?: string; n?: number }) {
  const { p } = useProgress()
  const open = isUnlocked(p, id)
  const stars = p.stars[id] ?? 0
  return (
    <Link to={to} className={`island ${open ? '' : 'locked'}`}>
      <div style={{ fontSize: '2.2em' }}>{open ? icon : '🔒'}</div>
      <b>{n ? `${n}. ` : ''}{title}</b>
      <div className="en">{sub}</div>
      <div className="stars">{'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}</div>
    </Link>
  )
}

export function LessonPage() {
  const { id = '' } = useParams()
  const { p } = useProgress()
  const t = topicById(id)
  if (!t) return <div className="wrap">පාඩම හමු නොවීය. <Link to="/">මුල් පිටුව</Link></div>
  if (!isUnlocked(p, id)) return <div className="wrap card">🔒 මෙම පාඩම තවම විවෘත නැත. කලින් පාඩමේ ප්‍රශ්නාවලිය සමත් වන්න. <Link to="/">← ආපසු</Link></div>
  return (
    <div className="wrap">
      <h1>{t.icon} {t.n}. {t.si} <span className="en">{t.en}</span></h1>
      <LessonPlayer topic={t} />
    </div>
  )
}

export function QuizPage() {
  const { id = '' } = useParams()
  const { p, record } = useProgress()
  const nav = useNavigate()
  const [round, setRound] = useState(0)
  const qs = useMemo(() => buildQuiz(id) as Tagged[], [id, round])
  const title = topicById(id) ? `${topicById(id)!.si} — ප්‍රශ්නාවලිය` : sectionTitle[id]
  if (!qs.length) return <div className="wrap">සොයා ගත නොහැක. <Link to="/">මුල් පිටුව</Link></div>
  if (!isUnlocked(p, id)) return <div className="wrap card">🔒 මෙය තවම විවෘත නැත. <Link to="/">← ආපසු</Link></div>
  return (
    <div className="wrap">
      <h1>📝 {title}</h1>
      <QuizEngine key={round} questions={qs} topicNames={topicNames} onFinish={(pct) => record(id, pct)} />
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn alt" onClick={() => setRound(round + 1)}>🔁 නැවත උත්සාහ කරන්න</button>
        <button className="btn alt" onClick={() => nav('/')}>🏠 මුල් පිටුව</button>
      </div>
    </div>
  )
}

export function PracticePage() {
  const { addXp } = useProgress()
  const [mode, setMode] = useState<PracticeMode>('int')
  const [q, setQ] = useState(() => randomPractice(Math.random, 'int'))
  const [v, setV] = useState<string | number>('')
  const [res, setRes] = useState<null | boolean>(null)
  const [score, setScore] = useState({ right: 0, total: 0 })
  const check = () => {
    const ok = isCorrect(q, v)
    setRes(ok)
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }))
    if (ok) addXp(5)
  }
  const next = (m: PracticeMode = mode) => { setQ(randomPractice(Math.random, m)); setV(''); setRes(null) }
  const pick = (m: PracticeMode) => { setMode(m); next(m) }
  const modes: [PracticeMode, string][] = [['int', '🧺 අනුකලනය'], ['diff', '🔍 අවකලනය'], ['all', '🎲 සියල්ල']]
  return (
    <div className="wrap">
      <h1>🎯 අභ්‍යාස (අනන්ත ප්‍රශ්න)</h1>
      <div className="row">{modes.map(([m, label]) => <button key={m} className={`chip ${mode === m ? 'good' : ''}`} onClick={() => pick(m)}>{label}</button>)}</div>
      <p className="en">ලකුණු: {score.right} / {score.total} ✅</p>
      <div className="card">
        <h3>{q.q}</h3>
        {q.options ? (
          q.options.map((o, k) => {
            let cls = 'opt'
            if (res !== null) cls += k === q.answer ? ' good' : k === v ? ' wrong' : ''
            else if (v === k) cls += ' sel'
            return <button key={k} className={cls} disabled={res !== null} onClick={() => setV(k)}>{String.fromCharCode(65 + k)}. {o}</button>
          })
        ) : (
          <input type="text" inputMode="decimal" value={String(v)} disabled={res !== null} onChange={(e) => setV(e.target.value)} placeholder="පිළිතුර (අංකයක්)" />
        )}
        {res !== null && (
          <div className={res ? 'remember' : 'mistake'} style={{ marginTop: 10 }}>
            <b>{res ? '✅ නිවැරදියි! +5 XP' : `❌ නිවැරදි පිළිතුර: ${q.options ? q.options[q.answer as number] : q.answer}`}</b>
            <div>{q.why}</div>
          </div>
        )}
      </div>
      {res === null ? <button className="btn" disabled={v === ''} onClick={check}>පරීක්ෂා කරන්න</button> : <button className="btn" onClick={() => next()}>ඊළඟ →</button>}
    </div>
  )
}

export function GlossaryPage() {
  return (
    <div className="wrap">
      <h1>📖 වචන මාලාව (Glossary)</h1>
      <div className="card"><table className="t"><thead><tr><th>සිංහල</th><th>English</th><th>සංකේතය</th></tr></thead><tbody>
        {terms.map((t) => <tr key={t.en}><td>{t.si}</td><td>{t.en}</td><td>{t.tex ? <Tex t={t.tex} /> : ''}</td></tr>)}
      </tbody></table></div>
    </div>
  )
}

export function ProgressPage() {
  const { p, reset } = useProgress()
  return (
    <div className="wrap">
      <h1>📊 මගේ ප්‍රගතිය</h1>
      <div className="card">
        <p>⭐ XP: <b>{p.xp}</b> &nbsp; 🔥 දින රටාව: <b>{p.streak}</b></p>
        <table className="t"><thead><tr><th>පාඩම</th><th>හොඳම ලකුණු</th><th>තරු</th></tr></thead><tbody>
          {[...topics.map((t) => ({ id: t.id, name: `${t.n}. ${t.si}` })), ...Object.keys(sectionTitle).map((id) => ({ id, name: sectionTitle[id] }))].map((r) => (
            <tr key={r.id}><td>{r.name}</td><td>{p.best[r.id] !== undefined ? `${p.best[r.id]}%` : '—'}</td><td>{'⭐'.repeat(p.stars[r.id] ?? 0) || '—'}</td></tr>
          ))}
        </tbody></table>
        <p><button className="btn alt" onClick={() => { if (confirm('සියලු ප්‍රගතිය මකන්නද?')) reset() }}>🗑️ ප්‍රගතිය මකන්න</button></p>
      </div>
    </div>
  )
}
