import { describe, expect, it } from 'vitest'
import { generators, randomPractice, type Gen } from './generators'
import { isCorrect, scorePct, pickBalanced, parseNum } from './quizLogic'
import { topics, buildQuiz, isUnlocked, SECTIONS, SUBJECTS, topicsOfSubject } from './topics'
import { applyResult, starsFor, load } from '../state/progress'

// deterministic rng
const seeded = (seed: number) => () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296)

/** max |F'(x) − f(x)| over a few sample points (x > 0 so ln|x| is fine) */
function antiderivError(F: (x: number) => number, f: (x: number) => number) {
  const h = 1e-5
  return Math.max(...[0.5, 1, 1.7, 2.3].map((x) => Math.abs((F(x + h) - F(x - h)) / (2 * h) - f(x))))
}

function numeric(g: Gen): number {
  const c = g.check
  if (c.kind === 'antideriv') {
    // correct option must differentiate back to f; every distractor must NOT
    c.Fs.forEach((F, i) => {
      const err = antiderivError(F, c.f)
      if (i === g.answer) expect(err).toBeLessThan(1e-3)
      else expect(err).toBeGreaterThan(1e-2)
    })
    expect(new Set(g.options).size).toBe(g.options!.length) // no duplicate option text
    return Number(g.answer)
  }
  if (c.kind === 'deriv') {
    const h = 1e-5
    return (c.f(c.at + h) - c.f(c.at - h)) / (2 * h)
  }
  if (c.kind === 'enum') return c.space.filter(c.pred).length / c.space.length
  if (c.kind === 'calc') return c.compute()
  const n = 2000, w = (c.b - c.a) / n
  let s = 0
  for (let i = 0; i < n; i++) s += c.f(c.a + (i + 0.5) * w) * w
  return s
}

describe('generators produce mathematically correct answers', () => {
  for (const gen of generators) {
    it(gen.name, () => {
      const r = seeded(7)
      for (let i = 0; i < 200; i++) {
        const g = gen(r)
        expect(numeric(g)).toBeCloseTo(Number(g.answer), 2)
      }
    })
  }
})

describe('quiz content', () => {
  it('integration and probability/series/recursion topics have at least 10 quiz questions', () => {
    for (const t of topics.filter((x) => x.section !== 'diff')) expect(t.quiz.length, t.id).toBeGreaterThanOrEqual(10)
  })
  it('topic ids are unique and each topic has steps, remember and mistakes', () => {
    expect(new Set(topics.map((t) => t.id)).size).toBe(topics.length)
    for (const t of topics) { expect(t.steps.length, t.id).toBeGreaterThanOrEqual(3); expect(t.remember.length).toBeGreaterThan(0); expect(t.mistakes.length).toBeGreaterThan(0) }
  })
  it('calculus has 12 topics, probability/series/recursion 15 and vector spaces 12', () => {
    expect(topicsOfSubject('calc')).toHaveLength(12)
    expect(topicsOfSubject('psr')).toHaveLength(15)
    expect(topicsOfSubject('vec')).toHaveLength(12)
  })
  it('every question is well-formed', () => {
    for (const t of topics) {
      expect(t.quiz.length).toBeGreaterThanOrEqual(6)
      for (const q of t.quiz) {
        if (q.options) {
          expect(typeof q.answer).toBe('number')
          expect(q.answer as number).toBeGreaterThanOrEqual(0)
          expect(q.answer as number).toBeLessThan(q.options.length)
        } else {
          expect(Number.isFinite(Number(q.answer))).toBe(true)
        }
        expect(q.why.length).toBeGreaterThan(3)
      }
    }
  })
  it('final exam has 30 questions across topics', () => {
    const f = buildQuiz('final')
    expect(f).toHaveLength(30)
  })
  it('section tests have 15 and subject finals have 30', () => {
    for (const sec of SECTIONS) expect(buildQuiz(sec.testId), sec.testId).toHaveLength(15)
    for (const sub of SUBJECTS) expect(buildQuiz(sub.finalId), sub.finalId).toHaveLength(30)
  })
  it('a subject final only draws that subject\'s questions', () => {
    const ids = new Set(topicsOfSubject('psr').map((t) => t.id))
    for (const q of buildQuiz('final-psr') as { topic?: string }[]) expect(ids.has(q.topic as string)).toBe(true)
  })
})

describe('quiz logic', () => {
  it('checks mcq and numeric answers', () => {
    expect(isCorrect({ q: '', options: ['a', 'b'], answer: 1, why: '' }, 1)).toBe(true)
    expect(isCorrect({ q: '', options: ['a', 'b'], answer: 1, why: '' }, 0)).toBe(false)
    expect(isCorrect({ q: '', answer: -0.75, why: '' }, '−0.75')).toBe(true)
    expect(isCorrect({ q: '', answer: 6, why: '' }, 'abc')).toBe(false)
  })
  it('accepts fraction answers', () => {
    expect(parseNum('1/2')).toBeCloseTo(0.5)
    expect(parseNum(' 3 / 4 ')).toBeCloseTo(0.75)
    expect(parseNum('−1/4')).toBeCloseTo(-0.25)
    expect(parseNum('1/0')).toBeNaN()
    expect(parseNum('1/')).toBeNaN()
    expect(isCorrect({ q: '', answer: 1 / 3, why: '' }, '1/3')).toBe(true)
    expect(isCorrect({ q: '', answer: 0.5, why: '' }, '2/4')).toBe(true)
    expect(isCorrect({ q: '', answer: 0.5, why: '' }, '1/3')).toBe(false)
  })
  it('scores', () => {
    expect(scorePct(7, 10)).toBe(70)
    expect(scorePct(0, 0)).toBe(0)
    expect(starsFor(95)).toBe(3)
    expect(starsFor(75)).toBe(1)
    expect(starsFor(69)).toBe(0)
  })
  it('pickBalanced draws evenly', () => {
    const out = pickBalanced([[1, 2, 3], [4, 5, 6]], 4, seeded(1))
    expect(out).toHaveLength(4)
  })
})

describe('progress & free navigation', () => {
  it('every lesson, section test and final is open from the start (no locks)', () => {
    const p = load()
    for (const t of topics) expect(isUnlocked(p, t.id), t.id).toBe(true)
    for (const sec of SECTIONS) expect(isUnlocked(p, sec.testId), sec.testId).toBe(true)
    for (const sub of SUBJECTS) expect(isUnlocked(p, sub.finalId), sub.finalId).toBe(true)
    expect(isUnlocked(p, 'not-a-real-id')).toBe(false)
  })
  it('passing records stars but never changes access', () => {
    let p = load()
    p = applyResult(p, 't1', 60)
    expect(p.stars.t1 ?? 0).toBe(0)
    p = applyResult(p, 't1', 80)
    expect(p.stars.t1).toBe(2)
    expect(isUnlocked(p, 'v7')).toBe(true)
  })
  it('practice modes only give questions from that section', () => {
    const r = seeded(3)
    for (const sec of SECTIONS) for (let i = 0; i < 40; i++) expect(randomPractice(r, sec.id).section).toBe(sec.id)
  })
  it('survives missing localStorage', () => {
    expect(() => load()).not.toThrow()
  })
})
