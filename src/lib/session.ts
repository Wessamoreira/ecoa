import { LEVEL_ORDER, cardsFor, levelOf, moduleById, type Audience, type Card, type Level } from '../data/index.ts'
import type { SrsCard } from './srs.ts'
import { isDue } from './srs.ts'

export interface Scope {
  audience: Audience
  moduleId?: string
  level?: Level
  favoritesOnly?: boolean
}

export function scopeCards(scope: Scope, favorites: Record<string, true> = {}) {
  let cards = scope.moduleId ? (moduleById.get(scope.moduleId)?.cards ?? []) : cardsFor(scope.audience)
  if (scope.level) cards = cards.filter((c) => levelOf(c) === scope.level)
  if (scope.favoritesOnly) cards = cards.filter((c) => favorites[c.id])
  return cards
}

/** Fila da sessão: revisões vencidas primeiro, depois cards novos (a partir do nível inicial) */
export function buildQueue(
  cards: Card[],
  srs: Record<string, SrsCard>,
  newLimit: number,
  startLevel?: Level,
  now = new Date(),
): { queue: Card[]; due: number; fresh: number } {
  const due = cards.filter((c) => srs[c.id] && isDue(srs[c.id], now)).sort((a, b) => +new Date(srs[a.id].dueAt) - +new Date(srs[b.id].dueAt))
  let unseen = cards.filter((c) => !srs[c.id])
  if (startLevel) {
    const min = LEVEL_ORDER.indexOf(startLevel)
    const ahead = unseen.filter((c) => LEVEL_ORDER.indexOf(levelOf(c)) >= min)
    const behind = unseen.filter((c) => LEVEL_ORDER.indexOf(levelOf(c)) < min)
    unseen = [...ahead, ...behind]
  }
  const fresh = unseen.slice(0, Math.max(0, newLimit))
  // Intercala: a cada 3 revisões, 1 card novo (sessões mais leves)
  const queue: Card[] = []
  let i = 0
  let j = 0
  while (i < due.length || j < fresh.length) {
    for (let k = 0; k < 3 && i < due.length; k++) queue.push(due[i++])
    if (j < fresh.length) queue.push(fresh[j++])
  }
  return { queue, due: due.length, fresh: fresh.length }
}

export function countDue(cards: Card[], srs: Record<string, SrsCard>, now = new Date()) {
  return cards.reduce((n, c) => n + (srs[c.id] && isDue(srs[c.id], now) ? 1 : 0), 0)
}
