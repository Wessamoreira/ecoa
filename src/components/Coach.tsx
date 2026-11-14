import { Mic, Square } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { assess, canRecognize, listen, type Assessment } from '../lib/recognition.ts'
import { stopSpeaking } from '../lib/speech.ts'
import { buzz, cx } from '../lib/utils.ts'
import { useApp } from '../store/useApp.ts'

const verdict = (s: number) =>
  s >= 90 ? 'Perfeito! Soou natural.' : s >= 75 ? 'Muito bom! Quase lá.' : s >= 50 ? 'Bom começo. Ouça de novo e repita.' : 'Vamos de novo: ouça devagar e imite o ritmo.'

/**
 * Treino de pronúncia: o aluno fala, o navegador transcreve e
 * comparamos palavra por palavra com a frase-alvo.
 */
export function PronunciationCoach({ target, compact, onResult }: { target: string; compact?: boolean; onResult?: (a: Assessment) => void }) {
  const accent = useApp((s) => s.settings.accent)
  const logSpeak = useApp((s) => s.logSpeak)
  const [state, setState] = useState<'idle' | 'listening' | 'done'>('idle')
  const [interim, setInterim] = useState('')
  const [result, setResult] = useState<Assessment | null>(null)
  const [error, setError] = useState('')
  const stopRef = useRef<() => void>(() => {})

  useEffect(() => {
    setState('idle')
    setResult(null)
    setError('')
    setInterim('')
    return () => stopRef.current()
  }, [target])

  if (!canRecognize)
    return (
      <p className="rounded-2xl border border-dashed border-line px-4 py-3 text-sm text-muted">
        Treino de fala indisponível neste navegador. Abra no Chrome, Edge ou Safari para praticar a pronúncia com o microfone.
      </p>
    )

  const start = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (state === 'listening') return stopRef.current()
    stopSpeaking()
    setError('')
    setInterim('')
    setResult(null)
    setState('listening')
    buzz()
    stopRef.current = listen(accent, {
      onInterim: setInterim,
      onFinal: (alts) => {
        if (!alts.length) return
        const a = assess(target, alts)
        setResult(a)
        logSpeak(a.score)
        onResult?.(a)
        buzz(a.score >= 75 ? 20 : 8)
      },
      onError: setError,
      onEnd: () => setState((s) => (s === 'listening' ? 'done' : s)),
    })
  }

  return (
    <div className={cx('rounded-2xl border border-line bg-surface', compact ? 'p-3' : 'p-4')} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={start}
          aria-label={state === 'listening' ? 'Parar gravação' : 'Falar agora'}
          className={cx(
            'relative grid size-12 shrink-0 place-items-center rounded-full transition active:scale-95',
            state === 'listening' ? 'bg-again text-white speaking-ring' : 'bg-ink text-bg',
          )}
        >
          {state === 'listening' ? <Square size={18} fill="currentColor" /> : <Mic size={20} />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">{state === 'listening' ? 'Ouvindo… fale agora' : 'Treine sua pronúncia'}</p>
          <p className="truncate text-sm text-muted">{state === 'listening' ? interim || '…' : result ? `Ouvi: “${result.heard}”` : 'Toque no microfone e repita em voz alta.'}</p>
        </div>
        <AnimatePresence>
          {result && (
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-right">
              <p className={cx('font-display text-3xl font-bold leading-none', result.score >= 75 ? 'text-good' : result.score >= 50 ? 'text-hard' : 'text-again')}>{result.score}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">de 100</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="mt-2 text-sm text-again">{error}</p>}
      {result && (
        <div className="mt-3 border-t border-line pt-3">
          <p className="flex flex-wrap gap-1.5">
            {result.words.map((w, i) => (
              <span
                key={i}
                className={cx(
                  'rounded-lg px-2 py-0.5 text-sm font-semibold',
                  w.status === 'ok' && 'bg-good/15 text-good',
                  w.status === 'close' && 'bg-hard/15 text-hard',
                  w.status === 'miss' && 'bg-again/12 text-again line-through decoration-2',
                )}
              >
                {w.word}
              </span>
            ))}
          </p>
          <p className="mt-2 text-sm text-muted">{verdict(result.score)}</p>
        </div>
      )}
    </div>
  )
}
