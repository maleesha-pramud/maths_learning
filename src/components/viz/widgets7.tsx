import { useState, type ReactNode } from 'react'
import { Slider } from './Plot'

/* ───────── shared helpers for the vector-space lessons ───────── */
export interface PS { sx: (x: number) => number; sy: (y: number) => number; u: number; W: number; H: number }
export const C = { blue: '#2563eb', orange: '#f59e0b', green: '#16a34a', red: '#dc2626', purple: '#7c3aed', grey: '#64748b' }
export const fmt = (x: number) => {
  const v = Math.abs(x) < 1e-9 ? 0 : x
  const t = Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100)
  return t.replace('-', '−')
}
export const vec = (v: number[]) => `(${v.map(fmt).join(', ')})`

/** Square-unit coordinate plane (equal x / y scale) */
export function Plane({ R = 5, W = 440, H = 340, maxWidth = 480, children }: { R?: number; W?: number; H?: number; maxWidth?: number; children: (s: PS) => ReactNode }) {
  const u = H / (2 * R)
  const Rx = Math.floor(W / 2 / u)
  const sx = (x: number) => W / 2 + x * u
  const sy = (y: number) => H / 2 - y * u
  const grid: ReactNode[] = []
  for (let x = -Rx; x <= Rx; x++) grid.push(<line key={'x' + x} x1={sx(x)} x2={sx(x)} y1={0} y2={H} stroke="#8884" strokeWidth={x === 0 ? 2 : 0.6} />)
  for (let y = -R; y <= R; y++) grid.push(<line key={'y' + y} y1={sy(y)} y2={sy(y)} x1={0} x2={W} stroke="#8884" strokeWidth={y === 0 ? 2 : 0.6} />)
  return (
    <svg className="plot" viewBox={`0 0 ${W} ${H}`} style={{ maxWidth }}>
      {grid}
      {children({ sx, sy, u, W, H })}
    </svg>
  )
}

/** An arrow (vector) drawn from → to in plot coordinates */
export function Arrow({ s, from = [0, 0], to, color, w = 3, label, dash }: { s: PS; from?: number[]; to: number[]; color: string; w?: number; label?: string; dash?: boolean }) {
  const x1 = s.sx(from[0]), y1 = s.sy(from[1]), x2 = s.sx(to[0]), y2 = s.sy(to[1])
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy)
  let head: string | null = null
  if (L > 8) {
    const ux = dx / L, uy = dy / L, hs = Math.min(13, L * 0.45)
    const bx = x2 - ux * hs, by = y2 - uy * hs
    head = `${x2},${y2} ${bx - uy * hs * 0.45},${by + ux * hs * 0.45} ${bx + uy * hs * 0.45},${by - ux * hs * 0.45}`
  }
  const nx = L > 0 ? -dy / L : 0, ny = L > 0 ? dx / L : 0
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeDasharray={dash ? '6 5' : undefined} strokeLinecap="round" />
      {head && <polygon points={head} fill={color} />}
      {label && <text x={(x1 + x2) / 2 + nx * 14} y={(y1 + y2) / 2 + ny * 14 + 5} textAnchor="middle" fontSize={15} fontWeight={800} fill={color}>{label}</text>}
    </g>
  )
}
export const Dot = ({ s, p, color, label, r = 6, dy = -11 }: { s: PS; p: number[]; color: string; label?: string; r?: number; dy?: number }) => (
  <g>
    <circle cx={s.sx(p[0])} cy={s.sy(p[1])} r={r} fill={color} stroke="#fff" strokeWidth={1.5} />
    {label && <text x={s.sx(p[0])} y={s.sy(p[1]) + dy} textAnchor="middle" fontSize={13} fontWeight={800} fill={color}>{label}</text>}
  </g>
)

