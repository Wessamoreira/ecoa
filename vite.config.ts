import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['favicon.ico', 'logo.svg', 'apple-touch-icon-180x180.png'],
      manifest: {
        id: '/',
        name: 'Ecoa — Curso de Inglês',
        short_name: 'Ecoa',
        description:
          'Curso completo de inglês com flashcards, repetição espaçada, pronúncia nativa e treino de fala. Funciona offline.',
        lang: 'pt-BR',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone'],
        orientation: 'any',
        background_color: '#0D1020',
        theme_color: '#12162B',
        categories: ['education', 'productivity'],
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Revisar agora', short_name: 'Revisar', url: '/estudar', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Quiz rápido', short_name: 'Quiz', url: '/quiz', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Dicionário', short_name: 'Dicionário', url: '/dicionario', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2,webmanifest}'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        runtimeCaching: [
          {
            // Ilustrações 3D (Fluent Emoji) e Twemoji servidas pelo jsDelivr
            urlPattern: ({ url }) => url.hostname === 'cdn.jsdelivr.net',
            handler: 'CacheFirst',
            options: {
              cacheName: 'ecoa-illustrations',
              expiration: { maxEntries: 900, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Fotos livres (Openverse / Flickr / Wikimedia) das capas dos módulos
            urlPattern: ({ url }) =>
              url.hostname === 'api.openverse.org' && url.pathname.includes('/thumb'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'ecoa-photos',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Buscas de fotos reais (resultado em JSON)
            urlPattern: ({ url }) => url.hostname === 'api.openverse.org' && url.pathname === '/v1/images/',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'ecoa-photo-search',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Dicionário online (IPA + gravações humanas de pronúncia)
            urlPattern: ({ url }) => url.hostname === 'api.dictionaryapi.dev',
            handler: 'CacheFirst',
            options: {
              cacheName: 'ecoa-dictionary',
              expiration: { maxEntries: 1500, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] },
              rangeRequests: true,
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 900,
  },
})
