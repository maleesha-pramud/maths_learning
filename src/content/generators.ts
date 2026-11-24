import type { Question, SectionId } from './types'

export type Rng = () => number
const ri = (r: Rng, a: number, b: number) => a + Math.floor(r() * (b - a + 1))

export interface Gen extends Question {
  /** numeric evaluator used by tests: the underlying function and the claimed answer meaning */
  check:
    | { kind: 'deriv'; f: (x: number) => number; at: number }
    | { kind: 'integral'; f: (x: number) => number; a: number; b: number }
    /** MCQ antiderivative: Fs[i] is option i; Fs[answer]' must equal f */
    | { kind: 'antideriv'; f: (x: number) => number; Fs: ((x: number) => number)[] }
    /** probability by enumeration: answer must equal |{x in space: pred(x)}| / |space| */
    | { kind: 'enum'; space: unknown[]; pred: (x: any) => boolean }
    /** independent re-computation of the answer */
    | { kind: 'calc'; compute: () => number }
  section: SectionId
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


/* ─────────── Probability ─────────── */
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
const fr = (n: number, d: number) => { const g = gcd(n, d) || 1; return d / g === 1 ? `${n / g}` : `${n / g}/${d / g}` }
const pick = <T,>(r: Rng, a: T[]): T => a[Math.floor(r() * a.length)]
const sub = (n: number) => String(n).split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[+c]).join('')
const r1 = (x: number) => Math.round(x * 10) / 10
const r4 = (x: number) => Math.round(x * 10000) / 10000

export function genDieProb(r: Rng = Math.random): Gen {
  const events: { t: string; pred: (x: number) => boolean }[] = [
    { t: 'ඉරට්ටේ අගයක්', pred: (x) => x % 2 === 0 },
    { t: 'ඔත්තේ අගයක්', pred: (x) => x % 2 === 1 },
    { t: '4 ට වඩා ලොකු අගයක්', pred: (x) => x > 4 },
    { t: '3 ට අඩු අගයක්', pred: (x) => x < 3 },
    { t: '3 හි ගුණාකාරයක්', pred: (x) => x % 3 === 0 },
    { t: 'ප්‍රථමක සංඛ්‍යාවක් (2, 3, 5)', pred: (x) => [2, 3, 5].includes(x) },
  ]
  const e = pick(r, events)
  const space = [1, 2, 3, 4, 5, 6]
  const k = space.filter(e.pred).length
  return { q: `දාදු කැටයක් දැමුවාම ${e.t} ලැබෙන සම්භාවිතාව? (භාගයක් හෝ දශමයක්)`, answer: k / 6, why: `|A| = ${k}, |S| = 6 ⟹ P = ${k}/6 = ${fr(k, 6)}.`, check: { kind: 'enum', space, pred: e.pred }, section: 'prob' }
}

export function genCoinProb(r: Rng = Math.random): Gen {
  const n = ri(r, 2, 4), k = ri(r, 0, n)
  const space: string[] = []
  for (let m = 0; m < 2 ** n; m++) space.push(m.toString(2).padStart(n, '0'))
  const pred = (x: string) => x.split('').filter((c) => c === '1').length === k
  const cnt = space.filter(pred).length
  return { q: `කාසියක් ${n} වතාවක් දැමුවාම හරියටම Head ${k}ක් ලැබෙන සම්භාවිතාව? (භාගයක් හෝ දශමයක්)`, answer: cnt / 2 ** n, why: `|S| = 2^${n} = ${2 ** n}. ප්‍රතිඵල ${cnt}ක් අදාළයි ⟹ ${cnt}/${2 ** n} = ${fr(cnt, 2 ** n)}.`, check: { kind: 'enum', space, pred }, section: 'prob' }
}

