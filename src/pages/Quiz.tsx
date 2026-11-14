import { ArrowRight, Check, Headphones, Mic, RotateCcw, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { audienceInfo, moduleById, type Level } from '../data/index.ts'
import { buildQuiz, type Question } from '../lib/quiz.ts'
import { canRecognize } from '../lib/recognition.ts'
import { scopeCards } from '../lib/session.ts'
import { buzz, cx } from '../lib/utils.ts'
import { useApp } from '../store/useApp.ts'
import { AudioButton, useSpeaker } from '../components/Audio.tsx'
import { PronunciationCoach } from '../components/Coach.tsx'
import { Illustration } from '../components/Illustration.tsx'
import { Bar, Button, Chip, Kbd, PageHeader } from '../components/ui.tsx'

const KIND_LABEL: Record<Question['kind'], string> = {
  'en-pt': 'O que significa?',
  'pt-en': 'Como se diz em inglês?',
  listen: 'Ouça e escolha',
  cloze: 'Complete a frase',
  speak: 'Fale em voz alta',
}

export default function Quiz() {
  const [params] = useSearchParams()
  const moduleId = params.get('m') ?? undefined
  const mode = useApp((s) => s.settings.mode)
  const info = audienceInfo(mode)
  const [level, setLevel] = useState<Level | undefined>()
  const [count, setCount] = useState(10)
  const [speakOn, setSpeakOn] = useState(canRecognize && mode !== 'kids')
  const [questions, setQuestions] = useState<Question[] | null>(null)

  const start = () => {
    const pool = scopeCards({ audience: mode, moduleId, level }, useApp.getState().favorites)
    setQuestions(buildQuiz(pool, count, { speak: speakOn, kids: mode === 'kids' }))
  }

  if (questions) return <QuizRun questions={questions} onRestart={start} onExit={() => setQuestions(null)} moduleId={moduleId} />

  const mod = moduleId ? moduleById.get(moduleId) : undefined
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Modo quiz" title={mod ? `Quiz: ${mod.title}` : 'Quiz rápido'}>
        Tradução, listening, frases para completar e treino de fala — misturados para fixar de verdade.
      </PageHeader>

      {!mod && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Nível</h2>
          <div className="flex flex-wrap gap-2">
            <Chip active={!level} onClick={() => setLevel(undefined)}>Todos</Chip>
            {info.levels.map((l) => (
              <Chip key={l} active={level === l} onClick={() => setLevel(l)}>{l} · {info.levelNames[l]}</Chip>
            ))}
          </div>
        </section>
      )}

      <section className="mb-6">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Perguntas</h2>
        <div className="flex gap-2">
          {[5, 10, 20].map((n) => <Chip key={n} active={count === n} onClick={() => setCount(n)}>{n}</Chip>)}
        </div>
      </section>

      {canRecognize && (
        <label className="mb-8 flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-surface p-4">
          <Mic size={20} className="text-accent" />
          <span className="flex-1">
            <span className="block font-bold">Incluir perguntas de fala</span>
            <span className="block text-sm text-muted">Usa o microfone para avaliar sua pronúncia.</span>
          </span>
          <input type="checkbox" className="size-5 accent-[var(--accent)]" checked={speakOn} onChange={(e) => setSpeakOn(e.target.checked)} />
        </label>
      )}

      <Button size="lg" className="w-full sm:w-auto sm:min-w-64" onClick={start}>
        <Sparkles size={20} /> Começar quiz
      </Button>
    </div>
  )
}

