import { useEffect, useState } from 'react'
import { Plot, curve, Slider } from './Plot'

/* Staircase: slope = up ÷ forward */
export function StairsSlope() {
  const [up, setUp] = useState(2)
  const [fwd, setFwd] = useState(4)
  const n = 4
  const W = 560, H = 260, unit = 22
  const pts: string[] = []
  let x = 30, y = H - 20
  pts.push(`${x},${y}`)
  for (let i = 0; i < n; i++) {
    x += fwd * unit / 2; pts.push(`${x},${y}`)
    y -= up * unit / 2; pts.push(`${x},${y}`)
  }
  const s = up / fwd
  const face = s === 0 ? '😴 සමතලයි' : s < 0.5 ? '🙂 ලේසියි' : s <= 1 ? '😅 ටිකක් අමාරුයි' : '🧗 හරිම බෑවුම්!'
  return (
    <div className="viz">
      <svg className="plot" viewBox={`0 0 ${W} ${H}`}>
        <polyline points={pts.join(' ')} fill="none" stroke="#a16207" strokeWidth={6} strokeLinejoin="round" />
        <line x1={30 + fwd * unit / 2} y1={H - 20} x2={30 + fwd * unit / 2} y2={H - 20 - up * unit / 2} stroke="#dc2626" strokeWidth={4} />
        <line x1={30} y1={H - 14} x2={30 + fwd * unit / 2} y2={H - 14} stroke="#2563eb" strokeWidth={4} />
        <text x={x - 10} y={y - 8} fontSize={34}>🧒</text>
      </svg>
      <Slider label="🔴 එක පඩියක උස (උඩට)" v={up} set={setUp} min={0} max={6} step={1} />
      <Slider label="🔵 එක පඩියක දිග (ඉදිරියට)" v={fwd} set={setFwd} min={1} max={6} step={1} />
      <div className="say" style={{ fontSize: '1.15em' }}>
        බෑවුම = <span className="hl1">උඩට {up}</span> ÷ <span className="hl2">ඉදිරියට {fwd}</span> = <b>{s.toFixed(2)}</b> &nbsp; {face}
      </div>
    </div>
  )
}

/* Walk on a hill y = sin-ish; steepness meter */
export function HillWalker() {
  const [x, setX] = useState(1)
  const f = (t: number) => 2 + 1.6 * Math.sin(t * 0.9) + 0.25 * t
  const m = (f(x + 1e-3) - f(x - 1e-3)) / 2e-3
  const face = Math.abs(m) < 0.25 ? '😎 සමතලයි — බෑවුම 0 ට ළඟයි' : m > 0 ? (m > 1 ? '🧗 හරි අමාරුයි! උඩට යනවා' : '😅 උඩට යනවා') : m < -1 ? '🎢 වේගයෙන් පහළට!' : '😄 පහළට යනවා'
  return (
    <div className="viz">
      <Plot xmin={0} xmax={8} ymin={0} ymax={6} H={260}>
        {(s) => (
          <>
            <path d={curve(f, 0, 8, s) + ` L${s.sx(8)},${s.sy(0)} L${s.sx(0)},${s.sy(0)} Z`} fill="#bbf7d0" stroke="#16a34a" strokeWidth={3} />
            <line x1={s.sx(x - 1)} y1={s.sy(f(x) - m)} x2={s.sx(x + 1)} y2={s.sy(f(x) + m)} stroke="#dc2626" strokeWidth={4} strokeDasharray="8 5" />
            <text x={s.sx(x) - 16} y={s.sy(f(x)) - 4} fontSize={30}>🚶</text>
          </>
        )}
      </Plot>
      <Slider label="🚶 ඇවිදින්න (ඇදලා බලන්න)" v={x} set={setX} min={0.3} max={7.7} />
      <div className="say" style={{ fontSize: '1.15em' }}>
        මේ තැන බෑවුම = <b>{m.toFixed(2)}</b> &nbsp; {face}
        <br />රතු ඉරි රේඛාව = ඒ තැනින්ම “කන්ද කොච්චර බෑවුම්ද” කියන එක.
      </div>
    </div>
  )
}

