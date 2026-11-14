import type { Card, Dialogue, Example, Form, LessonSection, Module } from './types.ts'

export type Ex = [en: string, pt: string, tag?: string]
type Draft = Omit<Card, 'id' | 'moduleId'>

const ex = (list: Ex[]): Example[] => list.map(([en, pt, tag]) => ({ en, pt, tag }))

/** Card genérico (palavra, expressão, estrutura) */
export function w(
  term: string,
  ipa: string,
  pt: string,
  emoji: string,
  examples: Ex[],
  tip?: string,
  extra: Partial<Draft> = {},
): Draft {
  return { term, ipa: ipa || undefined, pt, emoji: emoji || undefined, examples: ex(examples), tip, ...extra }
}

/** Verbo irregular: formas + exemplos contrastivos */
export function irr(
  base: string,
  past: string,
  pp: string,
  ing: string,
  ipa: [string, string, string],
  pt: string,
  emoji: string,
  examples: Ex[],
  tip?: string,
): Draft {
  const forms: Form[] = [
    { label: 'Infinitivo', value: `to ${base}`, ipa: ipa[0] },
    { label: 'Simple Past', value: past, ipa: ipa[1] },
    { label: 'Past Participle', value: pp, ipa: ipa[2] },
    { label: 'Gerúndio (-ing)', value: ing },
  ]
  return { term: base, ipa: ipa[0], pt, emoji, pos: 'verbo irregular', forms, examples: ex(examples), tip, lookup: base }
}

/** Verbo regular: passado com -ed e o som do final (/t/, /d/, /ɪd/) */
export function reg(
  base: string,
  past: string,
  ing: string,
  ipa: string,
  edSound: '/t/' | '/d/' | '/ɪd/',
  pt: string,
  emoji: string,
  examples: Ex[],
  tip?: string,
): Draft {
  const forms: Form[] = [
    { label: 'Infinitivo', value: `to ${base}`, ipa },
    { label: 'Simple Past', value: past },
    { label: 'Past Participle', value: past },
    { label: 'Gerúndio (-ing)', value: ing },
    { label: 'Som do -ed', value: edSound },
  ]
  return { term: base, ipa, pt, emoji, pos: 'verbo regular', forms, examples: ex(examples), tip, lookup: base }
}

export const sec = (title: string, body: string, table?: string[][], examples?: Ex[]): LessonSection => ({
  title,
  body,
  table,
  examples: examples ? ex(examples) : undefined,
})

/** Diálogo: dois personagens alternando; [quem, inglês, português] */
export function dlg(
  title: string,
  scene: string,
  emoji: string,
  names: [string, string],
  lines: [who: 'A' | 'B', en: string, pt: string][],
): Dialogue {
  return { title, scene, emoji, lines: lines.map(([who, en, pt]) => ({ who, name: who === 'A' ? names[0] : names[1], en, pt })) }
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export function mod(meta: Omit<Module, 'cards'>, drafts: Draft[]): Module {
  const seen = new Map<string, number>()
  const cards = drafts.map((d) => {
    let s = slug(d.term)
    const n = seen.get(s) ?? 0
    seen.set(s, n + 1)
    if (n) s = `${s}-${n + 1}`
    return { ...d, id: `${meta.id}.${s}`, moduleId: meta.id }
  })
  return { ...meta, cards }
}
