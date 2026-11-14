import { Flame, Heart, Printer } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { audienceInfo, cardsFor, levelOf } from '../data/index.ts'
import { isMastered } from '../lib/srs.ts'
import { addDays, dayKey } from '../lib/utils.ts'
import { streakOf, useApp } from '../store/useApp.ts'
import { Bar, Button, PageHeader } from '../components/ui.tsx'

const WEEKS = 17
const STEP = [0, 0.28, 0.5, 0.74, 1] // sequencial: uma cor, do claro ao escuro
const cellColor = (lvl: number) => (lvl === 0 ? 'var(--surface-2)' : `color-mix(in oklab, var(--accent) ${Math.round(STEP[lvl] * 100)}%, var(--surface))`)

export default function Progress() {
  const mode = useApp((s) => s.settings.mode)
  const srs = useApp((s) => s.srs)
  const days = useApp((s) => s.days)
  const favorites = useApp((s) => s.favorites)
  const info = audienceInfo(mode)
  const cards = useMemo(() => cardsFor(mode), [mode])
  const [hover, setHover] = useState<string | null>(null)

  const seen = cards.filter((c) => srs[c.id])
  const mastered = seen.filter((c) => isMastered(srs[c.id]))
  const streak = streakOf(days)
  const xp = Object.values(days).reduce((n, d) => n + d.xp, 0)
  const last30 = Array.from({ length: 30 }, (_, i) => days[dayKey(addDays(new Date(), -i))]).filter(Boolean)
  const reviews30 = last30.reduce((n, d) => n + d.reviews + d.quiz, 0)
  const correct30 = last30.reduce((n, d) => n + d.correct + d.quizCorrect, 0)
  const accuracy = reviews30 ? Math.round((correct30 / reviews30) * 100) : null

  // Heatmap: semanas em colunas, domingo → sábado
  const grid = useMemo(() => {
    const end = new Date()
    const start = addDays(end, -(WEEKS * 7 - 1) - end.getDay())
    const out: { key: string; n: number; date: Date }[][] = []
    for (let w = 0; w < WEEKS + 1; w++) {
      const col = []
      for (let d = 0; d < 7; d++) {
        const date = addDays(start, w * 7 + d)
        if (date > end) break
        const k = dayKey(date)
        const v = days[k]
        col.push({ key: k, n: v ? v.reviews + v.quiz + v.speak : 0, date })
      }
      out.push(col)
    }
    return out
  }, [days])
  const max = Math.max(1, ...grid.flat().map((c) => c.n))
  const levelFor = (n: number) => (n === 0 ? 0 : Math.min(4, Math.ceil((n / max) * 4)))
  const hovered = grid.flat().find((c) => c.key === hover)

  // Previsão de revisões nos próximos 7 dias
  const forecast = useMemo(() => {
    const out = Array.from({ length: 7 }, (_, i) => ({ date: addDays(new Date(), i), n: 0 }))
    const endOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59).getTime()
    for (const c of seen) {
      const due = new Date(srs[c.id].dueAt).getTime()
      const idx = out.findIndex((o) => due <= endOf(o.date))
      if (idx >= 0) out[idx].n++
    }
    return out
  }, [seen, srs])
  const fmax = Math.max(1, ...forecast.map((f) => f.n))
  const [fHover, setFHover] = useState<number | null>(null)

  return (
    <div>
      <PageHeader eyebrow={`Modo ${info.label}`} title="Seu progresso">
        Tudo fica salvo neste aparelho — sem conta e sem internet.
      </PageHeader>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Dias seguidos" value={streak} icon={<Flame size={18} className="text-hard" />} />
        <Stat label="Cards estudados" value={seen.length} sub={`de ${cards.length}`} />
        <Stat label="Dominados" value={mastered.length} sub="memória > 21 dias" />
        <Stat label="Acerto (30 dias)" value={accuracy === null ? '—' : `${accuracy}%`} sub={`${xp} XP no total`} />
      </section>

      <section className="mt-8 rounded-[24px] border border-line bg-surface p-5">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-bold">Atividade</h2>
          <p className="text-sm text-muted" aria-live="polite">
            {hovered ? `${hovered.date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}: ${hovered.n} atividade${hovered.n === 1 ? '' : 's'}` : `Últimas ${WEEKS} semanas`}
          </p>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          <div className="flex gap-[3px]" role="img" aria-label="Mapa de atividade diária">
            {grid.map((col, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {col.map((c) => (
                  <div
                    key={c.key}
                    onMouseEnter={() => setHover(c.key)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setHover(c.key)}
                    title={`${c.date.toLocaleDateString('pt-BR')}: ${c.n}`}
                    className="size-[15px] rounded-[4px] sm:size-4"
                    style={{ background: cellColor(levelFor(c.n)), outline: hover === c.key ? '2px solid var(--ink)' : undefined, outlineOffset: 1 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted">
          menos
          {[0, 1, 2, 3, 4].map((l) => <span key={l} className="size-3 rounded-[3px]" style={{ background: cellColor(l) }} />)}
          mais
        </div>
      </section>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[24px] border border-line bg-surface p-5">
          <h2 className="mb-4 text-lg font-bold">Por nível</h2>
          <ul className="space-y-4">
            {info.levels.map((l) => {
              const lc = cards.filter((c) => levelOf(c) === l)
              const ls = lc.filter((c) => srs[c.id]).length
              const lm = lc.filter((c) => srs[c.id] && isMastered(srs[c.id])).length
              return (
                <li key={l}>
                  <div className="mb-1.5 flex items-baseline justify-between text-sm">
                    <span className="font-bold">{l} · {info.levelNames[l]}</span>
                    <span className="tabular-nums text-muted">{ls}/{lc.length} vistos · {lm} dominados</span>
                  </div>
                  <Bar value={lc.length ? ls / lc.length : 0} />
                </li>
              )
            })}
          </ul>
        </section>

        <section className="rounded-[24px] border border-line bg-surface p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-bold">Revisões nos próximos 7 dias</h2>
            <p className="text-sm text-muted">{fHover !== null ? `${forecast[fHover].n} cards` : ''}</p>
          </div>
          {forecast.every((f) => f.n === 0) && (
            <p className="mb-2 text-sm text-muted">Nenhuma revisão agendada ainda. Estude alguns cards e o calendário aparece aqui.</p>
          )}
          <div className="flex h-36 items-end gap-2 border-b border-line">
            {forecast.map((f, i) => (
              <div
                key={i}
                className="group flex h-full flex-1 cursor-default flex-col items-center justify-end"
                onMouseEnter={() => setFHover(i)}
                onMouseLeave={() => setFHover(null)}
                title={`${f.n} cards`}
              >
                <span className="mb-1 text-xs font-bold tabular-nums text-muted">{f.n || ''}</span>
                <div
                  className="w-full max-w-9 rounded-t-[4px] transition-opacity"
                  style={{ height: `${Math.max(f.n ? 6 : 0, (f.n / fmax) * 100)}%`, background: 'var(--accent)', opacity: fHover === null || fHover === i ? 1 : 0.45 }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex gap-2">
            {forecast.map((f, i) => (
              <span key={i} className="flex-1 text-center text-[11px] font-semibold text-muted">
                {i === 0 ? 'hoje' : f.date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}
              </span>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8 flex flex-wrap gap-3">
        <Link to="/estudar?fav=1"><Button variant="secondary" disabled={!Object.keys(favorites).length}><Heart size={18} /> Estudar favoritos ({Object.keys(favorites).length})</Button></Link>
        <Link to="/imprimir"><Button variant="secondary"><Printer size={18} /> Folha de revisão</Button></Link>
      </section>
    </div>
  )
}

function Stat({ label, value, sub, icon }: { label: string; value: number | string; sub?: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-[22px] border border-line bg-surface p-4">
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">{icon}{label}</p>
      <p className="mt-1 font-display text-[2.2rem] font-bold leading-none tabular-nums">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </div>
  )
}
