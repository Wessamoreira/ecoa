#!/usr/bin/env node
/**
 * Busca imagens livres para o curso e gera src/data/media.json
 *
 * 1. Ilustrações 3D dos cards: Microsoft Fluent Emoji (licença MIT)
 *    https://github.com/microsoft/fluentui-emoji — servidas via jsDelivr com commit fixo.
 *    Quando não há equivalente, o app usa Twemoji (CC-BY 4.0) automaticamente.
 * 2. Fotos de capa dos módulos (teen/adulto): Openverse (https://openverse.org),
 *    catálogo de imagens Creative Commons (Flickr, Wikimedia...). Só licenças CC0, BY e BY-SA.
 *
 * Uso: npm run images
 */
import { writeFile, readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const emojiData = require('unicode-emoji-json/data-by-emoji.json')
const { MODULES, CARDS } = await import('../src/data/index.ts')

const OUT = new URL('../src/data/media.json', import.meta.url)
const UA = { 'User-Agent': 'ecoa-english-course-build-script' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()

let previous = { emoji: {}, photos: {} }
try {
  previous = JSON.parse(await readFile(OUT, 'utf8'))
} catch {}

// ───────────── 1. Fluent Emoji 3D
async function fluent() {
  const commit = await (await fetch('https://api.github.com/repos/microsoft/fluentui-emoji/commits/main', { headers: UA })).json()
  const sha = commit.sha
  const tree = await (await fetch(`https://api.github.com/repos/microsoft/fluentui-emoji/git/trees/${sha}?recursive=1`, { headers: UA })).json()
  const pngs = tree.tree.map((t) => t.path).filter((p) => /\/3D\/[^/]+\.png$/.test(p))
  const byFolder = new Map()
  for (const p of pngs) {
    const folder = p.split('/')[1]
    const isDefault = p.split('/').length === 4 || p.includes('/Default/')
    if (!byFolder.has(norm(folder)) || isDefault) byFolder.set(norm(folder), p)
  }
  const used = new Set([...CARDS.map((c) => c.emoji), ...MODULES.map((m) => m.emoji)].filter(Boolean))
  const map = {}
  const missing = []
  for (const e of used) {
    const info = emojiData[e] ?? emojiData[e.replace(/️/g, '')] ?? emojiData[e + '️']
    const names = info ? [info.name, info.name.replace(/:/g, ''), info.slug.replace(/_/g, ' ')] : []
    const hit = names.map(norm).map((n) => byFolder.get(n)).find(Boolean)
    if (hit) map[e] = `https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@${sha}/${hit.split('/').map(encodeURIComponent).join('/')}`
    else missing.push(`${e} ${info?.name ?? '?'}`)
  }
  console.log(`Fluent 3D: ${Object.keys(map).length}/${used.size} (sem 3D → Twemoji: ${missing.join(', ') || 'nenhum'})`)
  return map
}

// ───────────── 2. Fotos de capa (Openverse)
async function photos() {
  const out = { ...previous.photos }
  // Módulo sem "photo" usa a capa ilustrada: remove foto antiga, se houver
  for (const id of Object.keys(out)) if (!MODULES.find((m) => m.id === id)?.photo) delete out[id]
  for (const m of MODULES) {
    if (!m.photo || m.audiences.every((a) => a === 'kids')) continue
    if (out[m.id]?.query === m.photo) continue
    const url = new URL('https://api.openverse.org/v1/images/')
    url.search = new URLSearchParams({
      q: m.photo, page_size: '12', license: 'cc0,by,by-sa', aspect_ratio: 'wide', mature: 'false', category: 'photograph',
    }).toString()
    try {
      const res = await fetch(url, { headers: UA })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      const pick = data.results.find((r) => (r.width ?? 0) >= 900) ?? data.results[0]
      if (pick) {
        out[m.id] = {
          query: m.photo,
          src: `https://api.openverse.org/v1/images/${pick.id}/thumb/`,
          title: pick.title,
          creator: pick.creator,
          license: `CC ${pick.license.toUpperCase()} ${pick.license_version ?? ''}`.trim(),
          licenseUrl: pick.license_url,
          source: pick.foreign_landing_url,
          provider: pick.provider,
        }
        console.log(`📷 ${m.id}: ${pick.title} — ${pick.creator} (${pick.license})`)
      } else console.log(`📷 ${m.id}: sem resultado para "${m.photo}"`)
    } catch (err) {
      console.log(`📷 ${m.id}: falhou (${err.message})`)
    }
    await sleep(1500)
  }
  return out
}

const media = { emoji: await fluent(), photos: await photos() }
await writeFile(OUT, JSON.stringify(media, null, 2) + '\n')
console.log(`\n✔ ${OUT.pathname} atualizado`)
