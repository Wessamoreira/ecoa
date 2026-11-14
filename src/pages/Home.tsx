import { ArrowRight, Check, Download, Layers, MessageCircle, Play, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { LEVEL_ORDER, audienceInfo, cardsFor, modulesFor, type Level, type Module } from '../data/index.ts'
import { modulePhoto } from '../lib/media.ts'
import { buildQueue, countDue } from '../lib/session.ts'
import { speakable } from '../lib/speech.ts'
import { cx, dayKey } from '../lib/utils.ts'
import { today, useApp } from '../store/useApp.ts'
import { AudioButton, SpeakText } from '../components/Audio.tsx'
import { Illustration } from '../components/Illustration.tsx'
import { ModuleArt } from '../components/ModuleArt.tsx'
import { useInstall } from '../components/Pwa.tsx'
import { Bar, Button, LevelBadge, ProgressRing } from '../components/ui.tsx'

const LEVEL_DESC: Record<'kids' | 'grown', Partial<Record<Level, string>>> = {
  kids: {
    A1: 'Cumprimentos, cores, números, animais e as primeiras frases com "I am".',
    A2: 'Ações, casa, roupas, transportes, sentimentos e onde as coisas estão.',
    B1: 'Rotina, natureza, profissões, opostos e como contar o que aconteceu ontem.',
  },
  grown: {
    A1: 'Verbo to be, pronomes, perguntas, rotina e as frases para se virar em qualquer lugar.',
    A2: 'Verbos irregulares, passado, futuro, restaurante, compras, saúde e direções.',
    B1: 'Present Perfect, modais, condicionais, falsos cognatos e inglês de trabalho.',
    B2: 'Phrasal verbs, conectivos, voz passiva, opinião e debate com naturalidade.',
    C1: 'Idioms, collocations, vocabulário acadêmico e nuances de um falante avançado.',
  },
}

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

export default function Home() {
  const settings = useApp((s) => s.settings)
  const srs = useApp((s) => s.srs)
  const days = useApp((s) => s.days)
  const navigate = useNavigate()
  const install = useInstall()
  const mode = settings.mode
  const kids = mode === 'kids'
  const info = audienceInfo(mode)
  const cards = useMemo(() => cardsFor(mode), [mode])
  const modules = useMemo(() => modulesFor(mode), [mode])
  const t = today(days)
  const due = countDue(cards, srs)
  const { queue } = buildQueue(cards, srs, Math.max(0, settings.newPerDay - t.newCards), settings.startLevel[mode])
  const goal = settings.dailyGoal
  const doneToday = t.reviews + t.quiz

  // Próximo módulo: o primeiro com cards novos, a partir do nível inicial do aluno
  const next = useMemo(() => {
    const start = LEVEL_ORDER.indexOf(settings.startLevel[mode] ?? 'A1')
    const ordered = [...modules.filter((m) => LEVEL_ORDER.indexOf(m.level) >= start), ...modules.filter((m) => LEVEL_ORDER.indexOf(m.level) < start)]
    return ordered.find((m) => m.cards.some((c) => !srs[c.id])) ?? ordered[0]
  }, [modules, srs, settings.startLevel, mode])

  const [level, setLevel] = useState<Level>(next?.level ?? info.levels[0])
  const shownLevel = info.levels.includes(level) ? level : info.levels[0]

  // Palavra do dia: determinística pela data
  const wotd = useMemo(() => {
    let h = 0
    for (const ch of dayKey() + mode) h = (h * 31 + ch.charCodeAt(0)) >>> 0
    const pool = cards.filter((c) => c.examples.length && !c.term.includes('/') && c.term.length < 26)
    return pool[h % pool.length]
  }, [cards, mode])

  const levelMods = modules.filter((m) => m.level === shownLevel)

  return (
    <div className="space-y-10">
      {/* Abertura */}
      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#12162B] p-6 text-white sm:p-8 dark:border dark:border-line dark:bg-surface">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: 'radial-gradient(80% 120% at 100% 100%, color-mix(in oklab, var(--accent) 45%, transparent), transparent 60%)' }}
            aria-hidden
          />
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.14em] opacity-60">Modo {info.label}</p>
            <h1 className="mt-2 text-[clamp(2.1rem,6vw,3.4rem)] font-bold leading-[0.98]">
              {greeting()}{settings.name ? `, ${settings.name}` : ''}!
            </h1>
            <p className="mt-2 max-w-md text-[1.05rem] opacity-75">
              {queue.length
                ? `${queue.length} ${queue.length === 1 ? 'card espera' : 'cards esperam'} por você hoje${due ? ` — ${due} para revisar` : ''}.`
                : 'Tudo revisado por hoje. Que tal um quiz ou um diálogo novo?'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => navigate('/estudar')} disabled={!queue.length}>
                <Layers size={20} /> {queue.length ? 'Estudar agora' : 'Nada para revisar'}
              </Button>
              <Button size="lg" variant="secondary" className="!bg-transparent !text-white !border-white/25 hover:!bg-white/10" onClick={() => navigate('/quiz')}>
                <Sparkles size={20} /> Quiz rápido
              </Button>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-6 right-4 hidden opacity-95 md:block" aria-hidden>
            <Illustration emoji={info.emoji} size={128} className="-rotate-12" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="flex items-center gap-4 rounded-[24px] border border-line bg-surface p-5">
            <ProgressRing value={doneToday / goal} size={72} stroke={8}>
              {doneToday >= goal ? <Check size={26} className="text-good" strokeWidth={3} /> : <span className="font-display text-lg font-bold">{doneToday}</span>}
            </ProgressRing>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Meta do dia</p>
              <p className="font-display text-xl font-bold leading-tight">{doneToday >= goal ? 'Concluída!' : `${goal - doneToday} para a meta`}</p>
              <p className="text-sm text-muted">+{t.xp} XP hoje</p>
            </div>
          </div>
          {wotd && (
            <div className="rounded-[24px] border border-line bg-surface p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">{kids ? 'Palavra do dia' : 'Expressão do dia'}</p>
              <div className="mt-2 flex items-center gap-3">
                <Illustration emoji={wotd.emoji} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl font-bold leading-tight">{wotd.term}</p>
                  <p className="text-sm text-muted">{wotd.pt}</p>
                </div>
                <AudioButton text={speakable(wotd.term)} />
              </div>
              <SpeakText text={wotd.examples[0].en} className="mt-3 text-[0.95rem]" />
            </div>
          )}
        </div>
      </section>

      {/* Continue de onde parou */}
      {next && <ContinueCard m={next} kids={kids} />}

      {install.canInstall && !install.standalone && (
        <section className="flex flex-wrap items-center gap-3 rounded-[24px] border border-dashed border-line p-4">
          <Download size={22} className="text-accent" />
          <p className="flex-1 text-sm font-semibold">Instale o Ecoa no seu aparelho: abre como app, funciona offline e guarda seu progresso no celular.</p>
          <Button size="sm" onClick={() => install.install()}>Instalar app</Button>
        </section>
      )}

      {/* Trilha por nível */}
      <section aria-labelledby="trilha">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 id="trilha" className="text-2xl font-bold">Sua trilha</h2>
          <p className="text-sm text-muted">{modules.length} módulos · {cards.length} cards</p>
        </div>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0" role="tablist" aria-label="Níveis">
          {info.levels.map((l) => {
            const lc = modules.filter((m) => m.level === l).flatMap((m) => m.cards)
            const pct = lc.length ? lc.filter((c) => srs[c.id]).length / lc.length : 0
            const on = l === shownLevel
            return (
              <button
                key={l}
                role="tab"
                aria-selected={on}
                onClick={() => setLevel(l)}
                className={cx(
                  'flex min-w-[140px] shrink-0 flex-col gap-1.5 rounded-2xl border-2 px-4 py-3 text-left transition',
                  on ? 'border-accent bg-surface shadow-card' : 'border-line bg-surface/60 hover:border-muted/40',
                )}
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold leading-none">{l}</span>
                  <span className="truncate text-xs font-bold text-muted">{Math.round(pct * 100)}%</span>
                </span>
                <span className="truncate text-sm font-semibold">{info.levelNames[l]}</span>
                <Bar value={pct} className="h-1.5" />
              </button>
            )
          })}
        </div>

        <p className="mb-5 mt-4 max-w-2xl text-muted">{LEVEL_DESC[kids ? 'kids' : 'grown'][shownLevel]}</p>

        <div className={cx('grid gap-3', kids ? 'grid-cols-2 sm:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-3')}>
          {levelMods.map((m) => (
            <ModuleTile key={m.id} m={m} kids={kids} />
          ))}
        </div>
      </section>

      <p className="pt-4 text-center text-sm text-muted">
        <Link to="/creditos" className="underline underline-offset-4 hover:text-ink">Créditos de imagens e áudios</Link>
      </p>
    </div>
  )
}