/* ── 1. Number family: nested boxes ── */
const SETS = [
  { k: 'ℕ', name: 'ස්වාභාවික (Natural)', col: '#fde68a' },
  { k: '𝕎', name: 'පූර්ණ (Whole)', col: '#fdba74' },
  { k: 'ℤ', name: 'නිඛිල (Integers)', col: '#fca5a5' },
  { k: 'ℚ', name: 'තාර්කික (Rational)', col: '#c4b5fd' },
  { k: 'ℝ', name: 'තාත්වික (Real)', col: '#93c5fd' },
  { k: 'ℂ', name: 'සංකීර්ණ (Complex)', col: '#86efac' },
]
const NUMS = [
  { t: '25', s: 0, say: 'පන්තියේ ළමයි 25 දෙනයි — ගණන් කරන අංකයක් 👧👦' },
  { t: '0', s: 1, say: 'පිඟානේ කිසිවක් නෑ 🍽️ — 0 කියන්නේ ස්වාභාවික නෙමෙයි, නමුත් පූර්ණ සංඛ්‍යාවක්.' },
  { t: '−3', s: 2, say: 'උෂ්ණත්වය −3 °C 🥶 — සෘණ අංක ඇත්තේ නිඛිල වලින්.' },
  { t: '½', s: 3, say: 'පීසා එකක් අඩයි 🍕 — නිඛිල දෙකක අනුපාතයක් (1/2) = තාර්කික.' },
  { t: '0.75', s: 3, say: '0.75 = 3/4 — අවසන් වන දශම ද තාර්කිකයි.' },
  { t: '√2', s: 4, say: '1 × 1 හතරැස්සේ විකර්ණය 📐 — භාගයක් ලෙස ලියන්න බෑ (අතාර්කික) — නමුත් රේඛාවේ තියෙනවා, ඒ නිසා තාත්විකයි.' },
  { t: 'π', s: 4, say: 'රවුමක වට ප්‍රමාණය ÷ විෂ්කම්භය ⭕ — අතාර්කික, තාත්වික.' },
  { t: '2 + 3i', s: 5, say: 'i = √(−1) සහිත අංක — පරිගණක ග්‍රැෆික්ස්, සංඥා වල භාවිතා වෙනවා 📡.' },
]
export function NumberSetBoxes() {
  const [i, setI] = useState(3)
  const n = NUMS[i]
  const W = 560, H = 330
  const ix = (k: number) => (5 - k) * 38, iy = (k: number) => (5 - k) * 22
  const dotX = W / 2, dotY = n.s === 0 ? H / 2 : iy(n.s) + 11
  return (
    <div className="viz">
      <div className="row">{NUMS.map((x, k) => <button key={k} className={`chip ${k === i ? 'good' : ''}`} onClick={() => setI(k)}>{x.t}</button>)}</div>
      <svg className="plot" viewBox={`0 0 ${W} ${H}`} style={{ marginTop: 8 }}>
        {[5, 4, 3, 2, 1, 0].map((k) => {
          const isSmallest = k === n.s, inside = k >= n.s
          return (
            <g key={k}>
              <rect x={ix(k)} y={iy(k)} width={W - 2 * ix(k)} height={H - 2 * iy(k)} rx={14} fill={SETS[k].col} fillOpacity={inside ? 0.55 : 0.25} stroke={isSmallest ? C.red : inside ? C.green : '#94a3b8'} strokeWidth={isSmallest ? 4 : 2} />
              <text x={ix(k) + 10} y={iy(k) + 17} fontSize={14} fontWeight={800} fill="#1e1b4b">{SETS[k].k} {SETS[k].name}</text>
            </g>
          )
        })}
        <circle cx={dotX} cy={dotY} r={15} fill="#fff" stroke={C.red} strokeWidth={3} />
        <text x={dotX} y={dotY + 5} textAnchor="middle" fontSize={n.t.length > 3 ? 11 : 14} fontWeight={800} fill="#1e1b4b">{n.t}</text>
      </svg>
      <div className="say">
        <b>{n.t}</b> ඉන්නේ <b>{SETS[n.s].k}</b> පවුලේ (ඇතුළත ම පෙට්ටිය). ඒ නිසා ඔහු අයිති වෙන පෙට්ටි: <b>{SETS.slice(n.s).map((x) => x.k).join(', ')}</b>.<br />{n.say}
      </div>
    </div>
  )
}

