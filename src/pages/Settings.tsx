import { Download, Monitor, Moon, Smartphone, Sun, Upload, Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AUDIENCES, audienceInfo, type Level } from '../data/index.ts'
import { getVoices, onVoicesChange, rankedVoices, speak, ttsSupported, voiceScore } from '../lib/speech.ts'
import { cx } from '../lib/utils.ts'
import { exportBackup, useApp } from '../store/useApp.ts'
import { Illustration } from '../components/Illustration.tsx'
import { requestPersistence, useInstall } from '../components/Pwa.tsx'
import { Button, Chip, PageHeader } from '../components/ui.tsx'

function Row({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-5 last:border-0">
      <p className="font-bold">{title}</p>
      {hint && <p className="mb-3 text-sm text-muted">{hint}</p>}
      <div className={hint ? '' : 'mt-3'}>{children}</div>
    </div>
  )
}

export default function Settings() {
  const s = useApp((st) => st.settings)
  const set = useApp((st) => st.setSettings)
  const importBackup = useApp((st) => st.importBackup)
  const resetProgress = useApp((st) => st.resetProgress)
  const install = useInstall()
  const [, rerender] = useState(0)
  const [persisted, setPersisted] = useState<boolean | undefined>()
  const [msg, setMsg] = useState('')
  const file = useRef<HTMLInputElement>(null)
  const info = audienceInfo(s.mode)

  useEffect(() => onVoicesChange(() => rerender((n) => n + 1)), [])
  useEffect(() => {
    navigator.storage?.persisted?.().then(setPersisted)
  }, [])

  const voices = rankedVoices(s.accent).slice(0, 14)
  const best = voices[0]

  const doExport = () => {
    const blob = new Blob([exportBackup()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `ecoa-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const doImport = async (f: File) => {
    try {
      importBackup(await f.text())
      setMsg('Backup restaurado com sucesso.')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Não foi possível ler o arquivo.')
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Preferências" title="Ajustes" />

      <section className="rounded-[24px] border border-line bg-surface px-5">
        <Row title="Modo do curso" hint="O conteúdo, o visual e os níveis mudam conforme o público. O progresso de cada card é mantido.">
          <div className="grid grid-cols-3 gap-2">
            {AUDIENCES.map((a) => (
              <button
                key={a.id}
                data-mode={a.id}
                onClick={() => set({ mode: a.id })}
                aria-pressed={s.mode === a.id}
                className={cx('flex flex-col items-center gap-1 rounded-2xl border-2 p-3 font-bold transition', s.mode === a.id ? 'border-accent bg-accent-soft' : 'border-line')}
              >
                <Illustration emoji={a.emoji} size={36} />
                {a.label}
              </button>
            ))}
          </div>
        </Row>
        <Row title="Nível inicial" hint="Os cards novos começam a partir deste nível.">
          <div className="flex flex-wrap gap-2">
            {info.levels.map((l) => (
              <Chip key={l} active={(s.startLevel[s.mode] ?? 'A1') === l} onClick={() => set({ startLevel: { ...s.startLevel, [s.mode]: l as Level } })}>
                {l} · {info.levelNames[l]}
              </Chip>
            ))}
          </div>
        </Row>
        <Row title="Tema">
          <div className="flex gap-2">
            {([['system', 'Sistema', Monitor], ['light', 'Claro', Sun], ['dark', 'Escuro', Moon]] as const).map(([v, label, Icon]) => (
              <Chip key={v} active={s.theme === v} onClick={() => set({ theme: v })}>
                <span className="inline-flex items-center gap-1.5"><Icon size={15} />{label}</span>
              </Chip>
            ))}
          </div>
        </Row>
        <Row title="Seu nome">
          <input value={s.name} onChange={(e) => set({ name: e.target.value })} maxLength={30} className="h-11 w-full max-w-xs rounded-xl border border-line bg-bg px-3 font-semibold outline-none focus:border-accent" placeholder="Opcional" />
        </Row>
      </section>

      <h2 className="mb-2 mt-8 text-sm font-bold uppercase tracking-wider text-muted">Áudio e pronúncia</h2>
      <section className="rounded-[24px] border border-line bg-surface px-5">
        <Row title="Sotaque" hint="Usado na voz sintetizada e no reconhecimento de fala.">
          <div className="flex gap-2">
            <Chip active={s.accent === 'en-US'} onClick={() => set({ accent: 'en-US', voiceURI: undefined })}>🇺🇸 Americano</Chip>
            <Chip active={s.accent === 'en-GB'} onClick={() => set({ accent: 'en-GB', voiceURI: undefined })}>🇬🇧 Britânico</Chip>
          </div>
        </Row>
        <Row title="Voz" hint={ttsSupported ? 'Ordenadas da mais natural para a menos natural. As marcadas como "neural" soam mais humanas.' : 'Este navegador não tem síntese de voz.'}>
          {getVoices().length === 0 ? (
            <p className="text-sm text-muted">Carregando vozes do sistema…</p>
          ) : (
            <ul className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
              <li>
                <label className={cx('flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5', !s.voiceURI ? 'border-accent bg-accent-soft' : 'border-line')}>
                  <input type="radio" name="voice" checked={!s.voiceURI} onChange={() => set({ voiceURI: undefined })} className="accent-[var(--accent)]" />
                  <span className="flex-1 text-sm font-semibold">Automática (melhor disponível){best ? ` — ${best.name}` : ''}</span>
                </label>
              </li>
              {voices.map((v) => {
                const score = voiceScore(v, s.accent)
                return (
                  <li key={v.voiceURI}>
                    <label className={cx('flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5', s.voiceURI === v.voiceURI ? 'border-accent bg-accent-soft' : 'border-line')}>
                      <input type="radio" name="voice" checked={s.voiceURI === v.voiceURI} onChange={() => set({ voiceURI: v.voiceURI })} className="accent-[var(--accent)]" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{v.name}</span>
                        <span className="text-xs text-muted">{v.lang}{v.localService ? ' · offline' : ' · online'}</span>
                      </span>
                      {score >= 80 && <span className="rounded-full bg-good/15 px-2 py-0.5 text-[11px] font-bold text-good">neural</span>}
                      <button
                        type="button"
                        aria-label={`Testar ${v.name}`}
                        onClick={(e) => {
                          e.preventDefault()
                          speak('The quick brown fox jumps over the lazy dog.', { accent: s.accent, voiceURI: v.voiceURI, rate: s.rate })
                        }}
                        className="grid size-8 place-items-center rounded-full text-accent hover:bg-accent-soft"
                      >
                        <Volume2 size={17} />
                      </button>
                    </label>
                  </li>
                )
              })}
            </ul>
          )}
          <p className="mt-3 text-xs text-muted">
            Dica: no iPhone/Mac, baixe vozes "Premium" em Ajustes → Acessibilidade → Conteúdo Falado → Vozes → Inglês. No Windows, o Edge traz vozes "Natural" de alta qualidade.
          </p>
        </Row>
        <Row title={`Velocidade da voz: ${s.rate.toFixed(2)}x`}>
          <input type="range" min={0.6} max={1.3} step={0.05} value={s.rate} onChange={(e) => set({ rate: Number(e.target.value) })} className="w-full accent-[var(--accent)]" aria-label="Velocidade da voz" />
        </Row>
        <Row title="Tocar o áudio automaticamente">
          <Chip active={s.autoplay} onClick={() => set({ autoplay: !s.autoplay })}>{s.autoplay ? 'Ligado' : 'Desligado'}</Chip>
        </Row>
      </section>

      <h2 className="mb-2 mt-8 text-sm font-bold uppercase tracking-wider text-muted">Estudo</h2>
      <section className="rounded-[24px] border border-line bg-surface px-5">
        <Row title={`Cards novos por dia: ${s.newPerDay}`}>
          <input type="range" min={5} max={50} step={5} value={s.newPerDay} onChange={(e) => set({ newPerDay: Number(e.target.value) })} className="w-full accent-[var(--accent)]" aria-label="Cards novos por dia" />
        </Row>
        <Row title={`Meta diária: ${s.dailyGoal} atividades`}>
          <input type="range" min={10} max={100} step={5} value={s.dailyGoal} onChange={(e) => set({ dailyGoal: Number(e.target.value) })} className="w-full accent-[var(--accent)]" aria-label="Meta diária" />
        </Row>
      </section>

      <h2 className="mb-2 mt-8 text-sm font-bold uppercase tracking-wider text-muted">App e dados</h2>
      <section className="rounded-[24px] border border-line bg-surface px-5">
        <Row title="Instalar como aplicativo" hint="Abre em tela cheia, funciona sem internet e guarda o progresso no aparelho.">
          {install.standalone ? (
            <p className="text-sm font-semibold text-good">✓ O Ecoa já está instalado.</p>
          ) : install.canInstall ? (
            <Button size="sm" onClick={() => install.install()}><Smartphone size={16} /> Instalar app</Button>
          ) : install.ios ? (
            <p className="text-sm">No Safari, toque em <b>Compartilhar</b> e depois em <b>Adicionar à Tela de Início</b>.</p>
          ) : (
            <p className="text-sm text-muted">Use o menu do navegador → "Instalar app" ou "Adicionar à tela inicial".</p>
          )}
        </Row>
        <Row title="Armazenamento protegido" hint="Pede ao navegador para nunca apagar seu progresso automaticamente.">
          {persisted ? (
            <p className="text-sm font-semibold text-good">✓ Protegido</p>
          ) : (
            <Button size="sm" variant="secondary" onClick={async () => setPersisted(!!(await requestPersistence()))}>Proteger meus dados</Button>
          )}
        </Row>
        <Row title="Backup" hint="Exporte para levar seu progresso a outro aparelho, ou restaure um backup.">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={doExport}><Download size={16} /> Exportar</Button>
            <Button size="sm" variant="secondary" onClick={() => file.current?.click()}><Upload size={16} /> Restaurar</Button>
            <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />
          </div>
          {msg && <p className="mt-2 text-sm font-semibold" role="status">{msg}</p>}
        </Row>
        <Row title="Apagar progresso" hint="Remove revisões, estatísticas e favoritos deste aparelho. Não dá para desfazer.">
          <Button
            size="sm"
            variant="secondary"
            className="!text-again"
            onClick={() => {
              if (confirm('Apagar todo o progresso deste aparelho? Essa ação não pode ser desfeita.')) {
                resetProgress()
                setMsg('Progresso apagado.')
              }
            }}
          >
            Apagar tudo
          </Button>
        </Row>
      </section>

      <p className="mt-8 text-center text-sm text-muted">
        <Link to="/creditos" className="underline underline-offset-4 hover:text-ink">Créditos e licenças</Link>
      </p>
    </div>
  )
}
