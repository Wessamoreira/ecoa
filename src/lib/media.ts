import media from '../data/media.json'

export interface Photo {
  src: string
  title?: string
  creator?: string | null
  license: string
  licenseUrl?: string
  source?: string
  provider?: string
}

const emojiMap = media.emoji as Record<string, string>
const photoMap = media.photos as Record<string, Photo>

/** Twemoji (CC-BY 4.0) como plano B quando não existe versão 3D */
export function twemojiUrl(emoji: string) {
  const cps = [...emoji]
    .map((c) => c.codePointAt(0)!.toString(16))
    .filter((cp) => cp !== 'fe0f' || emoji.includes('‍'))
  return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/${cps.join('-')}.svg`
}

export const illustrationUrl = (emoji: string) => emojiMap[emoji] ?? twemojiUrl(emoji)
export const modulePhoto = (moduleId: string): Photo | undefined => photoMap[moduleId]
export const allPhotos = () => Object.entries(photoMap)
