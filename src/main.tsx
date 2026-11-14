import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource/atkinson-hyperlegible-next/400.css'
import '@fontsource/atkinson-hyperlegible-next/600.css'
import '@fontsource/atkinson-hyperlegible-next/700.css'
import '@fontsource/charis-sil/400-italic.css'
import './index.css'
import { App } from './app/App.tsx'
import { Layout } from './app/Layout.tsx'
import { RouteError } from './app/RouteError.tsx'
import Home from './pages/Home.tsx'

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        element: <Layout />,
        errorElement: <RouteError />,
        children: [
          { index: true, element: <Home /> },
          { path: 'trilha/:moduleId', lazy: () => import('./pages/ModulePage.tsx').then((m) => ({ Component: m.default })) },
          { path: 'estudar', lazy: () => import('./pages/Study.tsx').then((m) => ({ Component: m.default })) },
          { path: 'quiz', lazy: () => import('./pages/Quiz.tsx').then((m) => ({ Component: m.default })) },
          { path: 'dicionario', lazy: () => import('./pages/Dictionary.tsx').then((m) => ({ Component: m.default })) },
          { path: 'progresso', lazy: () => import('./pages/Progress.tsx').then((m) => ({ Component: m.default })) },
          { path: 'imprimir', lazy: () => import('./pages/Print.tsx').then((m) => ({ Component: m.default })) },
          { path: 'ajustes', lazy: () => import('./pages/Settings.tsx').then((m) => ({ Component: m.default })) },
          { path: 'creditos', lazy: () => import('./pages/Credits.tsx').then((m) => ({ Component: m.default })) },
          { path: '*', element: <Home /> },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
