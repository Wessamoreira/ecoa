import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useEffect, type ButtonHTMLAttributes, type ReactNode } from 'react'
import type { Level } from '../data/index.ts'
import { cx } from '../lib/utils.ts'

type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'soft'
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <button
      {...rest}
      className={cx(
        'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition active:scale-[0.97] disabled:opacity-45 disabled:pointer-events-none select-none',
        size === 'sm' && 'h-9 px-3.5 text-sm rounded-xl',
        size === 'md' && 'h-11 px-5 rounded-2xl',
        size === 'lg' && 'h-14 px-6 text-lg rounded-2xl',
        variant === 'primary' && 'bg-accent text-accent-ink hover:brightness-105 shadow-[0_8px_20px_-8px_var(--accent)]',
        variant === 'secondary' && 'bg-surface text-ink border border-line hover:bg-surface-2',
        variant === 'soft' && 'bg-accent-soft text-ink hover:brightness-95',
        variant === 'ghost' && 'text-muted hover:text-ink hover:bg-surface-2',
        className,
      )}
    >
      {children}
    </button>
  )
}

const LEVEL_TONE: Record<Level, string> = {
  A1: 'oklch(0.72 0.15 150)',
  A2: 'oklch(0.72 0.14 190)',
  B1: 'oklch(0.68 0.15 250)',
  B2: 'oklch(0.62 0.17 290)',
  C1: 'oklch(0.6 0.19 340)',
}
export function LevelBadge({ level, className }: { level: Level; className?: string }) {
  return (
    <span
      className={cx('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wider', className)}
      style={{ background: `color-mix(in oklab, ${LEVEL_TONE[level]} 18%, transparent)`, color: `color-mix(in oklab, ${LEVEL_TONE[level]} 75%, var(--ink))` }}
    >
      <span className="size-1.5 rounded-full" style={{ background: LEVEL_TONE[level] }} />
      {level}
    </span>
  )
}

export function Chip({ active, children, onClick, className }: { active?: boolean; children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'shrink-0 h-9 rounded-full px-3.5 text-sm font-semibold border transition',
        active ? 'bg-ink text-bg border-ink' : 'bg-surface text-muted border-line hover:text-ink',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function ProgressRing({ value, size = 56, stroke = 6, children, color = 'var(--accent)' }: { value: number; size?: number; stroke?: number; children?: ReactNode; color?: string }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const v = Math.max(0, Math.min(1, value))
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - v)} style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(.2,.8,.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}

export function Bar({ value, className, color = 'var(--accent)' }: { value: number; className?: string; color?: string }) {
  return (
    <div className={cx('h-2 rounded-full bg-surface-2 overflow-hidden', className)}>
      <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`, background: color }} />
    </div>
  )
}

export function Sheet({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: ReactNode; title?: string }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div className="absolute inset-0 bg-[rgb(8_10_24/0.55)] backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="relative w-full sm:max-w-2xl max-h-[92dvh] overflow-y-auto bg-bg rounded-t-[28px] sm:rounded-[28px] shadow-card safe-bottom"
            initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 48, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 340 }}
          >
            <button onClick={onClose} aria-label="Fechar" className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-surface text-muted hover:text-ink border border-line">
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-6">
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted mb-1.5">{eyebrow}</p>}
      <h1 className="text-[clamp(1.9rem,5vw,2.6rem)] font-bold leading-[1.05]">{title}</h1>
      {children && <div className="mt-2 text-muted">{children}</div>}
    </header>
  )
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="inline-grid min-w-5 h-5 place-items-center rounded-md border border-line bg-surface px-1 font-sans text-[11px] font-bold text-muted">{children}</kbd>
}
