import { useEffect, useRef, useState } from 'react'
import { Slider } from './Plot'
import { Tex } from '../Lesson/Formula'

const DIE = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
const pct = (x: number) => `${(x * 100).toFixed(1)}%`
const f2 = (x: number) => (Math.round(x * 100) / 100).toString()

/* ── 1. Roll a coin or a die (a random experiment) ── */
export function DiceCoinRoller({ kind }: { kind: 'coin' | 'die' }) {
  const [hist, setHist] = useState<number[]>([])
  const [spin, setSpin] = useState(false)
  const roll = () => {
    setSpin(true)
    setTimeout(() => {
      setHist((h) => [...h, Math.floor(Math.random() * (kind === 'coin' ? 2 : 6))].slice(-12))
      setSpin(false)
    }, 450)
  }
  const last = hist[hist.length - 1]
  const show = (v: number) => (kind === 'coin' ? (v === 0 ? 'H' : 'T') : String(v + 1))
  return (
    <div className="viz card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '5em', lineHeight: 1.1, transition: 'transform .45s', transform: spin ? 'rotate(360deg) scale(.7)' : 'none' }}>
        {last === undefined ? '❔' : kind === 'coin' ? (last === 0 ? '🪙' : '🪙') : DIE[last]}
      </div>
      <div style={{ fontSize: '1.4em', fontWeight: 800 }}>{last === undefined ? 'තවම හරවලා නෑ' : `ප්‍රතිඵලය: ${show(last)}`}</div>
      <button className="btn" onClick={roll}>{kind === 'coin' ? '🪙 කාසිය උඩ දමන්න' : '🎲 දාදු කැටය දමන්න'}</button>
      {hist.length > 0 && <div className="say" style={{ marginTop: 10 }}>අන්තිම ප්‍රතිඵල: <b>{hist.map(show).join(' , ')}</b><br />පෙර ප්‍රතිඵලයෙන් ඊළඟ එක කියන්න බෑ — ඒකයි <b>සසම්භාවී</b> කියන්නේ! 🤷</div>}
    </div>
  )
}

/* ── 2. Sample space grid: click an event to highlight ── */
type Ev = { label: string; test: (a: number, b: number) => boolean }
const DICE_EVENTS: Ev[] = [
  { label: 'එකතුව 7', test: (a, b) => a + b === 7 },
  { label: 'දෙකම සමාන (doubles)', test: (a, b) => a === b },
  { label: 'එකතුව ≥ 10', test: (a, b) => a + b >= 10 },
  { label: 'පළමු එක 6', test: (a) => a === 6 },
]
const COIN_EVENTS: Ev[] = [
  { label: 'හරියටම එක Head', test: (a, b) => a + b === 1 },
  { label: 'දෙකම Head', test: (a, b) => a === 0 && b === 0 },
  { label: 'අඩුම තරමින් එක Head', test: (a, b) => a === 0 || b === 0 },
]
export function SampleSpaceGrid({ mode }: { mode: 'dice' | 'coins' }) {
  const n = mode === 'dice' ? 6 : 2
  const evs = mode === 'dice' ? DICE_EVENTS : COIN_EVENTS
  const [ei, setEi] = useState(0)
  const ev = evs[ei]
  let hit = 0
  const cells = []
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      const on = ev.test(mode === 'dice' ? a + 1 : a, mode === 'dice' ? b + 1 : b)
      if (on) hit++
      cells.push(
        <div key={`${a}-${b}`} style={{ background: on ? '#fde68a' : '#e2e8f0', color: '#0f172a', border: on ? '2px solid #d97706' : '2px solid transparent', borderRadius: 8, padding: mode === 'dice' ? 2 : 10, textAlign: 'center', fontWeight: 700, fontSize: mode === 'dice' ? '.85em' : '1.2em' }}>
          {mode === 'dice' ? `${a + 1},${b + 1}` : `${a === 0 ? 'H' : 'T'}${b === 0 ? 'H' : 'T'}`}
        </div>,
      )
    }
  }
  const total = n * n
  return (
    <div className="viz">
      <div className="row">{evs.map((e, i) => <button key={e.label} className={`chip ${i === ei ? 'good' : ''}`} onClick={() => setEi(i)}>{e.label}</button>)}</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, gap: 4, maxWidth: mode === 'dice' ? 420 : 220, margin: '10px auto' }}>{cells}</div>
      <div className="say" style={{ fontSize: '1.1em' }}>
        සම්පූර්ණ ප්‍රතිඵල |S| = <b>{total}</b> &nbsp;|&nbsp; තැඹිලි (ඒ සිදුවීමට අදාළ) |A| = <b>{hit}</b> <br />
        P(A) = {hit}/{total} = <b>{f2(hit / total)}</b>
      </div>
    </div>
  )
}

