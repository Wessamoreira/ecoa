import { useMemo } from 'react'
import type { Module } from '../data/index.ts'
import { cx } from '../lib/utils.ts'
import { Illustration } from './Illustration.tsx'

/**
 * Capa ilustrada do módulo: a ilustração principal em destaque e três
 * ilustrações dos próprios cards "flutuando" ao redor, sobre um fundo
 * na cor do modo. Usada no modo Criança e quando não há foto.
 */
export function ModuleArt({ m, size = 'md', className }: { m: Module; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const extras = useMemo(() => {
    const seen = new Set([m.emoji])
    const out: string[] = []
    for (const c of m.cards) if (c.emoji && !seen.has(c.emoji) && out.length < 3) (seen.add(c.emoji), out.push(c.emoji))
    return out
  }, [m])
  const main = size === 'lg' ? 132 : size === 'md' ? 76 : 58
  const small = size === 'lg' ? 52 : size === 'md' ? 32 : 24
  const spots = [
    'left-[8%] top-[10%] -rotate-12',
    'right-[8%] top-[14%] rotate-12',
    'right-[14%] bottom-[8%] -rotate-6',
  ]
  return (
    <div
      className={cx('relative isolate overflow-hidden', className)}
      style={{
        background:
          'radial-gradient(120% 90% at 50% 110%, color-mix(in oklab, var(--accent) 55%, transparent), transparent 60%), radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--accent) 22%, transparent) 1px, transparent 0) 0 0 / 14px 14px, color-mix(in oklab, var(--accent) 16%, var(--surface))',
      }}
      aria-hidden
    >
      {extras.map((e, i) => (
        <span key={e} className={cx('absolute opacity-90', spots[i])}>
          <Illustration emoji={e} size={small} />
        </span>
      ))}
      <span className="absolute inset-0 grid place-items-center">
        <Illustration emoji={m.emoji} size={main} className="drop-shadow-[0_12px_14px_rgb(0_0_0/0.25)]" />
      </span>
    </div>
  )
}
