import { createContext, createElement, useContext, useEffect, useState, ReactNode } from 'react'

export interface Progress { xp: number; stars: Record<string, number>; best: Record<string, number>; streak: number; lastDay: string; badges: string[] }
const KEY = 'ganitha-gamana-v1'
const empty = (): Progress => ({ xp: 0, stars: {}, best: {}, streak: 0, lastDay: '', badges: [] })

export function load(): Progress {
  try { const r = localStorage.getItem(KEY); if (r) return { ...empty(), ...JSON.parse(r) } } catch { /* ignore */ }
  return empty()
}
function save(p: Progress) { try { localStorage.setItem(KEY, JSON.stringify(p)) } catch { /* ignore */ } }

export const starsFor = (pct: number) => (pct >= 90 ? 3 : pct >= 80 ? 2 : pct >= 70 ? 1 : 0)
export const PASS = 70

export function applyResult(p: Progress, id: string, pct: number): Progress {
  const stars = starsFor(pct)
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 864e5).toDateString()
  const streak = p.lastDay === today ? p.streak : p.lastDay === yesterday ? p.streak + 1 : 1
  const badges = [...p.badges]
  if (stars === 3 && !badges.includes('star-' + id)) badges.push('star-' + id)
  return {
    ...p, streak, lastDay: today, badges,
    xp: p.xp + Math.round(pct / 2) + stars * 10,
    stars: { ...p.stars, [id]: Math.max(p.stars[id] ?? 0, stars) },
    best: { ...p.best, [id]: Math.max(p.best[id] ?? 0, pct) },
  }
}

interface Ctx { p: Progress; record: (id: string, pct: number) => void; addXp: (n: number) => void; reset: () => void }
const C = createContext<Ctx>(null as unknown as Ctx)
export const useProgress = () => useContext(C)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [p, setP] = useState<Progress>(load)
  useEffect(() => save(p), [p])
  const value: Ctx = {
    p,
    record: (id, pct) => setP((x) => applyResult(x, id, pct)),
    addXp: (n) => setP((x) => ({ ...x, xp: x.xp + n })),
    reset: () => setP(empty()),
  }
  return createElement(C.Provider, { value }, children)
}