/* ── 3. Roll the die many times: relative frequency settles at 1/6 ── */
export function FrequencySim() {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0])
  const total = counts.reduce((a, b) => a + b, 0)
  const add = (n: number) => setCounts((c) => {
    const nc = [...c]
    for (let i = 0; i < n; i++) nc[Math.floor(Math.random() * 6)]++
    return nc
  })
  const max = Math.max(1, ...counts.map((c) => c / Math.max(total, 1)), 1 / 6)
  return (
    <div className="viz">
      <svg className="plot" viewBox="0 0 560 230">
        {counts.map((c, i) => {
          const fr = total ? c / total : 0
          const h = (fr / max) * 150
          return (
            <g key={i}>
              <rect x={30 + i * 85} y={190 - h} width={60} height={h} rx={6} fill="#3b82f6" />
              <text x={60 + i * 85} y={206} textAnchor="middle" fontSize={22}>{DIE[i]}</text>
              <text x={60 + i * 85} y={186 - h} textAnchor="middle" fontSize={13} fill="currentColor">{total ? pct(fr) : ''}</text>
            </g>
          )
        })}
        <line x1={20} x2={540} y1={190 - ((1 / 6) / max) * 150} y2={190 - ((1 / 6) / max) * 150} stroke="#dc2626" strokeWidth={2} strokeDasharray="6 4" />
        <text x={540} y={184 - ((1 / 6) / max) * 150} textAnchor="end" fontSize={12} fill="#dc2626">1/6 ≈ 16.7%</text>
      </svg>
      <div className="row">
        <button className="btn" onClick={() => add(1)}>🎲 ×1</button>
        <button className="btn" onClick={() => add(10)}>🎲 ×10</button>
        <button className="btn" onClick={() => add(100)}>🎲 ×100</button>
        <button className="btn" onClick={() => add(1000)}>🎲 ×1000</button>
        <button className="btn alt" onClick={() => setCounts([0, 0, 0, 0, 0, 0])}>🔁 මුල සිට</button>
      </div>
      <div className="say">දාදු කැටය දැම්ම වාර ගණන: <b>{total}</b>. වැඩිවෙන තරමට සියලු තීරු රතු ඉරට (1/6) ළං වෙනවා — අපි කියන “සම්භාවිතාව” ඒකයි! 🎯</div>
    </div>
  )
}

