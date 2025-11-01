# 🧁 Cristian's Pastry

Un blog moderno e performante dedicato alla pasticceria professionale, costruito con **Next.js 16**, **Sanity CMS** e le ultime tecnologie web.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-red?style=flat-square&logo=sanity)](https://www.sanity.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

> **Live Demo**: [cristianspastry.vercel.app](https://cristianspastry-teal.vercel.app/)

---

## 📖 Indice

- [✨ Caratteristiche](#-caratteristiche)
- [🚀 Tech Stack](#-tech-stack)
- [📦 Prerequisiti](#-prerequisiti)
- [🛠️ Installazione](#️-installazione)
- [⚙️ Configurazione](#️-configurazione)
- [🏃 Avvio](#-avvio)
- [📁 Struttura del Progetto](#-struttura-del-progetto)
- [🎨 Features Principali](#-features-principali)
- [📧 Form Contatti](#-form-contatti)
- [🔄 Cache Components](#-cache-components)
- [🚀 Deploy](#-deploy)
- [🧪 Testing](#-testing)
- [📝 Scripts Disponibili](#-scripts-disponibili)
- [🤝 Contribuire](#-contribuire)
- [📄 Licenza](#-licenza)

---

## ✨ Caratteristiche

### 🎯 Performance & SEO
- ⚡ **Next.js 16** con Cache Components (Partial Prerendering)
- 🚀 **ISR** (Incremental Static Regeneration) per contenuti dinamici
- 📊 **SEO ottimizzato** con meta tags, Open Graph, JSON-LD
- 🖼️ **Immagini ottimizzate** con Next.js Image
- �� **100% Responsive** e mobile-first
- ♿ **Accessibile** (WCAG 2.1 AA compliant)

### 📝 Content Management
- 🎨 **Sanity CMS** headless con Studio integrato
- ✍️ **Portable Text** per contenuti rich-text
- 📸 **Image CDN** automatico con trasformazioni
- 🔄 **Real-time preview** dei contenuti
- 📋 **Workflow personalizzato** per pubblicazione

### 🎨 UI/UX
- 💅 **Tailwind CSS** per styling modulare
- 🎭 **Framer Motion** per animazioni fluide
- 🎨 **Design system** consistente e scalabile
- 🌙 **Tema personalizzato** con palette colori dedicata
- 🔍 **Ricerca full-text** con autocomplete

### 📧 Features Avanzate
- 📨 **Form contatti** con invio email (Resend)
- 🔐 **Validazione** server-side con Zod
- 🧮 **Calcolatori** per pasticceria professionale
- 🔖 **Categorie e tag** per organizzazione contenuti
- 📖 **Articoli scientifici** sulla pasticceria
- 🎓 **Guide e tecniche** passo-passo

---

## 🚀 Tech Stack

### Core
- **Framework**: [Next.js 16.0.1](https://nextjs.org/) (App Router + Turbopack)
- **Linguaggio**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animazioni**: [Framer Motion 12.x](https://www.framer.com/motion/)

### Backend & Data
- **CMS**: [Sanity 3.x](https://www.sanity.io/)
- **Database**: Sanity Content Lake
- **ORM**: [Prisma](https://www.prisma.io/) (optional, per features future)
- **Auth**: [NextAuth.js 5.0](https://next-auth.js.org/) (beta)

### Tools & Utilities
- **Email Service**: [Resend](https://resend.com/)
- **Validazione**: [Zod](https://zod.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: [T3 Env](https://env.t3.gg/)

### DevOps
- **Hosting**: [Vercel](https://vercel.com/)
- **CI/CD**: GitHub Actions + Vercel
- **Monitoring**: Vercel Analytics
- **Version Control**: Git + GitHub

---

## 📦 Prerequisiti

Assicurati di avere installato:

- **Node.js**: >= 18.17.0 (consigliato 20.x LTS)
- **npm**: >= 9.x o **pnpm** >= 8.x
- **Git**: Per clonare il repository

```bash
# Verifica versioni installate
node --version  # >= 18.17.0
npm --version   # >= 9.x
```

---

## 🛠️ Installazione

### 1. Clona il Repository

```bash
git clone https://github.com/Cristianspastry/cristianspastry.git
cd cristianspastry
```

### 2. Installa le Dipendenze

```bash
# Con npm
npm install

# Oppure con pnpm (più veloce)
pnpm install
```

> **Nota**: Il progetto usa `legacy-peer-deps` per risolvere conflitti tra Next.js 16 e alcune dipendenze. Questo è normale e non causa problemi.

---

## ⚙️ Configurazione

### 1. Variabili d'Ambiente

Crea un file `.env` nella root del progetto:

```bash
cp .env.example .env
```

Compila le variabili richieste:

```env
# ============================================
# NEXT.JS
# ============================================
NEXT_PUBLIC_SITE_URL="https://tuosito.com"

# ============================================
# SANITY CMS
# ============================================
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_WRITE_TOKEN="your-write-token"
SANITY_REVALIDATE_SECRET="your-secret-key"

# ============================================
# RESEND (Email Service)
# ============================================
RESEND_API_KEY="re_xxxxxxxxxxxxx"
CONTACT_EMAIL="tua@email.com"

# ============================================
# AUTH (Opzionale)
# ============================================
AUTH_SECRET="your-secret-key"
AUTH_DISCORD_ID="your-discord-client-id"
AUTH_DISCORD_SECRET="your-discord-client-secret"

# ============================================
# DATABASE (Opzionale)
# ============================================
DATABASE_URL="file:./db.sqlite"
```

### 2. Setup Sanity CMS

#### Crea un Progetto Sanity

```bash
# Installa Sanity CLI globalmente
npm install -g @sanity/cli

# Login (se non l'hai già fatto)
sanity login

# Crea un nuovo progetto
sanity init
```

Segui le istruzioni e copia il **Project ID** nel tuo `.env`.

#### Genera un Token API

1. Vai su [sanity.io/manage](https://www.sanity.io/manage)
2. Seleziona il tuo progetto
3. Settings → API → Tokens
4. Crea un token con permessi **Editor**
5. Copia il token in `SANITY_API_WRITE_TOKEN`

### 3. Setup Resend (Email)

1. Crea account su [resend.com](https://resend.com)
2. Vai su **API Keys** → Create
3. Copia la chiave in `RESEND_API_KEY`
4. Imposta `CONTACT_EMAIL` con la tua email

> **Pro Tip**: Verifica il tuo dominio su Resend per evitare che le email finiscano in spam!

---

## 🏃 Avvio

### Development Mode

```bash
# Avvia il server di sviluppo con Turbopack
npm run dev

# Il sito sarà disponibile su:
# http://localhost:3000
```

### Sanity Studio

```bash
# Avvia Sanity Studio (CMS)
# Studio disponibile su:
# http://localhost:3000/studio
```

> **Nota**: Lo Studio è già integrato nella route `/studio` del progetto!

### Production Build

```bash
# Build per produzione
npm run build

# Avvia server produzione
npm run start
```

### Preview Build

```bash
# Build + Start in un comando
npm run preview
```

---

## 📁 Struttura del Progetto

```
cristianspastry/
├── public/                 # Assets statici
│   ├── logo.svg
│   ├── favicon.ico
│   └── images/
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (routes)/       # Route pubbliche
│   │   ├── api/            # API Routes
│   │   ├── studio/         # Sanity Studio integrato
│   │   ├── layout.tsx      # Layout root
│   │   └── page.tsx        # Homepage
│   │
│   ├── components/         # React Components
│   │   ├── layout/         # Header, Footer, etc.
│   │   ├── recipes/        # Componenti ricette
│   │   ├── science/        # Componenti articoli
│   │   ├── technique/      # Componenti tecniche
│   │   ├── shared/         # Componenti riutilizzabili
│   │   └── ui/             # UI primitives (Radix)
│   │
│   ├── lib/                # Utilities & Helpers
│   │   ├── actions/        # Server Actions
│   │   ├── data/           # Data fetching functions
│   │   ├── config.ts       # Configurazione sito
│   │   └── utils.ts        # Helper functions
│   │
│   ├── sanity/             # Sanity Configuration
│   │   ├── lib/            # Client & queries
│   │   ├── schemaTypes/    # Content schemas
│   │   └── structure.ts    # Studio structure
│   │
│   ├── styles/             # Global styles
│   │   ├── globals.css     # Tailwind + custom CSS
│   │   └── animations.css  # Animazioni custom
│   │
│   └── env.js              # Env variables validation
│
├── .env                    # Variabili d'ambiente (git-ignored)
├── .env.example            # Template variabili
├── .gitignore
├── .npmrc                  # npm configuration
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── package.json
└── README.md
```

---

## 🎨 Features Principali

### 🍰 Ricette

- **Lista ricette** con filtri avanzati (categoria, difficoltà, tempo)
- **Dettaglio ricetta** con ingredienti, istruzioni, note
- **Informazioni nutrizionali** calcolate automaticamente
- **Ricette correlate** basate su categoria/tag
- **Ricerca full-text** con suggerimenti

### 🧪 Scienza della Pasticceria

- **Articoli scientifici** su ingredienti, processi, reazioni
- **Livelli di complessità** (base, intermedio, avanzato)
- **Esperimenti pratici** con foto e video
- **Glossario tecnico** integrato
- **Bibliografia** e riferimenti

### 🎓 Tecniche Professionali

- **Guide step-by-step** con foto/video
- **Tips e troubleshooting**
- **Variazioni** e adattamenti
- **Attrezzatura richiesta**
- **Livello di difficoltà**

### 🧮 Calcolatori

- **Idratazione impasto**
- **Baker's Percentage**
- **Conversione unità di misura**
- **Forza della farina (W)**
- **Tempi di lievitazione**
- **Scaling ricette**
- **Conversione bloom gelatina**
- **Temperature impasto**
- **Proporzioni teglie**
- **Lievito madre**

---

## 📧 Form Contatti

Il sito include un **form contatti** completamente funzionale con:

### Features
- ✅ **Validazione** server-side con Zod
- ✅ **Invio email** tramite Resend API
- ✅ **Template HTML** professionale e responsive
- ✅ **Gestione errori** user-friendly
- ✅ **Loading states** durante l'invio
- ✅ **Auto-reset** dopo invio successo

### Schema di Validazione

```typescript
{
  name: string (min 2, max 100 caratteri)
  email: email valida
  subject: string (min 5, max 200 caratteri)
  message: string (min 10, max 5000 caratteri)
}
```

---

## 🔄 Cache Components

Il progetto usa **Next.js Cache Components** (Partial Prerendering) per performance ottimali.

### Vantaggi

- ⚡ **Rendering ultra-veloce** di parti statiche
- 🔄 **Streaming** di parti dinamiche
- 💾 **Cache intelligente** a livello di funzione
- 🎯 **Invalidazione granulare** con `revalidatePath`

### Strategie di Cache

| Tipo Contenuto | Cache Duration | Invalidazione |
|----------------|----------------|---------------|
| Ricette | 1 ora | Manuale (CMS) |
| Articoli Scienza | 1 ora | Manuale (CMS) |
| Tecniche | 1 ora | Manuale (CMS) |
| Categorie | 1 giorno | Manuale |
| Homepage | 1 ora | Automatica |

### Esempio Uso

```typescript
// Funzione con cache
export async function getRecipes() {
  'use cache'
  // cacheLife({ hours: 1 })

  return await client.fetch(RECIPES_QUERY)
}

// Invalidazione cache
import { revalidatePath } from 'next/cache'

revalidatePath('/ricette')
revalidatePath('/ricette/[slug]')
```

---

## 🚀 Deploy

### Vercel (Consigliato)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Cristianspastry/cristianspastry)

#### Setup Manuale

1. **Crea progetto su Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Aggiungi variabili d'ambiente**
   - Dashboard → Settings → Environment Variables
   - Copia tutte le variabili dal tuo `.env`

3. **Deploy**
   ```bash
   # Deploy automatico su ogni push a main
   git push origin main
   ```

### Altre Piattaforme

Il progetto è compatibile con:
- **Netlify**: Richiede config per App Router
- **Cloudflare Pages**: Supporto Next.js experimental
- **Self-hosted**: Docker container disponibile

---

## 🧪 Testing

### Type Checking

```bash
# Verifica TypeScript
npm run typecheck
```

### Linting

```bash
# Lint del codice
npm run lint

# Lint con auto-fix
npm run lint:fix
```

### Format

```bash
# Verifica formattazione
npm run format:check

# Formatta codice
npm run format:write
```

---

## 📝 Scripts Disponibili

| Script | Descrizione |
|--------|-------------|
| `npm run dev` | Avvia dev server con Turbopack |
| `npm run build` | Build per produzione |
| `npm run start` | Avvia server produzione |
| `npm run preview` | Build + Start |
| `npm run lint` | Lint codice |
| `npm run lint:fix` | Lint con auto-fix |
| `npm run typecheck` | Verifica TypeScript |
| `npm run format:check` | Verifica formattazione |
| `npm run format:write` | Formatta codice |
| `npm run db:push` | Push schema Prisma |
| `npm run db:studio` | Apri Prisma Studio |

---

## 🤝 Contribuire

I contributi sono benvenuti! Segui questi passi:

1. **Fork** il repository
2. **Crea** un branch per la tua feature
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** le modifiche
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** al branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Apri** una Pull Request

### Commit Convention

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nuova feature
fix: bug fix
docs: documentazione
style: formattazione
refactor: refactoring
test: test
chore: manutenzione
```

---

## 📄 Licenza

Questo progetto è privato e proprietario. Tutti i diritti riservati © 2025 Cristian's Pastry.

---

## 🙏 Ringraziamenti

Questo progetto è stato sviluppato con l'aiuto di:

- [Next.js](https://nextjs.org/) - Framework React incredibile
- [Sanity](https://www.sanity.io/) - CMS headless potente
- [Vercel](https://vercel.com/) - Platform di deploy eccezionale
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Claude Code](https://claude.com/claude-code) - AI Assistant per sviluppo

---

## 📞 Contatti

- **Website**: [cristianspastry.vercel.app](https://cristianspastry-teal.vercel.app/)
- **Email**: contact@cristianspastry.com
- **Instagram**: [@cristianspastry](https://instagram.com/cristianspastry)
- **GitHub**: [@Cristianspastry](https://github.com/Cristianspastry)

---

<div align="center">

**Made with ❤️ and a lot of ☕**

*Se questo progetto ti è utile, considera di mettere una ⭐!*

</div>
