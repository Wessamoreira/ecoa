import { Mic2, Snail, Volume2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { lookupWord, playUrl, type DictEntry } from '../lib/dictionary.ts'
import { speak, stopSpeaking, ttsSupported } from '../lib/speech.ts'
import { cx } from '../lib/utils.ts'
import { useApp } from '../store/useApp.ts'

/** Hook que fala com as preferências do aluno (sotaque, voz, velocidade) */
export function useSpeaker() {
  const { accent, voiceURI, rate } = useApp((s) => s.settings)
  return useMemo(
    () => ({
      say: (text: string, opts: { slow?: boolean; onWord?: (i: number) => void; onStart?: () => void; onEnd?: () => void } = {}) =>
        speak(text, { accent, voiceURI, rate: rate * (opts.slow ? 0.75 : 1), onWord: opts.onWord, onStart: opts.onStart, onEnd: opts.onEnd }),
      stop: stopSpeaking,
    }),
    [accent, voiceURI, rate],
  )
}

export function AudioButton({
  text, slow, label, size = 'md', className, autoPlayKey,
}: { text: string; slow?: boolean; label?: string; size?: 'sm' | 'md' | 'lg'; className?: string; autoPlayKey?: string | number }) {
  const { say } = useSpeaker()
  const [on, setOn] = useState(false)
  const play = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    say(text, { slow, onStart: () => setOn(true), onEnd: () => setOn(false) })
    setOn(true)
  }
  useEffect(() => {
    if (autoPlayKey !== undefined) {
      const t = setTimeout(() => play(), 250)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayKey])
  if (!ttsSupported) return null
  const dim = size === 'lg' ? 'size-14' : size === 'sm' ? 'size-9' : 'size-11'
  const Icon = slow ? Snail : Volume2
  return (
    <button
      type="button"
      onClick={play}
      aria-label={label ?? (slow ? `Ouvir devagar: ${text}` : `Ouvir: ${text}`)}
      title={slow ? 'Ouvir devagar (0.75x)' : 'Ouvir (A)'}
      className={cx(
        'relative grid shrink-0 place-items-center rounded-full transition active:scale-95',
        slow ? 'bg-surface-2 text-ink' : 'bg-accent text-accent-ink',
        on && 'speaking-ring',
        dim,
        className,
      )}
    >
      <Icon size={size === 'lg' ? 26 : size === 'sm' ? 16 : 20} strokeWidth={2.2} />
    </button>
  )
}

/**
 * Frase com "eco": cada palavra acende enquanto é falada.
 * Toque na frase para ouvir; o caracol toca em 0.75x.
 */
export function SpeakText({ text, className, showSlow = true }: { text: string; className?: string; showSlow?: boolean }) {
  const { say } = useSpeaker()
  const [charIdx, setCharIdx] = useState(-1)
  const tokens = useMemo(() => {
    const out: { t: string; start: number; word: boolean }[] = []
    for (const m of text.matchAll(/(\S+)|(\s+)/g)) out.push({ t: m[0], start: m.index ?? 0, word: !!m[1] })
    return out
  }, [text])
  const run = (slow: boolean) => (e: React.MouseEvent) => {
    e.stopPropagation()
    say(text, { slow, onWord: setCharIdx, onEnd: () => setCharIdx(-1) })
  }
  const activeStart = charIdx < 0 ? -1 : tokens.filter((t) => t.word && t.start <= charIdx).at(-1)?.start ?? -1

  return (
    <span className={cx('inline-flex items-start gap-2', className)}>
      <button type="button" onClick={run(false)} className="text-left font-semibold leading-snug hover:text-accent transition-colors" aria-label={`Ouvir a frase: ${text}`}>
        {tokens.map((tk, i) =>
          tk.word ? (
            <span key={i} className="echo-word px-[1px]" data-on={tk.start === activeStart} data-past={activeStart >= 0 && tk.start < activeStart}>
              {tk.t}
            </span>
          ) : (
            <span key={i}>{tk.t}</span>
          ),
        )}
      </button>
      {ttsSupported && (
        <span className="mt-[-2px] flex shrink-0 gap-1">
          <button type="button" onClick={run(false)} aria-label="Ouvir em velocidade normal" title="Velocidade normal (1x)" className="grid size-8 place-items-center rounded-full text-accent hover:bg-accent-soft">
            <Volume2 size={17} />
          </button>
          {showSlow && (
            <button type="button" onClick={run(true)} aria-label="Ouvir devagar" title="Devagar (0.75x)" className="grid size-8 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink">
              <Snail size={17} />
            </button>
          )}
        </span>
      )}
    </span>
  )
}

/** Gravação humana real (Wiktionary/Wikimedia) quando existir para a palavra */
export function HumanAudio({ word, className }: { word?: string; className?: string }) {
  const [entry, setEntry] = useState<DictEntry | null | undefined>(undefined)
  const [playing, setPlaying] = useState<string | null>(null)
  const alive = useRef(true)
  useEffect(() => {
    alive.current = true
    setEntry(undefined)
    if (word && navigator.onLine !== false) lookupWord(word).then((e) => alive.current && setEntry(e))
    else setEntry(null)
    return () => {
      alive.current = false
    }
  }, [word])
  if (!entry?.audios.length) return null
  const list = entry.audios.filter((a) => a.accent !== 'EN').slice(0, 3)
  if (!list.length) list.push(entry.audios[0])
  return (
    <div className={cx('flex flex-wrap items-center gap-2', className)}>
      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
        <Mic2 size={13} /> Voz humana
      </span>
      {list.map((a) => (
        <button
          key={a.url}
          type="button"
          onClick={async (e) => {
            e.stopPropagation()
            setPlaying(a.url)
            await playUrl(a.url)
            setPlaying(null)
          }}
          className={cx('relative h-8 rounded-full border border-line bg-surface px-3 text-xs font-bold hover:border-accent', playing === a.url && 'speaking-ring')}
          title={a.license ? `Gravação real · ${a.license}` : 'Gravação real'}
        >
          {a.accent === 'US' ? '🇺🇸 US' : a.accent === 'UK' ? '🇬🇧 UK' : a.accent === 'AU' ? '🇦🇺 AU' : '▶ EN'}
        </button>
      ))}
    </div>
  )
}
