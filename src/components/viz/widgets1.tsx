import { useEffect, useState } from 'react'
import { Plot, curve, Slider } from './Plot'
import { Tex } from '../Lesson/Formula'

/** Simple play/pause ticker returning a value that loops from 0..max */
function useTicker(max: number, stepSize: number) {
  const [v, setV] = useState(0)
  const [play, setPlay] = useState(false)
  useEffect(() => {
    if (!play) return
    const id = setInterval(() => setV((x) => (x + stepSize > max ? 0 : x + stepSize)), 40)
    return () => clearInterval(id)
  }, [play, max, stepSize])
  return { v, setV, play, toggle: () => setPlay((p) => !p) }
}

/* 1. Secant -> tangent for f(x)=x^2 */
export function SecantToTangent() {
  const [x0, setX0] = useState(1)
  const [h, setH] = useState(2)
  const f = (x: number) => x * x
  const m = (f(x0 + h) - f(x0)) / h
  return (
    <div className="viz">
      <Plot xmin={-1} xmax={5} ymin={-1} ymax={10}>
        {(s) => (
          <>
            <path d={curve(f, -1, 5, s)} stroke="var(--c2)" strokeWidth={3} fill="none" />
            <line x1={s.sx(-1)} y1={s.sy(f(x0) + m * (-1 - x0))} x2={s.sx(5)} y2={s.sy(f(x0) + m * (5 - x0))} stroke="var(--c1)" strokeWidth={2.5} />
            <circle cx={s.sx(x0)} cy={s.sy(f(x0))} r={7} fill="var(--c3)" />
            <circle cx={s.sx(x0 + h)} cy={s.sy(f(x0 + h))} r={7} fill="var(--c4)" />
          </>
        )}
      </Plot>
      <Slider label="h (දෙවන ලක්ෂ්‍යයට දුර)" v={h} set={setH} min={0.02} max={3} />
      <Slider label="x (පළමු ලක්ෂ්‍යය)" v={x0} set={setX0} min={0} max={3} />
      <div className="say">
        රතු රේඛාවේ බෑවුම (slope) = <b>{m.toFixed(3)}</b> &nbsp;|&nbsp; සැබෑ අවකලය 2x = <b>{(2 * x0).toFixed(3)}</b>. h ඉතා කුඩා කළ විට දෙක සමාන වේ! 🎯
      </div>
    </div>
  )
}

/* 2. Slope tracer: f=sin, f' drawn as the point moves */
export function SlopeTracer() {
  const { v: x, setV: setX, play, toggle } = useTicker(6.28, 0.05)
  const m = Math.cos(x)
  return (
    <div className="viz">
      <Plot xmin={0} xmax={6.5} ymin={-1.5} ymax={1.5} H={260}>
        {(s) => (
          <>
            <path d={curve(Math.sin, 0, 6.5, s)} stroke="var(--c2)" strokeWidth={3} fill="none" />
            <path d={curve(Math.cos, 0, x, s, 100)} stroke="var(--c1)" strokeWidth={3} fill="none" strokeDasharray="6 4" />
            <line x1={s.sx(x - 1)} y1={s.sy(Math.sin(x) - m)} x2={s.sx(x + 1)} y2={s.sy(Math.sin(x) + m)} stroke="var(--c3)" strokeWidth={3} />
            <circle cx={s.sx(x)} cy={s.sy(Math.sin(x))} r={7} fill="var(--c3)" />
            <circle cx={s.sx(x)} cy={s.sy(m)} r={6} fill="var(--c1)" />
          </>
        )}
      </Plot>
      <div className="row">
        <button className="btn" onClick={toggle}>{play ? '⏸ නවත්වන්න' : '▶ ධාවනය'}</button>
      </div>
      <Slider label="x" v={x} set={setX} min={0} max={6.28} />
      <div className="say">
        🔵 නිල්: sin x &nbsp; 🔴 රතු (ඉරි): ඒ ලක්ෂ්‍යයේ බෑවුම = cos x = <b>{m.toFixed(2)}</b>. බෑවුම අඳින විට cos x ප්‍රස්තාරය හැදේ!
      </div>
    </div>
  )
}

