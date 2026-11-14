import { BookText, Lightbulb, MessageSquareQuote, Mic, RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { levelOf, moduleById, type Card } from '../data/index.ts'
import { speakable } from '../lib/speech.ts'
import { cx, prefersReducedMotion } from '../lib/utils.ts'
import { AudioButton, HumanAudio, SpeakText } from './Audio.tsx'
import { CardFront, FavoriteButton } from './CardContent.tsx'
import { PronunciationCoach } from './Coach.tsx'
import { Illustration } from './Illustration.tsx'
import { LevelBadge } from './ui.tsx'

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
          className="flip-face cursor-pointer border border-line bg-surface shadow-card"
          aria-hidden={flipped}
        >
          <CardFront card={card} kids={kids} />
        </div>
        <div className="flip-face flip-back flex flex-col overflow-hidden border border-line bg-surface shadow-card" aria-hidden={!flipped}>
          <StudyBack card={card} kids={kids} onFlip={onFlip} />
        </div>
      </motion.div>
    </div>
  )
}

type Tab = 'examples' | 'forms' | 'tip' | 'speak'

/**
 * Verso do card na sessão de estudo, em duas camadas:
 * 1. O essencial sempre visível: termo, pronúncia, áudio e a tradução em destaque.
 * 2. O aprofundamento em abas, para não virar uma rolagem longa.
 */
function StudyBack({ card, kids, onFlip }: { card: Card; kids?: boolean; onFlip: () => void }) {
  const mod = moduleById.get(card.moduleId)!
  const forms = card.forms?.filter((f) => f.label !== 'Infinitivo' || card.pos?.startsWith('verbo'))
  const tabs: { id: Tab; label: string; icon: typeof BookText; show: boolean }[] = [
    { id: 'examples', label: 'Exemplos', icon: MessageSquareQuote, show: card.examples.length > 0 },
    { id: 'forms', label: 'Formas', icon: BookText, show: !!forms?.length },
    { id: 'tip', label: 'Dica', icon: Lightbulb, show: !!card.tip },
    { id: 'speak', label: 'Falar', icon: Mic, show: true },
  ]
  const visible = tabs.filter((t) => t.show)
  const [tab, setTab] = useState<Tab>(visible[0].id)
  const speakTarget = !kids && card.examples[0] && card.examples[0].en.length < 60 ? card.examples[0].en : speakable(card.term)

  return (
    <>
      {/* 1. Essencial */}
      <header className="border-b border-line px-5 pb-4 pt-3 sm:px-7">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onFlip} className="-ml-1 inline-flex h-8 items-center gap-1.5 rounded-full px-2 text-xs font-bold uppercase tracking-[0.12em] text-muted hover:bg-surface-2 hover:text-ink">
            <RotateCcw size={13} /> Virar
          </button>
          <LevelBadge level={levelOf(card)} />
          <span className="min-w-0 truncate text-[11px] font-bold uppercase tracking-wider text-muted">{mod.title}</span>
          <FavoriteButton cardId={card.id} className="-mr-2 ml-auto" />
        </div>

        <div className="mt-2 flex items-start gap-3">
          <Illustration emoji={card.emoji} size={kids ? 60 : 48} className="mt-1 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2.5">
              <h3 className="font-display text-[1.65rem] font-bold leading-tight">{card.term}</h3>
              {card.ipa && <span className="ipa text-muted">{card.ipa}</span>}
            </div>
            <p className="mt-0.5 font-display text-[1.35rem] font-bold leading-snug" style={{ color: 'color-mix(in oklab, var(--accent) 82%, var(--ink))' }}>
              {card.pt}
            </p>
            {(card.pos || card.register) && (
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                {card.pos}{card.register === 'slang' ? ' · gíria' : card.register ? ` · ${card.register}` : ''}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-col gap-1.5">
            <AudioButton text={speakable(card.term)} size="sm" />
            <AudioButton text={speakable(card.term)} slow size="sm" />
          </div>
        </div>
        <HumanAudio className="mt-3" word={card.lookup ?? (card.term.includes(' ') ? undefined : card.term.toLowerCase())} />
      </header>

      {/* 2. Abas */}
      <nav className="flex gap-1 border-b border-line bg-surface px-3 pt-2 sm:px-5" role="tablist" aria-label="Detalhes do card">
        {visible.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cx(
              'relative inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-t-xl px-1 text-[13px] font-bold transition sm:flex-none sm:px-4',
              tab === id ? 'text-ink' : 'text-muted hover:text-ink',
            )}
          >
            <Icon size={15} className="hidden shrink-0 min-[440px]:block" />
            <span className="whitespace-nowrap">{label}</span>
            {tab === id && <span className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-accent" />}
          </button>
        ))}
      </nav>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-bg px-5 py-4 sm:px-7" role="tabpanel">
        {tab === 'examples' && (
          <ul className="space-y-2.5">
            {card.examples.map((ex, i) => (
              <li key={i} className="rounded-2xl border border-line bg-surface px-4 py-3">
                {ex.tag && <span className="mb-1 inline-block rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">{ex.tag}</span>}
                <SpeakText text={ex.en} className="w-full justify-between text-[1.02rem]" />
                <p className="mt-0.5 text-sm text-muted">{ex.pt}</p>
              </li>
            ))}
          </ul>
        )}

        {tab === 'forms' && forms && (
          <div className="grid grid-cols-2 gap-2">
            {forms.map((f) => (
              <div key={f.label} className="rounded-2xl border border-line bg-surface px-3 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{f.label}</p>
                <p className="font-display text-lg font-bold leading-tight">{f.value}</p>
                {f.ipa && <p className="ipa text-sm text-muted">{f.ipa}</p>}
              </div>
            ))}
          </div>
        )}

        {tab === 'tip' && card.tip && (
          <div className="flex gap-3 rounded-2xl border-l-4 border-hard bg-hard/10 px-4 py-3">
            <Lightbulb size={20} className="mt-0.5 shrink-0 text-hard" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-hard">{kids ? 'Dica' : 'Dica do professor'}</p>
              <p className="text-[0.98rem] leading-relaxed">{card.tip}</p>
            </div>
          </div>
        )}

        {tab === 'speak' && (
          <div className="space-y-3">
            <p className="text-sm text-muted">
              Ouça, depois repita em voz alta:
            </p>
            <SpeakText text={speakTarget} className="w-full justify-between text-[1.05rem]" />
            <PronunciationCoach target={speakTarget} compact />
          </div>
        )}
      </div>
    </>
  )
}
