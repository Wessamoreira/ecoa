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

      <header className={cx('relative overflow-hidden rounded-[28px]', photo ? 'duotone min-h-[240px] text-white' : 'bg-accent-soft')}>
        {photo && <img src={photo.src} alt="" className="duotone-photo absolute inset-0 size-full object-cover" />}
        <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-end gap-2 p-6 sm:p-8">
          <Illustration emoji={m.emoji} size={kids ? 110 : 76} className="mb-1 drop-shadow-[0_10px_14px_rgb(0_0_0/0.3)]" />
          <div className="flex items-center gap-2">
            <LevelBadge level={m.level} className={photo ? '!bg-white/90 !text-[#12162b]' : ''} />
            <span className={cx('text-xs font-bold uppercase tracking-[0.14em]', photo ? 'text-white/80' : 'text-muted')}>{levelName} · {m.category}</span>
          </div>
          <h1 className="text-[clamp(2rem,6vw,3.2rem)] font-bold leading-[1]">{m.title}</h1>
          <p className={cx('text-lg', photo ? 'text-white/85' : 'text-muted')}>{m.subtitle}</p>
        </div>
      </header>

      <div className="sticky top-[53px] z-20 -mx-4 mt-4 flex gap-2 overflow-x-auto bg-bg/90 px-4 py-2 backdrop-blur no-scrollbar lg:top-0 lg:mx-0 lg:px-0">
        <Button onClick={() => navigate(`/estudar?m=${m.id}`)}>
          <Layers size={18} /> {seen < m.cards.length ? `Estudar · ${m.cards.length - seen} novos` : due ? `Revisar ${due}` : 'Revisar módulo'}
        </Button>
        <Button variant="secondary" onClick={() => navigate(`/quiz?m=${m.id}`)}>
          <Sparkles size={18} /> Quiz
        </Button>
        <Button variant="secondary" onClick={() => navigate(`/imprimir?m=${m.id}`)} aria-label="Imprimir folha de revisão">
          <Printer size={18} /> <span className="hidden sm:inline">Imprimir</span>
        </Button>
      </div>

      {/* Lição */}
      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        {m.lesson.map((s, i) => (
          <article key={i} className={cx('rounded-[24px] border border-line bg-surface p-5 sm:p-6', s.table && 'lg:col-span-2')}>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <BookOpen size={18} className="text-accent" /> {s.title}
            </h2>
            <p className="mt-2 leading-relaxed text-[1.02rem]">{s.body}</p>
            {s.table && (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[420px] text-left text-sm">
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
          <div className="p-5 pt-6 sm:p-7">
            <CardDetails card={open} kids={kids} />
          </div>
        )}
      </Sheet>
    </div>
  )
}
