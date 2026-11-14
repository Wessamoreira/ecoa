import { RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import type { Card } from '../data/index.ts'
import { prefersReducedMotion } from '../lib/utils.ts'
import { CardDetails, CardFront } from './CardContent.tsx'

export function FlashCard({ card, flipped, onFlip, kids }: { card: Card; flipped: boolean; onFlip: () => void; kids?: boolean }) {
  const reduced = prefersReducedMotion()
  return (
    <div className="flip-scene h-[min(68dvh,620px)] w-full">
      <motion.div
        className="flip-inner"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }}
      >
        <div
          role="button"
          tabIndex={flipped ? -1 : 0}
          aria-label={`Card: ${card.term}. Toque para virar.`}
          onClick={onFlip}
          onKeyDown={(e) => e.key === 'Enter' && onFlip()}
          className="flip-face border border-line bg-surface shadow-card cursor-pointer"
          aria-hidden={flipped}
        >
          <CardFront card={card} kids={kids} />
        </div>
        <div className="flip-face flip-back ruled overflow-y-auto overscroll-contain border border-line bg-bg shadow-card" aria-hidden={!flipped}>
          <div className="p-5 sm:p-7">
            <button type="button" onClick={onFlip} className="mb-3 -mt-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted hover:text-ink">
              <RotateCcw size={13} /> Virar
            </button>
            <CardDetails card={card} kids={kids} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