/* ── 4. Venn diagram: addition rule ── */
export function VennAddition() {
  const [pa, setPa] = useState(0.5)
  const [pb, setPb] = useState(0.4)
  const [pab, setPab] = useState(0.2)
  const inter = Math.min(pab, pa, pb)
  const union = pa + pb - inter
  const r = (p: number) => 38 + p * 70
  const ra = r(pa), rb = r(pb)
  const overlap = inter / Math.max(Math.min(pa, pb), 0.01) // 0..1
  const d = (ra + rb) * (1 - 0.65 * overlap)
  const cx1 = 280 - d / 2, cx2 = 280 + d / 2
  return (
    <div className="viz">
      <svg className="plot" viewBox="0 0 560 240">
        <rect x={6} y={6} width={548} height={228} rx={14} fill="none" stroke="currentColor" strokeWidth={2} />
        <text x={18} y={26} fontSize={14} fill="currentColor">S (P = 1)</text>
        <circle cx={cx1} cy={125} r={ra} fill="#3b82f6" fillOpacity={0.45} />
        <circle cx={cx2} cy={125} r={rb} fill="#f59e0b" fillOpacity={0.45} />
        <text x={cx1 - ra / 2} y={130} fontSize={20} fontWeight={800} fill="currentColor" textAnchor="middle">A</text>
        <text x={cx2 + rb / 2} y={130} fontSize={20} fontWeight={800} fill="currentColor" textAnchor="middle">B</text>
      </svg>
      <Slider label="P(A)" v={pa} set={setPa} min={0.1} max={0.9} step={0.05} />
      <Slider label="P(B)" v={pb} set={setPb} min={0.1} max={0.9} step={0.05} />
      <Slider label="P(A ∩ B) (දෙකම එකවර)" v={inter} set={setPab} min={0} max={Math.min(pa, pb)} step={0.05} />
      <div className="say" style={{ fontSize: '1.1em' }}>
        P(A) + P(B) = {f2(pa)} + {f2(pb)} = <b>{f2(pa + pb)}</b> &nbsp;(මැද කොටස් <b>දෙපාරක්</b> ගණන් වුණා! 😮)<br />
        එක පාරක් අඩු කරන්න: − {f2(inter)} ⟹ P(A ∪ B) = <b>{f2(union)}</b> ✅
        {inter === 0 && <><br />🟢 මැද කොටස 0 = <b>එකිනෙකට බැහැර (mutually exclusive)</b> සිදුවීම්.</>}
      </div>
    </div>
  )
}

/* ── 5. "Given B" shrinks the world: marbles ── */
type Marble = { red: boolean; big: boolean }
const BAG: Marble[] = [
  ...Array(6).fill({ red: true, big: true }),
  ...Array(2).fill({ red: true, big: false }),
  ...Array(4).fill({ red: false, big: true }),
  ...Array(8).fill({ red: false, big: false }),
]
export function GivenShrink() {
  const [given, setGiven] = useState<'none' | 'red' | 'big'>('none')
  const inWorld = (m: Marble) => given === 'none' || (given === 'red' ? m.red : m.big)
  const world = BAG.filter(inWorld)
  const target = (m: Marble) => (given === 'big' ? m.red : m.big) // A: "big" when given red; A: "red" when given big
  const hit = world.filter(target).length
  return (
    <div className="viz">
      <div className="row">
        <button className={`chip ${given === 'none' ? 'good' : ''}`} onClick={() => setGiven('none')}>🎒 මුළු බෑගය</button>
        <button className={`chip ${given === 'red' ? 'good' : ''}`} onClick={() => setGiven('red')}>දුන්නා: රතු බව (given 🔴)</button>
        <button className={`chip ${given === 'big' ? 'good' : ''}`} onClick={() => setGiven('big')}>දුන්නා: ලොකු බව (given ⬤)</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '12px 0', background: '#f1f5f9', padding: 12, borderRadius: 14 }}>
        {BAG.map((m, i) => {
          const on = inWorld(m)
          const isTarget = given !== 'none' && on && target(m)
          return (
            <div key={i} style={{ width: m.big ? 38 : 24, height: m.big ? 38 : 24, borderRadius: '50%', background: m.red ? '#ef4444' : '#3b82f6', opacity: on ? 1 : 0.12, outline: isTarget ? '4px solid #facc15' : 'none', transition: 'all .3s', alignSelf: 'center' }} />
          )
        })}
      </div>
      <div className="say" style={{ fontSize: '1.1em' }}>
        {given === 'none' && <>බෑගයේ ගොනු 20යි: 🔴 රතු 8 (ලොකු 6, පොඩි 2) සහ 🔵 නිල් 12. බොත්තමක් ඔබලා “<b>දුන්නා</b>” (given) බලන්න 👆</>}
        {given === 'red' && <>රතු බව දැනගත්තාම ලෝකය <b>රතු 8ක්</b> වෙලා හැකිලෙනවා. ඒ අතරින් ලොකු 6ක් (කහ වළල්ල). <br />P(ලොකු | රතු) = 6/8 = <b>0.75</b></>}
        {given === 'big' && <>ලොකු බව දැනගත්තාම ලෝකය <b>ලොකු 10ක්</b> වෙලා හැකිලෙනවා. ඒ අතරින් රතු 6ක්. <br />P(රතු | ලොකු) = 6/10 = <b>0.6</b></>}
      </div>
    </div>
  )
}

