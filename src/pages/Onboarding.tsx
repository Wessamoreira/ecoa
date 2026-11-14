import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { AUDIENCES, audienceInfo, type Audience, type Level } from '../data/index.ts'
import { speak } from '../lib/speech.ts'
import { cx } from '../lib/utils.ts'
import { useApp } from '../store/useApp.ts'
import { Illustration } from '../components/Illustration.tsx'
import { Button } from '../components/ui.tsx'
import { LogoMark } from '../app/Layout.tsx'

const MODE_ART: Record<Audience, string[]> = {
  kids: ['🦁', '🎈', '🍎'],
  teen: ['🎧', '🎮', '📱'],
  adult: ['✈️', '💼', '☕'],
}
const LEVEL_HINT: Record<Level, string> = {
  A1: 'Nunca estudei ou sei pouquíssimo',
  A2: 'Entendo frases simples do dia a dia',
  B1: 'Me viro em conversas e viagens',
  B2: 'Converso bem, quero mais naturalidade',
  C1: 'Quero refinar e soar nativo',
}

export default function Onboarding() {
  const setSettings = useApp((s) => s.setSettings)
  const settings = useApp((s) => s.settings)
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState<Audience>(settings.mode)
  const [level, setLevel] = useState<Level>('A1')
  const [name, setName] = useState(settings.name)
  const info = audienceInfo(mode)

  const finish = () => {
    setSettings({ mode, name: name.trim(), startLevel: { ...settings.startLevel, [mode]: level }, onboarded: true })
    speak(mode === 'kids' ? "Let's play and learn!" : "Welcome! Let's get started.", { accent: settings.accent })
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-6" data-mode={mode}>
      <div className="mb-8 flex items-center gap-2.5">
        <LogoMark size={34} />
        <span className="font-display text-2xl font-bold">Ecoa</span>
        <span className="ml-auto text-sm font-semibold text-muted">{step + 1} de 2</span>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.section key="mode" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="flex-1">
            <h1 className="text-[clamp(2.2rem,7vw,3.6rem)] font-bold leading-[0.98]">
              Ouça. Repita.<br />
              <span style={{ color: 'var(--accent)' }}>Fale inglês.</span>
            </h1>
            <p className="mt-3 max-w-xl text-lg text-muted">
              Um curso completo do zero ao avançado, com flashcards inteligentes, pronúncia nativa e treino de fala. Para quem é este curso?
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {AUDIENCES.map((a) => {
                const on = a.id === mode
                return (
                  <button
                    key={a.id}
                    type="button"
                    data-mode={a.id}
                    onClick={() => setMode(a.id)}
                    aria-pressed={on}
                    className={cx(
                      'group relative flex flex-col overflow-hidden rounded-[26px] border-2 p-5 text-left transition',
                      on ? 'border-accent bg-surface shadow-card' : 'border-line bg-surface/60 hover:border-muted/40',
                    )}
                  >
                    <div className="mb-4 flex -space-x-3">
                      {MODE_ART[a.id].map((e, i) => (
                        <span key={e} className="grid size-14 place-items-center rounded-2xl bg-accent-soft" style={{ transform: `rotate(${(i - 1) * 7}deg)` }}>
                          <Illustration emoji={e} size={38} />
                        </span>
                      ))}
                    </div>
                    <span className="font-display text-2xl font-bold">{a.label}</span>
                    <span className="mt-1 text-sm text-muted">{a.tagline}</span>
                    <span className="mt-3 text-xs font-bold uppercase tracking-wider text-muted">Níveis {a.levels[0]} → {a.levels.at(-1)}</span>
                    {on && (
                      <span className="absolute right-4 top-4 grid size-7 place-items-center rounded-full bg-accent text-accent-ink">
                        <Check size={16} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <label className="mt-6 block max-w-sm">
              <span className="text-sm font-semibold text-muted">Como podemos te chamar? (opcional)</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={mode === 'kids' ? 'Seu nome' : 'Seu nome'}
                className="mt-1.5 h-12 w-full rounded-2xl border border-line bg-surface px-4 font-semibold outline-none focus:border-accent"
                maxLength={30}
              />
            </label>
          </motion.section>
        ) : (
          <motion.section key="level" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="flex-1">
            <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold leading-[1.02]">Por onde começamos?</h1>
            <p className="mt-2 text-lg text-muted">Escolha seu nível atual. Todos os módulos continuam abertos — você pode mudar quando quiser.</p>
            <div className="mt-6 grid gap-2.5">
              {info.levels.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  aria-pressed={level === l}
                  className={cx('flex items-center gap-4 rounded-2xl border-2 px-4 py-3.5 text-left transition', level === l ? 'border-accent bg-surface shadow-card' : 'border-line bg-surface/60')}
                >
                  <span className="font-display grid size-12 shrink-0 place-items-center rounded-xl bg-surface-2 text-lg font-bold">{l}</span>
                  <span className="min-w-0">
                    <span className="block font-bold">{info.levelNames[l]}</span>
                    <span className="block text-sm text-muted">{mode === 'kids' ? ['Primeiras palavras e cores', 'Frases e ações do dia', 'Contar histórias e o passado'][info.levels.indexOf(l)] : LEVEL_HINT[l]}</span>
                  </span>
                  {level === l && <Check className="ml-auto shrink-0 text-accent" size={22} strokeWidth={3} />}
                </button>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="mt-8 flex items-center gap-3">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep(0)} aria-label="Voltar">
            <ArrowLeft size={18} />
          </Button>
        )}
        <Button size="lg" className="flex-1 sm:flex-none sm:min-w-56" onClick={() => (step === 0 ? setStep(1) : finish())}>
          {step === 0 ? 'Continuar' : 'Começar o curso'} <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  )
}
