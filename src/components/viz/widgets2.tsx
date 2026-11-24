import { useEffect, useState } from 'react'
import { Plot, curve, Slider } from './Plot'
import { Tex } from '../Lesson/Formula'

/* 6. Implicit differentiation on circle x^2+y^2=r^2 : slope = -x/y */
export function ImplicitCircle() {
  const [deg, setDeg] = useState(40)
  const r = 4
  const a = (deg * Math.PI) / 180
  const x = r * Math.cos(a)
  const y = r * Math.sin(a)
  const m = -x / y
  return (
    <div className="viz">
      <Plot xmin={-6} xmax={6} ymin={-5} ymax={5} H={300}>
        {(s) => (
          <>
            <circle cx={s.sx(0)} cy={s.sy(0)} r={s.sx(r) - s.sx(0)} fill="none" stroke="var(--c2)" strokeWidth={3} />
            {Math.abs(y) > 0.05 && (
              <line x1={s.sx(x - 2)} y1={s.sy(y - 2 * m)} x2={s.sx(x + 2)} y2={s.sy(y + 2 * m)} stroke="var(--c1)" strokeWidth={3} />
            )}
            <circle cx={s.sx(x)} cy={s.sy(y)} r={7} fill="var(--c3)" />
          </>
        )}
      </Plot>
      <Slider label="ලක්ෂ්‍යයේ කෝණය (අංශක)" v={deg} set={setDeg} min={1} max={179} step={1} />
      <div className="say">
        x² + y² = 16 දෙපැත්තම අවකලනය: 2x + 2y·(dy/dx) = 0 ⟹ dy/dx = −x/y.<br />
        දැන් x = <b>{x.toFixed(2)}</b>, y = <b>{y.toFixed(2)}</b> ⟹ බෑවුම = <b>{m.toFixed(2)}</b> 🪜
      </div>
    </div>
  )
}

/* 7. Unit circle generating sine/cosine waves */
export function UnitCircleTrig() {
  const [t, setT] = useState(0.8)
  const [play, setPlay] = useState(false)
  useEffect(() => {
    if (!play) return
    const id = setInterval(() => setT((v) => (v + 0.04 > 6.28 ? 0 : v + 0.04)), 40)
    return () => clearInterval(id)
  }, [play])
  return (
    <div className="viz">
      <div className="row" style={{ alignItems: 'stretch' }}>
        <div style={{ flex: '1 1 220px' }}>
          <Plot xmin={-1.5} xmax={1.5} ymin={-1.5} ymax={1.5} W={260} H={260} grid={false}>
            {(s) => (
              <>
                <line x1={s.sx(-1.5)} x2={s.sx(1.5)} y1={s.sy(0)} y2={s.sy(0)} stroke="#8886" />
                <line y1={s.sy(-1.5)} y2={s.sy(1.5)} x1={s.sx(0)} x2={s.sx(0)} stroke="#8886" />
                <circle cx={s.sx(0)} cy={s.sy(0)} r={s.sx(1) - s.sx(0)} fill="none" stroke="var(--c2)" strokeWidth={3} />
                <line x1={s.sx(0)} y1={s.sy(0)} x2={s.sx(Math.cos(t))} y2={s.sy(Math.sin(t))} stroke="var(--c3)" strokeWidth={3} />
                <line x1={s.sx(Math.cos(t))} y1={s.sy(0)} x2={s.sx(Math.cos(t))} y2={s.sy(Math.sin(t))} stroke="var(--c1)" strokeWidth={3} />
                <line x1={s.sx(0)} y1={s.sy(0)} x2={s.sx(Math.cos(t))} y2={s.sy(0)} stroke="var(--c4)" strokeWidth={3} />
                <circle cx={s.sx(Math.cos(t))} cy={s.sy(Math.sin(t))} r={6} fill="var(--c3)" />
              </>
            )}
          </Plot>
        </div>
        <div style={{ flex: '2 1 300px' }}>
          <Plot xmin={0} xmax={6.5} ymin={-1.5} ymax={1.5} W={400} H={260}>
            {(s) => (
              <>
                <path d={curve(Math.sin, 0, t, s, 120)} stroke="var(--c1)" strokeWidth={3} fill="none" />
                <path d={curve(Math.cos, 0, t, s, 120)} stroke="var(--c4)" strokeWidth={3} fill="none" />
                <circle cx={s.sx(t)} cy={s.sy(Math.sin(t))} r={5} fill="var(--c1)" />
                <circle cx={s.sx(t)} cy={s.sy(Math.cos(t))} r={5} fill="var(--c4)" />
              </>
            )}
          </Plot>
        </div>
      </div>
      <div className="row"><button className="btn" onClick={() => setPlay(!play)}>{play ? '⏸' : '▶'} කරකවන්න</button></div>
      <Slider label="කෝණය t (රේඩියන)" v={t} set={setT} min={0} max={6.28} />
      <div className="say">
        🔴 sin t = උස = <b>{Math.sin(t).toFixed(2)}</b> &nbsp; 🟠 cos t = පළල = <b>{Math.cos(t).toFixed(2)}</b>. ලක්ෂ්‍යය වටයක් ගියාම තරංග දෙක හැදෙනවා 🌊
      </div>
    </div>
  )
}