/* ── 2. Sets: a bag of toys, subsets & proper subsets ── */
const TOYS = ['🚗', '🧸', '⚽', '🎲', '🍕', '🎸']
export function SetBuilder() {
  const [pick, setPick] = useState<number[]>([0, 2])
  const toggle = (k: number) => setPick(pick.includes(k) ? pick.filter((x) => x !== k) : [...pick, k].sort())
  const inA = (k: number) => k < 4
  const outsiders = pick.filter((k) => !inA(k))
  const isSub = outsiders.length === 0
  const proper = isSub && pick.length < 4
  const btn = (k: number) => (
    <button key={k} className={`chip ${pick.includes(k) ? (inA(k) ? 'good' : 'wrong') : ''}`} style={{ fontSize: '1.5em' }} onClick={() => toggle(k)}>{TOYS[k]}</button>
  )
  return (
    <div className="viz">
      <div style={{ border: '3px solid #7c3aed', borderRadius: 18, padding: 10, background: 'rgba(124,58,237,.08)' }}>
        <b>🎒 A = {'{'}🚗, 🧸, ⚽, 🎲{'}'} (මේ බෑග් එකේ තියෙන දේවල්)</b>
        <div className="row" style={{ marginTop: 6 }}>{[0, 1, 2, 3].map(btn)}</div>
      </div>
      <div style={{ border: '3px dashed #94a3b8', borderRadius: 18, padding: 10, marginTop: 8 }}>
        <b>🏠 බෑග් එකෙන් පිටත (A ට අයිති නැහැ)</b>
        <div className="row" style={{ marginTop: 6 }}>{[4, 5].map(btn)}</div>
      </div>
      <p>ඔබේ කුලකය <b>B = {'{'}{pick.map((k) => TOYS[k]).join(', ')}{'}'}</b>{pick.length === 0 ? ' = ∅ (හිස් කුලකය)' : ''}</p>
      <div className="say" style={{ fontSize: '1.05em' }}>
        {pick.length === 0 && <>B = <b>∅</b> — හිස් කුලකය. ඒක <b>හැම කුලකයකම උපකුලකයක්</b> (⊆) සහ A ගේ <b>සංවෘත (proper) උපකුලකයක්</b> (⊂) ✅</>}
        {pick.length > 0 && !isSub && <>❌ B ⊄ A — මොකද <b>{TOYS[outsiders[0]]} ∈ B</b> නමුත් <b>{TOYS[outsiders[0]]} ∉ A</b>. උපකුලකයක අවයව ඔක්කොම A ඇතුළේ තියෙන්න ඕනේ.</>}
        {pick.length > 0 && isSub && proper && <>✅ B ⊆ A, සහ B ≠ A නිසා <b>B ⊂ A</b> (proper subset — සංවෘත උපකුලකය).</>}
        {pick.length > 0 && isSub && !proper && <>✅ B ⊆ A, නමුත් B = A. මෙය <b>proper නෙමෙයි</b> (A ම යි, A හි උපකුලකයක් ලෙස ගත්තත්).</>}
      </div>
      <p className="en">A හි අවයව 4ක් ⟹ උපකුලක 2⁴ = 16 (∅ සහ A ම ද ඇතුළුව). සංවෘත උපකුලක 15.</p>
    </div>
  )
}

