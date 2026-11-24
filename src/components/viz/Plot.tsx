import type { ReactNode } from 'react'

export interface Scale {
  sx: (x: number) => number
  sy: (y: number) => number
  W: number
  H: number
}
interface P {
  xmin: number
  xmax: number
  ymin: number
  ymax: number
  W?: number
  H?: number
  grid?: boolean
  children: (s: Scale) => ReactNode
}

export function Plot({ xmin, xmax, ymin, ymax, W = 560, H = 320, children, grid = true }: P) {
  const sx = (x: number) => ((x - xmin) / (xmax - xmin)) * W
  const sy = (y: number) => H - ((y - ymin) / (ymax - ymin)) * H
  const xs: number[] = []
  const ys: number[] = []
  for (let x = Math.ceil(xmin); x <= xmax; x++) xs.push(x)
  for (let y = Math.ceil(ymin); y <= ymax; y++) ys.push(y)
  return (
    <svg className="plot" viewBox={`0 0 ${W} ${H}`}>
      {grid && xs.map((x) => <line key={'x' + x} x1={sx(x)} x2={sx(x)} y1={0} y2={H} stroke="#8884" strokeWidth={x === 0 ? 2 : 0.6} />)}
      {grid && ys.map((y) => <line key={'y' + y} y1={sy(y)} y2={sy(y)} x1={0} x2={W} stroke="#8884" strokeWidth={y === 0 ? 2 : 0.6} />)}
      {children({ sx, sy, W, H })}
    </svg>
  )
}

export function curve(f: (x: number) => number, a: number, b: number, s: Scale, n = 200, clip = 1e3) {
  let d = ''
  let pen = false
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n
    const y = f(x)
    if (!isFinite(y) || Math.abs(y) > clip) {
      pen = false
      continue
    }
    d += `${pen ? 'L' : 'M'}${s.sx(x).toFixed(1)},${s.sy(y).toFixed(1)} `
    pen = true
  }
  return d
}

export const Slider = ({ label, v, set, min, max, step = 0.01 }: { label: string; v: number; set: (n: number) => void; min: number; max: number; step?: number }) => (
  <label style={{ display: 'block', margin: '6px 0' }}>
    {label}: <b>{Number(v.toFixed(2))}</b>
    <input type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(+e.target.value)} />
  </label>
)
