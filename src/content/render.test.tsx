import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { topics } from './topics'
import { LessonPlayer } from '../components/Lesson/LessonPlayer'
import { Home, SubjectPage, PracticePage, GlossaryPage, ProgressPage } from '../pages/pages'
import { ProgressProvider } from '../state/progress'
import { Routes, Route } from 'react-router-dom'

describe('every lesson step renders without throwing', () => {
  for (const t of topics) {
    for (let i = 0; i < t.steps.length; i++) {
      it(`${t.id} step ${i + 1}: ${t.steps[i].title}`, () => {
        const html = renderToString(<div>{t.steps[i].body}</div>)
        expect(html.length).toBeGreaterThan(20)
        expect(html).not.toContain('undefined')
        expect(html).not.toContain('NaN')
        expect(html).not.toContain('katex-error')
      })
    }
    it(`${t.id} player renders`, () => {
      expect(renderToString(<MemoryRouter><LessonPlayer topic={t} /></MemoryRouter>)).toContain(t.steps[0].title.slice(0, 3))
    })
  }
})

describe('pages render', () => {
  const wrap = (path: string, el: JSX.Element, route = path) => renderToString(
    <ProgressProvider><MemoryRouter initialEntries={[path]}><Routes><Route path={route} element={el} /></Routes></MemoryRouter></ProgressProvider>,
  )
  it('home lists both subjects', () => {
    const h = wrap('/', <Home />)
    expect(h).toContain('/subject/calc')
    expect(h).toContain('/subject/psr')
    expect(h).toContain('/subject/vec')
  })
  it('subject pages list their topics, section tests and final', () => {
    const psr = wrap('/subject/psr', <SubjectPage />, '/subject/:sid')
    for (const id of ['p1', 'p6', 's1', 's5', 'r1', 'r4', 'sec-prob', 'sec-series', 'sec-rec', 'final-psr']) expect(psr).toContain(id === 'sec-prob' || id.startsWith('sec') || id === 'final-psr' ? `/quiz/${id}` : `/lesson/${id}`)
    const vec = wrap('/subject/vec', <SubjectPage />, '/subject/:sid')
    for (const id of ['v1', 'v12']) expect(vec).toContain(`/lesson/${id}`)
    for (const id of ['sec-vbase', 'sec-vspace', 'sec-vbasis', 'sec-vmat', 'final-vec']) expect(vec).toContain(`/quiz/${id}`)
    const calc = wrap('/subject/calc', <SubjectPage />, '/subject/:sid')
    for (const id of ['t1', 't12']) expect(calc).toContain(`/lesson/${id}`)
    expect(calc).toContain('/quiz/final')
    expect(calc).not.toContain('/lesson/p1')
  })
  it('practice, glossary and progress render', () => {
    expect(wrap('/practice', <PracticePage />)).toContain('අභ්‍යාස')
    expect(wrap('/glossary', <GlossaryPage />)).toContain('Bayes')
    expect(wrap('/progress', <ProgressPage />)).toContain('final-psr'.length ? 'ප්‍රගතිය' : '')
  })
})

import katex from 'katex'
import { isValidElement, type ReactNode } from 'react'

/** Collect every LaTeX string in a lesson tree (Tex t=, Formula tex=, Worked start= and steps[].tex, ProbTree etc. are plain components). */
function collectTex(node: ReactNode, out: string[]) {
  if (Array.isArray(node)) return node.forEach((n) => collectTex(n, out))
  if (!isValidElement(node)) return
  const props = node.props as Record<string, unknown>
  for (const k of ['t', 'tex', 'start']) if (typeof props[k] === 'string') out.push(props[k] as string)
  if (Array.isArray(props.steps)) for (const s of props.steps as { tex?: string; say?: ReactNode }[]) { if (s && typeof s === 'object' && 'tex' in s && s.tex) out.push(s.tex); if (s && typeof s === 'object' && 'say' in s) collectTex(s.say as ReactNode, out) }
  collectTex(props.children as ReactNode, out)
}

describe('every LaTeX formula in every lesson compiles (including hidden worked-example steps)', () => {
  for (const t of topics) {
    it(`${t.id}`, () => {
      const all: string[] = []
      for (const s of t.steps) collectTex(s.body, all)
      expect(all.length).toBeGreaterThan(0)
      for (const tex of all) {
        expect(() => katex.renderToString(tex, { throwOnError: true, strict: 'ignore', displayMode: true }), tex).not.toThrow()
      }
    })
  }
})
