import { useEffect, useState } from 'react'
import { Plot, curve, Slider } from './Plot'

const f3 = (x: number) => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : (Math.round(x * 1000) / 1000).toString())

/* ── 1. Partial sums: sequence terms stack up into S_n ── */
export function PartialSumBars() {
  const [n, setN] = useState(4)
  const [kind, setKind] = useState<'n' | '2n' | 'sq'>('n')
  const term = (i: number) => (kind === 'n' ? i : kind === '2n' ? 2 * i : i * i)
  const names = { n: '1, 2, 3, 4, …', '2n': '2, 4, 6, 8, …', sq: '1, 4, 9, 16, …' }
  const terms = Array.from({ length: n }, (_, i) => term(i + 1))
  const S = terms.reduce((a, b) => a + b, 0)
  const maxS = (kind === 'sq' ? 10 * 11 * 21 / 6 : kind === '2n' ? 110 : 55)
  return (
    <div className="viz">
      <div className="row">{(['n', '2n', 'sq'] as const).map((k) => <button key={k} className={`chip ${kind === k ? 'good' : ''}`} onClick={() => setKind(k)}>{names[k]}</button>)}</div>
      <svg className="plot" viewBox="0 0 560 200">
        {terms.map((t, i) => {
          const w = 520 / 10
          const prev = terms.slice(0, i).reduce((a, b) => a + b, 0)
          const x0 = (prev / maxS) * 520 + 20, wd = (t / maxS) * 520
          return (
            <g key={i}>
              <rect x={x0} y={60} width={Math.max(wd - 2, 1)} height={60} fill={['#3b82f6', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6'][i % 5]} rx={4} />
              {wd > 18 && <text x={x0 + wd / 2} y={96} textAnchor="middle" fontSize={14} fill="#fff" fontWeight={700}>{t}</text>}
              <text x={x0 + wd / 2} y={52} textAnchor="middle" fontSize={11} fill="currentColor">a{i + 1}</text>
              {w < 0 && null}
            </g>
          )
        })}
        <text x={20} y={160} fontSize={18} fill="currentColor" fontWeight={800}>S{n} = {terms.join(' + ')} = {S}</text>
      </svg>
      <Slider label="පද ගණන n" v={n} set={setN} min={1} max={10} step={1} />
      <div className="say">අනුක්‍රමය (sequence) = ලැයිස්තුව. <b>ශ්‍රේණිය (series)</b> = ඒවා එකතු කිරීම. <b>ආංශික එකතුව (partial sum)</b> Sₙ = පළමු n පදවල එකතුව = <b>{S}</b>.</div>
    </div>
  )
}

/* ── 2. Gauss pairing for 1..n ── */
export function GaussPairs() {
  const [n, setN] = useState(10)
  const pairs = Array.from({ length: n / 2 }, (_, i) => [i + 1, n - i])
  return (
    <div className="viz">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '8px 0' }}>
        {pairs.map(([a, b]) => (
          <div key={a} style={{ background: '#fde68a', color: '#78350f', borderRadius: 12, padding: '4px 10px', textAlign: 'center', border: '2px solid #d97706' }}>
            <div style={{ fontWeight: 700 }}>{a} + {b}</div><div>= <b>{n + 1}</b></div>
          </div>
        ))}
      </div>
      <Slider label="අවසාන අංකය n (ඉරට්ටේ)" v={n} set={setN} min={2} max={20} step={2} />
      <div className="say" style={{ fontSize: '1.1em' }}>
        යුගල <b>{n / 2}</b> ක්, හැම යුගලයකම එකතුව <b>{n + 1}</b> ⟹ 1 + 2 + … + {n} = {n / 2} × {n + 1} = <b>{(n * (n + 1)) / 2}</b> 🎉<br />
        සූත්‍රය: <b>n(n+1)/2</b> = {n}×{n + 1}/2 = {(n * (n + 1)) / 2}
      </div>
    </div>
  )
}

