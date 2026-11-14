import { moduleById } from '../data/index.ts'
import { allPhotos } from '../lib/media.ts'
import { PageHeader } from '../components/ui.tsx'

export default function Credits() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Licenças abertas" title="Créditos">
        O Ecoa é feito com recursos livres. Obrigado a quem compartilha.
      </PageHeader>

      <section className="space-y-3 rounded-[24px] border border-line bg-surface p-5 text-[0.95rem] leading-relaxed">
        <p><b>Ilustrações 3D</b> — <a className="underline" href="https://github.com/microsoft/fluentui-emoji" target="_blank" rel="noreferrer">Microsoft Fluent Emoji</a>, licença MIT.</p>
        <p><b>Ilustrações alternativas</b> — <a className="underline" href="https://github.com/jdecked/twemoji" target="_blank" rel="noreferrer">Twemoji</a>, CC BY 4.0.</p>
        <p><b>Gravações humanas e IPA</b> — <a className="underline" href="https://dictionaryapi.dev" target="_blank" rel="noreferrer">Free Dictionary API</a>, dados do Wiktionary e áudios do Wikimedia Commons (CC BY-SA).</p>
        <p><b>Voz sintetizada e reconhecimento de fala</b> — Web Speech API do seu navegador/sistema.</p>
        <p><b>Repetição espaçada</b> — <a className="underline" href="https://github.com/open-spaced-repetition/ts-fsrs" target="_blank" rel="noreferrer">ts-fsrs</a> (algoritmo FSRS), licença MIT.</p>
        <p><b>Fontes</b> — Bricolage Grotesque, Atkinson Hyperlegible Next e Charis SIL (SIL Open Font License).</p>
      </section>

      <h2 className="mb-3 mt-8 text-xl font-bold">Fotos das capas</h2>
      <p className="mb-4 text-sm text-muted">Encontradas via <a className="underline" href="https://openverse.org" target="_blank" rel="noreferrer">Openverse</a>. Exibidas em duotone (modificadas).</p>
      <ul className="divide-y divide-line overflow-hidden rounded-[24px] border border-line bg-surface">
        {allPhotos().map(([id, p]) => (
          <li key={id} className="flex items-center gap-3 p-3">
            <img src={p.src} alt="" loading="lazy" className="size-14 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0 text-sm">
              <p className="font-bold">{moduleById.get(id)?.title}</p>
              <p className="truncate text-muted">
                “{p.title}” {p.creator ? `por ${decodeURIComponent(p.creator.replace(/%u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16))))}` : ''} ·{' '}
                {p.licenseUrl ? <a className="underline" href={p.licenseUrl} target="_blank" rel="noreferrer">{p.license}</a> : p.license}
                {p.source && <> · <a className="underline" href={p.source} target="_blank" rel="noreferrer">fonte</a></>}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