/* ── 3. Vector playground: tip-to-tail and stretching ── */
export function VectorPlayground() {
  const [mode, setMode] = useState<'add' | 'scale'>('add')
  const [ux, setUx] = useState(3), [uy, setUy] = useState(1)
  const [vx, setVx] = useState(1), [vy, setVy] = useState(2)
  const [c, setC] = useState(2)
  const u = [ux, uy], v = [vx, vy], sum = [ux + vx, uy + vy], cu = [c * ux, c * uy]
  return (
    <div className="viz">
      <div className="row">
        <button className={`chip ${mode === 'add' ? 'good' : ''}`} onClick={() => setMode('add')}>➕ දෛශික දෙකක් එකතු කිරීම</button>
        <button className={`chip ${mode === 'scale' ? 'good' : ''}`} onClick={() => setMode('scale')}>✖️ අදිශයෙන් (scalar) ගුණ කිරීම</button>
      </div>
      <Plane R={6}>
        {(s) => mode === 'add' ? (
          <>
            <Arrow s={s} from={v} to={sum} color={C.blue} w={2} dash />
            <Arrow s={s} from={u} to={sum} color={C.orange} w={2} dash />
            <Arrow s={s} to={u} color={C.blue} label="u" />
            <Arrow s={s} from={u} to={sum} color={C.orange} label="v" />
            <Arrow s={s} to={sum} color={C.green} w={4} label="u+v" />
            <Dot s={s} p={[0, 0]} color="#334155" />
          </>
        ) : (
          <>
            <Arrow s={s} to={cu} color={C.green} w={5} label={`${fmt(c)}u`} />
            <Arrow s={s} to={u} color={C.blue} w={3} label="u" />
            <Dot s={s} p={[0, 0]} color="#334155" />
          </>
        )}
      </Plane>
      {mode === 'add' ? (
        <>
          <div className="row"><div style={{ flex: 1, minWidth: 180 }}><Slider label="u ගේ x" v={ux} set={setUx} min={-3} max={3} step={1} /><Slider label="u ගේ y" v={uy} set={setUy} min={-3} max={3} step={1} /></div>
            <div style={{ flex: 1, minWidth: 180 }}><Slider label="v ගේ x" v={vx} set={setVx} min={-3} max={3} step={1} /><Slider label="v ගේ y" v={vy} set={setVy} min={-3} max={3} step={1} /></div></div>
          <div className="say">u + v = {vec(u)} + {vec(v)} = <b>{vec(sum)}</b> — <b>u</b> ගමන ඉවර වුණු තැනින් <b>v</b> ගමන පටන් ගන්න (🚶 ගෙදර → කඩේ, කඩේ → ඉස්කෝලේ = ගෙදර → ඉස්කෝලේ).</div>
        </>
      ) : (
        <>
          <div className="row"><div style={{ flex: 1, minWidth: 180 }}><Slider label="u ගේ x" v={ux} set={setUx} min={-3} max={3} step={1} /><Slider label="u ගේ y" v={uy} set={setUy} min={-3} max={3} step={1} /></div>
            <div style={{ flex: 1, minWidth: 180 }}><Slider label="අදිශය c" v={c} set={setC} min={-2} max={2} step={0.5} /></div></div>
          <div className="say">{fmt(c)} · {vec(u)} = <b>{vec(cu)}</b> — {c > 1 ? 'දිගු වුණා (stretch) 🔭' : c === 1 ? 'වෙනසක් නෑ' : c > 0 ? 'කෙටි වුණා (shrink) 🔬' : c === 0 ? 'ලක්ෂ්‍යයක් බවට (ශූන්‍ය දෛශිකය) ⚫' : 'දිශාව මාරු වුණා (flip) 🔄'}</div>
        </>
      )}
    </div>
  )
}

