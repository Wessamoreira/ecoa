import { PartyPopper, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { moduleById, type Card } from '../data/index.ts'
import { buildQueue, scopeCards } from '../lib/session.ts'
import { previewIntervals, type Grade } from '../lib/srs.ts'
import { speakable } from '../lib/speech.ts'
import { buzz, cx } from '../lib/utils.ts'
import { today, useApp } from '../store/useApp.ts'
import { useSpeaker } from '../components/Audio.tsx'
import { FlashCard } from '../components/FlashCard.tsx'
import { Illustration } from '../components/Illustration.tsx'
import { Bar, Button, Kbd } from '../components/ui.tsx'

const RATINGS: { g: Grade; label: string; kids: string; color: string }[] = [
  { g: 1, label: 'Errei', kids: 'Não sei', color: 'var(--again)' },
  { g: 2, label: 'Difícil', kids: 'Mais ou menos', color: 'var(--hard)' },
  { g: 3, label: 'Bom', kids: 'Sei!', color: 'var(--good)' },
  { g: 4, label: 'Fácil', kids: 'Moleza!', color: 'var(--easy)' },
]

export default function Study() {
  const [params] = useSearchParams()
  const moduleId = params.get('m') ?? undefined
  const favoritesOnly = params.get('fav') === '1'
  const navigate = useNavigate()
  const settings = useApp((s) => s.settings)
  const review = useApp((s) => s.review)
  const { say, stop } = useSpeaker()
  const kids = settings.mode === 'kids'

  // A fila é montada uma vez por sessão
  const initial = useMemo(() => {
    const st = useApp.getState()
    const cards = scopeCards({ audience: settings.mode, moduleId, favoritesOnly }, st.favorites)
    const remainingNew = moduleId || favoritesOnly ? 20 : Math.max(0, settings.newPerDay - today(st.days).newCards)
    return buildQueue(cards, st.srs, remainingNew, moduleId ? undefined : settings.startLevel[settings.mode])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, favoritesOnly])

  const [queue, setQueue] = useState<Card[]>(initial.queue)
  const [step, setStep] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [busy, setBusy] = useState(false)
  const [tally, setTally] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 } as Record<Grade, number>)
  const [intervals, setIntervals] = useState<Record<Grade, string> | null>(null)
  const total = useRef(initial.queue.length)
  const card = queue[0]

  useEffect(() => {
    if (!card) return
    setIntervals(null)
    previewIntervals(useApp.getState().srs[card.id]).then(setIntervals)
    if (settings.autoplay) {
      const t = setTimeout(() => say(speakable(card.term)), 320)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  useEffect(() => () => stop(), [stop])

  const flip = useCallback(() => {
    setFlipped((f) => !f)
    buzz(8)
  }, [])

  const rate = useCallback(
    async (g: Grade) => {
      if (!card || busy) return
      setBusy(true)
      buzz(g === 1 ? 25 : 10)
      stop()
      const next = await review(card.id, g)
      setTally((t) => ({ ...t, [g]: t[g] + 1 }))
      // Cards que voltam em menos de 20 min reaparecem nesta mesma sessão
      const soon = new Date(next.dueAt).getTime() - Date.now() < 20 * 60 * 1000
      if (soon) total.current += 1
      setQueue((q) => {
        const rest = q.slice(1)
        if (!soon) return rest
        const pos = Math.min(rest.length, g === 1 ? 3 : 6)
        return [...rest.slice(0, pos), card, ...rest.slice(pos)]
      })
      setFlipped(false)
      setStep((s) => s + 1)
      setBusy(false)
    },
    [card, busy, review, stop],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.metaKey || e.ctrlKey) return
      if (e.code === 'Space') {
        e.preventDefault()
        flip()
      } else if (flipped && ['1', '2', '3', '4'].includes(e.key)) rate(Number(e.key) as Grade)
      else if (e.key.toLowerCase() === 'a' && card) say(speakable(card.term))
      else if (e.key.toLowerCase() === 's' && card) say(speakable(card.term), { slow: true })
      else if (e.key === 'Escape') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flip, rate, flipped, card, say, navigate])

  const done = total.current - queue.length
  const title = moduleId ? moduleById.get(moduleId)?.title : favoritesOnly ? 'Favoritos' : 'Revisão do dia'

  if (!initial.queue.length) return <EmptyState moduleId={moduleId} />
  if (!card) return <Finished tally={tally} kids={kids} moduleId={moduleId} />

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      <div className="flex items-center gap-3 py-2">
        <button onClick={() => navigate(-1)} aria-label="Sair da sessão" className="grid size-10 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink">
          <X size={22} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-muted">{title}</p>
          <Bar value={done / total.current} className="mt-1.5" />
        </div>
        <span className="font-display text-sm font-bold tabular-nums text-muted">{done}/{total.current}</span>
      </div>

      <div className="relative mt-2">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, rotate: -4, transition: { duration: 0.18 } }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <FlashCard card={card} flipped={flipped} onFlip={flip} kids={kids} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="safe-bottom sticky bottom-0 mt-4 bg-bg/90 pb-2 pt-2 backdrop-blur">
        {!flipped ? (
          <Button size="lg" className="w-full" onClick={flip}>
            Mostrar resposta <span className="hidden sm:inline"><Kbd>Espaço</Kbd></span>
          </Button>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {RATINGS.map((r) => (
              <button
                key={r.g}
                disabled={busy}
                onClick={() => rate(r.g)}
                className="flex h-[68px] flex-col items-center justify-center rounded-2xl border-2 bg-surface font-bold transition active:scale-95 disabled:opacity-50"
                style={{ borderColor: `color-mix(in oklab, ${r.color} 55%, transparent)`, color: r.color }}
              >
                <span className={cx('leading-tight', kids ? 'text-[0.85rem]' : 'text-[0.95rem]')}>{kids ? r.kids : r.label}</span>
                <span className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-muted">
                  <span className="hidden sm:inline"><Kbd>{r.g}</Kbd></span>
                  {intervals?.[r.g] ?? '…'}
                </span>
              </button>
            ))}
          </div>
        )}
        <p className="mt-2 hidden text-center text-xs text-muted sm:block">
          <Kbd>Espaço</Kbd> virar · <Kbd>1</Kbd>–<Kbd>4</Kbd> avaliar · <Kbd>A</Kbd> ouvir · <Kbd>S</Kbd> devagar · <Kbd>Esc</Kbd> sair
        </p>
      </div>
    </div>
  )
}

