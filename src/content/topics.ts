import { differential } from './differential'
import { integral } from './integral'
import { probability } from './probability'
import { series } from './series'
import { recursion } from './recursion'
import { vectors } from './vectors'
import type { Question, SectionId, SubjectId, Topic } from './types'
import { pickBalanced } from './quizLogic'
import type { Progress } from '../state/progress'

export const topics: Topic[] = [...differential, ...integral, ...probability, ...series, ...recursion, ...vectors]
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
  { id: 'vbase', subject: 'vec', si: 'මූලික දේවල්', en: 'Foundations', icon: '🧱', testId: 'sec-vbase' },
  { id: 'vspace', subject: 'vec', si: 'දෛශික අවකාශ සහ උප අවකාශ', en: 'Vector Spaces & Subspaces', icon: '🏠', testId: 'sec-vspace' },
  { id: 'vbasis', subject: 'vec', si: 'පාදකය සහ මානය', en: 'Basis & Dimension', icon: '🧩', testId: 'sec-vbasis' },
  { id: 'vmat', subject: 'vec', si: 'ඛණ්ඩාංක සහ න්‍යාස අවකාශ', en: 'Coordinates & Matrix Spaces', icon: '🧮', testId: 'sec-vmat' },
]
export const SUBJECTS: Subject[] = [
  { id: 'calc', icon: '📈', si: 'කලනය', en: 'Calculus', sections: ['diff', 'int'], finalId: 'final' },
  { id: 'psr', icon: '🎲', si: 'සම්භාවිතාව, ශ්‍රේණි සහ ප්‍රත්‍යාවර්තනය', en: 'Probability, Series & Recursion', sections: ['prob', 'series', 'rec'], finalId: 'final-psr' },
  { id: 'vec', icon: '🧭', si: 'දෛශික අවකාශ සහ උප අවකාශ', en: 'Vector Spaces & Subspaces', sections: ['vbase', 'vspace', 'vbasis', 'vmat'], finalId: 'final-vec' },
]
export const subjectById = (id: string) => SUBJECTS.find((s) => s.id === id)
export const sectionById = (id: string) => SECTIONS.find((s) => s.id === id)!
export const subjectOfTopic = (t: Topic): SubjectId => sectionById(t.section).subject
export const topicsOfSubject = (sid: SubjectId) => topics.filter((t) => subjectOfTopic(t) === sid)
export const topicsOfSection = (sec: SectionId) => topics.filter((t) => t.section === sec)

/** Everything is open: learners may start anywhere, in any order. Only unknown ids are "locked". */
export function isUnlocked(_p: Progress, id: string): boolean {
  return !!topicById(id) || SECTIONS.some((s) => s.testId === id) || SUBJECTS.some((s) => s.finalId === id)
}

export const sectionTitle: Record<string, string> = {
  'sec-diff': 'අවකලන කොටසේ පරීක්ෂණය (Differential Test)',
  'sec-int': 'අනුකලන කොටසේ පරීක්ෂණය (Integral Test)',
  'sec-prob': 'සම්භාවිතා පරීක්ෂණය (Probability Test)',
  'sec-series': 'ශ්‍රේණි පරීක්ෂණය (Series Test)',
  'sec-rec': 'අභ්‍යුහන පරීක්ෂණය (Induction & Recursion Test)',
  final: 'කලන මහා විභාගය (Calculus Final Exam)',
  'final-psr': 'සම්භාවිතා, ශ්‍රේණි සහ ප්‍රත්‍යාවර්තන මහා විභාගය (Final Exam)',
  'sec-vbase': 'මූලික දේවල් පරීක්ෂණය (Foundations Test)',
  'sec-vspace': 'දෛශික අවකාශ පරීක්ෂණය (Vector Spaces & Subspaces Test)',
  'sec-vbasis': 'පාදකය සහ මානය පරීක්ෂණය (Basis & Dimension Test)',
  'sec-vmat': 'ඛණ්ඩාංක සහ න්‍යාස අවකාශ පරීක්ෂණය (Coordinates & Matrix Spaces Test)',
  'final-vec': 'දෛශික අවකාශ මහා විභාගය (Vector Spaces Final Exam)',
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