/* 3. Car speedometer: distance s = t^2, speed = 2t */
export function CarSpeedometer() {
  const { v: t, setV: setT, play, toggle } = useTicker(5, 0.04)
  const s = t * t
  const v = 2 * t
  return (
    <div className="viz">
      <svg className="plot" viewBox="0 0 560 90">
        <rect x={0} y={60} width={560} height={30} fill="#64748b" />
        <text x={Math.min(500, 10 + s * 19)} y={56} fontSize={36}>🚗</text>
      </svg>
      <Plot xmin={0} xmax={5} ymin={0} ymax={25} H={220}>
        {(sc) => (
          <>
            <path d={curve((x) => x * x, 0, 5, sc)} stroke="var(--c2)" strokeWidth={3} fill="none" />
            <line x1={sc.sx(t - 0.8)} y1={sc.sy(s - v * 0.8)} x2={sc.sx(t + 0.8)} y2={sc.sy(s + v * 0.8)} stroke="var(--c1)" strokeWidth={3} />
            <circle cx={sc.sx(t)} cy={sc.sy(s)} r={7} fill="var(--c1)" />
          </>
        )}
      </Plot>
      <div className="row">
        <button className="btn" onClick={toggle}>{play ? '⏸' : '▶'} රථය ධාවනය</button>
      </div>
      <Slider label="කාලය t (තත්පර)" v={t} set={setT} min={0} max={5} />
      <div className="say">
        දුර s = t² = <b>{s.toFixed(1)} m</b>. වේගය (speedometer) = බෑවුම = 2t = <b>{v.toFixed(1)} m/s</b> 🏎️. වේගය = දුරේ අවකලය!
      </div>
    </div>
  )
}

/* 4. Power rule machine */
export function PowerRuleMachine() {
  const [n, setN] = useState(3)
  const [c, setC] = useState(1)
  const co = (k: number) => (k === 1 ? '' : String(k))
  return (
    <div className="viz card" style={{ textAlign: 'center' }}>
      <div className="row" style={{ justifyContent: 'center', fontSize: '1.4em' }}>
        <div><Tex t={`${co(c)}x^{${n}}`} /></div>
        <div style={{ fontSize: '2em' }}>➜</div>
        <div style={{ background: 'var(--p)', color: '#fff', borderRadius: 16, padding: '10px 16px', fontSize: '.7em' }}>
          ⚙️ අවකලන යන්ත්‍රය<br />බලය ඉදිරියට, බලයෙන් 1 අඩු කරන්න
        </div>
        <div style={{ fontSize: '2em' }}>➜</div>
        <div><Tex t={n === 0 ? '0' : `${co(c * n)}x^{${n - 1}}`} /></div>
      </div>
      <Slider label="බලය n" v={n} set={setN} min={0} max={8} step={1} />
      <Slider label="සංගුණකය a" v={c} set={setC} min={1} max={9} step={1} />
      <div className="say">උදා: x³ → 3·x² : බලය (3) ඉදිරියට පැනලා, ඉතිරි බලය 3−1 = 2 වෙනවා!</div>
    </div>
  )
}

/* 5. Chain gears */
export function ChainGears() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [on, setOn] = useState(true)
  const [ang, setAng] = useState(0)
  useEffect(() => {
    if (!on) return
    const id = setInterval(() => setAng((v) => v + 2), 30)
    return () => clearInterval(id)
  }, [on])
  const gear = (cx: number, r: number, rot: number, col: string) => (
    <g transform={`translate(${cx},100) rotate(${rot})`}>
      <circle r={r} fill={col} stroke="#0003" strokeWidth={3} strokeDasharray="10 6" />
      <circle r={r * 0.55} fill="#fff8" />
      <line x1={0} y1={0} x2={r * 0.8} y2={0} stroke="#000" strokeWidth={3} />
    </g>
  )
  return (
    <div className="viz">
      <svg className="plot" viewBox="0 0 560 200">
        {gear(110, 60, ang * a, 'var(--c2)')}
        {gear(250, 60, -ang * a * b, 'var(--c4)')}
        <text x={70} y={190} fontSize={14} fill="currentColor">ඇතුළු (inner) g</text>
        <text x={210} y={190} fontSize={14} fill="currentColor">පිටත (outer) f</text>
        <text x={340} y={108} fontSize={26} fill="currentColor">
          {a} × {b} = <tspan fill="#ef4444" fontWeight={700}>{a * b}</tspan>
        </text>
      </svg>
      <Slider label="ඇතුළු ශ්‍රිතයේ වේගය g′" v={a} set={setA} min={1} max={5} step={1} />
      <Slider label="පිටත ශ්‍රිතයේ වේගය f′" v={b} set={setB} min={1} max={5} step={1} />
      <button className="btn alt" onClick={() => setOn(!on)}>{on ? '⏸' : '▶'}</button>
      <div className="say">
        දාම නීතිය: මුළු වේගය = f′ × g′ = {b} × {a} = <b>{a * b}</b>. එක් ගියරයක් අනෙක කරකවයි!
      </div>
    </div>
  )
}
