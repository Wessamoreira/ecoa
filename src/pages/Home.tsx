import { ArrowRight, Check, Download, Layers, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router'
import { audienceInfo, cardsFor, modulesFor, type Module } from '../data/index.ts'
import { modulePhoto } from '../lib/media.ts'
import { buildQueue, countDue } from '../lib/session.ts'
import { speakable } from '../lib/speech.ts'
import { cx, dayKey } from '../lib/utils.ts'
import { today, useApp } from '../store/useApp.ts'
import { AudioButton, SpeakText } from '../components/Audio.tsx'
import { Illustration } from '../components/Illustration.tsx'
import { useInstall } from '../components/Pwa.tsx'
import { Bar, Button, LevelBadge, ProgressRing } from '../components/ui.tsx'

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

  // Palavra do dia: determinística pela data, entre os cards do modo
  const wotd = useMemo(() => {
    const k = dayKey()
    let h = 0
    for (const ch of k + mode) h = (h * 31 + ch.charCodeAt(0)) >>> 0
    const pool = cards.filter((c) => c.examples.length && !c.term.includes('/') && c.term.length < 26)
    return pool[h % pool.length]
  }, [cards, mode])

  return (
    <div className="space-y-10">
      {/* Abertura: o que fazer hoje */}
      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#12162B] p-6 text-white sm:p-8 dark:border dark:border-line dark:bg-surface">
          <p className="text-sm font-bold uppercase tracking-[0.14em] opacity-60">Modo {info.label}</p>
          <h1 className="mt-2 text-[clamp(2.1rem,6vw,3.4rem)] font-bold leading-[0.98]">
            {greeting()}{settings.name ? `, ${settings.name}` : ''}!
          </h1>
          <p className="mt-2 max-w-md text-[1.05rem] opacity-75">
            {queue.length
              ? `${queue.length} ${queue.length === 1 ? 'card espera' : 'cards esperam'} por você hoje${due ? ` — ${due} para revisar` : ''}.`
              : 'Tudo revisado por hoje. Que tal um quiz ou explorar um módulo novo?'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => navigate('/estudar')} disabled={!queue.length}>
              <Layers size={20} /> {queue.length ? 'Estudar agora' : 'Nada para revisar'}
            </Button>
            <Button size="lg" variant="secondary" className="!bg-transparent !text-white !border-white/25 hover:!bg-white/10" onClick={() => navigate('/quiz')}>
              <Sparkles size={20} /> Quiz rápido
            </Button>
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

      {install.canInstall && !install.standalone && (
        <section className="flex flex-wrap items-center gap-3 rounded-[24px] border border-dashed border-line p-4">
          <Download size={22} className="text-accent" />
          <p className="flex-1 text-sm font-semibold">Instale o Ecoa no seu aparelho: abre como app, funciona offline e guarda seu progresso no celular.</p>
          <Button size="sm" onClick={() => install.install()}>Instalar app</Button>
        </section>
      )}

      {/* Trilha */}
      {info.levels.map((level) => {
        const mods = modules.filter((m) => m.level === level)
        if (!mods.length) return null
        const total = mods.reduce((n, m) => n + m.cards.length, 0)
        const seen = mods.reduce((n, m) => n + m.cards.filter((c) => srs[c.id]).length, 0)
        return (
          <section key={level} aria-labelledby={`lvl-${level}`}>
            <div className="mb-4 flex items-end gap-3">
              <span className="font-display text-[2.6rem] font-bold leading-none text-accent" style={{ color: 'color-mix(in oklab, var(--accent) 85%, var(--ink))' }}>{level}</span>
              <div className="min-w-0 flex-1">
                <h2 id={`lvl-${level}`} className="text-xl font-bold leading-tight">{info.levelNames[level]}</h2>
                <p className="text-sm text-muted">{mods.length} módulos · {seen}/{total} cards vistos</p>
              </div>
            </div>
            <div className={cx('grid gap-3', kids ? 'grid-cols-2 sm:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-3')}>
              {mods.map((m) => (
                <ModuleTile key={m.id} m={m} kids={kids} />
              ))}
            </div>
          </section>
        )
      })}

      <p className="pt-4 text-center text-sm text-muted">
        <Link to="/creditos" className="underline underline-offset-4 hover:text-ink">Créditos de imagens e áudios</Link>
      </p>
    </div>
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
      <Link to={`/trilha/${m.id}`} className="group flex flex-col items-center rounded-[28px] border border-line bg-surface p-4 text-center transition hover:-translate-y-0.5 hover:shadow-card">
        <span className="grid size-24 place-items-center rounded-[24px] bg-accent-soft transition group-hover:rotate-[-4deg]">
          <Illustration emoji={m.emoji} size={72} />
        </span>
        <span className="mt-3 font-display text-lg font-bold leading-tight">{m.title}</span>
        <span className="mt-0.5 line-clamp-2 text-xs text-muted">{m.subtitle}</span>
        <Bar value={pct} className="mt-3 w-full" />
      </Link>
    )

  return (
    <Link to={`/trilha/${m.id}`} className="group flex overflow-hidden rounded-[22px] border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-card">
      <div className="duotone relative w-28 shrink-0 sm:w-32">
        {photo ? <img src={photo.src} alt="" loading="lazy" className="duotone-photo absolute inset-0 size-full object-cover" /> : null}
        <span className="absolute inset-0 z-10 grid place-items-center">
          <Illustration emoji={m.emoji} size={54} className="drop-shadow-[0_8px_10px_rgb(0_0_0/0.35)] transition group-hover:scale-110" />
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <LevelBadge level={m.level} />
          <span className="truncate text-[11px] font-bold uppercase tracking-wider text-muted">{m.category}</span>
          {due > 0 && <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-ink">{due} p/ revisar</span>}
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