function ContinueCard({ m, kids }: { m: Module; kids: boolean }) {
  const srs = useApp((s) => s.srs)
  const seen = m.cards.filter((c) => srs[c.id]).length
  const photo = !kids ? modulePhoto(m.id) : undefined
  return (
    <section className="overflow-hidden rounded-[28px] border border-line bg-surface sm:grid sm:grid-cols-[minmax(220px,36%)_1fr]">
      {photo ? (
        <div className="duotone relative h-44 sm:h-full">
          <img src={photo.src} alt="" className="duotone-photo absolute inset-0 size-full object-cover" />
          <span className="absolute inset-0 z-10 grid place-items-center">
            <Illustration emoji={m.emoji} size={80} className="drop-shadow-[0_10px_14px_rgb(0_0_0/0.35)]" />
          </span>
        </div>
      ) : (
        <ModuleArt m={m} size="md" className="h-44 sm:h-full" />
      )}
      <div className="flex flex-col gap-2 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{seen ? 'Continue de onde parou' : 'Próximo passo'}</p>
        <div className="flex flex-wrap items-center gap-2">
          <LevelBadge level={m.level} />
          <span className="text-xs font-bold uppercase tracking-wider text-muted">{m.category}</span>
          {m.dialogue && (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-muted">
              <MessageCircle size={12} /> diálogo
            </span>
          )}
        </div>
        <h2 className="font-display text-[1.9rem] font-bold leading-[1.05]">{m.title}</h2>
        <p className="text-muted">{m.subtitle}</p>
        <div className="mt-2 flex items-center gap-3">
          <Bar value={seen / m.cards.length} className="max-w-xs flex-1" />
          <span className="text-sm font-bold tabular-nums text-muted">{seen}/{m.cards.length}</span>
        </div>
        <div className="mt-3">
          <Link to={`/trilha/${m.id}`} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-accent px-5 font-semibold text-accent-ink shadow-[0_8px_20px_-8px_var(--accent)] transition hover:brightness-105 active:scale-[0.97]">
            <Play size={17} fill="currentColor" /> {seen ? 'Continuar' : 'Começar módulo'}
          </Link>
        </div>
      </div>
    </section>
  )
}

