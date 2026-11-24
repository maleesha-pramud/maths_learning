import type { Question } from './types'

export type Rng = () => number
const ri = (r: Rng, a: number, b: number) => a + Math.floor(r() * (b - a + 1))

export interface Gen extends Question {
  /** numeric evaluator used by tests: the underlying function and the claimed answer meaning */
  check:
    | { kind: 'deriv'; f: (x: number) => number; at: number }
    | { kind: 'integral'; f: (x: number) => number; a: number; b: number }
    /** MCQ antiderivative: Fs[i] is option i; Fs[answer]' must equal f */
    | { kind: 'antideriv'; f: (x: number) => number; Fs: ((x: number) => number)[] }
  section: 'diff' | 'int'
}

/** Derivative of a x^n evaluated at x0 */
export function genPowerDeriv(r: Rng = Math.random): Gen {
  const a = ri(r, 1, 6), n = ri(r, 2, 5), x0 = ri(r, 1, 3)
  const f = (x: number) => a * x ** n
  return {
    q: `f(x) = ${a === 1 ? '' : a}x^${n} නම් x = ${x0} දී බෑවුම (f′(${x0})) කීයද?`,
    answer: a * n * x0 ** (n - 1),
    why: `f′(x) = ${a}·${n}·x^${n - 1} = ${a * n}x^${n - 1}. x = ${x0} ආදේශ කරන්න.`,
    check: { kind: 'deriv', f, at: x0 },
    section: 'diff',
  }
}

/** Derivative of a quadratic a x^2 + b x + c at x0 */
export function genPolyDeriv(r: Rng = Math.random): Gen {
  const a = ri(r, 1, 5), b = ri(r, 1, 9), c = ri(r, 1, 9), x0 = ri(r, 0, 4)
  const f = (x: number) => a * x * x + b * x + c
  return {
    q: `y = ${a}x² + ${b}x + ${c} නම් x = ${x0} දී dy/dx කීයද?`,
    answer: 2 * a * x0 + b,
    why: `dy/dx = ${2 * a}x + ${b}. නියතය ${c} → 0. x = ${x0} ⟹ ${2 * a * x0 + b}.`,
    check: { kind: 'deriv', f, at: x0 },
    section: 'diff',
  }
}

/** Chain rule: derivative of (m x + k)^p at x0 */
export function genChain(r: Rng = Math.random): Gen {
  const m = ri(r, 2, 4), k = ri(r, 1, 3), p = ri(r, 2, 4), x0 = ri(r, 0, 2)
  const f = (x: number) => (m * x + k) ** p
  return {
    q: `y = (${m}x + ${k})^${p} නම් x = ${x0} දී dy/dx කීයද?`,
    answer: p * m * (m * x0 + k) ** (p - 1),
    why: `දාම නීතිය: ${p}(${m}x+${k})^${p - 1} × ${m}. x = ${x0} ආදේශ කරන්න.`,
    check: { kind: 'deriv', f, at: x0 },
    section: 'diff',
  }
}

/** Definite integral of 2a x from p to q  = a (q^2 - p^2) */
export function genDefinite(r: Rng = Math.random): Gen {
  const a = ri(r, 1, 5), p = ri(r, 0, 2), q = p + ri(r, 1, 3)
  const f = (x: number) => 2 * a * x
  return {
    q: `∫ ${2 * a}x dx අගය සොයන්න, සීමා ${p} සිට ${q} දක්වා.`,
    answer: a * (q * q - p * p),
    why: `ප්‍රතිව්‍යුත්පන්නය ${a}x². [${a}x²] = ${a}(${q})² − ${a}(${p})² = ${a * (q * q - p * p)}.`,
    check: { kind: 'integral', f, a: p, b: q },
    section: 'int',
  }
}

/** Definite integral of 3a x^2 from 0 to k  = a k^3 */
export function genDefiniteQuad(r: Rng = Math.random): Gen {
  const a = ri(r, 1, 4), k = ri(r, 1, 3)
  const f = (x: number) => 3 * a * x * x
  return {
    q: `∫₀^${k} ${3 * a}x² dx = ?`,
    answer: a * k ** 3,
    why: `ප්‍රතිව්‍යුත්පන්නය ${a}x³. ${a} × ${k}³ = ${a * k ** 3}.`,
    check: { kind: 'integral', f, a: 0, b: k },
    section: 'int',
  }
}

/** shuffle options; returns options + index of the correct one (correct is items[0] before shuffle) */
function mcq<T>(r: Rng, items: T[]): { items: T[]; answer: number } {
  const idx = items.map((_, i) => i)
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]] }
  return { items: idx.map((i) => items[i]), answer: idx.indexOf(0) }
}
const sup = (n: number) => String(n).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c] ?? c).join('')
const xp = (n: number) => (n === 1 ? 'x' : `x${sup(n)}`)
const term = (c: number, n: number) => `${c === 1 ? '' : c}${xp(n)}`