function EmptyState({ moduleId }: { moduleId?: string }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <Illustration emoji="🎉" size={120} className="mx-auto" />
      <h1 className="mt-4 text-3xl font-bold">Nada para revisar agora</h1>
      <p className="mt-2 text-muted">
        {moduleId ? 'Você já viu todos os cards deste módulo e nenhum venceu ainda.' : 'Você cumpriu as revisões e os cards novos de hoje. A memória agradece a pausa!'}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/quiz"><Button><Sparkles size={18} /> Fazer um quiz</Button></Link>
        <Link to="/"><Button variant="secondary">Ver a trilha</Button></Link>
      </div>
    </div>
  )
}

function Finished({ tally, kids, moduleId }: { tally: Record<Grade, number>; kids: boolean; moduleId?: string }) {
  const n = tally[1] + tally[2] + tally[3] + tally[4]
  const acc = n ? Math.round(((tally[3] + tally[4]) / n) * 100) : 0
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-md py-12 text-center">
      <motion.div initial={{ rotate: -20, scale: 0.4 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 12 }}>
        <Illustration emoji={kids ? '🏆' : '🎯'} size={128} className="mx-auto" />
      </motion.div>
      <h1 className="mt-4 text-[2.4rem] font-bold leading-none">{kids ? 'Mandou muito bem!' : 'Sessão concluída'}</h1>
      <p className="mt-3 text-muted">{n} respostas · {acc}% de acerto</p>
      <div className="mt-6 grid grid-cols-4 gap-2">
        {RATINGS.map((r) => (
          <div key={r.g} className="rounded-2xl border border-line bg-surface py-3">
            <p className="font-display text-2xl font-bold" style={{ color: r.color }}>{tally[r.g]}</p>
            <p className="text-xs font-bold text-muted">{kids ? r.kids : r.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to={moduleId ? `/quiz?m=${moduleId}` : '/quiz'}><Button><PartyPopper size={18} /> Testar no quiz</Button></Link>
        <Link to="/"><Button variant="secondary">Voltar ao início</Button></Link>
      </div>
    </motion.div>
  )
}