/* ── 6. Probability tree: total probability + Bayes ── */
export function ProbTree({ labels }: { labels?: { a: string; na: string; b: string } }) {
  const L = labels ?? { a: 'A (පළමු පෙට්ටිය)', na: 'A′ (දෙවන පෙට්ටිය)', b: 'B (රතු ගුලියක්)' }
  const [pa, setPa] = useState(0.4)
  const [pba, setPba] = useState(0.7)
  const [pbn, setPbn] = useState(0.2)
  const pna = 1 - pa
  const b1 = pba * pa, b2 = pbn * pna
  const pb = b1 + b2
  const bayes = pb > 0 ? b1 / pb : 0
  const T = (x: number, y: number, s: string, col = 'currentColor', w = 400) => <text x={x} y={y} fontSize={14} fill={col} fontWeight={w}>{s}</text>
  return (
    <div className="viz">
      <svg className="plot" viewBox="0 0 560 250">
        <circle cx={30} cy={125} r={7} fill="currentColor" />
        <line x1={30} y1={125} x2={190} y2={60} stroke="#3b82f6" strokeWidth={3} />
        <line x1={30} y1={125} x2={190} y2={190} stroke="#f59e0b" strokeWidth={3} />
        {T(60, 80, `P(A) = ${f2(pa)}`, '#3b82f6', 700)}
        {T(60, 185, `P(A′) = ${f2(pna)}`, '#d97706', 700)}
        {T(150, 52, L.a, '#3b82f6', 700)}
        {T(150, 212, L.na, '#d97706', 700)}
        <line x1={195} y1={60} x2={370} y2={35} stroke="#16a34a" strokeWidth={2} />
        <line x1={195} y1={60} x2={370} y2={85} stroke="#94a3b8" strokeWidth={2} />
        <line x1={195} y1={190} x2={370} y2={165} stroke="#16a34a" strokeWidth={2} />
        <line x1={195} y1={190} x2={370} y2={215} stroke="#94a3b8" strokeWidth={2} />
        {T(255, 38, `P(B|A) = ${f2(pba)}`, '#16a34a')}
        {T(255, 90, `P(B′|A) = ${f2(1 - pba)}`, '#64748b')}
        {T(255, 168, `P(B|A′) = ${f2(pbn)}`, '#16a34a')}
        {T(255, 222, `P(B′|A′) = ${f2(1 - pbn)}`, '#64748b')}
        {T(375, 40, `${f2(pba)} × ${f2(pa)} = ${f2(b1)}`, '#16a34a', 800)}
        {T(375, 170, `${f2(pbn)} × ${f2(pna)} = ${f2(b2)}`, '#16a34a', 800)}
      </svg>
      <Slider label="P(A)" v={pa} set={setPa} min={0.05} max={0.95} step={0.05} />
      <Slider label="P(B | A)" v={pba} set={setPba} min={0} max={1} step={0.05} />
      <Slider label="P(B | A′)" v={pbn} set={setPbn} min={0} max={1} step={0.05} />
      <div className="say" style={{ fontSize: '1.05em' }}>
        <b>සම්පූර්ණ සම්භාවිතාව:</b> {L.b} ලැබෙන හැම මාර්ගයම එකතු කරන්න: {f2(b1)} + {f2(b2)} = <b>P(B) = {f2(pb)}</b><br />
        <b>Bayes:</b> {L.b} ලැබුණා නම්, ඒක A එකෙන් ආවා වෙන්න ඇති ඉඩ = {f2(b1)} ÷ {f2(pb)} = <b>P(A|B) = {f2(bayes)}</b> 🕵️
      </div>
    </div>
  )
}