/* ── 4. Axiom checker: counter-example theatre ── */
interface Case { id: string; chip: string; rule: string; ok: boolean; verdict: string }
const CASES: Case[] = [
  { id: 'r2', chip: 'ℝ² (සම්පූර්ණ තලය)', rule: 'ℝ² = { (x, y) : x, y ∈ ℝ } සාමාන්‍ය එකතු/ගුණ කිරීම්', ok: true, verdict: '✅ ඕනෑම දෙකක එකතුවත්, ඕනෑම අදිශ ගුණිතයත් තලයේමයි. ශූන්‍ය (0,0) ඇත, −u ඇත — රීති 10ම සත්‍යයි ⟹ දෛශික අවකාශයක්.' },
  { id: 'line', chip: 'රේඛාව y = 2x', rule: 'W = { (x, y) : y = 2x } — මූල ලක්ෂ්‍යය හරහා යන රේඛාව', ok: true, verdict: '✅ (0,0) රේඛාව මත. එකතුවත්, (−1)× ත් රේඛාවේම පවතී ⟹ දෛශික අවකාශයක් (ℝ² හි උප අවකාශයක්).' },
  { id: 'xy1', chip: 'x + y = 1', rule: 'S = { (x, y) : x + y = 1 }', ok: false, verdict: '❌ u, v දෙකම S හි; නමුත් u + v = (1,1) හි 1 + 1 = 2 ≠ 1 ⟹ S ට පිටතයි. එකතුවට සංවෘතතාව (closure) කැඩුණා ⟹ දෛශික අවකාශයක් නොවේ. (ඒ වගේම (0,0) S හි නෑ!)' },
  { id: 'quad', chip: 'x ≥ 0 සහ y ≥ 0', rule: 'W = { (x, y) : x ≥ 0 සහ y ≥ 0 } — පළමු වෘත්තපාදය', ok: false, verdict: '❌ එකතුව හරි; නමුත් u = (1,2) ∈ W වුවත් (−1)·u = (−1,−2) ∉ W. අදිශ ගුණනයට සංවෘතතාව කැඩුණා. ℝ අදිශ වලට සෘණ අගයත් අයිතියි!' },
  { id: 'weird', chip: 'අමුතු ගුණ කිරීමක්', rule: 'ℝ² මත, නමුත් c ⊙ (x, y) = (c·x, 0) ලෙස අර්ථ දැක්වූ විට', ok: false, verdict: '❌ 1 ⊙ (2,3) = (2,0) ≠ (2,3). රීතිය 10 (1·u = u) කැඩුණා. ප්‍රශ්නයේ දී ඇති ක්‍රියාවලීන්ම පරීක්ෂා කරන්න — සාමාන්‍ය ඒවා නෙමෙයි!' },
]
export function AxiomChecker() {
  const [ci, setCi] = useState(2)
  const [step, setStep] = useState(0)
  const c = CASES[ci]
  const pick = (k: number) => { setCi(k); setStep(0) }
  return (
    <div className="viz">
      <div className="row">{CASES.map((x, k) => <button key={x.id} className={`chip ${k === ci ? 'good' : ''}`} onClick={() => pick(k)}>{x.chip}</button>)}</div>
      <p style={{ margin: '8px 0' }}><b>{c.rule}</b></p>
      <Plane R={3} maxWidth={420}>
        {(s) => (
          <>
            {c.id === 'r2' && <rect x={0} y={0} width={s.W} height={s.H} fill={C.green} fillOpacity={0.12} />}
            {c.id === 'quad' && <rect x={s.sx(0)} y={0} width={s.W - s.sx(0)} height={s.sy(0)} fill={C.green} fillOpacity={0.2} />}
            {c.id === 'line' && <line x1={s.sx(-1.6)} y1={s.sy(-3.2)} x2={s.sx(1.6)} y2={s.sy(3.2)} stroke={C.blue} strokeWidth={4} />}
            {c.id === 'xy1' && <line x1={s.sx(-2)} y1={s.sy(3)} x2={s.sx(3)} y2={s.sy(-2)} stroke={C.blue} strokeWidth={4} />}
            {c.id === 'r2' && <><Arrow s={s} to={[1, 2]} color={C.blue} label="u" /><Arrow s={s} to={[2, -1]} color={C.orange} label="v" />
              {step >= 1 && <><Arrow s={s} to={[3, 1]} color={C.green} w={4} label="u+v" /><Arrow s={s} to={[-1, -2]} color={C.green} w={3} dash label="−u" /></>}</>}
            {c.id === 'line' && <><Dot s={s} p={[1, 2]} color={C.blue} label="u" /><Dot s={s} p={[0.5, 1]} color={C.orange} label="v" />
              {step >= 1 && <><Dot s={s} p={[1.5, 3]} color={C.green} label="u+v" /><Dot s={s} p={[-1, -2]} color={C.green} label="(−1)u" /></>}</>}
            {c.id === 'xy1' && <><Dot s={s} p={[1, 0]} color={C.blue} label="u=(1,0)" /><Dot s={s} p={[0, 1]} color={C.orange} label="v=(0,1)" dy={-11} />
              {step >= 1 && <><Arrow s={s} to={[1, 1]} color={C.red} w={3} /><Dot s={s} p={[1, 1]} color={C.red} label="u+v=(1,1) ❌" /></>}</>}
            {c.id === 'quad' && <><Arrow s={s} to={[1, 2]} color={C.blue} label="u" />
              {step >= 1 && <><Arrow s={s} to={[-1, -2]} color={C.red} w={3} label="(−1)u" /><Dot s={s} p={[-1, -2]} color={C.red} /></>}</>}
            {c.id === 'weird' && <><Arrow s={s} to={[2, 3]} color={C.blue} label="v=(2,3)" />
              {step >= 1 && <><Arrow s={s} to={[2, 0]} color={C.red} w={3} label="1⊙v=(2,0)" /></>}</>}
            <Dot s={s} p={[0, 0]} color="#334155" />
          </>
        )}
      </Plane>
      <div className="row" style={{ marginTop: 6 }}>
        {step < 2 && <button className="btn" onClick={() => setStep(step + 1)}>👉 {step === 0 ? 'රීතිය පරීක්ෂා කරමු' : 'තීරණය බලමු'}</button>}
        {step > 0 && <button className="btn alt" onClick={() => setStep(0)}>🔁 නැවත</button>}
      </div>
      {step === 2 && <div className="say" style={{ fontWeight: 700 }}>{c.verdict}</div>}
    </div>
  )
}