export function genCardProb(r: Rng = Math.random): Gen {
  const suits = ['♠', '♥', '♦', '♣'], ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  const space: [string, string][] = []
  for (const s of suits) for (const k of ranks) space.push([s, k])
  const s1 = pick(r, suits), k1 = pick(r, ['A', 'K', 'Q', 'J', '7'])
  const kind = ri(r, 0, 2)
  const pred = kind === 0 ? (x: [string, string]) => x[0] === s1 : kind === 1 ? (x: [string, string]) => x[1] === k1 : (x: [string, string]) => x[1] === k1 || x[0] === s1
  const t = kind === 0 ? `${s1} පතක්` : kind === 1 ? `${k1} පතක්` : `${k1} හෝ ${s1} පතක්`
  const cnt = space.filter(pred).length
  return { q: `සම්පූර්ණ කාඩ් කුට්ටමකින් (52) අහඹු ලෙස ${t} ගැනීමේ සම්භාවිතාව? (භාගයක් හෝ දශමයක්)`, answer: cnt / 52, why: kind === 2 ? `(${k1}: 4) + (${s1}: 13) − (දෙකම: 1) = ${cnt} ⟹ ${cnt}/52 = ${fr(cnt, 52)}.` : `|A| = ${cnt}, |S| = 52 ⟹ ${fr(cnt, 52)}.`, check: { kind: 'enum', space, pred }, section: 'prob' }
}

export function genComplementProb(r: Rng = Math.random): Gen {
  const tenths = ri(r, 1, 9)
  const p = tenths / 10
  return { q: `P(A) = ${p} නම් P(A′) = ?`, answer: r1(1 - p), why: `P(A′) = 1 − ${p} = ${r1(1 - p)}.`, check: { kind: 'calc', compute: () => (10 - tenths) / 10 }, section: 'prob' }
}

export function genConditional(r: Rng = Math.random): Gen {
  const pB = pick(r, [0.5, 0.4, 0.8, 0.25]), c = pick(r, [0.2, 0.4, 0.5, 0.6, 0.75])
  const pAB = r4(pB * c)
  return { q: `P(A∩B) = ${pAB}, P(B) = ${pB} නම් P(A | B) = ?`, answer: c, why: `P(A|B) = P(A∩B)/P(B) = ${pAB} ÷ ${pB} = ${c}.`, check: { kind: 'calc', compute: () => pAB / pB }, section: 'prob' }
}

export function genIndependent(r: Rng = Math.random): Gen {
  const a = ri(r, 2, 9), b = ri(r, 2, 9)
  const ans = (a * b) / 100
  return { q: `A, B ස්වාධීන සිදුවීම්: P(A) = ${a / 10}, P(B) = ${b / 10}. P(A∩B) = ?`, answer: ans, why: `ස්වාධීන ⟹ P(A∩B) = P(A)·P(B) = ${a / 10} × ${b / 10} = ${ans}.`, check: { kind: 'calc', compute: () => (a * b) / 100 }, section: 'prob' }
}

export function genTotalProb(r: Rng = Math.random): Gen {
  const a = pick(r, [0.2, 0.4, 0.5, 0.6]), x = ri(r, 1, 9) / 10, y = ri(r, 1, 9) / 10
  const ans = r4(a * x + (1 - a) * y)
  const uA = Math.round(a * 100), uN = 100 - uA
  return { q: `P(A) = ${a}, P(A′) = ${r1(1 - a)}, P(B|A) = ${x}, P(B|A′) = ${y}. සම්පූර්ණ සම්භාවිතාව P(B) = ?`, answer: ans, why: `P(B) = ${x}×${a} + ${y}×${r1(1 - a)} = ${r4(x * a)} + ${r4(y * (1 - a))} = ${ans}.`, check: { kind: 'calc', compute: () => (uA * x + uN * y) / 100 }, section: 'prob' }
}

