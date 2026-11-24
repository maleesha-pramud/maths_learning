import { useMemo, useState } from 'react'
import { Plot, curve, Slider } from './Plot'
import { Tex } from '../Lesson/Formula'

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
/** a/b as a simplified TeX fraction (b>0) */
export function frac(a: number, b: number): string {
  const g = gcd(a, b) || 1
  const p = a / g, q = b / g
  return q === 1 ? String(p) : `\\tfrac{${p}}{${q}}`
}
const coefX = (c: string, pow: number) => {
  const x = pow === 1 ? 'x' : `x^{${pow}}`
  return c === '1' ? x : `${c}${x}`
}

/* ── 1. Coin saving: rate (coins per day) → total (adding up the bars) ── */
export function CoinStack() {
  const [day, setDay] = useState(3)
  const rate = (d: number) => d // day d → save d coins
  const total = (day * (day + 1)) / 2
  const W = 560, H = 230, bw = 50
  return (
    <div className="viz">
      <svg className="plot" viewBox={`0 0 ${W} ${H}`}>
        {Array.from({ length: 8 }, (_, i) => {
          const d = i + 1, h = rate(d) * 22, on = d <= day
          return (
            <g key={d}>
              <rect x={20 + i * (bw + 10)} y={H - 30 - h} width={bw} height={h} rx={6} fill={on ? '#f59e0b' : '#e5e7eb'} stroke="#b45309" strokeWidth={on ? 2 : 0} />
              <text x={20 + i * (bw + 10) + bw / 2} y={H - 30 - h - 6} textAnchor="middle" fontSize={16} fill="currentColor">{on ? '🪙'.repeat(Math.min(d, 1)) + d : d}</text>
              <text x={20 + i * (bw + 10) + bw / 2} y={H - 10} textAnchor="middle" fontSize={13} fill="currentColor">දවස {d}</text>
            </g>
          )
        })}
      </svg>
      <Slider label="📅 දවස" v={day} set={setDay} min={1} max={8} step={1} />
      <div className="say" style={{ fontSize: '1.1em' }}>
        දවස {day} දී දැම්මේ කාසි <b>{day}</b> යි (එදා <b>වේගය</b>). <br />
        කැටයේ <b>මුළු</b> කාසි = {Array.from({ length: day }, (_, i) => i + 1).join(' + ')} = <b>{total} 🪙</b>
        <br />👉 තැඹිලි තීරු <b>ඔක්කොම එකතු</b> කළාම මුළු ගණන ලැබෙනවා. ඒ කියන්නේ <b>තීරු වල වර්ගඵලය = මුළු එකතුව</b>!
      </div>
    </div>
  )
}

/* ── 2. Integral machine: step-by-step power rule for a·xⁿ ── */
export function IntegralMachine() {
  const [a, setA] = useState(3)
  const [n, setN] = useState(2)
  const [k, setK] = useState(0)
  const m = n + 1
  const coef = frac(a, m)
  const stages = [
    { tex: `\\int ${coefX(String(a), n)}\\,dx`, say: 'අපි අනුකලනය කරන්න ඕනේ මේක.' },
    { tex: `${a === 1 ? '' : a}\\cdot x^{${n}+1} = ${a === 1 ? '' : a}x^{${m}}`, say: `➕ උඩ අංකයට 1ක් එකතු කරන්න: ${n} + 1 = ${m}` },
    { tex: `\\frac{${a}x^{${m}}}{${m}}`, say: `➗ අලුත් අංකය ${m} න් බෙදන්න.` },
    { tex: `${coefX(coef, m)}`, say: `✂️ සුළු කරන්න: ${a} ÷ ${m} = ${a % m === 0 ? a / m : `${a}/${m}`}` },
    { tex: `${coefX(coef, m)} + C`, say: '✍️ + C ලියන්න! ඉවරයි 🎉' },
    { tex: `\\frac{d}{dx}\\Big(${coefX(coef, m)}\\Big) = ${coefX(String(a), n)}\\;\\checkmark`, say: '✅ පරීක්ෂා කිරීම: උත්තරය අවකලනය කළාම මුල් එකම ලැබෙනවා!' },
  ]
  const reset = (f: () => void) => { f(); setK(0) }
  return (
    <div className="viz card machine">
      <div style={{ textAlign: 'center', fontWeight: 800 }}>⚙️ අනුකලන යන්ත්‍රය</div>
      {stages.slice(0, k + 1).map((s, i) => (
        <div key={i} className="worked-step">
          <span className="recipe-n">{i}</span>
          <div style={{ flex: 1 }}>
            <div>{s.say}</div>
            <div style={{ fontSize: '1.2em' }}><Tex t={s.tex} block /></div>
          </div>
        </div>
      ))}
      <div className="row">
        {k < stages.length - 1 && <button className="btn" onClick={() => setK(k + 1)}>👉 ඊළඟ පියවර</button>}
        <button className="btn alt" onClick={() => setK(0)}>🔁 මුල සිට</button>
      </div>
      <Slider label="ඉස්සරහ අංකය (a)" v={a} set={(v) => reset(() => setA(v))} min={1} max={10} step={1} />
      <Slider label="උඩ අංකය (n)" v={n} set={(v) => reset(() => setN(v))} min={0} max={6} step={1} />
    </div>
  )
}