/* ── 3. Halves filling a square: 1/2 + 1/4 + ... → 1 ── */
export function HalvesSquare() {
  const [k, setK] = useState(3)
  const rects: JSX.Element[] = []
  let x = 0, y = 0, w = 300, h = 300
  const cols = ['#3b82f6', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6', '#14b8a6', '#ec4899', '#64748b']
  for (let i = 1; i <= k; i++) {
    const horizontal = i % 2 === 1
    let rw = w, rh = h, rx = x, ry = y
    if (horizontal) { rw = w / 2; if (true) { x += rw; w = w - rw } }
    else { rh = h / 2; y += rh; h = h - rh }
    rects.push(<rect key={i} x={20 + rx} y={10 + ry} width={rw} height={rh} fill={cols[(i - 1) % 8]} stroke="#fff" strokeWidth={2} opacity={0.9} />)
    if (rw > 24 && rh > 20) rects.push(<text key={'t' + i} x={20 + rx + rw / 2} y={10 + ry + rh / 2 + 5} textAnchor="middle" fontSize={Math.min(16, rw / 3)} fill="#fff" fontWeight={700}>1/{2 ** i}</text>)
  }
  const S = 1 - 1 / 2 ** k
  return (
    <div className="viz">
      <svg className="plot" viewBox="0 0 340 320" style={{ maxWidth: 360 }}>
        <rect x={20} y={10} width={300} height={300} fill="#e2e8f0" stroke="#334155" strokeWidth={3} />
        {rects}
      </svg>
      <Slider label="එකතු කරන පද ගණන" v={k} set={setK} min={1} max={8} step={1} />
      <div className="say" style={{ fontSize: '1.1em' }}>
        ½ + ¼ + … ({k} පද) = <b>{f3(S)}</b> = 1 − 1/{2 ** k}. <br />
        පද වැඩි කරන තරමට වර්ග කොටුව සම්පූර්ණ වෙනවා — සීමාව <b>1</b> 🟦 (මෙයට අභිසාරී වෙනවා කියනවා)
      </div>
    </div>
  )
}

/* ── 4. Geometric ratio r: converge or diverge? ── */
export function ConvergeSlider() {
  const [r, setR] = useState(0.5)
  const N = 14
  const pts: number[] = []
  let sum = 0, term = 1
  for (let i = 0; i < N; i++) { sum += term; pts.push(sum); term *= r }
  const conv = Math.abs(r) < 1
  const lim = 1 / (1 - r)
  const ymax = conv ? Math.max(2, Math.abs(lim) + 1, ...pts.map(Math.abs)) : 10
  const ymin = Math.min(0, ...pts.map((p) => Math.max(p, -10)))
  return (
    <div className="viz">
      <Plot xmin={0} xmax={N} ymin={ymin - 0.5} ymax={ymax + 0.5} H={240}>
        {(s) => (
          <>
            {conv && <line x1={0} x2={s.W} y1={s.sy(lim)} y2={s.sy(lim)} stroke="#16a34a" strokeWidth={2} strokeDasharray="6 4" />}
            <polyline points={pts.map((p, i) => `${s.sx(i + 1)},${s.sy(Math.max(Math.min(p, ymax + 0.5), ymin - 0.5))}`).join(' ')} fill="none" stroke="#3b82f6" strokeWidth={3} />
            {pts.map((p, i) => <circle key={i} cx={s.sx(i + 1)} cy={s.sy(Math.max(Math.min(p, ymax + 0.5), ymin - 0.5))} r={4} fill="#ef4444" />)}
          </>
        )}
      </Plot>
      <Slider label="පොදු අනුපාතය r" v={r} set={setR} min={-1.5} max={1.5} step={0.05} />
      <div className="say" style={{ fontSize: '1.1em' }}>
        1 + r + r² + … හි ආංශික එකතු (රතු ලකුණු). <br />
        {conv
          ? <>|r| = {Math.abs(r).toFixed(2)} &lt; 1 ⟹ <b>අභිසාරී ✅</b> 🟢 ඉරි රේඛාව = a/(1−r) = 1/(1−{f3(r)}) = <b>{f3(lim)}</b></>
          : <>|r| = {Math.abs(r).toFixed(2)} ≥ 1 ⟹ <b>අපසාරී ❌</b> — එකතුව කවදාවත් ස්ථාවර වෙන්නේ නෑ.</>}
      </div>
    </div>
  )
}

/* ── 5. Telescoping: cancel the middle ── */
export function TelescopeCancel() {
  const [N, setN] = useState(4)
  const [show, setShow] = useState(false)
  return (
    <div className="viz card" style={{ background: '#f8fafc', color: '#0f172a' }}>
      <div style={{ fontSize: '1.2em', lineHeight: 2.2, textAlign: 'center' }}>
        {Array.from({ length: N }, (_, i) => {
          const k = i + 1
          const first = k === 1, last = k === N
          return (
            <span key={k}>
              ({' '}
              <span style={{ color: first || !show ? '#0f172a' : '#94a3b8', textDecoration: !first && show ? 'line-through' : 'none' }}>1/{k}</span>
              {' − '}
              <span style={{ color: last || !show ? '#0f172a' : '#94a3b8', textDecoration: !last && show ? 'line-through' : 'none' }}>1/{k + 1}</span>
              {' )'}
              {k < N ? <b> + </b> : null}
            </span>
          )
        })}
      </div>
      <div className="row" style={{ justifyContent: 'center' }}>
        <button className="btn" onClick={() => setShow(!show)}>{show ? '🔁 ආපසු' : '✂️ කැපෙන ඒවා කපන්න'}</button>
      </div>
      <Slider label="පද ගණන N" v={N} set={setN} min={2} max={8} step={1} />
      <div style={{ fontWeight: 700 }}>
        {show ? <>කැපුනාට පස්සේ ඉතිරි වෙන්නේ: 1 − 1/{N + 1} = <b>{f3(1 - 1 / (N + 1))}</b> 🎉</> : <>බොත්තම ඔබන්න — මැද පද එකිනෙකට කැපෙනවා, පළමු සහ අවසාන ඉතිරි වෙනවා!</>}
      </div>
    </div>
  )
}

/* ── 6. Verify summation formulas against brute force ── */
export function SumFormulaChecker() {
  const [n, setN] = useState(5)
  const [p, setP] = useState<1 | 2 | 3>(2)
  let brute = 0
  for (let i = 1; i <= n; i++) brute += i ** p
  const formula = p === 1 ? (n * (n + 1)) / 2 : p === 2 ? (n * (n + 1) * (2 * n + 1)) / 6 : ((n * (n + 1)) / 2) ** 2
  const ftxt = p === 1 ? `n(n+1)/2 = ${n}×${n + 1}/2` : p === 2 ? `n(n+1)(2n+1)/6 = ${n}×${n + 1}×${2 * n + 1}/6` : `[n(n+1)/2]² = (${(n * (n + 1)) / 2})²`
  return (
    <div className="viz">
      <div className="row">{([1, 2, 3] as const).map((k) => <button key={k} className={`chip ${p === k ? 'good' : ''}`} onClick={() => setP(k)}>Σ i{['', '', '²', '³'][k]}</button>)}</div>
      <Slider label="n" v={n} set={setN} min={1} max={10} step={1} />
      <div className="say" style={{ fontSize: '1.1em' }}>
        🐢 එකින් එක එකතු කළාම: {Array.from({ length: n }, (_, i) => (i + 1) ** p).join(' + ')} = <b>{brute}</b><br />
        ⚡ සූත්‍රයෙන්: {ftxt} = <b>{formula}</b> {brute === formula ? '✅ සමානයි!' : '❌'}
      </div>
    </div>
  )
}

/* ── 7. Dot triangle: Σi = n(n+1)/2 ── */
export function DotTriangle() {
  const [n, setN] = useState(5)
  const sz = 28
  return (
    <div className="viz">
      <svg className="plot" viewBox={`0 0 ${Math.max(n + 2, 8) * sz + 20} ${(n + 2) * sz + 10}`} style={{ maxWidth: 480 }}>
        {Array.from({ length: n }, (_, row) => Array.from({ length: row + 1 }, (_, c) => <circle key={`a${row}-${c}`} cx={20 + c * sz} cy={20 + row * sz} r={10} fill="#3b82f6" />))}
        {Array.from({ length: n }, (_, row) => Array.from({ length: n - row }, (_, c) => <circle key={`b${row}-${c}`} cx={20 + (row + 1 + c) * sz} cy={20 + row * sz} r={10} fill="#f59e0b" />))}
      </svg>
      <Slider label="n" v={n} set={setN} min={1} max={8} step={1} />
      <div className="say" style={{ fontSize: '1.1em' }}>
        🔵 ත්‍රිකෝණය = 1 + 2 + … + {n}. 🟠 තවත් ඒ වගේ ත්‍රිකෝණයක් පෙරළලා ගැලපුවාම <b>{n} × {n + 1}</b> සෘජුකෝණාස්‍රයක්!<br />
        ත්‍රිකෝණ දෙකක් = {n * (n + 1)} ⟹ එකක් = <b>{(n * (n + 1)) / 2}</b> = n(n+1)/2 ✅
      </div>
    </div>
  )
}

/* ── 8. Dominoes: induction ── */
export function Dominoes() {
  const N = 10
  const [broken, setBroken] = useState<number | null>(null)
  const [pushed, setPushed] = useState(false)
  const [fallen, setFallen] = useState(0)
  useEffect(() => {
    if (!pushed) return
    const limit = broken ?? N
    if (fallen >= limit) return
    const id = setTimeout(() => setFallen((f) => f + 1), 280)
    return () => clearTimeout(id)
  }, [pushed, fallen, broken])
  const reset = () => { setPushed(false); setFallen(0) }
  return (
    <div className="viz">
      <svg className="plot" viewBox="0 0 560 150">
        <rect x={0} y={118} width={560} height={30} fill="#a8a29e" />
        {Array.from({ length: N }, (_, i) => {
          const x = 30 + i * 50
          const down = i < fallen
          return (
            <g key={i} transform={`translate(${x},118) rotate(${down ? 75 : 0})`} style={{ transition: 'transform .25s', transformOrigin: '0 0' }}>
              <rect x={-6} y={-70} width={12} height={70} rx={3} fill={broken === i ? '#ef4444' : '#2563eb'} stroke="#1e3a8a" />
              <text x={0} y={-76} textAnchor="middle" fontSize={11} fill="currentColor">{i + 1}</text>
            </g>
          )
        })}
      </svg>
      <div className="row">
        <button className="btn" onClick={() => { reset(); setTimeout(() => setPushed(true), 50) }}>👉 පළමු දොමිනෝව තල්ලු කරන්න</button>
        <button className="btn alt" onClick={reset}>🔁 නැවත සකසන්න</button>
        <button className={`chip ${broken !== null ? 'wrong' : ''}`} onClick={() => { reset(); setBroken(broken === null ? 5 : null) }}>{broken === null ? '🔨 5 වෙනි දොමිනෝව ඈතට තියන්න' : '🔧 හදන්න'}</button>
      </div>
      <div className="say" style={{ fontSize: '1.05em' }}>
        {broken === null
          ? <>✅ <b>පළමු එක</b> වැටෙනවා (base case) <b>සහ</b> හැම එකක්ම ඊළඟ එක වට්ටනවා (inductive step) ⟹ <b>ඔක්කොම</b> වැටෙනවා! 🎉</>
          : <>❌ 5 වෙනි එක ඈතින් තියෙන නිසා <b>ඉන්පසු කිසිවක්</b> වැටෙන්නේ නෑ. “inductive step” කැඩුණොත් ඔප්පු කිරීම අසාර්ථකයි!</>}
      </div>
    </div>
  )
}

/* ── 9. Factorial call stack ── */
export function FactorialStack() {
  const [n, setN] = useState(4)
  const [phase, setPhase] = useState(0) // 0..2n+? steps
  const total = n + 1 // calls n..0
  const down = Math.min(phase, total) // number of calls opened
  const up = Math.max(0, phase - total) // number of returns done
  const vals: number[] = [1]
  for (let k = 1; k <= n; k++) vals.push(vals[k - 1] * k)
  useEffect(() => setPhase(0), [n])
  const calls = Array.from({ length: n + 1 }, (_, i) => n - i) // n, n-1, ..., 0
  return (
    <div className="viz card" style={{ background: '#f8fafc', color: '#0f172a' }}>
      <div className="row"><button className="btn" disabled={phase >= 2 * total} onClick={() => setPhase(phase + 1)}>👉 ඊළඟ පියවර</button><button className="btn alt" onClick={() => setPhase(0)}>🔁</button></div>
      <div style={{ marginTop: 10 }}>
        {calls.map((k, i) => {
          if (i >= down) return null
          const returned = i >= total - up // deepest calls return first
          return (
            <div key={k} style={{ marginLeft: i * 18, background: returned ? '#bbf7d0' : '#fde68a', border: '2px solid ' + (returned ? '#16a34a' : '#d97706'), borderRadius: 10, padding: '4px 10px', margin: '4px 0 4px ' + i * 18 + 'px', animation: 'pop .3s ease-out' }}>
              {k === 0 ? <>📞 <b>0!</b> = 1 (මූලික අවස්ථාව — නවතිනවා) {returned && <b> ⟹ 1</b>}</> : <>📞 <b>{k}!</b> = {k} × {k - 1}! {returned && <b> ⟹ {k} × {vals[k - 1]} = {vals[k]}</b>}</>}
            </div>
          )
        })}
      </div>
      <Slider label="n" v={n} set={setN} min={1} max={6} step={1} />
      <div style={{ fontWeight: 700 }}>{phase >= 2 * total ? <>🎉 {n}! = <b>{vals[n]}</b></> : down < total ? '⬇️ පහළට යනවා: කුඩා ප්‍රශ්න විවෘත කරනවා…' : '⬆️ උඩට එනවා: පිළිතුරු ආපසු ගුණ කරනවා…'}</div>
    </div>
  )
}

/* ── 10. Fibonacci call tree ── */
export function FibTree() {
  const [n, setN] = useState(4)
  let calls = 0
  type Node = { n: number; l?: Node; r?: Node; w: number }
  const build = (k: number): Node => {
    calls++
    if (k < 2) return { n: k, w: 1 }
    const l = build(k - 1), r = build(k - 2)
    return { n: k, l, r, w: l.w + r.w }
  }
  const root = build(n)
  const nodes: JSX.Element[] = []
  const W = 520
  const draw = (nd: Node, x: number, y: number, span: number, id: string) => {
    if (nd.l && nd.r) {
      const lw = nd.l.w, rw = nd.r.w
      const lx = x - span * (rw / (lw + rw)), rx = x + span * (lw / (lw + rw))
      nodes.push(<line key={'l' + id} x1={x} y1={y} x2={lx} y2={y + 44} stroke="#94a3b8" strokeWidth={2} />)
      nodes.push(<line key={'r' + id} x1={x} y1={y} x2={rx} y2={y + 44} stroke="#94a3b8" strokeWidth={2} />)
      draw(nd.l, lx, y + 44, span / 2, id + 'l')
      draw(nd.r, rx, y + 44, span / 2, id + 'r')
    }
    const base = nd.n < 2
    nodes.push(<g key={id}><circle cx={x} cy={y} r={15} fill={base ? '#bbf7d0' : '#fde68a'} stroke={base ? '#16a34a' : '#d97706'} strokeWidth={2} /><text x={x} y={y + 5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#0f172a">F{nd.n}</text></g>)
  }
  draw(root, W / 2, 24, W / 4, 'n')
  const fib = [0, 1]
  for (let i = 2; i <= 10; i++) fib.push(fib[i - 1] + fib[i - 2])
  return (
    <div className="viz">
      <svg className="plot" viewBox={`0 0 ${W} ${Math.max(150, n * 46 + 40)}`}>{nodes}</svg>
      <Slider label="n" v={n} set={setN} min={1} max={6} step={1} />
      <div className="say" style={{ fontSize: '1.05em' }}>
        🟩 අවසානය (F₀ = 0, F₁ = 1) — 🟨 F<sub>n</sub> = F<sub>n−1</sub> + F<sub>n−2</sub>. <br />
        F{n} = <b>{fib[n]}</b> (ශ්‍රිත ඇමතුම් {calls}ක්!) <br />
        අනුක්‍රමය: {fib.slice(0, 11).join(', ')}…
      </div>
    </div>
  )
}

/* ── 11. Strong induction ladder ── */
export function StrongLadder() {
  const [lit, setLit] = useState(1) // rungs 1..lit proven
  const M = 8
  return (
    <div className="viz">
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 150 }}>
        {Array.from({ length: M }, (_, i) => {
          const k = i + 1, on = k <= lit
          return <div key={k} style={{ flex: 1, height: 20 + k * 14, background: on ? '#22c55e' : '#e2e8f0', color: on ? '#052e16' : '#475569', borderRadius: 8, textAlign: 'center', fontWeight: 800, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 4, border: '2px solid ' + (on ? '#16a34a' : '#cbd5e1'), transition: 'all .3s' }}>P({k})</div>
        })}
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <button className="btn" disabled={lit >= M} onClick={() => setLit(lit + 1)}>🪜 ඊළඟ පියවර ඔප්පු කරන්න</button>
        <button className="btn alt" onClick={() => setLit(1)}>🔁</button>
      </div>
      <div className="say">
        {lit < M ? <>දැනට <b>P(1) … P({lit})</b> <b>ඔක්කොම</b> ඔප්පු වෙලා. ඒ <b>ඔක්කොම</b> පාවිච්චි කරලා P({lit + 1}) ඔප්පු කරනවා. (සාමාන්‍ය අභ්‍යුහනයේ P({lit}) විතරයි පාවිච්චි කරන්නේ.)</> : <>🎉 ඔක්කොම පියවර ඔප්පු වුණා!</>}
      </div>
    </div>
  )
}

/* ── 12. Well-ordering: find the least element ── */
export function WellOrdering() {
  const SETS = [[5, 8, 10, 15, 20], [12, 7, 31, 9], [100, 42, 63, 8, 77, 25]]
  const [si, setSi] = useState(0)
  const [pick, setPick] = useState<number | null>(null)
  const set = SETS[si]
  const least = Math.min(...set)
  return (
    <div className="viz">
      <p>කුලකය A = {'{'}{set.join(', ')}{'}'} — <b>කුඩාම</b> අගය ඔබන්න 👇</p>
      <div className="row">{set.map((v) => <button key={v} className={`chip ${pick === v ? (v === least ? 'good' : 'wrong') : ''}`} onClick={() => setPick(v)}>{v}</button>)}</div>
      <div className="say" style={{ marginTop: 10 }}>
        {pick === null ? 'තෝරන්න!' : pick === least ? <>🎉 නිවැරදියි! <b>{least}</b> කුඩාම. ධන නිඛිල කුලකයක් හිස් නොවේ නම් <b>කුඩාම අගයක් හැම විටම තියෙනවා</b> — මේකට <b>සුපිළිවෙළ මූලධර්මය</b> කියනවා.</> : <>🤔 ඊට වඩා කුඩා එකක් තියෙනවා. නැවත බලන්න.</>}
      </div>
      <button className="btn alt" onClick={() => { setSi((si + 1) % SETS.length); setPick(null) }}>➡️ වෙනත් කුලකයක්</button>
    </div>
  )
}

/* ── 13. Structural induction: leaves = internal + 1 ── */
export function StructuralTrees() {
  const [trees, setTrees] = useState<{ leaves: number; internal: number }[]>([{ leaves: 1, internal: 0 }])
  const add = () => setTrees((t) => [...t, { leaves: 1, internal: 0 }])
  const join = () => setTrees((t) => (t.length < 2 ? t : [...t.slice(0, -2), { leaves: t[t.length - 2].leaves + t[t.length - 1].leaves, internal: t[t.length - 2].internal + t[t.length - 1].internal + 1 }]))
  return (
    <div className="viz">
      <div className="row"><button className="btn" onClick={add}>🍃 අලුත් පත්‍රයක් (මූලික ව්‍යුහය)</button><button className="btn" disabled={trees.length < 2} onClick={join}>🔗 අන්තිම ගස් දෙක එකතු කරන්න (නීතිය)</button><button className="btn alt" onClick={() => setTrees([{ leaves: 1, internal: 0 }])}>🔁</button></div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '10px 0' }}>
        {trees.map((t, i) => (
          <div key={i} style={{ background: '#ecfdf5', color: '#064e3b', border: '2px solid #34d399', borderRadius: 14, padding: '6px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.4em' }}>{t.internal === 0 ? '🍃' : '🌳'}</div>
            <div>පත්‍ර <b>{t.leaves}</b> • අභ්‍යන්තර <b>{t.internal}</b></div>
            <div>{t.leaves} = {t.internal} + 1 ✅</div>
          </div>
        ))}
      </div>
      <div className="say">ගුණය: “<b>පත්‍ර ගණන = අභ්‍යන්තර ගැට + 1</b>”. මූලික ව්‍යුහය (පත්‍රය): 1 = 0 + 1 ✔. නීතිය (ගස් දෙකක් අලුත් මුලකට යටින් එකතු කිරීම) යොදනකොට: (a₁ + a₂) = (b₁ + 1) + (b₂ + 1) = (b₁ + b₂ + 1) + 1 ✔ — ඒ නිසා සැමවිටම සත්‍යයි!</div>
    </div>
  )
}

export { curve }