/* ── 5. Sort game: vector space or not ── */
const SORT: { s: string; ok: boolean; why: string }[] = [
  { s: 'ℝ² (සාමාන්‍ය එකතු/ගුණ කිරීම් සමඟ)', ok: true, why: 'රීති 10ම සත්‍යයි — ඉතාම සාමාන්‍ය උදාහරණය.' },
  { s: '{ (x, y) : x + y = 5 }', ok: false, why: '(0,0) සමීකරණයට ආදේශ කළොත් 0 ≠ 5 — ශූන්‍ය දෛශිකය නෑ.' },
  { s: '{ (x, y) : y = 2x }', ok: true, why: 'සමජාතීය රේඛාව — ශූන්‍යය ඇත, එකතුවටත් ගුණනයටත් සංවෘතයි.' },
  { s: '{ (x, y) : x ≥ 0 සහ y ≥ 0 }', ok: false, why: '(1,2) ∈ කුලකය, නමුත් (−1)(1,2) = (−1,−2) ∉ කුලකය.' },
  { s: 'උපරිම ගණය 2 වූ බහුපද (a + bx + cx²)', ok: true, why: 'ශූන්‍ය බහුපදය ඇත; එකතුවත්, අදිශ ගුණිතයත් තවමත් ගණය ≤ 2.' },
  { s: 'ගණය හරියටම 2 වූ බහුපද', ok: false, why: 'x² + (−x²) = 0 — ගණය 2 නොවේ! එකතුවට සංවෘත නෑ.' },
  { s: 'සියලු 2 × 2 තාත්වික න්‍යාස', ok: true, why: 'න්‍යාස එකතුව / ගුණනය ප්‍රමාණය රකිනවා, රීති 10ම සත්‍යයි.' },
  { s: 'ප්‍රතිලෝමය (inverse) ඇති 2 × 2 න්‍යාස', ok: false, why: 'ශූන්‍ය න්‍යාසයට ප්‍රතිලෝමයක් නෑ; I + (−I) = 0 කුලකයෙන් පිටත.' },
  { s: 'විකර්ණ (diagonal) 2 × 2 න්‍යාස', ok: true, why: 'ශූන්‍ය න්‍යාසය විකර්ණයි; එකතුවත්, ගුණිතයත් විකර්ණයි.' },
  { s: '{ (x, y) : x = 0 හෝ y = 0 } (අක්ෂ දෙක)', ok: false, why: '(1,0) + (0,1) = (1,1) අක්ෂ දෙකෙන් පිටත.' },
  { s: 'ℝ² මත c·(x, y) = (cx, 0) ලෙස අර්ථ දැක්වූ ගුණ කිරීමක් සමඟ', ok: false, why: '1·(2,3) = (2,0) ≠ (2,3) — රීතිය 10 කැඩුණා.' },
  { s: '{ (x, y, z) : x + y + z = 0 }', ok: true, why: 'සමජාතීය සමීකරණයක් — මූල ලක්ෂ්‍යය හරහා යන තලයක්.' },
]
export function SetSorter() {
  const [i, setI] = useState(0)
  const [ans, setAns] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const done = i >= SORT.length
  const cur = SORT[Math.min(i, SORT.length - 1)]
  const answer = (b: boolean) => { if (ans !== null) return; setAns(b); if (b === cur.ok) setScore(score + 1) }
  const next = () => { setAns(null); setI(i + 1) }
  const reset = () => { setI(0); setAns(null); setScore(0) }
  if (done) return (
    <div className="viz"><div className="bigidea">🏁 ඉවරයි! ලකුණු <b>{score}</b> / {SORT.length} {score >= 10 ? '🏆 නියමයි!' : '— ආයෙත් උත්සාහ කරන්න 💪'}</div><button className="btn" onClick={reset}>🔁 නැවත සෙල්ලම් කරන්න</button></div>
  )
  return (
    <div className="viz">
      <div className="progress"><div style={{ width: `${(i / SORT.length) * 100}%` }} /></div>
      <div className="card" style={{ textAlign: 'center', fontSize: '1.15em' }}>
        <div className="en">{i + 1} / {SORT.length}</div>
        <b>{cur.s}</b>
        <div style={{ margin: '4px 0' }}>මේක <b>දෛශික අවකාශයක්</b> ද?</div>
        <div className="row" style={{ justifyContent: 'center' }}>
          <button className={`chip ${ans !== null && cur.ok ? 'good' : ans === true ? 'wrong' : ''}`} disabled={ans !== null} onClick={() => answer(true)}>✅ ඔව්</button>
          <button className={`chip ${ans !== null && !cur.ok ? 'good' : ans === false ? 'wrong' : ''}`} disabled={ans !== null} onClick={() => answer(false)}>❌ නැහැ</button>
        </div>
        {ans !== null && <div className="say" style={{ textAlign: 'left' }}>{ans === cur.ok ? '🎉 හරි! ' : '🤔 නැහැ, මෙහෙමයි: '}{cur.why}<br /><button className="btn" style={{ marginTop: 8 }} onClick={next}>ඊළඟ එක 👉</button></div>}
      </div>
    </div>
  )
}

