import { kidsModules } from './kids.ts'
import { a1Modules } from './a1.ts'
import { a2Modules } from './a2.ts'
import { b1Modules } from './b1.ts'
import { b2c1Modules } from './b2c1.ts'
import { adultModules, teenModules } from './tracks.ts'
import type { Audience, Card, Level, Module } from './types.ts'

export type { Audience, Card, Level, Module } from './types.ts'

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

/** Ordem pedagógica: nível primeiro; dentro do nível, módulos da trilha específica antes dos gerais quando fizer sentido */
export const MODULES: Module[] = [
  ...kidsModules,
  ...teenModules.filter((m) => m.level === 'A1'),
  ...a1Modules,
  ...adultModules.filter((m) => m.level === 'A2'),
  ...a2Modules,
  ...teenModules.filter((m) => m.level === 'A2'),
  ...b1Modules,
  ...teenModules.filter((m) => m.level === 'B1'),
  ...adultModules.filter((m) => m.level === 'B1'),
  ...b2c1Modules,
  ...teenModules.filter((m) => m.level === 'B2'),
  ...adultModules.filter((m) => m.level === 'C1'),
].sort((a, b) => lvl(a.level) - lvl(b.level))

export const CARDS: Card[] = MODULES.flatMap((m) => m.cards)

export const moduleById = new Map(MODULES.map((m) => [m.id, m]))
export const cardById = new Map(CARDS.map((c) => [c.id, c]))

export const modulesFor = (a: Audience) => MODULES.filter((m) => m.audiences.includes(a))
export const cardsFor = (a: Audience) => modulesFor(a).flatMap((m) => m.cards)
export const levelOf = (c: Card) => moduleById.get(c.moduleId)!.level