/* ── 3. Area finder: shade ∫_a^b f and compute F(b) − F(a) ── */
const FUNCS = [
  { key: 'x2', label: 'x²', f: (x: number) => x * x, F: (x: number) => (x ** 3) / 3, Ftex: '\\tfrac{x^3}{3}', max: 3, ymax: 9 },
  { key: '2x', label: '2x', f: (x: number) => 2 * x, F: (x: number) => x * x, Ftex: 'x^2', max: 4, ymax: 8 },
  { key: '3', label: '3', f: () => 3, F: (x: number) => 3 * x, Ftex: '3x', max: 5, ymax: 4 },
  { key: 'sin', label: 'sin x', f: Math.sin, F: (x: number) => -Math.cos(x), Ftex: '-\\cos x', max: Math.PI, ymax: 1.3 },
]
export function AreaFinder() {
  const [fi, setFi] = useState(0)
  const [a, setA] = useState(1)
  const [b, setB] = useState(2)
  const fn = FUNCS[fi]
  const lo = Math.min(a, b), hi = Math.max(a, b)
  const res = fn.F(hi) - fn.F(lo)
  const r = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(2))
  const choose = (i: number) => { setFi(i); setA(Math.min(1, FUNCS[i].max)); setB(Math.min(2, FUNCS[i].max)) }
  return (
    <div className="viz">
      <div className="row">{FUNCS.map((g, i) => <button key={g.key} className={`chip ${i === fi ? 'good' : ''}`} onClick={() => choose(i)}>f(x) = {g.label}</button>)}</div>
      <Plot xmin={-0.3} xmax={fn.max + 0.3} ymin={-0.5} ymax={fn.ymax + 0.5} H={260}>
        {(s) => {
          const N = 80
          let d = `M${s.sx(lo)},${s.sy(0)} `
          for (let i = 0; i <= N; i++) { const x = lo + ((hi - lo) * i) / N; d += `L${s.sx(x)},${s.sy(fn.f(x))} ` }
          d += `L${s.sx(hi)},${s.sy(0)} Z`
          return (
            <>
              <path d={d} fill="#22c55e" fillOpacity={0.45} />
              <path d={curve(fn.f, -0.3, fn.max + 0.3, s)} stroke="var(--c2)" strokeWidth={3} fill="none" />
              <line x1={s.sx(lo)} x2={s.sx(lo)} y1={s.sy(0)} y2={s.sy(fn.f(lo))} stroke="#dc2626" strokeWidth={3} />
              <line x1={s.sx(hi)} x2={s.sx(hi)} y1={s.sy(0)} y2={s.sy(fn.f(hi))} stroke="#dc2626" strokeWidth={3} />
              <text x={s.sx(lo) - 4} y={s.sy(0) + 18} fontSize={15} fill="#dc2626" fontWeight={800}>a</text>
              <text x={s.sx(hi) - 4} y={s.sy(0) + 18} fontSize={15} fill="#dc2626" fontWeight={800}>b</text>
            </>
          )
        }}
      </Plot>
      <Slider label="🔴 a (පටන් ගන්න තැන)" v={a} set={setA} min={0} max={fn.max} step={fn.key === 'sin' ? 0.01 : 0.5} />
      <Slider label="🔴 b (ඉවර වෙන තැන)" v={b} set={setB} min={0} max={fn.max} step={fn.key === 'sin' ? 0.01 : 0.5} />
      <div className="say" style={{ fontSize: '1.05em' }}>
        <Recipe2 lines={[
          <>ප්‍රතිව්‍යුත්පන්නය: F(x) = <Tex t={fn.Ftex} /></>,
          <>F(b) = F({r(hi)}) = <b>{r(fn.F(hi))}</b></>,
          <>F(a) = F({r(lo)}) = <b>{r(fn.F(lo))}</b></>,
          <>කොළ පාට ඉඩ = F(b) − F(a) = <b style={{ fontSize: '1.2em' }}>{r(res)}</b> 🎉</>,
        ]} />
      </div>
    </div>
  )
}
const Recipe2 = ({ lines }: { lines: React.ReactNode[] }) => <>{lines.map((l, i) => <div key={i}>{i + 1}. {l}</div>)}</>