/* ── 6a. Shifted line: does the origin stay home? ── */
export function ShiftedLine() {
  const [k, setK] = useState(2)
  const sum = [k, k]
  const sumOn = Math.abs(sum[0] + sum[1] - k) < 1e-9
  return (
    <div className="viz">
      <Plane R={5} maxWidth={440}>
        {(s) => (
          <>
            <line x1={s.sx(-5)} y1={s.sy(k + 5)} x2={s.sx(5)} y2={s.sy(k - 5)} stroke={k === 0 ? C.green : C.red} strokeWidth={4} />
            <Dot s={s} p={[0, 0]} color="#334155" label="මූලය O" dy={18} />
            {k !== 0 && <>
              <Dot s={s} p={[k, 0]} color={C.blue} label="u" />
              <Dot s={s} p={[0, k]} color={C.orange} label="v" />
              <Arrow s={s} to={sum} color={sumOn ? C.green : C.red} w={2} dash />
              <Dot s={s} p={sum} color={sumOn ? C.green : C.red} label="u+v ❌" />
            </>}
          </>
        )}
      </Plane>
      <Slider label="x + y = k හි k" v={k} set={setK} min={-4} max={4} step={1} />
      <div className="say" style={{ fontWeight: 700 }}>
        {k === 0
          ? '✅ x + y = 0 රේඛාව මූලය (0,0) හරහා යනවා. ශූන්‍ය දෛශිකය ඇත — උප අවකාශයක්! (එකතුවත්, ගුණිතයත් රේඛාවේම)'
          : `❌ x + y = ${fmt(k)} රේඛාව මූලයෙන් ඈත්. (0,0) මත නෑ ⟹ උප අවකාශයක් නෙමෙයි. u = (${fmt(k)}, 0) සහ v = (0, ${fmt(k)}) රේඛාවේ; නමුත් u + v = (${fmt(k)}, ${fmt(k)}) හි එකතුව ${fmt(2 * k)} ≠ ${fmt(k)} — රේඛාවෙන් පිටත!`}
      </div>
    </div>
  )
}