export function genBayes(r: Rng = Math.random): Gen {
  const [a, x, y, ans] = pick(r, [[0.4, 0.7, 0.2, 0.7], [0.5, 0.6, 0.2, 0.75], [0.5, 0.9, 0.1, 0.9], [0.5, 0.3, 0.1, 0.75]])
  const pB = r4(a * x + (1 - a) * y)
  return { q: `P(A) = ${a}, P(B|A) = ${x}, P(B|A′) = ${y}. බේස් ප්‍රමේයයෙන් P(A | B) = ?`, answer: ans, why: `P(B) = ${pB}. P(A|B) = (${x} × ${a}) ÷ ${pB} = ${r4(x * a)} ÷ ${pB} = ${ans}.`, check: { kind: 'calc', compute: () => (a * x) / (a * x + (1 - a) * y) }, section: 'prob' }
}

/* ─────────── Series ─────────── */
export function genArithTerm(r: Rng = Math.random): Gen {
  const a = ri(r, 1, 10), d = ri(r, 2, 6), n = ri(r, 5, 12)
  return { q: `${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, … හි ${n} වෙනි පදය?`, answer: a + (n - 1) * d, why: `aₙ = a + (n−1)d = ${a} + ${n - 1}×${d} = ${a + (n - 1) * d}.`, check: { kind: 'calc', compute: () => { let t = a; for (let i = 1; i < n; i++) t += d; return t } }, section: 'series' }
}
export function genArithSum(r: Rng = Math.random): Gen {
  const a = ri(r, 1, 8), d = ri(r, 1, 5), n = ri(r, 4, 12)
  const l = a + (n - 1) * d
  return { q: `${a} + ${a + d} + ${a + 2 * d} + … + ${l} හි එකතුව? (පද ${n}ක්)`, answer: (n * (a + l)) / 2, why: `Sₙ = n/2 (a + l) = ${n}/2 × (${a} + ${l}) = ${(n * (a + l)) / 2}.`, check: { kind: 'calc', compute: () => { let s = 0, t = a; for (let i = 0; i < n; i++) { s += t; t += d } return s } }, section: 'series' }
}
export function genGeoTerm(r: Rng = Math.random): Gen {
  const a = ri(r, 1, 5), g = ri(r, 2, 4), n = ri(r, 3, 6)
  return { q: `${a}, ${a * g}, ${a * g * g}, … (ගුණෝත්තර) හි ${n} වෙනි පදය?`, answer: a * g ** (n - 1), why: `aₙ = a·rⁿ⁻¹ = ${a} × ${g}^${n - 1} = ${a * g ** (n - 1)}.`, check: { kind: 'calc', compute: () => { let t = a; for (let i = 1; i < n; i++) t *= g; return t } }, section: 'series' }
}
export function genGeoSum(r: Rng = Math.random): Gen {
  const a = ri(r, 1, 5), g = ri(r, 2, 3), n = ri(r, 3, 6)
  return { q: `${a} + ${a * g} + ${a * g * g} + … පද ${n}ක එකතුව?`, answer: (a * (g ** n - 1)) / (g - 1), why: `Sₙ = a(rⁿ−1)/(r−1) = ${a}(${g}^${n} − 1)/${g - 1} = ${(a * (g ** n - 1)) / (g - 1)}.`, check: { kind: 'calc', compute: () => { let s = 0, t = a; for (let i = 0; i < n; i++) { s += t; t *= g } return s } }, section: 'series' }
}
export function genGeoInfinite(r: Rng = Math.random): Gen {
  const k = ri(r, 2, 5), m = ri(r, 1, 3), a = (k - 1) * m
  return { q: `${a} + ${a}/${k} + ${a}/${k * k} + … (අනන්තය දක්වා) එකතුව?`, answer: k * m, why: `r = 1/${k}, |r| < 1 ⟹ S = a/(1−r) = ${a} ÷ (${k - 1}/${k}) = ${k * m}.`, check: { kind: 'calc', compute: () => { let s = 0, t = a; for (let i = 0; i < 400; i++) { s += t; t /= k } return Math.round(s * 1e6) / 1e6 } }, section: 'series' }
}
export function genSigma(r: Rng = Math.random): Gen {
  const p = ri(r, 1, 3), n = ri(r, 3, 10)
  const f = p === 1 ? (n * (n + 1)) / 2 : p === 2 ? (n * (n + 1) * (2 * n + 1)) / 6 : ((n * (n + 1)) / 2) ** 2
  return { q: `Σ (i = 1 සිට ${n}) i${['', '', '²', '³'][p]} = ?`, answer: f, why: `සූත්‍රය: ${p === 1 ? 'n(n+1)/2' : p === 2 ? 'n(n+1)(2n+1)/6' : '[n(n+1)/2]²'} ⟹ ${f}.`, check: { kind: 'calc', compute: () => { let s = 0; for (let i = 1; i <= n; i++) s += i ** p; return s } }, section: 'series' }
}

