import type { Question } from './types'

export function isCorrect(q: Question, given: string | number): boolean {
  if (q.options) return given === q.answer
  const g = parseFloat(String(given).replace(',', '.').replace('−', '-'))
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
