import { differential } from './differential'
import { integral } from './integral'
import { probability } from './probability'
import { series } from './series'
import { recursion } from './recursion'
import type { Question, SectionId, SubjectId, Topic } from './types'
import { pickBalanced } from './quizLogic'
import type { Progress } from '../state/progress'

export const topics: Topic[] = [...differential, ...integral, ...probability, ...series, ...recursion]
export const topicById = (id: string) => topics.find((t) => t.id === id)
export const topicNames: Record<string, string> = Object.fromEntries(topics.map((t) => [t.id, `${t.si} (${t.en})`]))

export interface Section { id: SectionId; subject: SubjectId; si: string; en: string; icon: string; testId: string }
export interface Subject { id: SubjectId; icon: string; si: string; en: string; sections: SectionId[]; finalId: string }

export const SECTIONS: Section[] = [
  { id: 'diff', subject: 'calc', si: 'අවකලනය', en: 'Differential Calculus', icon: '🔍', testId: 'sec-diff' },
  { id: 'int', subject: 'calc', si: 'අනුකලනය', en: 'Integral Calculus', icon: '🧺', testId: 'sec-int' },
  { id: 'prob', subject: 'psr', si: 'සම්භාවිතාව', en: 'Probability', icon: '🎲', testId: 'sec-prob' },
  { id: 'series', subject: 'psr', si: 'ශ්‍රේණි', en: 'Series', icon: '🪜', testId: 'sec-series' },
  { id: 'rec', subject: 'psr', si: 'අභ්‍යුහනය සහ ප්‍රත්‍යාවර්තනය', en: 'Induction & Recursion', icon: '🔁', testId: 'sec-rec' },
]
export const SUBJECTS: Subject[] = [
  { id: 'calc', icon: '📈', si: 'කලනය', en: 'Calculus', sections: ['diff', 'int'], finalId: 'final' },
  { id: 'psr', icon: '🎲', si: 'සම්භාවිතාව, ශ්‍රේණි සහ ප්‍රත්‍යාවර්තනය', en: 'Probability, Series & Recursion', sections: ['prob', 'series', 'rec'], finalId: 'final-psr' },
]
export const subjectById = (id: string) => SUBJECTS.find((s) => s.id === id)
export const sectionById = (id: string) => SECTIONS.find((s) => s.id === id)!
export const subjectOfTopic = (t: Topic): SubjectId => sectionById(t.section).subject
export const topicsOfSubject = (sid: SubjectId) => topics.filter((t) => subjectOfTopic(t) === sid)
export const topicsOfSection = (sec: SectionId) => topics.filter((t) => t.section === sec)

const passed = (p: Progress, id: string) => (p.stars[id] ?? 0) >= 1

export function isUnlocked(p: Progress, id: string): boolean {
  const t = topicById(id)
  if (t) {
    const list = topicsOfSubject(subjectOfTopic(t))
    const i = list.findIndex((x) => x.id === id)
    return i === 0 || passed(p, list[i - 1].id)
  }
  const sec = SECTIONS.find((s) => s.testId === id)
  if (sec) return topicsOfSection(sec.id).every((x) => passed(p, x.id))
  const sub = SUBJECTS.find((s) => s.finalId === id)
  if (sub) return topicsOfSubject(sub.id).every((x) => passed(p, x.id))
  return false
}

export const sectionTitle: Record<string, string> = {
  'sec-diff': 'අවකලන කොටසේ පරීක්ෂණය (Differential Test)',
  'sec-int': 'අනුකලන කොටසේ පරීක්ෂණය (Integral Test)',
  'sec-prob': 'සම්භාවිතා පරීක්ෂණය (Probability Test)',
  'sec-series': 'ශ්‍රේණි පරීක්ෂණය (Series Test)',
  'sec-rec': 'අභ්‍යුහන පරීක්ෂණය (Induction & Recursion Test)',
  final: 'කලන මහා විභාගය (Calculus Final Exam)',
  'final-psr': 'සම්භාවිතා, ශ්‍රේණි සහ ප්‍රත්‍යාවර්තන මහා විභාගය (Final Exam)',
}

const tag = (ids: string[]): Question[][] =>
  ids.map((id) => (topicById(id)?.quiz ?? []).map((q) => ({ ...q, topic: id }) as Question))

export function buildQuiz(id: string, rnd: () => number = Math.random): Question[] {
  const t = topicById(id)
  if (t) return t.quiz.map((q) => ({ ...q, topic: id }) as Question)
  const sec = SECTIONS.find((s) => s.testId === id)
  if (sec) return pickBalanced(tag(topicsOfSection(sec.id).map((x) => x.id)), 15, rnd)
  const sub = SUBJECTS.find((s) => s.finalId === id)
  if (sub) return pickBalanced(tag(topicsOfSubject(sub.id).map((x) => x.id)), 30, rnd)
  return []
}