/* ─────────── Recursion ─────────── */
export function genFactorial(r: Rng = Math.random): Gen {
  const n = ri(r, 3, 7)
  let f = 1; for (let i = 2; i <= n; i++) f *= i
  return { q: `${n}! = ?`, answer: f, why: `${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' × ')} = ${f}.`, check: { kind: 'calc', compute: () => { const rec = (k: number): number => (k === 0 ? 1 : k * rec(k - 1)); return rec(n) } }, section: 'rec' }
}
export function genFib(r: Rng = Math.random): Gen {
  const n = ri(r, 4, 11)
  const seq = [0, 1]; for (let i = 2; i <= n; i++) seq.push(seq[i - 1] + seq[i - 2])
  return { q: `Fibonacci: F₀ = 0, F₁ = 1, Fₙ = Fₙ₋₁ + Fₙ₋₂. F${sub(n)} = ?`, answer: seq[n], why: `අනුක්‍රමය: ${seq.join(', ')}.`, check: { kind: 'calc', compute: () => { const f = (k: number): number => (k < 2 ? k : f(k - 1) + f(k - 2)); return f(n) } }, section: 'rec' }
}
export function genRecSeq(r: Rng = Math.random): Gen {
  const a1 = ri(r, 1, 5), d = ri(r, 2, 5), k = ri(r, 4, 7), mul = r() < 0.5
  const m = ri(r, 2, 3)
  const seq = [a1]; for (let i = 1; i < k; i++) seq.push(mul ? seq[i - 1] * m : seq[i - 1] + d)
  return { q: `a₁ = ${a1}, aₙ = ${mul ? `${m}·aₙ₋₁` : `aₙ₋₁ + ${d}`}. a${sub(k)} = ?`, answer: seq[k - 1], why: `අනුක්‍රමය: ${seq.join(', ')}.`, check: { kind: 'calc', compute: () => { let t = a1; for (let i = 1; i < k; i++) t = mul ? t * m : t + d; return t } }, section: 'rec' }
}

