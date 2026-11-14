import { Heart, Lightbulb } from 'lucide-react'
import { moduleById, levelOf, type Card } from '../data/index.ts'
import { speakable } from '../lib/speech.ts'
import { cx } from '../lib/utils.ts'
import { useApp } from '../store/useApp.ts'
import { AudioButton, HumanAudio, SpeakText } from './Audio.tsx'
import { PronunciationCoach } from './Coach.tsx'
import { Illustration } from './Illustration.tsx'
import { RealPhotos } from './RealPhotos.tsx'
import { LevelBadge } from './ui.tsx'

export function FavoriteButton({ cardId, className }: { cardId: string; className?: string }) {
  const fav = useApp((s) => !!s.favorites[cardId])
  const toggle = useApp((s) => s.toggleFavorite)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        toggle(cardId)
      }}
      aria-pressed={fav}
      aria-label={fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      className={cx('grid size-10 place-items-center rounded-full transition hover:bg-surface-2', fav ? 'text-again' : 'text-muted', className)}
    >
      <Heart size={19} fill={fav ? 'currentColor' : 'none'} />
    </button>
  )
}

/** Frente: termo, IPA, nível, categoria e áudio */
export function CardFront({ card, kids }: { card: Card; kids?: boolean }) {
  const mod = moduleById.get(card.moduleId)!
  const len = card.term.length
  return (
    <div className="flex h-full flex-col p-5 sm:p-7">
      <div className="flex items-center gap-2">
        <LevelBadge level={levelOf(card)} />
        <span className="truncate text-xs font-bold uppercase tracking-[0.12em] text-muted">{mod.category} · {mod.title}</span>
        <FavoriteButton cardId={card.id} className="ml-auto -mr-2 -mt-1" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <Illustration emoji={card.emoji} size={kids ? 148 : 104} className="drop-shadow-[0_14px_18px_rgb(0_0_0/0.18)]" />
        <h2
          className="font-display font-bold leading-[1.02] tracking-[-0.03em] text-balance"
          style={{ fontSize: len > 28 ? 'clamp(1.6rem,5vw,2.2rem)' : len > 14 ? 'clamp(2rem,6.5vw,2.9rem)' : 'clamp(2.6rem,9vw,4rem)' }}
        >
          {card.term}
        </h2>
        {card.ipa && <p className="ipa text-xl text-muted">{card.ipa}</p>}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <AudioButton text={speakable(card.term)} size="lg" />
          <AudioButton text={speakable(card.term)} slow size="md" />
        </div>
      </div>
      <p className="text-center text-xs font-semibold text-muted">
        Toque no card<span className="hidden sm:inline"> ou aperte Espaço</span> para ver a resposta
      </p>
    </div>
  )
}

/** Só vale buscar foto para coisas concretas (substantivos de vocabulário) */
function photoQuery(card: Card): string | null {
  const mod = moduleById.get(card.moduleId)
  const concrete = card.pos?.includes('substantivo') || (mod?.category === 'Vocabulário' && !card.pos?.match(/verbo|adjetivo|advérbio|expressão|gíria|phrasal|collocation/))
  if (!concrete) return null
  const q = (card.lookup ?? card.term.split(/\s*[/·]\s*/)[0]).replace(/\(.*?\)/g, '').trim()
  return q && q.split(' ').length <= 3 ? q : null
}

/** Verso / detalhe completo: tradução, formas, exemplos contrastivos, dica e treino de fala */
export function CardDetails({ card, showHeader = true, kids }: { card: Card; showHeader?: boolean; kids?: boolean }) {
  const forms = card.forms?.filter((f) => f.label !== 'Infinitivo' || card.pos?.startsWith('verbo'))
  return (
    <div className="space-y-5">
      {showHeader && (
        <div className="flex items-start gap-3">
          <Illustration emoji={card.emoji} size={kids ? 64 : 52} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="font-display text-2xl font-bold">{card.term}</h3>
              {card.ipa && <span className="ipa text-muted">{card.ipa}</span>}
            </div>
            <p className="text-lg font-semibold text-accent" style={{ color: 'color-mix(in oklab, var(--accent) 80%, var(--ink))' }}>{card.pt}</p>
            {card.pos && <p className="text-xs font-bold uppercase tracking-wider text-muted">{card.pos}{card.register ? ` · ${card.register === 'slang' ? 'gíria' : card.register}` : ''}</p>}
          </div>
          <AudioButton text={speakable(card.term)} />
        </div>
      )}

      <HumanAudio word={card.lookup ?? (card.term.includes(' ') ? undefined : card.term.toLowerCase())} />

      {!kids && photoQuery(card) && <RealPhotos query={photoQuery(card)!} />}

      {forms && forms.length > 0 && (
        <section>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">Formas</h4>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {forms.map((f) => (
              <div key={f.label} className="rounded-2xl border border-line bg-surface px-3 py-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{f.label}</p>
                <p className="font-display text-lg font-bold leading-tight">{f.value}</p>
                {f.ipa && <p className="ipa text-sm text-muted">{f.ipa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">Exemplos — toque para ouvir</h4>
        <ul className="space-y-3">
          {card.examples.map((ex, i) => (
            <li key={i} className="rounded-2xl bg-surface px-4 py-3 border border-line">
              {ex.tag && <span className="mb-1 inline-block rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">{ex.tag}</span>}
              <SpeakText text={ex.en} className="w-full justify-between text-[1.05rem]" />
              <p className="mt-0.5 text-sm text-muted">{ex.pt}</p>
            </li>
          ))}
        </ul>
      </section>

      {card.tip && (
        <section className="flex gap-3 rounded-2xl border-l-4 border-hard bg-hard/10 px-4 py-3">
          <Lightbulb size={20} className="mt-0.5 shrink-0 text-hard" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-hard">{kids ? 'Dica' : 'Dica do professor'}</p>
            <p className="text-[0.95rem] leading-relaxed">{card.tip}</p>
          </div>
        </section>
      )}

      <section>
        <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">Sua vez de falar</h4>
        <PronunciationCoach target={card.examples[0]?.en.length < 60 && !kids ? card.examples[0].en : speakable(card.term)} compact />
      </section>
    </div>
  )
}
