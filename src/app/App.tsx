import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { useApp } from '../store/useApp.ts'
import { requestPersistence } from '../components/Pwa.tsx'
import Onboarding from '../pages/Onboarding.tsx'
import { LogoMark, useThemeSync } from './Layout.tsx'

export function App() {
  useThemeSync()
  const hydrated = useApp((s) => s.hydrated)
  const onboarded = useApp((s) => s.settings.onboarded)

  useEffect(() => {
    // Na primeira interação, pede armazenamento persistente (o navegador não apaga o progresso)
    const once = () => requestPersistence()
    window.addEventListener('pointerdown', once, { once: true })
    return () => window.removeEventListener('pointerdown', once)
  }, [])

  if (!hydrated)
    return (
      <div className="grid min-h-dvh place-items-center">
        <div className="animate-pulse"><LogoMark size={56} /></div>
      </div>
    )
  if (!onboarded) return <Onboarding />
  return <Outlet />
}