/* ─────────── Vector spaces & subspaces ─────────── */
/** Gaussian elimination rank (floating, epsilon-guarded) */
function rankOf(M: number[][]): number {
  const A = M.map((row) => row.slice())
  const m = A.length, n = A[0].length
  let rank = 0
  for (let c = 0; c < n && rank < m; c++) {
    let p = rank
    for (let i = rank + 1; i < m; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i
    if (Math.abs(A[p][c]) < 1e-9) continue
    ;[A[rank], A[p]] = [A[p], A[rank]]
    for (let i = rank + 1; i < m; i++) {
      const f = A[i][c] / A[rank][c]
      for (let j = c; j < n; j++) A[i][j] -= f * A[rank][j]
    }
    rank++
  }
  return rank
}
const nz = (r: Rng, lo: number, hi: number) => { let v = 0; while (v === 0) v = ri(r, lo, hi); return v }

export function genVecAdd(r: Rng = Math.random): Gen {
  const a = ri(r, -5, 6), b = ri(r, -5, 6), c = ri(r, -5, 6), d = ri(r, -5, 6), first = r() < 0.5
  return { q: `u = (${a}, ${b}), v = (${c}, ${d}) නම් u + v හි ${first ? 'පළමු' : 'දෙවන'} සංරචකය (component) කීයද?`, answer: first ? a + c : b + d, why: `දෛශික එකතු කරන්නේ සංරචක එකින් එක: (${a}+${c}, ${b}+${d}) = (${a + c}, ${b + d}).`, check: { kind: 'calc', compute: () => { const s = [a, b].map((x, i) => x + [c, d][i]); return first ? s[0] : s[1] } }, section: 'vbase' }
}
export function genVecScale(r: Rng = Math.random): Gen {
  const k = nz(r, -3, 4), a = ri(r, -5, 6), b = ri(r, -5, 6), first = r() < 0.5
  return { q: `${k} · (${a}, ${b}) හි ${first ? 'පළමු' : 'දෙවන'} සංරචකය කීයද?`, answer: first ? k * a : k * b, why: `අදිශයෙන් (scalar) ගුණ කිරීම = සංරචක දෙකම ${k} න් ගුණ කිරීම: (${k * a}, ${k * b}).`, check: { kind: 'calc', compute: () => [a, b].map((x) => x * k)[first ? 0 : 1] }, section: 'vbase' }
}
export function genSubsetCount(r: Rng = Math.random): Gen {
  const n = ri(r, 2, 5), proper = r() < 0.5
  return { q: `කුලකයක අවයව ${n}ක් ඇත. එහි ${proper ? 'සංවෘත (proper) උපකුලක' : 'සියලු උපකුලක (හිස් කුලකය සහ කුලකයම ද ඇතුළුව)'} කීයද?`, answer: 2 ** n - (proper ? 1 : 0), why: `හැම අවයවයක්ම “ඇතුළත් / නැත” යන විකල්ප 2කින් එකක්: 2^${n} = ${2 ** n}${proper ? `. කුලකයම ඉවත් කළාම ${2 ** n - 1}.` : '.'}`, check: { kind: 'calc', compute: () => { let c = 0; for (let m = 0; m < 1 << n; m++) if (!proper || m !== (1 << n) - 1) c++; return c } }, section: 'vbase' }
}

interface PlaneSet { text: string; pred: (x: number, y: number) => boolean; why: string; ok: boolean }
export function genIsSubspace(r: Rng = Math.random): Gen {
  const a = ri(r, 1, 3), k = ri(r, 1, 5), rad = ri(r, 2, 4)
  const sets: PlaneSet[] = [
    { text: `x + ${a === 1 ? '' : a}y = 0`, pred: (x, y) => Math.abs(x + a * y) < 1e-9, ok: true, why: 'සමජාතීය (= 0) සමීකරණයක විසඳුම් කුලකයක් — ශූන්‍ය දෛශිකය ඇතුළුයි, එකතුවටත් ගුණනයටත් සංවෘතයි.' },
    { text: `x + ${a === 1 ? '' : a}y = ${k}`, pred: (x, y) => Math.abs(x + a * y - k) < 1e-9, ok: false, why: `(0, 0) ආදේශ කළොත් 0 = ${k} වැරදියි — ශූන්‍ය දෛශිකය නෑ.` },
    { text: 'x ≥ 0 සහ y ≥ 0', pred: (x, y) => x >= 0 && y >= 0, ok: false, why: 'සෘණ අදිශයෙන් (−1) ගුණ කළාම කොටසෙන් පිටතට යනවා.' },
    { text: 'x = 0 හෝ y = 0 (අක්ෂ දෙක)', pred: (x, y) => x === 0 || y === 0, ok: false, why: '(1, 0) + (0, 1) = (1, 1) කුලකයෙන් පිටත.' },
    { text: `y = ${a}x`, pred: (x, y) => Math.abs(y - a * x) < 1e-9, ok: true, why: 'මූල ලක්ෂ්‍යය හරහා යන රේඛාවක් — උප අවකාශයක්.' },
    { text: `x² + y² ≤ ${rad * rad}`, pred: (x, y) => x * x + y * y <= rad * rad, ok: false, why: 'දෙගුණ කළාම තැටියෙන් පිටතට යනවා — අදිශ ගුණනයට සංවෘත නෑ.' },
  ]
  const s = sets[ri(r, 0, sets.length - 1)]
  const pts: [number, number][] = []
  for (let x = -4; x <= 4; x++) for (let y = -4; y <= 4; y++) if (s.pred(x, y)) pts.push([x, y])
  return {
    q: `S = {(x, y) : ${s.text}} යනු ℝ² හි උප අවකාශයක්ද?`,
    options: ['ඔව් — උප අවකාශයකි', 'නැහැ — උප අවකාශයක් නොවේ'],
    answer: s.ok ? 0 : 1,
    why: s.why,
    check: { kind: 'calc', compute: () => (s.pred(0, 0) && pts.every(([x, y]) => [-1, 2, 3].every((c) => s.pred(c * x, c * y)) && pts.every(([u, v]) => s.pred(x + u, y + v))) ? 0 : 1) },
    section: 'vspace',
  }
}

export function genDet2(r: Rng = Math.random): Gen {
  const a = ri(r, -3, 5), b = ri(r, -3, 5), c = ri(r, -3, 5), d = ri(r, -3, 5)
  return { q: `u = (${a}, ${b}) සහ v = (${c}, ${d}) දෛශික වලින් සෑදෙන න්‍යාසයේ නිර්ණායකය (det) කීයද? [ u v ] = [[${a}, ${c}], [${b}, ${d}]]`, answer: a * d - b * c, why: `det = ad − bc = (${a})(${d}) − (${c})(${b}) = ${a * d - b * c}.`, check: { kind: 'calc', compute: () => { const M = [[a, c], [b, d]]; return M[0][0] * M[1][1] - M[0][1] * M[1][0] } }, section: 'vbasis' }
}
export function genIndepMCQ(r: Rng = Math.random): Gen {
  const a = nz(r, -3, 4), b = nz(r, -3, 4), dep = r() < 0.5, k = nz(r, -3, 3)
  const c = dep ? k * a : a + ri(r, 1, 3), d = dep ? k * b : b - ri(r, 1, 3)
  return { q: `(${a}, ${b}) සහ (${c}, ${d}) දෛශික ℝ² හි රේඛීයව ස්වායත්තද (linearly independent)?`, options: ['ඔව් — ස්වායත්තයි (පාදකයක් වේ)', 'නැහැ — පරායත්තයි'], answer: a * d - b * c !== 0 ? 0 : 1, why: `det = (${a})(${d}) − (${c})(${b}) = ${a * d - b * c}. ${a * d - b * c !== 0 ? '0 නොවේ ⟹ ස්වායත්තයි.' : '0 ⟹ එකම රේඛාවේ (සමාන්තරයි) ⟹ පරායත්තයි.'}`, check: { kind: 'calc', compute: () => (rankOf([[a, b], [c, d]]) === 2 ? 0 : 1) }, section: 'vbasis' }
}
export function genDimSpan(r: Rng = Math.random): Gen {
  const p = [nz(r, -2, 3), ri(r, -2, 3), ri(r, -2, 3)], q = [ri(r, -2, 3), nz(r, -2, 3), ri(r, -2, 3)]
  const cross = [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]]
  const indepPQ = cross.some((x) => x !== 0)
  const k = nz(r, -2, 2)
  const dependent = r() < 0.5
  const third = dependent ? [p[0] + k * q[0], p[1] + k * q[1], p[2] + k * q[2]] : [ri(r, -3, 3), ri(r, -3, 3), ri(r, -3, 3)]
  const det3 = third[0] * cross[0] + third[1] * cross[1] + third[2] * cross[2]
  const ans = indepPQ ? (det3 !== 0 ? 3 : 2) : rankOf([p, q, third])
  const s = (v: number[]) => `(${v.join(', ')})`
  return { q: `span{${s(p)}, ${s(q)}, ${s(third)}} හි මානය (dimension) කීයද?`, answer: ans, why: `තීරු තුන න්‍යාසයක් කර පේළි-ඌනනය (row reduction) කරන්න — ප්‍රධාන තීරු (pivots) ගණන = මානය = ${ans}.`, check: { kind: 'calc', compute: () => rankOf([p, q, third]) }, section: 'vbasis' }
}
export function genSolDim(r: Rng = Math.random): Gen {
  const n = ri(r, 3, 5), eq = ri(r, 1, 2)
  const rows: number[][] = []
  const first = Array.from({ length: n }, (_, i) => (i === 0 ? nz(r, 1, 3) : ri(r, -2, 3)))
  rows.push(first)
  if (eq === 2) rows.push(Array.from({ length: n }, (_, i) => (i === 0 ? 0 : i === 1 ? nz(r, 1, 3) : ri(r, -2, 3))))
  const fmt = (row: number[]) => row.map((c, i) => (c === 0 ? '' : `${c < 0 ? '−' : '+'}${Math.abs(c) === 1 ? '' : Math.abs(c)}x${'₁₂₃₄₅'[i]}`)).join(' ').replace(/^\+/, '')
  return { q: `ℝ${'⁰¹²³⁴⁵'[n]} හි ${rows.map((x) => `${fmt(x)} = 0`).join(' සහ ')} විසඳුම් කුලකයේ (උප අවකාශයේ) මානය කීයද?`, answer: n - eq, why: `ස්වායත්ත සමීකරණ ${eq}ක්, අඥාත ${n}ක් ⟹ නිදහස් විචල්‍ය (free variables) ${n} − ${eq} = ${n - eq}. මානය = ${n - eq}.`, check: { kind: 'calc', compute: () => n - rankOf(rows) }, section: 'vbasis' }
}

