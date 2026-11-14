import { moduleById, levelOf, type Card } from '../data/index.ts'
import { speakable } from './speech.ts'
import { normalize, sample, shuffle } from './utils.ts'

export type QuestionKind = 'en-pt' | 'pt-en' | 'listen' | 'cloze' | 'speak'

export interface Question {
  kind: QuestionKind
  card: Card
  prompt: string
  /** texto em inglês para áudio */
  audio?: string
  /** frase com lacuna */
  sentence?: { before: string; after: string; pt: string }
  options: string[]
  answer: string
}

const display = (c: Card) => c.term

function distractors(card: Card, pool: Card[], get: (c: Card) => string, n = 3) {
  const answer = normalize(get(card))
  const sameModule = pool.filter((c) => c.moduleId === card.moduleId && c.id !== card.id)
  const sameLevel = pool.filter((c) => c.moduleId !== card.moduleId && levelOf(c) === levelOf(card))
  const rest = pool.filter((c) => c.id !== card.id)
  const out: string[] = []
  for (const group of [shuffle(sameModule), shuffle(sameLevel), shuffle(rest)])
    for (const c of group) {
      const v = get(c)
      if (out.length >= n) break
      if (normalize(v) !== answer && !out.some((o) => normalize(o) === normalize(v))) out.push(v)
    }
  return out
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Encontra uma frase de exemplo onde o termo (ou uma de suas formas) aparece como palavra inteira */
function clozeFor(card: Card) {
  const candidates = [
    ...(card.forms?.filter((f) => !f.label.startsWith('Som')).map((f) => f.value.replace(/^to /, '')) ?? []),
    speakable(card.term),
  ]
    .flatMap((v) => v.split(/\s*\/\s*/))
    .filter((v) => v.length >= 2 && v.split(' ').length <= 3)
  for (const ex of shuffle(card.examples)) {
    for (const v of candidates.sort((a, b) => b.length - a.length)) {
      const re = new RegExp(`(^|[^A-Za-z'])(${escapeRe(v)})(?![A-Za-z'])`, 'i')
      const m = re.exec(ex.en)
      if (m) {
        const start = m.index + m[1].length
        return { before: ex.en.slice(0, start), word: m[2], after: ex.en.slice(start + m[2].length), pt: ex.pt }
      }
    }
  }
  return null
}

export function buildQuiz(pool: Card[], count = 10, opts: { speak?: boolean; kids?: boolean } = {}): Question[] {
  const picked = sample(pool, Math.min(count, pool.length))
  const kinds: QuestionKind[] = opts.kids ? ['en-pt', 'listen', 'pt-en'] : ['en-pt', 'pt-en', 'listen', 'cloze', 'cloze']
  if (opts.speak) kinds.push('speak')

  return picked.map((card, i) => {
    let kind = kinds[(i + Math.floor(Math.random() * kinds.length)) % kinds.length]
    if (kind === 'cloze') {
      const cz = clozeFor(card)
      if (cz) {
        const forms = card.forms?.filter((f) => !f.label.startsWith('Som')).map((f) => f.value.replace(/^to /, '').split(' / ')[0]) ?? []
        let opts3 = forms.filter((f) => normalize(f) !== normalize(cz.word))
        opts3 = [...new Set(opts3)].slice(0, 3)
        if (opts3.length < 3) {
          const more = distractors(card, pool, (c) => speakable(c.term).split(',')[0]).filter((d) => normalize(d) !== normalize(cz.word))
          opts3 = [...opts3, ...more].slice(0, 3)
        }
        // Mesma caixa para todas as opções: a maiúscula no início da frase não pode entregar a resposta
        const caseLike = (s: string) => (cz.before === '' ? s.charAt(0).toUpperCase() + s.slice(1) : s.charAt(0).toLowerCase() + s.slice(1))
        const keepCase = (s: string) => (/^(I|I'm|I'd|I'll)$/.test(s.split(' ')[0]) ? s : caseLike(s))
        const answer = keepCase(cz.word)
        return {
          kind, card, prompt: 'Complete a frase', answer,
          sentence: { before: cz.before, after: cz.after, pt: cz.pt },
          audio: cz.before + cz.word + cz.after,
          options: shuffle([answer, ...opts3.map(keepCase)]),
        }
      }
      kind = 'en-pt'
    }
    if (kind === 'speak') {
      return { kind, card, prompt: 'Fale em voz alta', audio: speakable(card.term), options: [], answer: speakable(card.term) }
    }
    if (kind === 'pt-en') {
      return { kind, card, prompt: card.pt, options: shuffle([display(card), ...distractors(card, pool, display)]), answer: display(card), audio: speakable(card.term) }
    }
    if (kind === 'listen') {
      return { kind, card, prompt: 'Ouça e escolha o que foi dito', audio: speakable(card.term), options: shuffle([display(card), ...distractors(card, pool, display)]), answer: display(card) }
    }
    return { kind: 'en-pt', card, prompt: display(card), audio: speakable(card.term), options: shuffle([card.pt, ...distractors(card, pool, (c) => c.pt)]), answer: card.pt }
  })
}

export const moduleTitle = (id: string) => moduleById.get(id)?.title ?? ''
