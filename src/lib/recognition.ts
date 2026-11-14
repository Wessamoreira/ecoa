/**
 * Treino de fala (Web Speech API — SpeechRecognition)
 * Suportado no Chrome, Edge, Safari (macOS/iOS) e Samsung Internet.
 */
type Rec = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  start(): void
  stop(): void
  abort(): void
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string; confidence: number }> & { isFinal: boolean }> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
}

const Ctor: (new () => Rec) | undefined =
  typeof window !== 'undefined'
    ? ((window as unknown as Record<string, unknown>).SpeechRecognition as never) ??
      ((window as unknown as Record<string, unknown>).webkitSpeechRecognition as never)
    : undefined

export const canRecognize = !!Ctor

export interface ListenHandlers {
  onInterim?: (text: string) => void
  onFinal: (alternatives: string[]) => void
  onError?: (message: string) => void
  onEnd?: () => void
}

const ERRORS: Record<string, string> = {
  'not-allowed': 'Permita o acesso ao microfone nas configurações do navegador.',
  'service-not-allowed': 'O reconhecimento de voz está bloqueado neste navegador.',
  'no-speech': 'Não ouvi nada. Toque no microfone e fale perto do aparelho.',
  'audio-capture': 'Nenhum microfone encontrado.',
  network: 'O reconhecimento de voz precisa de internet neste navegador.',
}

export function listen(lang: string, h: ListenHandlers): () => void {
  if (!Ctor) {
    h.onError?.('Seu navegador não tem reconhecimento de voz. Use Chrome, Edge ou Safari.')
    h.onEnd?.()
    return () => {}
  }
  const r = new Ctor()
  r.lang = lang
  r.interimResults = true
  r.maxAlternatives = 5
  r.continuous = false
  let done = false
  r.onresult = (e) => {
    const res = e.results[e.results.length - 1]
    if (res.isFinal) {
      done = true
      const alts = Array.from({ length: res.length }, (_, i) => res[i].transcript.trim())
      h.onFinal(alts)
    } else h.onInterim?.(res[0].transcript)
  }
  r.onerror = (e) => {
    if (e.error !== 'aborted') h.onError?.(ERRORS[e.error] ?? `Erro no reconhecimento (${e.error}).`)
  }
  r.onend = () => {
    if (!done) h.onFinal([])
    h.onEnd?.()
  }
  r.start()
  return () => r.stop()
}

// ───────────── Avaliação da pronúncia

const NUM: Record<string, string> = {
  '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten', '11': 'eleven', '12': 'twelve',
}
const CONTRACTIONS: Record<string, string> = {
  "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are', "they're": 'they are',
  "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "can't": 'cannot', "won't": 'will not', "isn't": 'is not', "aren't": 'are not',
  "i'll": 'i will', "i've": 'i have', "i'd": 'i would', "let's": 'let us', "what's": 'what is', "there's": 'there is', "that's": 'that is',
  "wasn't": 'was not', "weren't": 'were not', "haven't": 'have not', "hasn't": 'has not', "shouldn't": 'should not', "mustn't": 'must not',
}

export function words(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\(.*?\)/g, ' ')
    .split(/[^a-z0-9']+/)
    .filter(Boolean)
    .flatMap((w) => (CONTRACTIONS[w] ?? NUM[w] ?? w).split(' '))
    .map((w) => w.replace(/^'+|'+$/g, ''))
    .filter(Boolean)
}

function lev(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return dp[a.length][b.length]
}
const sim = (a: string, b: string) => 1 - lev(a, b) / Math.max(a.length, b.length, 1)

export type WordStatus = 'ok' | 'close' | 'miss'
export interface Assessment {
  score: number
  heard: string
  words: { word: string; status: WordStatus }[]
}

/** Alinha as palavras-alvo com o que foi ouvido e dá uma nota de 0 a 100 */
export function assess(target: string, alternatives: string[]): Assessment {
  const tw = words(target)
  let best: Assessment = { score: 0, heard: alternatives[0] ?? '', words: tw.map((w) => ({ word: w, status: 'miss' })) }
  for (const alt of alternatives) {
    const hw = words(alt)
    const used = new Set<number>()
    let cursor = 0
    let total = 0
    const res = tw.map((w) => {
      let bestJ = -1
      let bestS = 0
      for (let j = cursor; j < Math.min(hw.length, cursor + 4); j++) {
        if (used.has(j)) continue
        const s = sim(w, hw[j])
        if (s > bestS) {
          bestS = s
          bestJ = j
        }
      }
      let status: WordStatus = 'miss'
      if (bestS >= 0.99) status = 'ok'
      else if (bestS >= 0.6) status = 'close'
      if (status !== 'miss' && bestJ >= 0) {
        used.add(bestJ)
        cursor = bestJ + 1
      }
      total += status === 'ok' ? 1 : status === 'close' ? 0.6 : 0
      return { word: w, status }
    })
    const extra = Math.max(0, hw.length - tw.length) * 0.15
    const score = Math.max(0, Math.round(((total - extra) / Math.max(tw.length, 1)) * 100))
    if (score > best.score) best = { score, heard: alt, words: res }
  }
  return best
}