export function genCoords(r: Rng = Math.random): Gen {
  const std = r() < 0.5, p = ri(r, -4, 6), q = ri(r, -4, 6), first = r() < 0.5
  const v = std ? [p + q, p - q] : [p + q, q]
  const B = std ? [[1, 1], [1, -1]] : [[1, 0], [1, 1]]
  return {
    q: `B = {(${B[0].join(', ')}), (${B[1].join(', ')})} සහ v = (${v[0]}, ${v[1]}) නම් [v]_B හි ${first ? 'පළමු' : 'දෙවන'} ඛණ්ඩාංකය කීයද?`,
    answer: first ? p : q,
    why: `a(${B[0].join(', ')}) + b(${B[1].join(', ')}) = (${v[0]}, ${v[1]}) විසඳන්න ⟹ a = ${p}, b = ${q}. පරීක්ෂාව: ${p}(${B[0].join(', ')}) + ${q}(${B[1].join(', ')}) = (${v[0]}, ${v[1]}) ✔`,
    check: { kind: 'calc', compute: () => { const det = B[0][0] * B[1][1] - B[1][0] * B[0][1]; const a = (v[0] * B[1][1] - B[1][0] * v[1]) / det, b = (B[0][0] * v[1] - B[0][1] * v[0]) / det; return first ? a : b } },
    section: 'vmat',
  }
}
export function genToStd(r: Rng = Math.random): Gen {
  const p = ri(r, -3, 5), q = ri(r, -3, 5), first = r() < 0.5
  return { q: `B = {(1, 1), (1, −1)} සහ [v]_B = (${p}, ${q}) නම් සම්මත (standard) ඛණ්ඩාංක වලින් v හි ${first ? 'පළමු' : 'දෙවන'} සංරචකය කීයද?`, answer: first ? p + q : p - q, why: `v = ${p}(1, 1) + ${q}(1, −1) = (${p + q}, ${p - q}).`, check: { kind: 'calc', compute: () => { const P = [[1, 1], [1, -1]]; const c = [p, q]; return P[first ? 0 : 1][0] * c[0] + P[first ? 0 : 1][1] * c[1] } }, section: 'vmat' }
}
export function genNullity(r: Rng = Math.random): Gen {
  const m = ri(r, 2, 6), n = ri(r, 3, 8), rk = ri(r, 1, Math.min(m, n))
  return { q: `${m} × ${n} න්‍යාසයක (A) ශ්‍රේණිය (rank) ${rk} නම් ශූන්‍ය අවකාශයේ (Null(A)) මානය කීයද?`, answer: n - rk, why: `rank + nullity = n (තීරු ගණන) ⟹ nullity = ${n} − ${rk} = ${n - rk}.`, check: { kind: 'calc', compute: () => { const A = Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => (i < rk && i === j ? 1 : 0))); return n - rankOf(A) } }, section: 'vmat' }
}
export function genRankRows(r: Rng = Math.random): Gen {
  const r1 = [nz(r, 1, 3), ri(r, -2, 3), ri(r, 1, 4)], k = nz(r, 2, 3)
  const par = r() < 0.5
  const r3 = par ? r1.map((x) => -x) : [ri(r, -2, 3), nz(r, 1, 3) + r1[1], ri(r, -2, 3)]
  const M = [r1, r1.map((x) => k * x), r3]
  const rk = rankOf(M)
  return { q: `A = [[${M[0].join(', ')}], [${M[1].join(', ')}], [${M[2].join(', ')}]] හි තීරු අවකාශයේ (Col(A)) මානය (= rank) කීයද?`, answer: rk, why: `පේළි 2 = ${k} × පේළි 1 (අනවශ්‍යයි). ${rk === 1 ? 'පේළි 3 ද අලුත් දිශාවක් දෙන්නේ නෑ ⟹ rank 1.' : 'පේළි 3 වෙනස් දිශාවක් ⟹ rank 2.'}`, check: { kind: 'calc', compute: () => rankOf(M) }, section: 'vmat' }
}