function ModuleTile({ m, kids }: { m: Module; kids: boolean }) {
  const srs = useApp((s) => s.srs)
  const seen = m.cards.filter((c) => srs[c.id]).length
  const due = countDue(m.cards, srs)
  const photo = !kids ? modulePhoto(m.id) : undefined
  const pct = seen / m.cards.length

  if (kids)
    return (
      <Link to={`/trilha/${m.id}`} className="group flex flex-col overflow-hidden rounded-[28px] border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-card">
        <ModuleArt m={m} size="sm" className="h-32 transition group-hover:brightness-105" />
        <div className="flex flex-1 flex-col p-4 text-center">
          <span className="font-display text-lg font-bold leading-tight">{m.title}</span>
          <span className="mt-0.5 line-clamp-2 text-xs text-muted">{m.subtitle}</span>
          <div className="mt-auto flex items-center gap-2 pt-3">
            <Bar value={pct} className="flex-1" />
            {pct >= 1 && <Check size={16} className="text-good" strokeWidth={3} />}
          </div>
        </div>
      </Link>
    )

  return (
    <Link to={`/trilha/${m.id}`} className="group flex overflow-hidden rounded-[22px] border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-card">
      {photo ? (
        <div className="duotone relative w-28 shrink-0 sm:w-32">
          <img src={photo.src} alt="" loading="lazy" className="duotone-photo absolute inset-0 size-full object-cover" />
          <span className="absolute inset-0 z-10 grid place-items-center">
            <Illustration emoji={m.emoji} size={54} className="drop-shadow-[0_8px_10px_rgb(0_0_0/0.35)] transition group-hover:scale-110" />
          </span>
        </div>
      ) : (
        <ModuleArt m={m} size="sm" className="w-28 shrink-0 sm:w-32" />
      )}
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <LevelBadge level={m.level} />
          <span className="truncate text-[11px] font-bold uppercase tracking-wider text-muted">{m.category}</span>
          {m.dialogue && <MessageCircle size={13} className="shrink-0 text-muted" aria-label="Tem diálogo" />}
          {due > 0 && <span className="ml-auto shrink-0 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-ink">{due} p/ revisar</span>}
        </div>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-tight">{m.title}</h3>
        <p className="line-clamp-1 text-sm text-muted">{m.subtitle}</p>
        <div className="mt-auto flex items-center gap-2 pt-3">
          <Bar value={pct} className="flex-1" />
          <span className="text-xs font-bold text-muted">{seen}/{m.cards.length}</span>
          <ArrowRight size={16} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>
      </div>
    </Link>
  )
}
