/**
 * Dicionário online gratuito (https://dictionaryapi.dev) — dados do Wiktionary.
 * Fornece IPA e GRAVAÇÕES HUMANAS reais (Wikimedia Commons, CC BY-SA).
 * As respostas ficam em cache no aparelho pelo service worker → funcionam offline depois.
 */
export interface HumanAudio {
  url: string
  accent: 'US' | 'UK' | 'AU' | 'EN'
  license?: string
  source?: string
}
export interface DictEntry {
  ipa?: string
  audios: HumanAudio[]
}

const mem = new Map<string, Promise<DictEntry | null>>()

export function lookupWord(word: string): Promise<DictEntry | null> {
  const key = word.toLowerCase().trim()
  if (!key || /\s/.test(key)) return Promise.resolve(null)
  if (!mem.has(key)) {
    mem.set(
      key,
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (!Array.isArray(data)) return null
          const audios: HumanAudio[] = []
          let ipa: string | undefined
          for (const entry of data)
            for (const p of entry.phonetics ?? []) {
              if (!ipa && p.text) ipa = p.text
              if (p.audio && !audios.some((a) => a.url === p.audio)) {
                const m = /-(us|uk|au)\.mp3$/i.exec(p.audio)
                audios.push({
                  url: p.audio,
                  accent: (m?.[1]?.toUpperCase() as HumanAudio['accent']) ?? 'EN',
                  license: p.license?.name,
                  source: p.sourceUrl,
                })
              }
            }
          return { ipa: ipa ?? data[0]?.phonetic, audios }
        })
        .catch(() => {
          mem.delete(key)
          return null
        }),
    )
  }
  return mem.get(key)!
}

let current: HTMLAudioElement | null = null
export function playUrl(url: string, rate = 1): Promise<void> {
  current?.pause()
  const a = new Audio(url)
  a.playbackRate = rate
  current = a
  return new Promise((resolve) => {
    a.onended = () => resolve()
    a.onerror = () => resolve()
    a.play().catch(() => resolve())
  })
}
