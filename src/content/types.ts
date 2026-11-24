import type { ReactNode } from 'react'
export type SectionId = 'diff' | 'int' | 'prob' | 'series' | 'rec' | 'vbase' | 'vspace' | 'vbasis' | 'vmat'
export type SubjectId = 'calc' | 'psr' | 'vec'
export interface Step { title: string; body: ReactNode }
export interface Question {
  q: string            // question text (Sinhala), may contain $latex$ is NOT supported - use plain text/unicode
  tex?: string         // optional KaTeX shown under the question
  options?: string[]   // MCQ options (plain text / unicode)
  answer: number | string // MCQ: index; numeric: number
  why: string          // Sinhala explanation
}
export interface Topic {
  id: string; n: number; icon: string; si: string; en: string; section: SectionId
  steps: Step[]; remember: string[]; mistakes: string[]; quiz: Question[]
}
