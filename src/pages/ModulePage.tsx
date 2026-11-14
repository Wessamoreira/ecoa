import { ArrowLeft, BookOpen, Layers, Printer, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { audienceInfo, moduleById, type Card } from '../data/index.ts'
import { modulePhoto } from '../lib/media.ts'
import { countDue } from '../lib/session.ts'
import { speakable } from '../lib/speech.ts'
import { cx } from '../lib/utils.ts'
import { useApp } from '../store/useApp.ts'
import { AudioButton, SpeakText } from '../components/Audio.tsx'
import { CardDetails } from '../components/CardContent.tsx'
import { Illustration } from '../components/Illustration.tsx'
import { Button, LevelBadge, Sheet } from '../components/ui.tsx'
import { DialoguePlayer } from '../components/DialoguePlayer.tsx'
import { ModuleArt } from '../components/ModuleArt.tsx'
import type { Module } from '../data/index.ts'

/** No celular, cada linha da tabela vira um cartão "coluna: valor" (sem rolagem lateral) */
function LessonTableCards({ table }: { table: string[][] }) {
  const [head, ...rows] = table
  return (
    <ul className="mt-4 space-y-2 sm:hidden">
      {rows.map((row, r) => (
        <li key={r} className="rounded-2xl border border-line bg-bg px-4 py-3">
          <p className="font-display text-[1.05rem] font-bold">{row[0]}</p>
          <dl className="mt-1 space-y-1">
            {row.slice(1).map((cell, j) => (
              <div key={j} className="flex gap-2 text-sm">
                {head[j + 1] && <dt className="w-28 shrink-0 text-muted">{head[j + 1]}</dt>}
                <dd className="min-w-0 break-words font-semibold">{cell}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ul>
  )
}

/** O que o módulo contém, em uma linha */
function ModuleMeta({ m, light }: { m: Module; light?: boolean }) {
  const items = [`${m.cards.length} cards`, `${m.lesson.length} ${m.lesson.length === 1 ? 'explicação' : 'explicações'}`, m.dialogue && 'diálogo com áudio']
  return (
    <p className={cx('mt-1 flex flex-wrap gap-1.5 text-xs font-bold', light ? 'text-white/90' : 'text-muted')}>
      {items.filter(Boolean).map((t) => (
        <span key={t as string} className={cx('rounded-full px-2.5 py-1', light ? 'bg-white/15 backdrop-blur' : 'bg-surface-2')}>{t}</span>
      ))}
    </p>
  )
}

export default function ModulePage() {
  const { moduleId = '' } = useParams()
  const m = moduleById.get(moduleId)
  const navigate = useNavigate()
  const mode = useApp((s) => s.settings.mode)
  const srs = useApp((s) => s.srs)
  const markRead = useApp((s) => s.markLessonRead)
  const [open, setOpen] = useState<Card | null>(null)
  const kids = mode === 'kids'

  useEffect(() => {
    if (m) markRead(m.id)
  }, [m, markRead])

  if (!m)
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-semibold">Módulo não encontrado.</p>
        <Link to="/" className="mt-3 inline-block font-bold text-accent underline">Voltar ao início</Link>
      </div>
    )

  const photo = !kids ? modulePhoto(m.id) : undefined
  const seen = m.cards.filter((c) => srs[c.id]).length
  const due = countDue(m.cards, srs)
  const levelName = audienceInfo(m.audiences.includes(mode) ? mode : m.audiences[0]).levelNames[m.level]

  return (
    <div>
      <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} /> Voltar
      </button>

      {photo ? (
        <header className="duotone relative min-h-[260px] overflow-hidden rounded-[28px] text-white">
          <img src={photo.src} alt="" className="duotone-photo absolute inset-0 size-full object-cover" />
          <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-end gap-2 p-6 sm:p-8">
            <Illustration emoji={m.emoji} size={76} className="mb-1 drop-shadow-[0_10px_14px_rgb(0_0_0/0.3)]" />
            <div className="flex items-center gap-2">
              <LevelBadge level={m.level} className="!bg-white/90 !text-[#12162b]" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/80">{levelName} · {m.category}</span>
            </div>
            <h1 className="text-[clamp(2rem,6vw,3.2rem)] font-bold leading-[1]">{m.title}</h1>
            <p className="text-lg text-white/85">{m.subtitle}</p>
            <ModuleMeta m={m} light />
          </div>
        </header>
      ) : (
        <header className="overflow-hidden rounded-[28px] border border-line bg-surface sm:grid sm:grid-cols-[1fr_minmax(240px,42%)]">
          <ModuleArt m={m} size="lg" className="h-56 sm:order-2 sm:h-full sm:min-h-[280px]" />
          <div className="flex flex-col justify-end gap-2 p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <LevelBadge level={m.level} />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{levelName} · {m.category}</span>
            </div>
            <h1 className="text-[clamp(2rem,6vw,3.2rem)] font-bold leading-[1]">{m.title}</h1>
            <p className="text-lg text-muted">{m.subtitle}</p>
            <ModuleMeta m={m} />
          </div>
        </header>
      )}

      {/* Ações: cabem em qualquer largura (o botão principal encolhe, os outros viram só ícone em telas pequenas) */}
      <div className="under-header sticky z-20 -mx-4 mt-4 flex gap-2 bg-bg/90 px-4 py-2 backdrop-blur lg:mx-0 lg:px-0">
        <Button className="min-w-0 !shrink flex-1 sm:flex-none" onClick={() => navigate(`/estudar?m=${m.id}`)}>
          <Layers size={18} className="shrink-0" />
          <span className="truncate">{seen < m.cards.length ? 'Estudar' : due ? 'Revisar' : 'Revisar módulo'}</span>
          {(seen < m.cards.length || due > 0) && (
            <span className="shrink-0 rounded-full bg-accent-ink/20 px-2 py-0.5 text-xs font-bold">{seen < m.cards.length ? `${m.cards.length - seen} novos` : due}</span>
          )}
        </Button>
        <Button variant="secondary" onClick={() => navigate(`/quiz?m=${m.id}`)} aria-label="Quiz do módulo">
          <Sparkles size={18} /> <span className="hidden min-[400px]:inline">Quiz</span>
        </Button>
        <Button variant="secondary" className="!px-3.5 sm:!px-5" onClick={() => navigate(`/imprimir?m=${m.id}`)} aria-label="Imprimir folha de revisão">
          <Printer size={18} /> <span className="hidden sm:inline">Imprimir</span>
        </Button>
      </div>

      {/* Lição */}
      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {m.lesson.map((s, i) => (
          <article key={i} className={cx('min-w-0 rounded-[24px] border border-line bg-surface p-5 sm:p-6', s.table && 'lg:col-span-2')}>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <BookOpen size={18} className="text-accent" /> {s.title}
            </h2>
            <p className="mt-2 leading-relaxed text-[1.02rem]">{s.body}</p>
            {s.table && <LessonTableCards table={s.table} />}
            {s.table && (
              <div className="mt-4 hidden overflow-hidden rounded-2xl border border-line sm:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-2">
                    <tr>{s.table[0].map((h, j) => <th key={j} className="px-3 py-2 font-bold">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.table.slice(1).map((row, r) => (
                      <tr key={r} className="border-t border-line">
                        {row.map((cell, j) => (
                          <td key={j} className={cx('px-3 py-2', j === 0 && 'font-semibold')}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.examples && (
              <ul className="mt-3 space-y-2">
                {s.examples.map((ex, j) => (
                  <li key={j}>
                    <SpeakText text={ex.en} />
                    <p className="text-sm text-muted">{ex.pt}{ex.tag ? ` · ${ex.tag}` : ''}</p>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      {m.dialogue && (
        <div className="mt-8">
          <DialoguePlayer d={m.dialogue} />
        </div>
      )}

      {/* Cards */}
      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">
          {m.cards.length} cards <span className="text-base font-semibold text-muted">· {seen} vistos</span>
        </h2>
        <ul className={cx('grid gap-2.5', kids ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'sm:grid-cols-2')}>
          {m.cards.map((c) => (
            <li key={c.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpen(c)}
                onKeyDown={(e) => e.key === 'Enter' && setOpen(c)}
                className={cx(
                  'flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-line bg-surface p-3 text-left transition hover:border-accent',
                  kids && 'flex-col p-4 text-center',
                )}
              >
                <Illustration emoji={c.emoji} size={kids ? 64 : 40} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[1.05rem] font-bold">{c.term}</p>
                  <p className="truncate text-sm text-muted">{c.pt}</p>
                </div>
                {!kids && (
                  <span className={cx('size-2 shrink-0 rounded-full', srs[c.id] ? (srs[c.id].stability >= 21 ? 'bg-good' : 'bg-accent') : 'bg-line')} title={srs[c.id] ? 'Visto' : 'Novo'} />
                )}
                <AudioButton text={speakable(c.term)} size="sm" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Sheet open={!!open} onClose={() => setOpen(null)} title={open?.term}>
        {open && (
          <div className="p-5 pt-16 sm:p-7 sm:pt-16">
            <CardDetails card={open} kids={kids} />
          </div>
        )}
      </Sheet>
    </div>
  )
}
