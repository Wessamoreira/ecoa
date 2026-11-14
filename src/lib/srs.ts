/**
 * Repetição espaçada com FSRS-7 (ts-fsrs v6) — o algoritmo moderno usado pelo Anki.
 * Notas: 1 Errei · 2 Difícil · 3 Bom · 4 Fácil
 */
import { DefaultScheduler, Rating } from 'ts-fsrs'

/** Estado de memória de um card (formato FSRS-7 do ts-fsrs) */
export interface SrsCard {
  stability: number
  stabilityFast: number
  difficulty: number
  dueAt: Date
  lastReviewAt: Date | null
  state: number
  scheduleStatus: string
  cardId: string | number
  reps: number
  lapses: number
  scheduledDays: number
  learningStep?: number
}
export type Grade = 1 | 2 | 3 | 4

/** A tipagem do DefaultScheduler é uma união entre versões do modelo; usamos só o que importa */
interface Scheduler {
  newCard(o: { now: Date }): SrsCard
  review(o: { card: SrsCard; grade: Rating; now: Date }): { card: SrsCard }
  preview(o: { card: SrsCard; now: Date }): Iterable<{ grade: Rating; card: SrsCard }>
}

let scheduler: Promise<Scheduler> | undefined
export const getScheduler = () =>
  (scheduler ??= DefaultScheduler({
    version: 'FSRS-7',
    desiredRetention: 0.9,
    enableFuzz: true,
    enableShortTerm: true,
    learningSteps: ['1m', '10m'],
    relearningSteps: ['10m'],
    maximumInterval: 3 * 365,
  }) as unknown as Promise<Scheduler>)

const GRADE = { 1: Rating.Again, 2: Rating.Hard, 3: Rating.Good, 4: Rating.Easy } as const

export async function newSrsCard(now = new Date()) {
  return (await getScheduler()).newCard({ now })
}

export async function reviewCard(card: SrsCard, grade: Grade, now = new Date()) {
  const s = await getScheduler()
  return s.review({ card, grade: GRADE[grade], now }).card
}

/** Intervalo previsto para cada nota (para mostrar nos botões) */
export async function previewIntervals(card: SrsCard | undefined, now = new Date()) {
  const s = await getScheduler()
  const base = card ?? s.newCard({ now })
  const out: Record<Grade, string> = { 1: '', 2: '', 3: '', 4: '' }
  for (const p of s.preview({ card: base, now })) {
    out[p.grade as Grade] = formatInterval(new Date(p.card.dueAt).getTime() - now.getTime())
  }
  return out
}

export function formatInterval(ms: number) {
  const min = ms / 60000
  if (min < 1) return '<1 min'
  if (min < 60) return `${Math.round(min)} min`
  const h = min / 60
  if (h < 24) return `${Math.round(h)} h`
  const d = h / 24
  if (d < 30) return `${Math.round(d)} d`
  const mo = d / 30
  if (mo < 12) return `${Math.round(mo)} m`
  return `${(d / 365).toFixed(1)} a`
}

/** Datas viram strings em backups JSON — reconstrói Date */
export function reviveSrs(c: Record<string, unknown>): SrsCard {
  return {
    ...c,
    dueAt: new Date(c.dueAt as string),
    lastReviewAt: c.lastReviewAt ? new Date(c.lastReviewAt as string) : null,
  } as SrsCard
}

export const isDue = (c: SrsCard, now = new Date()) => new Date(c.dueAt).getTime() <= now.getTime()
/** "Dominado": estabilidade de memória acima de 21 dias */
export const isMastered = (c: SrsCard) => c.stability >= 21
