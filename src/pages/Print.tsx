import { Printer } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { audienceInfo, modulesFor, type Level } from '../data/index.ts'
import { useApp } from '../store/useApp.ts'
import { Button, Chip, PageHeader } from '../components/ui.tsx'

export default function Print() {
  const [params] = useSearchParams()
  const mode = useApp((s) => s.settings.mode)
  const info = audienceInfo(mode)
  const all = useMemo(() => modulesFor(mode), [mode])
  const initial = params.get('m')
  const [level, setLevel] = useState<Level>(() => (initial ? all.find((m) => m.id === initial)?.level : undefined) ?? info.levels[0])
  const [selected, setSelected] = useState<Set<string>>(() => new Set(initial ? [initial] : all.filter((m) => m.level === info.levels[0]).map((m) => m.id)))
  const [withExamples, setWithExamples] = useState(true)
  const mods = all.filter((m) => selected.has(m.id))

  const pickLevel = (l: Level) => {
    setLevel(l)
    setSelected(new Set(all.filter((m) => m.level === l).map((m) => m.id)))
  }

  return (
    <div>
      <div className="no-print">
        <PageHeader eyebrow="Modo impressão" title="Folha de revisão">
          Gere uma folha limpa para estudar no papel. Escolha os módulos e toque em imprimir (ou salve como PDF).
        </PageHeader>
        <div className="mb-3 flex flex-wrap gap-2">
          {info.levels.map((l) => <Chip key={l} active={level === l} onClick={() => pickLevel(l)}>{l}</Chip>)}
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {all.filter((m) => m.level === level).map((m) => (
            <Chip
              key={m.id}
              active={selected.has(m.id)}
              onClick={() =>
                setSelected((s) => {
                  const n = new Set(s)
                  if (n.has(m.id)) n.delete(m.id)
                  else n.add(m.id)
                  return n
                })
              }
            >
              {m.emoji} {m.title}
            </Chip>
          ))}
        </div>
        <label className="mb-5 flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" className="size-4 accent-[var(--accent)]" checked={withExamples} onChange={(e) => setWithExamples(e.target.checked)} /> Incluir frases de exemplo
        </label>
        <Button onClick={() => window.print()} disabled={!mods.length} className="mb-8">
          <Printer size={18} /> Imprimir / Salvar PDF
        </Button>
      </div>

      <article className="print-sheet rounded-[24px] border border-line bg-white p-6 text-[#111] sm:p-10 print:rounded-none print:border-0">
        <header className="mb-6 flex items-end justify-between border-b-2 border-[#111] pb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#555]">Ecoa · Modo {info.label}</p>
            <h1 className="text-3xl font-bold">Revisão {level}</h1>
          </div>
          <p className="text-sm text-[#555]">{new Date().toLocaleDateString('pt-BR')}</p>
        </header>
        {mods.map((m) => (
          <section key={m.id} className="mb-8">
            <h2 className="mb-2 text-xl font-bold">{m.emoji} {m.title} <span className="text-sm font-semibold text-[#666]">— {m.subtitle}</span></h2>
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-[#bbb] text-left">
                  <th className="w-[30%] py-1.5 pr-2">Inglês</th>
                  <th className="w-[22%] py-1.5 pr-2">Pronúncia</th>
                  <th className="py-1.5">Português{withExamples ? ' · exemplo' : ''}</th>
                </tr>
              </thead>
              <tbody>
                {m.cards.map((c) => (
                  <tr key={c.id} className="print-avoid border-b border-[#e3e3e3] align-top">
                    <td className="py-1.5 pr-2 font-bold">
                      {c.term}
                      {c.forms && c.pos?.startsWith('verbo') && (
                        <div className="font-normal text-[#555]">{c.forms.slice(1, 3).map((f) => f.value).join(' · ')}</div>
                      )}
                    </td>
                    <td className="ipa py-1.5 pr-2 text-[#444]">{c.ipa}</td>
                    <td className="py-1.5">
                      {c.pt}
                      {withExamples && c.examples[0] && (
                        <div className="text-[#555]"><i>{c.examples[0].en}</i> — {c.examples[0].pt}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
        {!mods.length && <p className="text-center text-[#666]">Selecione ao menos um módulo.</p>}
      </article>
    </div>
  )
}