/** ∫ a·xⁿ dx as MCQ with common-mistake distractors */
export function genIndefPower(r: Rng = Math.random): Gen {
  const n = ri(r, 2, 5), m = n + 1, a = m * ri(r, 1, 3) // keeps a/m whole
  const c = a / m
  const f = (x: number) => a * x ** n
  const opts: { t: string; F: (x: number) => number }[] = [
    { t: `${term(c, m)} + C`, F: (x) => c * x ** m },                                  // correct
    { t: `${term(a, m)} + C`, F: (x) => a * x ** m },                                  // forgot to divide
    { t: `${term(a * n, n - 1)} + C`, F: (x) => a * n * x ** (n - 1) },            // differentiated instead
    { t: `${a}${xp(m)}/${n} + C`, F: (x) => (a / n) * x ** m },                         // divided by old power
  ]
  const { items, answer } = mcq(r, opts)
  return {
    q: `∫ ${term(a, n)} dx = ?`,
    options: items.map((o) => o.t), answer,
    why: `➕ ${n} + 1 = ${m}, ➗ ${m}: ${a} ÷ ${m} = ${c}. ⟹ ${term(c, m)} + C`,
    check: { kind: 'antideriv', f, Fs: items.map((o) => o.F) },
    section: 'int',
  }
}

/** ∫ (a·x² + b·x + c) dx — MCQ */
export function genIndefPoly(r: Rng = Math.random): Gen {
  const a = 3 * ri(r, 1, 3), b = 2 * ri(r, 1, 4), k = ri(r, 1, 9)
  const f = (x: number) => a * x * x + b * x + k
  const A = a / 3, B = b / 2
  const opts: { t: string; F: (x: number) => number }[] = [
    { t: `${term(A, 3)} + ${term(B, 2)} + ${k}x + C`, F: (x) => A * x ** 3 + B * x * x + k * x },
    { t: `${term(a, 3)} + ${term(b, 2)} + ${k}x + C`, F: (x) => a * x ** 3 + b * x * x + k * x },
    { t: `${term(A, 3)} + ${term(B, 2)} + ${k} + C`, F: (x) => A * x ** 3 + B * x * x + k },
    { t: `${2 * a}x + ${b} + C`, F: (x) => a * x * x + b * x },
  ]
  const { items, answer } = mcq(r, opts)
  return {
    q: `∫ (${a}x² + ${b}x + ${k}) dx = ?`,
    options: items.map((o) => o.t), answer,
    why: `කෑලි වෙන වෙනම: ${a}x² → ${term(A, 3)}, ${b}x → ${term(B, 2)}, ${k} → ${k}x.`,
    check: { kind: 'antideriv', f, Fs: items.map((o) => o.F) },
    section: 'int',
  }
}

/** standard forms with a coefficient — MCQ */
export function genStandard(r: Rng = Math.random): Gen {
  const k = ri(r, 2, 6)
  const kinds = [
    { q: `${k} cos x`, f: (x: number) => k * Math.cos(x), opts: [
      { t: `${k} sin x + C`, F: (x: number) => k * Math.sin(x) },
      { t: `−${k} sin x + C`, F: (x: number) => -k * Math.sin(x) },
      { t: `${k} cos x + C`, F: (x: number) => k * Math.cos(x) },
    ], why: `cos → sin, ${k} එහෙමම.` },
    { q: `${k} sin x`, f: (x: number) => k * Math.sin(x), opts: [
      { t: `−${k} cos x + C`, F: (x: number) => -k * Math.cos(x) },
      { t: `${k} cos x + C`, F: (x: number) => k * Math.cos(x) },
      { t: `−${k} sin x + C`, F: (x: number) => -k * Math.sin(x) },
    ], why: `sin → −cos (− ලකුණ!), ${k} එහෙමම.` },
    { q: `${k}eˣ`, f: (x: number) => k * Math.exp(x), opts: [
      { t: `${k}eˣ + C`, F: (x: number) => k * Math.exp(x) },
      { t: `${k}xeˣ + C`, F: (x: number) => k * x * Math.exp(x) },
      { t: `eˣ + C`, F: (x: number) => Math.exp(x) },
    ], why: `eˣ → eˣ 🪞, ${k} එහෙමම.` },
    { q: `${k}/x`, f: (x: number) => k / x, opts: [
      { t: `${k} ln|x| + C`, F: (x: number) => k * Math.log(Math.abs(x)) },
      { t: `${k}/x² + C`, F: (x: number) => k / (x * x) },
      { t: `${k}x + C`, F: (x: number) => k * x },
    ], why: `1/x → ln|x|, ${k} එහෙමම.` },
  ]
  const kd = kinds[Math.floor(r() * kinds.length)]
  const { items, answer } = mcq(r, kd.opts)
  return {
    q: `∫ ${kd.q} dx = ?`,
    options: items.map((o) => o.t), answer, why: kd.why,
    check: { kind: 'antideriv', f: kd.f, Fs: items.map((o) => o.F) },
    section: 'int',
  }
}

export const generators = [genPowerDeriv, genPolyDeriv, genChain, genDefinite, genDefiniteQuad, genIndefPower, genIndefPoly, genStandard]
const diffGens = [genPowerDeriv, genPolyDeriv, genChain]
const intGens = [genDefinite, genDefiniteQuad, genIndefPower, genIndefPoly, genStandard]
export type PracticeMode = 'all' | 'diff' | 'int'
export const randomPractice = (r: Rng = Math.random, mode: PracticeMode = 'all'): Gen => {
  const pool = mode === 'diff' ? diffGens : mode === 'int' ? intGens : generators
  return pool[Math.floor(r() * pool.length)](r)
}