/* ── 4. Split area: ∫_0^4 = ∫_0^c + ∫_c^4 ── */
export function SplitArea() {
  const [c, setC] = useState(1.5)
  const f = (x: number) => 0.4 * x * x + 0.5
  const F = (x: number) => (0.4 * x ** 3) / 3 + 0.5 * x
  const A1 = F(c) - F(0), A2 = F(4) - F(c)
  const shade = (lo: number, hi: number, s: { sx: (x: number) => number; sy: (y: number) => number }) => {
    let d = `M${s.sx(lo)},${s.sy(0)} `
    for (let i = 0; i <= 50; i++) { const x = lo + ((hi - lo) * i) / 50; d += `L${s.sx(x)},${s.sy(f(x))} ` }
    return d + `L${s.sx(hi)},${s.sy(0)} Z`
  }
  return (
    <div className="viz">
      <Plot xmin={-0.2} xmax={4.3} ymin={-0.3} ymax={7.5} H={240}>
        {(s) => (
          <>
            <path d={shade(0, c, s)} fill="#3b82f6" fillOpacity={0.5} />
            <path d={shade(c, 4, s)} fill="#f59e0b" fillOpacity={0.5} />
            <path d={curve(f, -0.2, 4.3, s)} stroke="#1e293b" strokeWidth={3} fill="none" />
            <line x1={s.sx(c)} x2={s.sx(c)} y1={s.sy(0)} y2={s.sy(f(c))} stroke="#dc2626" strokeWidth={3} strokeDasharray="6 4" />
          </>
        )}
      </Plot>
      <Slider label="✂️ කපන තැන c" v={c} set={setC} min={0.2} max={3.8} />
      <div className="say" style={{ fontSize: '1.1em' }}>
        🔵 0 සිට c = <b>{A1.toFixed(2)}</b> &nbsp; + &nbsp; 🟠 c සිට 4 = <b>{A2.toFixed(2)}</b> &nbsp; = &nbsp; මුළු එක <b>{(A1 + A2).toFixed(2)}</b>
        <br />👉 කොහෙන් කැපුවත් මුළු එක <b>හැම වෙලාවෙම එකමයි</b>! 🍫
      </div>
    </div>
  )
}

/* ── 5. Memory match game ── */
export function MemoryMatch({ pairs }: { pairs: [string, string][] }) {
  const deck = useMemo(() => {
    const cards = pairs.flatMap(([q, a], i) => [{ id: i * 2, pair: i, tex: q }, { id: i * 2 + 1, pair: i, tex: a }])
    for (let i = cards.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]] }
    return cards
  }, [pairs])
  const [open, setOpen] = useState<number[]>([])
  const [done, setDone] = useState<number[]>([])
  const [bad, setBad] = useState(false)
  const [tries, setTries] = useState(0)
  const click = (idx: number) => {
    if (bad || open.includes(idx) || done.includes(deck[idx].pair)) return
    const nxt = [...open, idx]
    setOpen(nxt)
    if (nxt.length === 2) {
      setTries((t) => t + 1)
      if (deck[nxt[0]].pair === deck[nxt[1]].pair) { setDone((d) => [...d, deck[idx].pair]); setOpen([]) }
      else { setBad(true); setTimeout(() => { setOpen([]); setBad(false) }, 1100) }
    }
  }
  const won = done.length === pairs.length
  return (
    <div className="viz">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 10 }}>
        {deck.map((c, i) => {
          const isDone = done.includes(c.pair), isOpen = open.includes(i)
          return (
            <button key={c.id} className={`mcard ${isDone ? 'done' : isOpen ? (bad ? 'bad' : 'open') : ''}`} onClick={() => click(i)}>
              {isDone || isOpen ? <Tex t={c.tex} /> : <span style={{ fontSize: '1.8em' }}>❓</span>}
            </button>
          )
        })}
      </div>
      <div className="say">
        {won ? <>🏆 ඔක්කොම ගැලපුවා! උත්සාහ {tries} කින්. නියමයි!</> : <>කාඩ් දෙකක් ඔබන්න. <b>අනුකලය</b> සහ ඒකේ <b>උත්තරය</b> ගලපන්න. (උත්සාහ: {tries})</>}
      </div>
    </div>
  )
}
