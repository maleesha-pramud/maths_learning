import { differential } from './differential'
import { integral } from './integral'
import type { Question, Topic } from './types'
import { pickBalanced } from './quizLogic'
import type { Progress } from '../state/progress'

export const topics: Topic[] = [...differential, ...integral]
export const topicById = (id: string) => topics.find((t) => t.id === id)
export const topicNames: Record<string, string> = Object.fromEntries(topics.map((t) => [t.id, `${t.si} (${t.en})`]))

const passed = (p: Progress, id: string) => (p.stars[id] ?? 0) >= 1

export function isUnlocked(p: Progress, id: string): boolean {
  const t = topicById(id)
  if (t) return t.n === 1 || passed(p, topics[t.n - 2].id)
  if (id === 'sec-diff') return topics.filter((x) => x.section === 'diff').every((x) => passed(p, x.id))
  if (id === 'sec-int') return topics.filter((x) => x.section === 'int').every((x) => passed(p, x.id))
  if (id === 'final') return topics.every((x) => passed(p, x.id))
  return false
}

export const sectionTitle: Record<string, string> = {
  'sec-diff': 'අවකලන කොටසේ පරීක්ෂණය (Differential Test)',
  'sec-int': 'අනුකලන කොටසේ පරීක්ෂණය (Integral Test)',
  final: 'මහා විභාගය (Final Exam)',
}

const tag = (ids: string[]): Question[][] =>
  ids.map((id) => (topicById(id)?.quiz ?? []).map((q) => ({ ...q, topic: id }) as Question))

export function buildQuiz(id: string, rnd: () => number = Math.random): Question[] {
  const t = topicById(id)
  if (t) return t.quiz.map((q) => ({ ...q, topic: id }) as Question)
  const diff = topics.filter((x) => x.section === 'diff').map((x) => x.id)
  const int = topics.filter((x) => x.section === 'int').map((x) => x.id)
  if (id === 'sec-diff') return pickBalanced(tag(diff), 15, rnd)
  if (id === 'sec-int') return pickBalanced(tag(int), 15, rnd)
  if (id === 'final') return pickBalanced(tag([...diff, ...int]), 30, rnd)
  return []
}
