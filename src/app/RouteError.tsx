import { RotateCcw } from 'lucide-react'
import { useRouteError } from 'react-router'

/** Tela exibida se algo der errado: o progresso fica salvo, só é preciso recarregar */
export function RouteError() {
  const error = useRouteError()
  const detail = error instanceof Error ? error.message : String(error ?? '')
  return (
    <div className="mx-auto grid min-h-dvh max-w-md place-items-center px-6 text-center">
      <div>
        <p className="font-display text-5xl font-bold">Ops!</p>
        <h1 className="mt-3 text-2xl font-bold">Algo deu errado nesta tela.</h1>
        <p className="mt-2 text-muted">Seu progresso está salvo no aparelho. Recarregue para continuar estudando.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-accent px-5 font-semibold text-accent-ink"
          >
            <RotateCcw size={18} /> Recarregar
          </button>
          <a href="/" className="inline-flex h-11 items-center rounded-2xl border border-line bg-surface px-5 font-semibold">
            Ir para o início
          </a>
        </div>
        {detail && <p className="mt-6 text-xs text-muted">Detalhe técnico: {detail}</p>}
      </div>
    </div>
  )
}
