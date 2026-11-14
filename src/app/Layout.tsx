import { BarChart3, BookOpenText, Flame, Home, Layers, Settings, Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import { audienceInfo } from '../data/index.ts'
import { cx } from '../lib/utils.ts'
import { streakOf, useApp } from '../store/useApp.ts'
import { UpdatePrompt } from '../components/Pwa.tsx'

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden>
      <rect width="512" height="512" rx="116" fill="#12162B" />
      <g transform="translate(-22 0)" fill="none" strokeLinecap="round">
        <path d="M152 256 H308 A78 78 0 1 0 288 308" stroke="#fff" strokeWidth="44" />
        <path d="M341 179 A135 135 0 0 1 341 333" stroke="#FF8A1F" strokeWidth="30" />
        <path d="M378 145 A180 180 0 0 1 378 367" stroke="#E0367E" strokeWidth="30" />
        <path d="M415 112 A225 225 0 0 1 415 400" stroke="#3A5BFF" strokeWidth="30" />
      </g>
    </svg>
  )
}

const NAV = [
  { to: '/', label: 'Início', icon: Home, end: true },
  { to: '/estudar', label: 'Revisar', icon: Layers },
  { to: '/quiz', label: 'Quiz', icon: Sparkles },
  { to: '/dicionario', label: 'Dicionário', icon: BookOpenText },
  { to: '/progresso', label: 'Progresso', icon: BarChart3 },
]

/** Aplica tema (claro/escuro/sistema) e a cor do modo no <html> */
export function useThemeSync() {
  const theme = useApp((s) => s.settings.theme)
  const mode = useApp((s) => s.settings.mode)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && mq.matches)
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.dataset.mode = mode
      document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', dark ? '#0D1020' : '#F3F5FA'))
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme, mode])
}

export function Layout() {

  const mode = useApp((s) => s.settings.mode)
  const streak = useApp((s) => streakOf(s.days))
  const { pathname } = useLocation()
  const focus = pathname.startsWith('/estudar') || pathname.startsWith('/quiz')
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_1fr]">
      {/* Barra lateral (desktop) */}
      <aside className="no-print sticky top-0 hidden h-dvh flex-col border-r border-line px-4 py-6 lg:flex">
        <NavLink to="/" className="mb-8 flex items-center gap-2.5 px-2">
          <LogoMark size={34} />
          <span className="font-display text-2xl font-bold tracking-tight">Ecoa</span>
        </NavLink>
        <nav className="flex flex-col gap-1" aria-label="Principal">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to} to={to} end={end}
              className={({ isActive }) => cx('flex h-11 items-center gap-3 rounded-xl px-3 font-semibold transition', isActive ? 'bg-surface text-ink shadow-card' : 'text-muted hover:text-ink hover:bg-surface-2')}
            >
              <Icon size={19} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-1">
          <NavLink to="/ajustes" className={({ isActive }) => cx('flex h-11 items-center gap-3 rounded-xl px-3 font-semibold', isActive ? 'bg-surface text-ink' : 'text-muted hover:text-ink')}>
            <Settings size={19} /> Ajustes
          </NavLink>
          <div className="flex items-center gap-2 rounded-xl border border-line px-3 py-2.5 text-sm">
            <span className="text-lg" aria-hidden>{audienceInfo(mode).emoji}</span>
            <span className="font-semibold">Modo {audienceInfo(mode).label}</span>
            <span className="ml-auto inline-flex items-center gap-1 font-bold text-hard"><Flame size={15} />{streak}</span>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Topo (mobile) */}
        {!focus && (
          <header className="no-print safe-top sticky top-0 z-30 flex items-center gap-2 border-b border-line/70 bg-bg/85 px-4 py-2.5 backdrop-blur-md lg:hidden">
            <NavLink to="/" className="flex items-center gap-2">
              <LogoMark size={28} />
              <span className="font-display text-xl font-bold">Ecoa</span>
            </NavLink>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-hard/12 px-2.5 py-1 text-sm font-bold text-hard" title="Dias seguidos estudando">
              <Flame size={15} /> {streak}
            </span>
            <NavLink to="/ajustes" aria-label="Ajustes" className="grid size-10 place-items-center rounded-full text-muted hover:text-ink">
              <Settings size={20} />
            </NavLink>
          </header>
        )}

        <main className={cx('mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10', focus ? 'pt-3 pb-8' : 'pt-5 pb-28 lg:py-10')}>
          <Outlet />
        </main>
      </div>

      {/* Navegação inferior (mobile) */}
      {!focus && (
        <nav aria-label="Principal" className="no-print safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/92 backdrop-blur-md lg:hidden">
          <div className="mx-auto grid max-w-lg grid-cols-5">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => cx('flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold transition', isActive ? 'text-ink' : 'text-muted')}>
                {({ isActive }) => (
                  <>
                    <span className={cx('grid h-8 w-12 place-items-center rounded-full transition', isActive && 'bg-accent text-accent-ink')}>
                      <Icon size={19} />
                    </span>
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
      <UpdatePrompt />
    </div>
  )
}
