// scripts/populate-categories.ts
import 'dotenv/config'
import { clientWithWrite } from '@/sanity/lib/client'
import type { Category } from '@/sanity/lib/types'



// Definizione categorie
const categories : Category[] = [
  { 
    title: 'Signature Cristian', 
    slug: { current: 'signature-cristian' },
    emoji: '⭐', 
    _id: 1, 
    featured: true,
    color: 'purple',
    description: 'Le ricette iconiche firmate da Cristian'
  },
  { 
    title: 'Ricetta del mese', 
    slug: { current: 'ricetta-del-mese' },
    emoji: '🎖️', 
    _id: 2, 
    featured: true,
    color: 'orange',
    description: 'La ricetta speciale di questo mese'
  },
  { 
    title: 'Occasioni speciali', 
    slug: { current: 'occasioni-speciali' },
    emoji: '🎉', 
    _id: 3, 
    featured: true,
    color: 'red',
    description: 'Dolci perfetti per celebrare momenti importanti'
  },
  { 
    title: 'Ricette veloci', 
    slug: { current: 'ricette-veloci' },
    emoji: '⚡', 
    _id: 4,
    color: 'yellow',
    description: 'Dolci deliziosi pronti in poco tempo'
  },
  { 
    title: 'Ricette della tradizione', 
    slug: { current: 'ricette-tradizione' },
    emoji: '🏛️', 
    _id: 5,
    color: 'brown',
    description: 'I grandi classici della pasticceria italiana'
  },
  { 
    title: 'Torte moderne', 
    slug: { current: 'torte-moderne' },
    emoji: '🎂', 
    _id: 6,
    color: 'blue',
    description: 'Torte contemporanee e innovative'
  },
  { 
    title: 'Dolci freddi', 
    slug: { current: 'dolci-freddi' },
    emoji: '❄️', 
    _id: 7,
    color: 'blue',
    description: 'Semifreddi, gelati e dolci da gustare freschi'
  },
  { 
    title: 'Cioccolato', 
    slug: { current: 'cioccolato' },
    emoji: '🍫', 
    _id: 8,
    color: 'brown',
    description: 'Per gli amanti del cioccolato'
  },
  { 
    title: 'Lievitati dolci', 
    slug: { current: 'lievitati-dolci' },
    emoji: '🥐', 
    _id: 9,
    color: 'orange',
    description: 'Brioche, cornetti e lievitati da colazione'
  },
  { 
    title: 'Pasticcini & Mignon', 
    slug: { current: 'pasticcini-mignon' },
    emoji: '🧁', 
    _id: 10,
    color: 'purple',
    description: 'Piccole delizie per ogni occasione'
  },
  { 
    title: 'Dolci al cucchiaio', 
    slug: { current: 'dolci-al-cucchiaio' },
    emoji: '🥄', 
    _id: 11,
    color: 'yellow',
    description: 'Creme, mousse e dolci da gustare con il cucchiaio'
  },
  { 
    title: 'Crostate & Pie', 
    slug: { current: 'crostate-pie' },
    emoji: '🥧', 
    _id: 12,
    color: 'orange',
    description: 'Crostate alla frutta e pie americane'
  },
  { 
    title: 'Biscotti', 
    slug: { current: 'biscotti' },
    emoji: '🍪', 
    _id: 13,
    color: 'brown',
    description: 'Biscotti friabili e golosi per ogni momento'
  },
  { 
    title: 'Masse montate', 
    slug: { current: 'masse-montate' },
    emoji: '🍰', 
    _id: 14,
    color: 'purple',
    description: 'Pan di spagna, savoiardi e basi soffici'
  },
]

async function populateCategories() {
  console.log('🚀 Inizio popolamento categorie...\n')
  
  // Verifica configurazione
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID non configurato!')
    process.exit(1)
  }
  
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ SANITY_API_WRITE_TOKEN non configurato!')
    console.error('💡 Vai su sanity.io > Progetto > API > Tokens e crea un token con permessi di scrittura')
    process.exit(1)
  }

  let successCount = 0
  let errorCount = 0

  for (const category of categories) {
    try {
      const result = await clientWithWrite.create({
        _type: 'category',
        ...category,
      })

      console.log(`✅ Creata: ${category.emoji} ${category.title}`)
      successCount++

      // Piccolo delay per evitare rate limiting
      await new Promise(resolve => setTimeout(resolve, 200))
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Errore con "${category.title}":`, error.message)
      } else {
        console.error(`❌ Errore con "${category.title}":`, error)
      }
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✨ Completato!`)
  console.log(`✅ Categorie create: ${successCount}`)
  if (errorCount > 0) {
    console.log(`❌ Errori: ${errorCount}`)
  }
  console.log('='.repeat(50))
}

// Esegui lo script
populateCategories()
  .then(() => {
    console.log('\n🎉 Script completato con successo!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Errore fatale:', error)
    process.exit(1)
  })

// ============================================
// ISTRUZIONI
// ============================================

/*
STEP 1: Crea il file
Crea il file scripts/populate-categories.ts con questo contenuto

STEP 2: Configura le variabili d'ambiente
Nel tuo .env.local aggiungi:

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_write_token

Per ottenere il WRITE TOKEN:
1. Vai su https://sanity.io
2. Seleziona il tuo progetto
3. API > Tokens
4. "Add API Token"
5. Nome: "Populate Script"
6. Permissions: Editor
7. Copia il token

STEP 3: Installa le dipendenze necessarie
npm install tsx dotenv

STEP 4: Esegui lo script
npx tsx scripts/populate-categories.ts

STEP 5: Verifica su Sanity Studio
Vai su http://localhost:3000/studio e verifica che le categorie siano state create

ALTERNATIVA: Crea manualmente da Sanity Studio
Se preferisci non usare lo script, vai su /studio e crea le categorie manualmente
*/