/* Tap fills a bucket: total = rate × time (accumulation) */
export function BucketFill() {
  const [rate, setRate] = useState(2)
  const [t, setT] = useState(0)
  const [play, setPlay] = useState(false)
  useEffect(() => {
    if (!play) return
    const id = setInterval(() => setT((v) => {
      if (v >= 10) { setPlay(false); return 10 }
      return +(v + 0.1).toFixed(1)
    }), 60)
    return () => clearInterval(id)
  }, [play])
  const total = rate * t
  const level = Math.min(1, total / 50)
  return (
    <div className="viz">
      <svg className="plot" viewBox="0 0 560 240">
        <text x={60} y={60} fontSize={48}>🚰</text>
        {play && <rect x={92} y={66} width={6 + rate} height={110 - level * 100} fill="#60a5fa" />}
        <rect x={60} y={100} width={90} height={120} rx={8} fill="none" stroke="#475569" strokeWidth={5} />
        <rect x={63} y={217 - level * 114} width={84} height={level * 114} fill="#3b82f6" opacity={0.8} />
        <text x={200} y={90} fontSize={22} fill="currentColor">⏱️ කාලය: {t.toFixed(1)} මිනිත්තු</text>
        <text x={200} y={130} fontSize={22} fill="currentColor">💧 විනාඩියට ලීටර් {rate}</text>
        <text x={200} y={175} fontSize={26} fill="#2563eb" fontWeight={800}>🪣 මුළු වතුර = {total.toFixed(1)} L</text>
      </svg>
      <div className="row">
        <button className="btn" onClick={() => { if (t >= 10) setT(0); setPlay(!play) }}>{play ? '⏸ වහන්න' : '▶ කරාමය අරින්න'}</button>
        <button className="btn alt" onClick={() => { setPlay(false); setT(0) }}>🔁 හිස් කරන්න</button>
      </div>
      <Slider label="💧 වතුර වැටෙන වේගය (විනාඩියට ලීටර්)" v={rate} set={setRate} min={1} max={5} step={1} />
      <div className="say">වේගය × කාලය = මුළු ප්‍රමාණය. මේ “එකතු වෙන එක” හොයන එකට තමයි <b>අනුකලනය</b> කියන්නේ! 🪣</div>
    </div>
  )
}

/* Power rule as a jump: the power jumps down to the front */
export function PowerJump() {
  const [n, setN] = useState(3)
  const [jumped, setJumped] = useState(false)
  return (
    <div className="viz card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3.2em', fontFamily: 'serif', position: 'relative', height: 110, lineHeight: '110px' }}>
        <span style={{ display: 'inline-block', transition: 'all .8s', opacity: jumped ? 1 : 0, transform: jumped ? 'translateY(0)' : 'translateY(-40px)', color: '#dc2626', fontWeight: 800 }}>{n}</span>
        <span>x</span>
        <sup style={{ color: jumped ? '#16a34a' : '#dc2626', fontSize: '.55em', transition: 'all .8s' }}>{jumped ? n - 1 : n}</sup>
      </div>
      <div className="row" style={{ justifyContent: 'center' }}>
        <button className="btn" onClick={() => setJumped(!jumped)}>{jumped ? '🔁 ආපසු' : '🦘 බලය පනින්න!'}</button>
      </div>
      <Slider label="බලය (උඩ පොඩි අංකය)" v={n} set={(v) => { setN(v); setJumped(false) }} min={2} max={9} step={1} />
      <div className="say" style={{ fontSize: '1.1em' }}>
        {jumped
          ? <>🦘 <span className="hl1">{n}</span> ඉස්සරහට පැන්නා. උඩ ඉතුරු වුණේ <span className="hl3">{n} − 1 = {n - 1}</span>. ඉවරයි! 🎉</>
          : <>උඩ තියෙන <span className="hl1">{n}</span> පොඩි කැංගරුවෙක් වගේ. බටන් එක ඔබන්න!</>}
      </div>
    </div>
  )
}
