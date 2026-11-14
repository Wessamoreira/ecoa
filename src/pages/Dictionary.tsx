import { Heart, Search, X } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { audienceInfo, cardsFor, levelOf, moduleById, type Card, type Level } from '../data/index.ts'
import { speakable } from '../lib/speech.ts'
import { normalize } from '../lib/utils.ts'
import { useApp } from '../store/useApp.ts'
import { AudioButton } from '../components/Audio.tsx'
import { CardDetails } from '../components/CardContent.tsx'
import { Illustration } from '../components/Illustration.tsx'
import { Button, Chip, LevelBadge, PageHeader, Sheet } from '../components/ui.tsx'

const TENSES = ['Simple Present', 'Simple Past', 'Past Continuous', 'Present Continuous', 'Present Perfect', 'Future', 'Passive', 'Conditional', 'Phrasal verb', 'Idiom']

function matchesTense(c: Card, t: string) {
  const tags = c.examples.map((e) => e.tag ?? '').join(' | ')
  if (t === 'Phrasal verb') return c.pos === 'phrasal verb'
  if (t === 'Idiom') return c.pos === 'idiom'
  if (t === 'Conditional') return /conditional|first|second|third|zero|mixed/i.test(tags) || /conditional/i.test(c.term)
  return tags.includes(t)
}

function score(c: Card, q: string) {
  const term = normalize(c.term)
  if (term === q) return 100
  if (term.startsWith(q)) return 80
  if (term.includes(q)) return 60
  if (normalize(c.pt).includes(q)) return 50
  if (c.forms?.some((f) => normalize(f.value).includes(q))) return 45
  if (c.examples.some((e) => normalize(e.en).includes(q) || normalize(e.pt).includes(q))) return 20
  return 0
}

export default function Dictionary() {
  const mode = useApp((s) => s.settings.mode)
  const favorites = useApp((s) => s.favorites)
  const srs = useApp((s) => s.srs)
  const info = audienceInfo(mode)
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<Level | undefined>()
  const [category, setCategory] = useState<string | undefined>()
  const [tense, setTense] = useState<string | undefined>()
  const [favOnly, setFavOnly] = useState(false)
  const [limit, setLimit] = useState(80)
  const [open, setOpen] = useState<Card | null>(null)
  const q = normalize(useDeferredValue(query))

  const all = useMemo(() => cardsFor(mode), [mode])
  const categories = useMemo(() => [...new Set(all.map((c) => moduleById.get(c.moduleId)!.category))], [all])

  const results = useMemo(() => {
    let list = all.filter(
      (c) =>
        (!level || levelOf(c) === level) &&
        (!category || moduleById.get(c.moduleId)!.category === category) &&
        (!tense || matchesTense(c, tense)) &&
        (!favOnly || favorites[c.id]),
    )
    if (q) list = list.map((c) => [c, score(c, q)] as const).filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]).map(([c]) => c)
    return list
  }, [all, level, category, tense, favOnly, favorites, q])

  return (
    <div>
      <PageHeader eyebrow={`Modo ${info.label} · ${all.length} entradas`} title="Dicionário" />

      <div className="sticky top-[53px] z-20 -mx-4 bg-bg/92 px-4 pb-3 pt-1 backdrop-blur lg:top-0 lg:mx-0 lg:px-0">
        <label className="relative block">
          <Search size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setLimit(80)
            }}
            placeholder="Busque em inglês ou português…"
            className="h-13 w-full rounded-2xl border border-line bg-surface pl-11 pr-11 text-[1.05rem] font-semibold outline-none focus:border-accent"
            aria-label="Buscar no dicionário"
            enterKeyHint="search"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Limpar busca" className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-surface-2">
              <X size={17} />
            </button>
          )}
        </label>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          <Chip active={favOnly} onClick={() => setFavOnly((v) => !v)}>
            <span className="inline-flex items-center gap-1"><Heart size={14} fill={favOnly ? 'currentColor' : 'none'} /> Favoritos</span>
          </Chip>
          {info.levels.map((l) => (
            <Chip key={l} active={level === l} onClick={() => setLevel(level === l ? undefined : l)}>{l}</Chip>
          ))}
          <span className="mx-1 w-px shrink-0 bg-line" />
          {categories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(category === c ? undefined : c)}>{c}</Chip>
          ))}
        </div>
        {mode !== 'kids' && (
          <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
            {TENSES.map((t) => (
              <Chip key={t} active={tense === t} onClick={() => setTense(tense === t ? undefined : t)} className="!h-8 !text-xs">{t}</Chip>
            ))}
          </div>
        )}
      </div>

      <p className="mb-2 mt-2 text-sm font-semibold text-muted">{results.length} resultado{results.length === 1 ? '' : 's'}</p>

      {results.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-line py-14 text-center">
          <Illustration emoji="🔍" size={72} className="mx-auto" />
          <p className="mt-3 font-bold">Nada encontrado</p>
          <p className="text-sm text-muted">Tente outra palavra ou remova algum filtro.</p>
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-[24px] border border-line bg-surface">
          {results.slice(0, limit).map((c) => (
            <li key={c.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpen(c)}
                onKeyDown={(e) => e.key === 'Enter' && setOpen(c)}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 transition hover:bg-surface-2"
              >
                <Illustration emoji={c.emoji} size={40} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="truncate font-display text-[1.08rem] font-bold">{c.term}</span>
                    {c.ipa && <span className="ipa hidden truncate text-sm text-muted sm:inline">{c.ipa}</span>}
                  </div>
                  <p className="truncate text-sm text-muted">{c.pt}</p>
                </div>
                <LevelBadge level={levelOf(c)} className="hidden sm:inline-flex" />
                {srs[c.id] && <span className="size-2 rounded-full bg-good" title="Já estudado" />}
                <AudioButton text={speakable(c.term)} size="sm" />
              </div>
            </li>
          ))}
        </ul>
      )}
      {results.length > limit && (
        <div className="mt-4 text-center">
          <Button variant="secondary" onClick={() => setLimit((l) => l + 120)}>Mostrar mais ({results.length - limit})</Button>
        </div>
      )}

      <Sheet open={!!open} onClose={() => setOpen(null)} title={open?.term}>
        {open && (
          <div className="p-5 pt-6 sm:p-7">
            <p className="mb-3 pr-10 text-xs font-bold uppercase tracking-wider text-muted">{moduleById.get(open.moduleId)?.title}</p>
            <CardDetails card={open} kids={mode === 'kids'} />
          </div>
        )}
      </Sheet>
    </div>
  )
}
