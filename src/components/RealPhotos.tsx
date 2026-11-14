import { Image as ImageIcon, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * Fotos reais com licença Creative Commons via Openverse (openverse.org),
 * buscadas só quando o aluno pede. Ficam em cache no aparelho.
 */
interface Found {
  id: string
  thumb: string
  title: string
  creator?: string
  license: string
  source: string
}

const cache = new Map<string, Promise<Found[]>>()
function search(q: string) {
  if (!cache.has(q)) {
    const url = new URL('https://api.openverse.org/v1/images/')
    url.search = new URLSearchParams({ q, page_size: '10', license: 'cc0,by,by-sa', mature: 'false', category: 'photograph' }).toString()
    cache.set(
      q,
      fetch(url)
        .then((r) => (r.ok ? r.json() : { results: [] }))
        .then((d: { results: Record<string, string>[] }) =>
          d.results.slice(0, 6).map((r) => ({
            id: r.id,
            thumb: `https://api.openverse.org/v1/images/${r.id}/thumb/`,
            title: r.title,
            creator: r.creator,
            license: `CC ${String(r.license).toUpperCase()}`,
            source: r.foreign_landing_url,
          })),
        )
        .catch(() => {
          cache.delete(q)
          return []
        }),
    )
  }
  return cache.get(q)!
}

export function RealPhotos({ query }: { query: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  const [photos, setPhotos] = useState<Found[]>([])

  useEffect(() => {
    setState('idle')
    setPhotos([])
  }, [query])

  if (state === 'idle')
    return (
      <button
        type="button"
        onClick={async (e) => {
          e.stopPropagation()
          setState('loading')
          setPhotos(await search(query))
          setState('done')
        }}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold hover:border-accent"
      >
        <ImageIcon size={16} /> Ver fotos reais de “{query}”
      </button>
    )

  if (state === 'loading')
    return (
      <p className="inline-flex items-center gap-2 text-sm text-muted">
        <Loader2 size={16} className="animate-spin" /> Buscando fotos livres…
      </p>
    )

  if (!photos.length) return <p className="text-sm text-muted">Nenhuma foto encontrada (ou você está offline).</p>

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="no-scrollbar -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
        {photos.map((p) => (
          <a
            key={p.id}
            href={p.source}
            target="_blank"
            rel="noreferrer"
            className="group relative h-32 w-44 shrink-0 snap-start overflow-hidden rounded-2xl bg-surface-2"
            title={`${p.title}${p.creator ? ` — ${p.creator}` : ''} (${p.license})`}
          >
            <img src={p.thumb} alt={p.title} loading="lazy" className="size-full object-cover transition group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-2 pb-1 pt-4 text-[10px] font-semibold text-white">
              {p.creator ? `${p.creator} · ` : ''}{p.license}
            </span>
          </a>
        ))}
      </div>
      <p className="mt-1 text-[11px] text-muted">Fotos via Openverse, licenças Creative Commons. Toque para ver a fonte.</p>
    </div>
  )
}
