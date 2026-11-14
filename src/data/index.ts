import { kidsModules } from './kids.ts'
import { a1Modules } from './a1.ts'
import { a2Modules } from './a2.ts'
import { b1Modules } from './b1.ts'
import { b2c1Modules } from './b2c1.ts'
import { adultModules, teenModules } from './tracks.ts'
import { kidsModules2 } from './kids2.ts'
import { a1Modules2, a2Modules2 } from './core2.ts'
import { b1Modules2, b2c1Modules2 } from './core3.ts'
import { adultModules2, teenModules2 } from './tracks2.ts'
import { DIALOGUES } from './dialogues.ts'
import type { Audience, Card, Level, Module } from './types.ts'

export type { Audience, Card, Dialogue, Level, Module } from './types.ts'

export const LEVEL_ORDER: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1']

export interface AudienceInfo {
  id: Audience
  label: string
  short: string
  tagline: string
  emoji: string
  levels: Level[]
  levelNames: Partial<Record<Level, string>>
}

export const AUDIENCES: AudienceInfo[] = [
  {
    id: 'kids', label: 'Criança', short: 'Kids', emoji: '🧒', tagline: 'De 6 a 11 anos · imagens, sons e frases curtas',
    levels: ['A1', 'A2', 'B1'],
    levelNames: { A1: 'Primeiras palavras', A2: 'Pequeno explorador', B1: 'Aventureiro' },
  },
  {
    id: 'teen', label: 'Adolescente', short: 'Teen', emoji: '🎧', tagline: 'De 12 a 17 anos · escola, games, redes e gírias',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    levelNames: { A1: 'Iniciante', A2: 'Básico', B1: 'Intermediário', B2: 'Intermediário avançado', C1: 'Avançado' },
  },
  {
    id: 'adult', label: 'Adulto', short: 'Adulto', emoji: '💼', tagline: 'Viagem, trabalho, e-mails e fluência real',
    levels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    levelNames: { A1: 'Iniciante', A2: 'Básico', B1: 'Intermediário', B2: 'Intermediário avançado', C1: 'Avançado' },
  },
]

export const audienceInfo = (a: Audience) => AUDIENCES.find((x) => x.id === a)!

const lvl = (l: Level) => LEVEL_ORDER.indexOf(l)

/** Ordem pedagógica dentro de cada nível (módulos não listados vão para o fim do nível) */
const ORDER = [
  // Criança
  'k-hello', 'k-colors', 'k-numbers', 'k-shapes', 'k-animals', 'k-family', 'k-body', 'k-food', 'k-school', 'k-tobe',
  'k-actions', 'k-house', 'k-where', 'k-clothes', 'k-veggies', 'k-numbers2', 'k-weather', 'k-feelings', 'k-toys', 'k-transport', 'k-sports', 'k-can',
  'k-routine', 'k-opposites', 'k-town', 'k-nature', 'k-space', 'k-jobs', 'k-past',
  // A1
  'a1-tobe', 'a1-survival', 'a1-pronouns', 'a1-articles', 'a1-questions', 't-hobbies', 'a1-family', 'a1-regular', 'a1-present', 'a1-adjectives', 'a1-place', 'a1-numbers',
  // A2
  'a2-routine', 'a2-now', 'a2-irregular', 'a2-pastcont', 'a2-food', 'a2-shopping', 'a2-quantity', 'a2-directions', 'a2-health', 'ad-travel', 'ad-housing', 't-school', 't-movies',
  // B1
  'b1-perfect', 'b1-modals', 'b1-conditionals', 'b1-compare', 'b1-gerund', 'b1-relative', 'b1-ed-ing', 'b1-makedo', 'b1-personality', 'b1-false-friends', 't-social', 'ad-work', 'ad-emails', 'ad-calls',
  // B2
  'b2-phrasal', 'b2-phrasal2', 'b2-connectors', 'b2-opinion', 'b2-passive', 't-slang', 'ad-meetings',
  // C1
  'c1-idioms', 'c1-collocations', 'c1-advanced', 'c1-academic', 'c1-nuance', 'ad-business',
]
const rank = (id: string) => {
  const i = ORDER.indexOf(id)
  return i < 0 ? ORDER.length : i
}

export const MODULES: Module[] = [
  ...kidsModules, ...kidsModules2,
  ...a1Modules, ...a1Modules2,
  ...a2Modules, ...a2Modules2,
  ...b1Modules, ...b1Modules2,
  ...b2c1Modules, ...b2c1Modules2,
  ...teenModules, ...teenModules2,
  ...adultModules, ...adultModules2,
]
  .map((m) => (DIALOGUES[m.id] ? { ...m, dialogue: DIALOGUES[m.id] } : m))
  .sort((a, b) => lvl(a.level) - lvl(b.level) || rank(a.id) - rank(b.id))

export const CARDS: Card[] = MODULES.flatMap((m) => m.cards)

export const moduleById = new Map(MODULES.map((m) => [m.id, m]))
export const cardById = new Map(CARDS.map((c) => [c.id, c]))

export const modulesFor = (a: Audience) => MODULES.filter((m) => m.audiences.includes(a))
export const cardsFor = (a: Audience) => modulesFor(a).flatMap((m) => m.cards)
export const levelOf = (c: Card) => moduleById.get(c.moduleId)!.level