/* ── 7. 52-card deck ── */
const SUITS = [{ s: '♠', red: false }, { s: '♥', red: true }, { s: '♦', red: true }, { s: '♣', red: false }]
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const DECK_EVENTS: { label: string; test: (s: string, r: string) => boolean }[] = [
  { label: '♦ දියමන්ති', test: (s) => s === '♦' },
  { label: 'Q රැජින', test: (_s, r) => r === 'Q' },
  { label: 'Q හෝ ♥', test: (s, r) => r === 'Q' || s === '♥' },
  { label: 'රතු පත්', test: (s) => s === '♥' || s === '♦' },
]
export function CardDeck() {
  const [ei, setEi] = useState(2)
  const ev = DECK_EVENTS[ei]
  let hit = 0
  for (const s of SUITS) for (const r of RANKS) if (ev.test(s.s, r)) hit++
  const why = [
    '13 ♦ පත් — සෑම suit එකකම 13යි. 13/52 = 1/4',
    'Q හතරයි (සෑම suit එකකම එකක්). 4/52 = 1/13',
    'Q 4 + ♥ 13 − (Q♥ දෙපාරක් ගණන් වුණා) 1 = 16. 16/52 = 4/13  (එකතු කිරීමේ නීතිය!)',
    '♥ 13 + ♦ 13 = 26. 26/52 = 1/2',
  ][ei]
  return (
    <div className="viz">
      <div className="row">{DECK_EVENTS.map((e, i) => <button key={e.label} className={`chip ${i === ei ? 'good' : ''}`} onClick={() => setEi(i)}>{e.label}</button>)}</div>
      <div style={{ margin: '10px 0' }}>
        {SUITS.map((s) => (
          <div key={s.s} style={{ display: 'flex', gap: 3, marginBottom: 3 }}>
            {RANKS.map((r) => {
              const on = ev.test(s.s, r)
              return <div key={r} style={{ flex: 1, minWidth: 0, textAlign: 'center', fontSize: '.72em', fontWeight: 700, padding: '4px 0', borderRadius: 5, background: on ? '#fde68a' : '#f1f5f9', color: s.red ? '#dc2626' : '#0f172a', border: on ? '2px solid #d97706' : '2px solid transparent' }}>{r}<br />{s.s}</div>
            })}
          </div>
        ))}
      </div>
      <div className="say" style={{ fontSize: '1.1em' }}>
        |A| = <b>{hit}</b>, |S| = <b>52</b> ⟹ P(A) = {hit}/52 = <b>{f2(hit / 52)}</b><br />{why}
      </div>
    </div>
  )
}

/* ── 8. Independence: does knowing one change the other? (two coins, simulated) ── */
export function IndependenceLab() {
  const [n, setN] = useState({ first: 0, both: 0, total: 0 })
  const run = (k: number) => setN((c) => {
    const r = { ...c }
    for (let i = 0; i < k; i++) {
      const a = Math.random() < 0.5, b = Math.random() < 0.5
      r.total++
      if (a) { r.first++; if (b) r.both++ }
    }
    return r
  })
  const cond = n.first ? n.both / n.first : 0
  return (
    <div className="viz card" style={{ background: '#f8fafc', color: '#0f172a' }}>
      <div className="row">
        <button className="btn" onClick={() => run(10)}>🪙🪙 ×10</button>
        <button className="btn" onClick={() => run(1000)}>🪙🪙 ×1000</button>
        <button className="btn alt" onClick={() => setN({ first: 0, both: 0, total: 0 })}>🔁</button>
      </div>
      <div style={{ marginTop: 8 }}>
        කාසි දෙක දැම්ම වාර: <b>{n.total}</b><br />
        පළමුවැන්න Head වුණ වාර: <b>{n.first}</b> &nbsp;|&nbsp; ඒ අතරින් දෙවැන්නත් Head: <b>{n.both}</b><br />
        P(B | A) ≈ <b>{n.first ? f2(cond) : '—'}</b> &nbsp; (P(B) = 0.5)
      </div>
      <p style={{ marginBottom: 0 }}>🧠 පළමුවැන්න Head වුණාට දෙවැන්නේ ඉඩ <b>0.5ම</b> තමයි — වෙනසක් නෑ! ඒකයි <b>ස්වාධීන</b> (independent) කියන්නේ: <Tex t="P(B|A)=P(B)" /></p>
    </div>
  )
}

/* tiny helper kept for lesson files that want a pulsing coin */
export function useInterval(cb: () => void, ms: number, on = true) {
  const ref = useRef(cb)
  ref.current = cb
  useEffect(() => {
    if (!on) return
    const id = setInterval(() => ref.current(), ms)
    return () => clearInterval(id)
  }, [ms, on])
}
