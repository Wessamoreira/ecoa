# Ecoa — Curso de Inglês (PWA)

Curso completo de inglês do A1 ao C1 com flashcards de repetição espaçada (FSRS), pronúncia nativa, gravações humanas, treino de fala com microfone e quiz. Tem três modos: **Criança**, **Adolescente** e **Adulto**. É 100% estático (sem backend) e funciona offline como app instalado.

## Tecnologia

| Camada | Escolha |
|---|---|
| Build | Vite 8 + React 19 + TypeScript 7 |
| Estilo | Tailwind CSS 4 (tokens por modo, claro/escuro) |
| Animações | Motion (flip 3D do card, transições) |
| PWA / offline | vite-plugin-pwa (Workbox): precache do app + cache de imagens e áudios |
| Progresso | IndexedDB (idb-keyval + zustand persist), com armazenamento persistente |
| Repetição espaçada | ts-fsrs v6 (algoritmo FSRS-7, o do Anki moderno) |
| Voz | Web Speech API, com ranking de vozes neurais (Natural, Premium, Siri, Google) e destaque palavra por palavra |
| Fala do aluno | SpeechRecognition + avaliação palavra por palavra (nota de 0 a 100) |
| Gravações humanas | Free Dictionary API (Wiktionary / Wikimedia Commons) |
| Imagens | Microsoft Fluent Emoji 3D (MIT), Twemoji (CC BY), capas ilustradas geradas e fotos CC do Openverse (capas + "Ver fotos reais") |
| Diálogos | 26 conversas com duas vozes, tradução opcional e treino de fala por linha |

## Estrutura

```
├── index.html               # shell + tema aplicado antes do primeiro paint
├── netlify.toml             # build, SPA redirect, cabeçalhos do service worker
├── vite.config.ts           # PWA: manifest, precache e cache de runtime
├── pwa-assets.config.ts     # gera os ícones a partir de public/logo.svg
├── public/                  # logo.svg + ícones gerados (192, 512, maskable, apple)
├── scripts/fetch-images.mjs # busca ilustrações 3D e fotos livres → src/data/media.json
└── src/
    ├── data/                # BASE DO CURSO (871 cards, 81 módulos, 26 diálogos)
    │   ├── kids.ts kids2.ts # modo Criança (A1–B1)
    │   ├── a1.ts a2.ts b1.ts b2c1.ts core2.ts core3.ts  # núcleo Teen + Adulto
    │   ├── tracks.ts tracks2.ts  # módulos exclusivos Teen e Adulto
    │   ├── dialogues.ts     # diálogos com duas vozes, por módulo
    │   ├── helpers.ts       # w(), irr(), reg(), mod(): escrita compacta de cards
    │   ├── index.ts         # modos, níveis, ordem da trilha
    │   └── media.json       # URLs das imagens + atribuições (gerado)
    ├── lib/                 # speech, recognition, dictionary, srs, session, quiz
    ├── store/useApp.ts      # estado salvo no aparelho (IndexedDB)
    ├── components/          # FlashCard, Audio, Coach, CardContent, Pwa, ui
    └── pages/               # Home, ModulePage, Study, Quiz, Dictionary,
                             # Progress, Print, Settings, Onboarding, Credits
```

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173
```

Para testar o PWA (offline e instalação), use o build de produção:

```bash
npm run build
npm run preview    # http://localhost:4173
```

## Deploy no Netlify

**Opção A: arrastar a pasta**
1. `npm run build`
2. Abra https://app.netlify.com/drop e arraste a pasta **`dist`**.

**Opção B: conectar ao GitHub (atualiza a cada push)**
1. Suba o projeto para um repositório no GitHub.
2. No Netlify: **Add new site → Import an existing project → GitHub** e escolha o repositório.
3. O `netlify.toml` já define tudo: build `npm run build`, pasta `dist`, Node 24.
4. Clique em **Deploy**.

O HTTPS do Netlify é obrigatório para o service worker, o microfone e a instalação do app funcionarem.

## Adicionar conteúdo

Cada card é uma linha em `src/data/*.ts`:

```ts
w('give up', '/ɡɪv ʌp/', 'desistir', '🏳️',
  [["Don't give up!", 'Não desista!'], ['He gave up smoking.', 'Ele parou de fumar.', 'Simple Past']],
  'Give up + -ing.', { pos: 'phrasal verb', lookup: 'give' })
```

Verbos irregulares usam `irr(base, passado, particípio, -ing, [ipa x3], pt, emoji, exemplos, dica)`.
Os IDs são gerados a partir do termo, então **não renomeie termos já publicados**: o progresso dos alunos está ligado a esse ID.

Depois de adicionar emojis ou módulos novos, rode `npm run images` para buscar as ilustrações 3D e as fotos de capa.

## Atalhos

`Espaço` virar · `1` `2` `3` `4` avaliar (Errei / Difícil / Bom / Fácil) · `A` ouvir · `S` ouvir devagar · `Esc` sair