const VBASE = [genVecAdd, genVecScale, genSubsetCount]
const VSPACE = [genIsSubspace]
const VBASIS = [genDet2, genIndepMCQ, genDimSpan, genSolDim]
const VMAT = [genCoords, genToStd, genNullity, genRankRows]
const PROB = [genDieProb, genCoinProb, genCardProb, genComplementProb, genConditional, genIndependent, genTotalProb, genBayes]
const SERIES = [genArithTerm, genArithSum, genGeoTerm, genGeoSum, genGeoInfinite, genSigma]
const REC = [genFactorial, genFib, genRecSeq]
export const generators = [genPowerDeriv, genPolyDeriv, genChain, genDefinite, genDefiniteQuad, genIndefPower, genIndefPoly, genStandard, ...PROB, ...SERIES, ...REC, ...VBASE, ...VSPACE, ...VBASIS, ...VMAT]
const POOLS: Record<SectionId, ((r: Rng) => Gen)[]> = {
  diff: [genPowerDeriv, genPolyDeriv, genChain],
  int: [genDefinite, genDefiniteQuad, genIndefPower, genIndefPoly, genStandard],
  prob: PROB, series: SERIES, rec: REC,
  vbase: VBASE, vspace: VSPACE, vbasis: VBASIS, vmat: VMAT,
}
export type PracticeMode = SectionId | 'all'
export const randomPractice = (r: Rng = Math.random, mode: PracticeMode = 'all'): Gen => {
  const pool = mode === 'all' ? generators : POOLS[mode]
  return pool[Math.floor(r() * pool.length)](r)
}