/* ── 6b. A plane in 3D: x + y + z = k ── */
export function Plane3D() {
  const [k, setK] = useState(0)
  const [ang, setAng] = useState(35)
  const W = 520, H = 360, u = 34
  const th = (ang * Math.PI) / 180, ph = 0.5
  const P = (x: number, y: number, z: number): [number, number] => {
    const X = x * Math.cos(th) - y * Math.sin(th)
    const D = x * Math.sin(th) + y * Math.cos(th)
    return [W / 2 + X * u, H / 2 - (z * Math.cos(ph) + D * Math.sin(ph)) * u]
  }
  const corners = [[-1.5, -1.5], [1.5, -1.5], [1.5, 1.5], [-1.5, 1.5]].map(([a, b]) => P(a, b, k - a - b))
  const poly = corners.map((p) => p.join(',')).join(' ')
  const ax = [{ d: [3, 0, 0], c: C.red, l: 'x' }, { d: [0, 3, 0], c: C.green, l: 'y' }, { d: [0, 0, 3], c: C.blue, l: 'z' }]
  const o = P(0, 0, 0)
  const ok = k === 0
  return (
    <div className="viz">
      <svg className="plot" viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 520 }}>
        {ax.map((a) => { const e = P(a.d[0], a.d[1], a.d[2]); return <g key={a.l}><line x1={o[0]} y1={o[1]} x2={e[0]} y2={e[1]} stroke={a.c} strokeWidth={2} /><text x={e[0] + 6} y={e[1] + 4} fontSize={14} fontWeight={800} fill={a.c}>{a.l}</text></g> })}
        <polygon points={poly} fill={ok ? C.purple : C.red} fillOpacity={0.35} stroke={ok ? C.purple : C.red} strokeWidth={3} />
        <circle cx={o[0]} cy={o[1]} r={7} fill="#111827" stroke="#fff" strokeWidth={2} />
        <text x={o[0] + 10} y={o[1] - 10} fontSize={13} fontWeight={800} fill="currentColor">O (0,0,0)</text>
      </svg>
      <Slider label="x + y + z = k හි k" v={k} set={setK} min={-2} max={2} step={1} />
      <Slider label="මැදින් කැරකවන්න 🔄" v={ang} set={setAng} min={-180} max={180} step={5} />
      <div className="say" style={{ fontWeight: 700 }}>
        {ok ? '✅ x + y + z = 0 තලය මූලය (O) හරහා යනවා — ℝ³ හි උප අවකාශයක් (මානය 2: තලයක්).' : `❌ x + y + z = ${fmt(k)} තලය මූලය හරහා නොයයි (0+0+0 ≠ ${fmt(k)}) ⟹ උප අවකාශයක් නෙමෙයි.`}
      </div>
    </div>
  )
}