function QuizRun({ questions, onRestart, onExit, moduleId }: { questions: Question[]; onRestart: () => void; onExit: () => void; moduleId?: string }) {
  const navigate = useNavigate()
  const logQuiz = useApp((s) => s.logQuiz)
  const kids = useApp((s) => s.settings.mode === 'kids')
  const { say } = useSpeaker()
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [results, setResults] = useState<boolean[]>([])
  const q = questions[i]
  const answered = picked !== null

  useEffect(() => {
    if (q && (q.kind === 'listen' || q.kind === 'speak')) {
      const t = setTimeout(() => q.audio && say(q.audio), 350)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i])

  const choose = useCallback(
    (opt: string) => {
      if (answered || !q) return
      const ok = opt === q.answer
      setPicked(opt)
      setResults((r) => [...r, ok])
      logQuiz(ok)
      buzz(ok ? 12 : [20, 40, 20])
      if (q.audio && q.kind !== 'listen') say(q.audio)
    },
    [answered, q, logQuiz, say],
  )
  const next = useCallback(() => {
    setPicked(null)
    setI((n) => n + 1)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!q) return
      if (!answered && q.options.length && ['1', '2', '3', '4'].includes(e.key)) choose(q.options[Number(e.key) - 1])
      else if (answered && (e.key === 'Enter' || e.code === 'Space')) {
        e.preventDefault()
        next()
      } else if (e.key.toLowerCase() === 'a' && q.audio) say(q.audio)
      else if (e.key === 'Escape') onExit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [q, answered, choose, next, say, onExit])

  const correct = useMemo(() => results.filter(Boolean).length, [results])

  if (!q) {
    const pct = Math.round((correct / questions.length) * 100)
    const wrong = questions.filter((_, k) => results[k] === false)
    return (
      <div className="mx-auto max-w-xl py-8 text-center">
        <Illustration emoji={pct >= 80 ? '🏆' : pct >= 50 ? '💪' : '📚'} size={120} className="mx-auto" />
        <h1 className="mt-4 text-[2.6rem] font-bold leading-none">{correct}/{questions.length}</h1>
        <p className="mt-2 text-lg text-muted">{pct >= 80 ? 'Excelente! Você domina este conteúdo.' : pct >= 50 ? 'Bom trabalho! Revise os erros abaixo.' : 'Continue praticando — os flashcards vão te ajudar.'}</p>
        {wrong.length > 0 && (
          <div className="mt-6 rounded-[24px] border border-line bg-surface p-4 text-left">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Para revisar</p>
            <ul className="divide-y divide-line">
              {wrong.map((w, k) => (
                <li key={k} className="flex items-center gap-3 py-2.5">
                  <Illustration emoji={w.card.emoji} size={32} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{w.card.term}</span>
                    <span className="block text-sm text-muted">{w.card.pt}</span>
                  </span>
                  <AudioButton text={w.card.term.replace(/\(.*?\)/g, '')} size="sm" />
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => { setI(0); setResults([]); onRestart() }}><RotateCcw size={18} /> Novo quiz</Button>
          <Link to={moduleId ? `/estudar?m=${moduleId}` : '/estudar'}><Button variant="secondary">Ir para os flashcards</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      <div className="flex items-center gap-3 py-2">
        <button onClick={() => navigate(-1)} aria-label="Sair do quiz" className="grid size-10 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink">
          <X size={22} />
        </button>
        <Bar value={i / questions.length} className="flex-1" />
        <span className="font-display text-sm font-bold tabular-nums text-muted">{i + 1}/{questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }} className="mt-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{KIND_LABEL[q.kind]}</p>

          <div className="mt-3 rounded-[26px] border border-line bg-surface p-6 text-center shadow-card">
            {q.kind === 'listen' ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <Headphones size={28} className="text-muted" />
                <div className="flex gap-2">
                  <AudioButton text={q.audio!} size="lg" />
                  <AudioButton text={q.audio!} slow />
                </div>
              </div>
            ) : q.kind === 'cloze' ? (
              <>
                <p className="font-display text-[clamp(1.4rem,4.5vw,2rem)] font-bold leading-snug">
                  {q.sentence!.before}
                  <span className={cx('mx-1 inline-block min-w-20 border-b-4 px-1', answered ? (picked === q.answer ? 'border-good text-good' : 'border-again text-again') : 'border-accent text-transparent')}>
                    {answered ? q.answer : '____'}
                  </span>
                  {q.sentence!.after}
                </p>
                <p className="mt-2 text-muted">{q.sentence!.pt}</p>
              </>
            ) : q.kind === 'speak' ? (
              <div className="flex flex-col items-center gap-3">
                <Illustration emoji={q.card.emoji} size={72} />
                <p className="font-display text-[clamp(1.8rem,6vw,2.6rem)] font-bold leading-tight">{q.card.term}</p>
                <p className="text-muted">{q.card.pt}</p>
                <AudioButton text={q.audio!} />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Illustration emoji={q.card.emoji} size={kids ? 96 : 72} />
                <p className={cx('font-display font-bold leading-tight', q.kind === 'pt-en' ? 'text-[clamp(1.5rem,5vw,2.2rem)]' : 'text-[clamp(1.8rem,6vw,2.8rem)]')}>{q.prompt}</p>
                {q.kind === 'en-pt' && <AudioButton text={q.audio!} size="sm" />}
              </div>
            )}
          </div>

          {q.kind === 'speak' ? (
            <div className="mt-4 space-y-3">
              <PronunciationCoach
                target={q.answer}
                onResult={(a) => {
                  if (answered) return
                  const ok = a.score >= 70
                  setPicked(ok ? q.answer : '__')
                  setResults((r) => [...r, ok])
                  logQuiz(ok)
                }}
              />
              {!answered && (
                <Button variant="ghost" className="w-full" onClick={() => { setPicked('__skip'); setResults((r) => [...r, false]) }}>
                  Não posso falar agora — pular
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {q.options.map((opt, k) => {
                const isAnswer = opt === q.answer
                const isPicked = opt === picked
                return (
                  <button
                    key={opt}
                    disabled={answered}
                    onClick={() => choose(opt)}
                    className={cx(
                      'flex min-h-14 items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-semibold transition active:scale-[0.98]',
                      !answered && 'border-line bg-surface hover:border-accent',
                      answered && isAnswer && 'border-good bg-good/12',
                      answered && isPicked && !isAnswer && 'border-again bg-again/10',
                      answered && !isAnswer && !isPicked && 'border-line bg-surface opacity-55',
                    )}
                  >
                    <span className="hidden sm:inline"><Kbd>{k + 1}</Kbd></span>
                    <span className="flex-1">{opt}</span>
                    {answered && isAnswer && <Check size={20} className="text-good" strokeWidth={3} />}
                    {answered && isPicked && !isAnswer && <X size={20} className="text-again" strokeWidth={3} />}
                  </button>
                )
              })}
            </div>
          )}

          {answered && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-3 rounded-2xl bg-surface-2 p-4">
              <div className="min-w-0 flex-1">
                <p className={cx('font-bold', results.at(-1) ? 'text-good' : 'text-again')}>
                  {results.at(-1) ? (kids ? 'Isso aí! 🎉' : 'Correto!') : picked === '__skip' ? 'Pulada' : 'Quase!'}
                </p>
                <p className="truncate text-sm text-muted">
                  <b className="text-ink">{q.card.term}</b> = {q.card.pt}
                </p>
              </div>
              <Button onClick={next}>
                Continuar <ArrowRight size={18} />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
