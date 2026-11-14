import { Languages, Mic, Pause, Play, Snail } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Dialogue } from '../data/index.ts'
import { speak, stopSpeaking, ttsSupported, voicePair } from '../lib/speech.ts'
import { cx } from '../lib/utils.ts'
import { useApp } from '../store/useApp.ts'
import { PronunciationCoach } from './Coach.tsx'
import { Illustration } from './Illustration.tsx'

/** Texto com a palavra atual acesa (o "eco") */
function Echo({ text, charIdx }: { text: string; charIdx: number }) {
  const tokens = useMemo(() => [...text.matchAll(/(\S+)|(\s+)/g)].map((m) => ({ t: m[0], start: m.index ?? 0, word: !!m[1] })), [text])
  const active = charIdx < 0 ? -1 : tokens.filter((t) => t.word && t.start <= charIdx).at(-1)?.start ?? -1
  return (
    <>
      {tokens.map((tk, i) =>
        tk.word ? (
          <span key={i} className="echo-word px-[1px]" data-on={tk.start === active} data-past={active >= 0 && tk.start < active}>
            {tk.t}
          </span>
        ) : (
          <span key={i}>{tk.t}</span>
        ),
      )}
    </>
  )
}

export function DialoguePlayer({ d }: { d: Dialogue }) {
  const { accent, rate, voiceURI } = useApp((s) => s.settings)
  const [idx, setIdx] = useState(-1)
  const [charIdx, setCharIdx] = useState(-1)
  const [playingAll, setPlayingAll] = useState(false)
  const [slow, setSlow] = useState(false)
  const [showPt, setShowPt] = useState(true)
  const [practice, setPractice] = useState<number | null>(null)
  const chain = useRef(false)
  // A velocidade usada pela sequência precisa ser lida na hora de cada fala (o estado pode estar atrasado)
  const slowRef = useRef(false)

  useEffect(() => () => stopSpeaking(), [])

  const stop = () => {
    chain.current = false
    stopSpeaking()
    setPlayingAll(false)
    setIdx(-1)
    setCharIdx(-1)
  }

  const playLine = (i: number, continueAfter: boolean) => {
    const voices = voicePair(accent, voiceURI)
    const line = d.lines[i]
    const v = voices[line.who === 'A' ? 0 : 1]
    setIdx(i)
    setCharIdx(0)
    speak(line.en, {
      accent,
      voiceURI: v.voiceURI,
      pitch: v.pitch,
      rate: rate * (slowRef.current ? 0.75 : 1),
      onWord: setCharIdx,
      onEnd: () => {
        if (continueAfter && chain.current && i + 1 < d.lines.length) {
          setCharIdx(-1)
          setTimeout(() => chain.current && playLine(i + 1, true), 380)
        } else {
          chain.current = false
          setPlayingAll(false)
          setIdx(-1)
          setCharIdx(-1)
        }
      },
    })
  }

  /** Toca o diálogo inteiro na velocidade escolhida. Tocar de novo no mesmo botão para. */
  const playAll = (slowMode: boolean) => {
    if (playingAll && slow === slowMode) return stop()
    setSlow(slowMode)
    slowRef.current = slowMode
    chain.current = true
    setPlayingAll(true)
    setPractice(null)
    playLine(0, true)
  }

  return (
    <section className="overflow-hidden rounded-[26px] border border-line bg-surface">
      <header className="border-b border-line px-5 pb-4 pt-5">
        <div className="flex items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft">
            <Illustration emoji={d.emoji} size={34} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{d.scene}</p>
            <h2 className="font-display text-xl font-bold leading-tight text-balance">{d.title}</h2>
          </div>
        </div>
        {ttsSupported && (
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => playAll(false)}
              className={cx(
                'relative inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 font-semibold text-accent-ink transition active:scale-95',
                playingAll && !slow && 'speaking-ring',
              )}
            >
              {playingAll && !slow ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
              {playingAll && !slow ? 'Parar' : 'Ouvir'}
            </button>
            <button
              onClick={() => playAll(true)}
              title="Ouvir o diálogo devagar (0.75x)"
              className={cx(
                'relative inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border-2 px-4 font-semibold transition active:scale-95',
                playingAll && slow ? 'speaking-ring border-accent bg-accent-soft text-ink' : 'border-line text-ink hover:border-accent',
              )}
            >
              {playingAll && slow ? <Pause size={17} fill="currentColor" /> : <Snail size={18} />}
              {playingAll && slow ? 'Parar' : 'Devagar'}
            </button>
            <button
              onClick={() => setShowPt((s) => !s)}
              aria-pressed={showPt}
              aria-label={showPt ? 'Esconder tradução' : 'Mostrar tradução'}
              title={showPt ? 'Esconder tradução' : 'Mostrar tradução'}
              className={cx('grid size-11 shrink-0 place-items-center rounded-full border-2 transition', showPt ? 'border-accent bg-accent-soft text-ink' : 'border-line text-muted hover:text-ink')}
            >
              <Languages size={18} />
            </button>
          </div>
        )}
        <p className="mt-2.5 text-xs text-muted">
          Toque numa fala para ouvir só ela{slow ? ' (devagar)' : ''}. O microfone ao lado serve para praticar.
        </p>
      </header>

      <ol className="space-y-3 px-4 py-5 sm:px-5">
        {d.lines.map((l, i) => {
          const right = l.who === 'B'
          const on = idx === i
          return (
            <li key={i} className={cx('flex flex-col', right ? 'items-end' : 'items-start')}>
              <span className={cx('mb-1 px-2 text-[11px] font-bold uppercase tracking-wider', right ? 'text-accent' : 'text-muted')} style={right ? { color: 'color-mix(in oklab, var(--accent) 80%, var(--ink))' } : undefined}>
                {l.name}
              </span>
              <div className={cx('flex max-w-[88%] items-end gap-1.5', right && 'flex-row-reverse')}>
                <button
                  type="button"
                  onClick={() => {
                    chain.current = false
                    setPlayingAll(false)
                    playLine(i, false)
                  }}
                  className={cx(
                    'rounded-[20px] px-4 py-2.5 text-left transition',
                    right ? 'rounded-br-md bg-accent-soft' : 'rounded-bl-md bg-surface-2',
                    on && 'ring-2 ring-accent',
                  )}
                  aria-label={`${l.name}: ${l.en}. Toque para ouvir.`}
                >
                  <span className="block text-[1.04rem] font-semibold leading-snug">
                    <Echo text={l.en} charIdx={on ? charIdx : -1} />
                  </span>
                  {showPt && <span className="mt-0.5 block text-sm text-muted">{l.pt}</span>}
                </button>
                <button
                  type="button"
                  onClick={() => setPractice(practice === i ? null : i)}
                  aria-label="Praticar esta fala"
                  title="Praticar esta fala"
                  className={cx('mb-1 grid size-8 shrink-0 place-items-center rounded-full transition', practice === i ? 'bg-ink text-bg' : 'text-muted hover:bg-surface-2 hover:text-ink')}
                >
                  <Mic size={15} />
                </button>
              </div>
              {practice === i && (
                <div className="mt-2 w-full max-w-[88%]">
                  <PronunciationCoach target={l.en} compact />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
