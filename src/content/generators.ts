import type { Question } from './types'

export type Rng = () => number
const ri = (r: Rng, a: number, b: number) => a + Math.floor(r() * (b - a + 1))

export interface Gen extends Question {
  /** numeric evaluator used by tests: the underlying function and the claimed answer meaning */
  check: { kind: 'deriv'; f: (x: number) => number; at: number } | { kind: 'integral'; f: (x: number) => number; a: number; b: number }
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
  }
}

export const generators = [genPowerDeriv, genPolyDeriv, genChain, genDefinite, genDefiniteQuad]
export const randomPractice = (r: Rng = Math.random): Gen => generators[Math.floor(r() * generators.length)](r)
