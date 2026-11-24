import { describe, expect, it } from 'vitest'
import { generators, type Gen } from './generators'
import { isCorrect, scorePct, pickBalanced } from './quizLogic'
import { topics, buildQuiz, isUnlocked } from './topics'
import { applyResult, starsFor, load } from '../state/progress'

// deterministic rng
const seeded = (seed: number) => () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296)

function numeric(g: Gen): number {
  const c = g.check
  if (c.kind === 'deriv') {
    const h = 1e-5
    return (c.f(c.at + h) - c.f(c.at - h)) / (2 * h)
  }
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
  it('section tests have 15', () => {
    expect(buildQuiz('sec-diff')).toHaveLength(15)
    expect(buildQuiz('sec-int')).toHaveLength(15)
  })
})

describe('quiz logic', () => {
  it('checks mcq and numeric answers', () => {
    expect(isCorrect({ q: '', options: ['a', 'b'], answer: 1, why: '' }, 1)).toBe(true)
    expect(isCorrect({ q: '', options: ['a', 'b'], answer: 1, why: '' }, 0)).toBe(false)
    expect(isCorrect({ q: '', answer: -0.75, why: '' }, '−0.75')).toBe(true)
    expect(isCorrect({ q: '', answer: 6, why: '' }, 'abc')).toBe(false)
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

describe('progress & unlocking', () => {
  it('unlocks next topic only after passing', () => {
    let p = load()
    expect(isUnlocked(p, 't1')).toBe(true)
    expect(isUnlocked(p, 't2')).toBe(false)
    p = applyResult(p, 't1', 60)
    expect(isUnlocked(p, 't2')).toBe(false)
    p = applyResult(p, 't1', 80)
    expect(isUnlocked(p, 't2')).toBe(true)
    expect(p.stars.t1).toBe(2)
  })
  it('final unlocks after all topics', () => {
    let p = load()
    expect(isUnlocked(p, 'final')).toBe(false)
    for (const t of topics) p = applyResult(p, t.id, 100)
    expect(isUnlocked(p, 'final')).toBe(true)
    expect(isUnlocked(p, 'sec-diff')).toBe(true)
  })
  it('survives missing localStorage', () => {
    expect(() => load()).not.toThrow()
  })
})
