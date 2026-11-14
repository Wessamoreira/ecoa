/**
 * Motor de pronúncia (Web Speech API — speechSynthesis)
 * - Seleção inteligente de vozes: prioriza vozes neurais/naturais (Edge "Natural",
 *   Apple "Premium/Enhanced"/Siri, Google) no sotaque escolhido (en-US / en-GB).
 * - Eventos por palavra (karaokê). Quando a voz não emite "boundary"
 *   (ex.: vozes online do Chrome), estimamos o ritmo pela duração.
 */
export type Accent = 'en-US' | 'en-GB'

export const ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

let voices: SpeechSynthesisVoice[] = []
const listeners = new Set<() => void>()

function loadVoices() {
  if (!ttsSupported) return
  voices = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang))
  listeners.forEach((fn) => fn())
}
if (ttsSupported) {
  loadVoices()
  speechSynthesis.addEventListener?.('voiceschanged', loadVoices)
  // Safari às vezes demora para popular a lista
  setTimeout(loadVoices, 600)
  setTimeout(loadVoices, 2000)
}

export const getVoices = () => voices
export function onVoicesChange(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

const NOVELTY =
  /compact|espeak|novelty|bad news|bells|boing|bubbles|cellos|whisper|zarvox|trinoids|albert|jester|organ|superstar|wobble|bahh|good news|hysterical|deranged|pipe|fred|junior|ralph|kathy|eddy|flo|reed|rocko|sandy|shelley|grandma|grandpa/i

export function voiceScore(v: SpeechSynthesisVoice, accent: Accent): number {
  const lang = v.lang.replace('_', '-')
  const n = v.name
  let s = 0
  if (lang === accent) s += 50
  else if (lang.startsWith('en-')) s += 12
  if (/natural|neural/i.test(n)) s += 45
  if (/premium/i.test(n)) s += 40
  if (/enhanced|siri/i.test(n)) s += 34
  if (/google/i.test(n)) s += 26
  if (/\b(ava|zoe|samantha|allison|susan|evan|nathan|tom|daniel|serena|kate|oliver|jenny|aria|guy|sonia|ryan|libby|emma|andrew|brian|michelle)\b/i.test(n)) s += 8
  if (NOVELTY.test(n)) s -= 80
  if (v.localService) s += 2
  return s
}

export function rankedVoices(accent: Accent) {
  return [...voices].sort((a, b) => voiceScore(b, accent) - voiceScore(a, accent))
}

export function pickVoice(accent: Accent, preferredURI?: string) {
  if (preferredURI) {
    const v = voices.find((x) => x.voiceURI === preferredURI)
    if (v) return v
  }
  return rankedVoices(accent)[0]
}

const FEMALE = /\b(samantha|ava|zoe|allison|susan|serena|kate|jenny|aria|sonia|libby|emma|michelle|karen|moira|tessa|fiona|victoria|joanna|salli|kendra|kimberly|ivy|female|natasha|clara|nicky|shelley|sandy|flo)\b/i
const MALE = /\b(daniel|tom|evan|nathan|oliver|guy|ryan|andrew|brian|alex|aaron|arthur|gordon|joey|justin|matthew|eric|christopher|roger|davis|tony|male|rishi|reed|eddy|rocko)\b/i
const genderOf = (v: SpeechSynthesisVoice) => (FEMALE.test(v.name) ? 'f' : MALE.test(v.name) ? 'm' : '?')

/**
 * Duas vozes para diálogos: a melhor disponível para A e, para B, a melhor de
 * gênero diferente. Sem uma segunda voz boa, B usa a mesma com tom mais grave.
 */
export function voicePair(accent: Accent, preferredURI?: string): [{ voiceURI?: string; pitch: number }, { voiceURI?: string; pitch: number }] {
  const ranked = rankedVoices(accent).filter((v) => voiceScore(v, accent) > 0)
  const a = (preferredURI && voices.find((v) => v.voiceURI === preferredURI)) || ranked[0]
  if (!a) return [{ pitch: 1 }, { pitch: 0.82 }]
  const ga = genderOf(a)
  const minScore = voiceScore(a, accent) - 40
  const b =
    ranked.find((v) => v !== a && genderOf(v) !== ga && genderOf(v) !== '?' && voiceScore(v, accent) >= minScore) ??
    ranked.find((v) => v !== a && voiceScore(v, accent) >= minScore)
  return [{ voiceURI: a.voiceURI, pitch: 1 }, b ? { voiceURI: b.voiceURI, pitch: 1 } : { voiceURI: a.voiceURI, pitch: 0.82 }]
}

export interface SpeakOptions {
  rate?: number
  accent?: Accent
  voiceURI?: string
  /** 1 = natural. Usado para diferenciar personagens quando só existe uma voz */
  pitch?: number
  onStart?: () => void
  /** índice do caractere da palavra sendo falada */
  onWord?: (charIndex: number) => void
  onEnd?: () => void
}

let currentToken = 0
let liveUtterance: SpeechSynthesisUtterance | null = null

export function stopSpeaking() {
  currentToken++
  if (ttsSupported) speechSynthesis.cancel()
}

export function speak(text: string, opts: SpeakOptions = {}): () => void {
  if (!ttsSupported) {
    opts.onEnd?.()
    return () => {}
  }
  // Havia áudio tocando? (no Safari/iOS, speak() logo após cancel() pode ser descartado em silêncio)
  const wasBusy = speechSynthesis.speaking || speechSynthesis.pending
  stopSpeaking()
  const token = currentToken
  const accent = opts.accent ?? 'en-US'
  const rate = opts.rate ?? 1
  const u = new SpeechSynthesisUtterance(text)
  const voice = pickVoice(accent, opts.voiceURI)
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? accent
  u.rate = rate
  u.pitch = opts.pitch ?? 1

  let gotBoundary = false
  let timers: number[] = []
  const clearTimers = () => {
    timers.forEach((t) => clearTimeout(t))
    timers = []
  }

  // Estimativa de ritmo quando a voz não informa as palavras
  const simulate = () => {
    const words = [...text.matchAll(/\S+/g)]
    let t = 0
    for (const m of words) {
      const idx = m.index ?? 0
      timers.push(window.setTimeout(() => token === currentToken && opts.onWord?.(idx), t))
      t += (110 + m[0].length * 55) / rate
    }
  }

  u.onstart = () => {
    if (token !== currentToken) return
    opts.onStart?.()
    opts.onWord?.(0)
    timers.push(window.setTimeout(() => !gotBoundary && simulate(), 280))
  }
  u.onboundary = (e) => {
    if (token !== currentToken || e.name === 'sentence') return
    gotBoundary = true
    clearTimers()
    opts.onWord?.(e.charIndex)
  }
  const finish = () => {
    clearTimers()
    if (liveUtterance === u) liveUtterance = null
    if (token === currentToken) opts.onEnd?.()
  }
  u.onend = finish
  u.onerror = finish

  // Guarda referência: no iOS, uma utterance coletada pelo GC para de emitir eventos
  liveUtterance = u
  const start = () => {
    if (token !== currentToken) return
    // Chrome: retomar caso esteja "pausado" por inatividade
    if (speechSynthesis.paused) speechSynthesis.resume()
    speechSynthesis.speak(u)
  }
  // Se nada tocava, fala na hora (o 1º áudio no iPhone precisa sair dentro do toque do usuário).
  // Se algo tocava, espera o cancelamento assentar antes de falar de novo.
  if (wasBusy) setTimeout(start, 120)
  else start()
  return () => {
    clearTimers()
    stopSpeaking()
  }
}

/** Remove marcações do card para gerar um texto falável ("I am (I'm)" → "I am") */
export function speakable(term: string) {
  return term
    .replace(/\(.*?\)/g, '')
    .replace(/\s*[·/]\s*/g, ', ')
    .replace(/\.\.\./g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
