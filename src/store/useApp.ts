/**
 * Estado do aluno — salvo no próprio aparelho (IndexedDB via idb-keyval).
 * Nada sai do celular/computador: sem servidor, sem conta.
 */
import { create } from 'zustand'
import { persist, type PersistStorage } from 'zustand/middleware'
import { del, get, set } from 'idb-keyval'
import type { Audience, Level } from '../data/index.ts'
import type { Accent } from '../lib/speech.ts'
import { newSrsCard, reviewCard, reviveSrs, type Grade, type SrsCard } from '../lib/srs.ts'
import { addDays, dayKey } from '../lib/utils.ts'

export interface Settings {
  mode: Audience
  startLevel: Partial<Record<Audience, Level>>
  theme: 'system' | 'light' | 'dark'
  accent: Accent
  voiceURI?: string
  rate: number
  newPerDay: number
  dailyGoal: number
  autoplay: boolean
  name: string
  onboarded: boolean
}

export interface DayLog {
  reviews: number
  correct: number
  newCards: number
  quiz: number
  quizCorrect: number
  speak: number
  xp: number
}

interface Persisted {
  settings: Settings
  srs: Record<string, SrsCard>
  days: Record<string, DayLog>
  favorites: Record<string, true>
  lessonsRead: Record<string, true>
}

interface Actions {
  setSettings: (p: Partial<Settings>) => void
  review: (cardId: string, grade: Grade) => Promise<SrsCard>
  logQuiz: (correct: boolean) => void
  logSpeak: (score: number) => void
  toggleFavorite: (cardId: string) => void
  markLessonRead: (moduleId: string) => void
  importBackup: (json: string) => void
  resetProgress: () => void
}

export type AppState = Persisted & Actions & { hydrated: boolean }

const EMPTY_DAY: DayLog = { reviews: 0, correct: 0, newCards: 0, quiz: 0, quizCorrect: 0, speak: 0, xp: 0 }

const defaults: Persisted = {
  settings: {
    mode: 'adult',
    startLevel: {},
    theme: 'system',
    accent: 'en-US',
    rate: 1,
    newPerDay: 15,
    dailyGoal: 30,
    autoplay: true,
    name: '',
    onboarded: false,
  },
  srs: {},
  days: {},
  favorites: {},
  lessonsRead: {},
}

const idbStorage: PersistStorage<Persisted> = {
  getItem: async (name) => (await get(name)) ?? null,
  setItem: (name, value) => set(name, value),
  removeItem: (name) => del(name),
}

const bumpDay = (days: Record<string, DayLog>, patch: (d: DayLog) => DayLog) => {
  const k = dayKey()
  return { ...days, [k]: patch({ ...EMPTY_DAY, ...days[k] }) }
}

/** Espelho mínimo em localStorage para aplicar tema/modo antes do React carregar */
const writeBoot = (s: Settings) => {
  try {
    localStorage.setItem('ecoa-boot', JSON.stringify({ theme: s.theme, mode: s.mode }))
  } catch {}
}

export const useApp = create<AppState>()(
  persist(
    (setState, getState) => ({
      ...defaults,
      hydrated: false,
      setSettings: (p) => {
        const settings = { ...getState().settings, ...p }
        writeBoot(settings)
        setState({ settings })
      },
      review: async (cardId, grade) => {
        const prev = getState().srs[cardId]
        const isNew = !prev
        const base = prev ?? (await newSrsCard())
        const next = await reviewCard(base, grade)
        setState((s) => ({
          srs: { ...s.srs, [cardId]: next },
          days: bumpDay(s.days, (d) => ({
            ...d,
            reviews: d.reviews + 1,
            correct: d.correct + (grade >= 3 ? 1 : 0),
            newCards: d.newCards + (isNew ? 1 : 0),
            xp: d.xp + (grade === 1 ? 1 : grade + 1),
          })),
        }))
        return next
      },
      logQuiz: (correct) =>
        setState((s) => ({
          days: bumpDay(s.days, (d) => ({ ...d, quiz: d.quiz + 1, quizCorrect: d.quizCorrect + (correct ? 1 : 0), xp: d.xp + (correct ? 3 : 0) })),
        })),
      logSpeak: (score) =>
        setState((s) => ({ days: bumpDay(s.days, (d) => ({ ...d, speak: d.speak + 1, xp: d.xp + (score >= 80 ? 4 : score >= 50 ? 2 : 0) })) })),
      toggleFavorite: (id) =>
        setState((s) => {
          const favorites = { ...s.favorites }
          if (favorites[id]) delete favorites[id]
          else favorites[id] = true
          return { favorites }
        }),
      markLessonRead: (id) => setState((s) => ({ lessonsRead: { ...s.lessonsRead, [id]: true } })),
      importBackup: (json) => {
        const data = JSON.parse(json) as Partial<Persisted> & { app?: string }
        if (data.app !== 'ecoa' || !data.srs) throw new Error('Arquivo de backup inválido.')
        const srs = Object.fromEntries(Object.entries(data.srs).map(([k, v]) => [k, reviveSrs(v as never)]))
        const settings = { ...defaults.settings, ...data.settings }
        writeBoot(settings)
        setState({ settings, srs, days: data.days ?? {}, favorites: data.favorites ?? {}, lessonsRead: data.lessonsRead ?? {} })
      },
      resetProgress: () => setState({ srs: {}, days: {}, favorites: {}, lessonsRead: {} }),
    }),
    {
      name: 'ecoa-state',
      version: 1,
      storage: idbStorage,
      partialize: (s) => ({ settings: s.settings, srs: s.srs, days: s.days, favorites: s.favorites, lessonsRead: s.lessonsRead }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Persisted>
        return { ...current, ...p, settings: { ...defaults.settings, ...p.settings } }
      },
      onRehydrateStorage: () => (state) => {
        useApp.setState({ hydrated: true })
        if (state) writeBoot(state.settings)
      },
    },
  ),
)

export function exportBackup() {
  const { settings, srs, days, favorites, lessonsRead } = useApp.getState()
  return JSON.stringify({ app: 'ecoa', version: 1, exportedAt: new Date().toISOString(), settings, srs, days, favorites, lessonsRead })
}

// ───────────── Seletores derivados

export function streakOf(days: Record<string, DayLog>) {
  const active = (k: string) => {
    const d = days[k]
    return !!d && d.reviews + d.quiz + d.speak > 0
  }
  let streak = 0
  let cursor = new Date()
  if (!active(dayKey(cursor))) cursor = addDays(cursor, -1)
  while (active(dayKey(cursor))) {
    streak++
    cursor = addDays(cursor, -1)
  }
  return streak
}

export const today = (days: Record<string, DayLog>) => ({ ...EMPTY_DAY, ...days[dayKey()] })
