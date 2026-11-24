import type { Question } from './types'

/** Parse "0.5", "-3", "1/2", "−3/4" (also unicode minus). Returns NaN if not a number. */
export function parseNum(input: string | number): number {
  if (typeof input === 'number') return input
  const t = input.trim().replace(',', '.').replace(/[−–]/g, '-').replace(/\s+/g, '')
  const m = t.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/)
  if (m) return Number(m[2]) === 0 ? NaN : Number(m[1]) / Number(m[2])
  return /^-?\d*\.?\d+$/.test(t) ? parseFloat(t) : NaN
}

export function isCorrect(q: Question, given: string | number): boolean {
  if (q.options) return given === q.answer
  const g = parseNum(given)
  return Number.isFinite(g) && Math.abs(g - Number(q.answer)) < 1e-6
}

export function scorePct(right: number, total: number) {
  return total === 0 ? 0 : Math.round((right / total) * 100)
}

/** Fisher-Yates shuffle with injectable rng (for tests). */
export function shuffle<T>(arr: T[], rnd: () => number = Math.random): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Pick `total` questions spread evenly across the groups. */
export function pickBalanced<T>(groups: T[][], total: number, rnd: () => number = Math.random): T[] {
  const pools = groups.map((g) => shuffle(g, rnd))
  const out: T[] = []
  let k = 0
  while (out.length < total && pools.some((p) => p.length)) {
    const p = pools[k % pools.length]
    if (p.length) out.push(p.pop() as T)
    k++
  }
  return shuffle(out, rnd)
}
