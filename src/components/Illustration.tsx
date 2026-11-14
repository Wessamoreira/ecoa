import { useState } from 'react'
import { illustrationUrl, twemojiUrl } from '../lib/media.ts'
import { cx } from '../lib/utils.ts'

/** Ilustração 3D (Fluent Emoji) → Twemoji → emoji de texto */
export function Illustration({ emoji, size = 64, className, alt = '' }: { emoji?: string; size?: number; className?: string; alt?: string }) {
  const [stage, setStage] = useState(0)
  if (!emoji) return null
  const src = stage === 0 ? illustrationUrl(emoji) : twemojiUrl(emoji)
  if (stage >= 2 || !/\p{Extended_Pictographic}|\p{Regional_Indicator}|⃣/u.test(emoji))
    return (
      <span className={cx('inline-grid place-items-center leading-none', className)} style={{ width: size, height: size, fontSize: size * 0.72 }} aria-hidden={!alt}>
        {emoji}
      </span>
    )
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setStage((s) => (s === 0 && src !== twemojiUrl(emoji) ? 1 : 2))}
      className={cx('select-none object-contain', className)}
      style={{ width: size, height: size }}
    />
  )
}