/* 8. Antiderivative family with +C */
export function AntiderivativeFamily() {
  const [c, setC] = useState(0)
  const F = (k: number) => (x: number) => (x * x) / 2 + k
  const ks = [-4, -2, 0, 2, 4]
  return (
    <div className="viz">
      <Plot xmin={-4} xmax={4} ymin={-6} ymax={10}>
        {(s) => (
          <>
            {ks.map((k) => <path key={k} d={curve(F(k), -4, 4, s)} stroke="#8886" strokeWidth={2} fill="none" />)}
            <path d={curve(F(c), -4, 4, s)} stroke="var(--c1)" strokeWidth={4} fill="none" />
            {[-3, -2, -1, 0, 1, 2, 3].map((x) => (
              <line key={x} x1={s.sx(x - 0.3)} y1={s.sy(F(c)(x) - 0.3 * x)} x2={s.sx(x + 0.3)} y2={s.sy(F(c)(x) + 0.3 * x)} stroke="var(--c3)" strokeWidth={3} />
            ))}
          </>
        )}
      </Plot>
      <Slider label="C" v={c} set={setC} min={-5} max={5} step={0.5} />
      <div className="say">
        <Tex t={`\\int x\\,dx = \\tfrac{x^2}{2} + ${c}`} /> — C වෙනස් කළාම වක්‍රය උඩට/පහළට යනවා, නමුත් හැම x එකකම බෑවුම (කොළ ඉරි) එකමයි! ඒ නිසා C ඕනේ 🎢
      </div>
    </div>
  )
}

/* 9. Riemann rectangles for f(x)=x^2 on [0,3] (exact = 9) */
export function RiemannArea() {
  const [n, setN] = useState(4)
  const f = (x: number) => x * x
  const w = 3 / n
  const rects = Array.from({ length: n }, (_, i) => ({ x: i * w, h: f(i * w + w / 2) }))
  const sum = rects.reduce((a, r) => a + r.h * w, 0)
  return (
    <div className="viz">
      <Plot xmin={-0.5} xmax={3.5} ymin={-1} ymax={10}>
        {(s) => (
          <>
            {rects.map((r, i) => (
              <rect key={i} x={s.sx(r.x)} y={s.sy(r.h)} width={s.sx(w) - s.sx(0)} height={s.sy(0) - s.sy(r.h)} fill="var(--c4)" fillOpacity={0.55} stroke="var(--c1)" />
            ))}
            <path d={curve(f, -0.5, 3.5, s)} stroke="var(--c2)" strokeWidth={3} fill="none" />
          </>
        )}
      </Plot>
      <Slider label="සෘජුකෝණාස්‍ර ගණන n" v={n} set={setN} min={1} max={60} step={1} />
      <div className="say">
        සෘජුකෝණාස්‍රවල වර්ගඵල එකතුව = <b>{sum.toFixed(3)}</b> &nbsp;|&nbsp; නිවැරදි අනුකලය ∫₀³ x² dx = 3³/3 = <b>9</b>. n වැඩි කරන තරමට 9 ට ළං වෙනවා! 📐
      </div>
    </div>
  )
}

/* 10. Velocity -> distance : v(t)=2t, distance = area = t^2 */
export function VelocityToDistance() {
  const [t, setT] = useState(3)
  const v = (x: number) => 2 * x
  return (
    <div className="viz">
      <Plot xmin={0} xmax={6} ymin={0} ymax={13} H={260}>
        {(s) => (
          <>
            <polygon points={`${s.sx(0)},${s.sy(0)} ${s.sx(t)},${s.sy(0)} ${s.sx(t)},${s.sy(v(t))}`} fill="var(--c3)" fillOpacity={0.5} />
            <path d={curve(v, 0, 6, s)} stroke="var(--c2)" strokeWidth={3} fill="none" />
          </>
        )}
      </Plot>
      <Slider label="කාලය t (තත්පර)" v={t} set={setT} min={0} max={6} />
      <div className="say">
        🚌 බස් රථයේ වේගය v = 2t. කොළ තීරුවේ වර්ගඵලය = ½ × {t.toFixed(1)} × {(2 * t).toFixed(1)} = <b>{(t * t).toFixed(2)} m</b> = ගිය දුර!<br />
        ∫₀ᵗ 2x dx = t² ✔ — වේග ප්‍රස්තාරය යට වර්ගඵලය = දුර.
      </div>
    </div>
  )
}

/* 11. Partial fractions: 1/((x-a)(x-b)) = A/(x-a) + B/(x-b) */
export function PartialFractionSplit() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(3)
  const [split, setSplit] = useState(false)
  const bb = a === b ? b + 1 : b
  const A = 1 / (a - bb)
  const B = 1 / (bb - a)
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2))
  return (
    <div className="viz card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1.3em' }}>
        <Tex t={`\\dfrac{1}{(x-${a})(x-${bb})}`} block />
      </div>
      <div style={{ fontSize: '3em', transition: 'transform .5s', transform: split ? 'scale(1)' : 'scale(.9)' }}>{split ? '🍕✂️🍕' : '🍕'}</div>
      {split && (
        <div style={{ fontSize: '1.2em' }}>
          <Tex t={`= \\dfrac{${fmt(A)}}{x-${a}} + \\dfrac{${fmt(B)}}{x-${bb}}`} block />
          <Tex t={`\\int = ${fmt(A)}\\ln|x-${a}| + ${fmt(B)}\\ln|x-${bb}| + C`} block />
        </div>
      )}
      <button className="btn" onClick={() => setSplit(!split)}>{split ? '🔁 ආපසු' : '✂️ කඩන්න!'}</button>
      <Slider label="a" v={a} set={setA} min={-3} max={4} step={1} />
      <Slider label="b" v={bb} set={setB} min={-3} max={4} step={1} />
      <div className="say">විශාල පීසා එක කුඩා කෑලි දෙකකට කැපුවාම, එක කෑල්ලක් අනුකලනය කරන්න ලේසියි! A = 1/(a−b), B = 1/(b−a)</div>
    </div>
  )
}
