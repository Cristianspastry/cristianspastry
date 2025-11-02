/**
 * Scienza Page - Server Component
 *
 * Pagina principale per la visualizzazione degli articoli scientifici con filtri server-side.
 *
 * ARCHITETTURA:
 * - Server Component → fetcha dati filtrati da Sanity (solo 12 articoli/pagina)
 * - URL params → filtri passati via searchParams
 * - Client Component (ScienceList) → gestisce UI e navigazione
 *
 * NOTA IMPORTANTE:
 * - Science usa 'articleType' e 'complexity' (NON category/difficulty)
 * - articleType: ingredienti, processi, reazioni, fisica, dietro-quinte, miti, storia
 * - complexity: base, intermedio, avanzato
 *
 * FLOW:
 * 1. Next.js passa searchParams al Server Component
 * 2. Parse params e costruisce filtri
 * 3. Fetch dati da Sanity con getScienceArticles() (server-side filtering)
 * 4. Passa dati al Client Component ScienceList
 * 5. User interagisce con filtri → router.push() → ciclo ricomincia
 *
 * PERFORMANCE:
 * - Solo 12 articoli fetchati per request (vs 1000+ client-side)
 * - Server-side cache con 'use cache'
 */

import type { Metadata } from 'next'
import ScienceList from '@/components/science/list/ScienceList'
import { getScienceArticles } from '@/lib/data/science'

export const metadata: Metadata = {
  title: 'La Scienza della Pasticceria | Cristian\'s Pastry',
  description: 'Scopri la scienza dietro le tecniche e gli ingredienti della pasticceria. Articoli approfonditi su reazioni chimiche, fisica e processi.',
  keywords: [
    'scienza pasticceria',
    'chimica pasticceria',
    'fisica pasticceria',
    'reazioni chimiche',
    'ingredienti scienza',
  ],
  openGraph: {
    title: 'La Scienza della Pasticceria | Cristian\'s Pastry',
    description: 'Scopri la scienza dietro le tecniche e gli ingredienti della pasticceria.',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Scienza della Pasticceria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Scienza della Pasticceria | Cristian\'s Pastry',
    description: 'Scopri la scienza dietro le tecniche e gli ingredienti della pasticceria.',
    images: ['/og-image.svg'],
  },
}

/**
 * Props ricevute dal Server Component
 * searchParams è automaticamente passato da Next.js come Promise
 */
interface SciencePageProps {
  searchParams: Promise<{
    articleType?: string  // Tipo articolo (ingredienti, processi, reazioni, fisica, etc.)
    complexity?: string   // Complessità (base, intermedio, avanzato)
    search?: string       // Query di ricerca testuale
    page?: string         // Numero pagina corrente
  }>
}

export default async function SciencePage({ searchParams }: SciencePageProps) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams
  const page = parseInt(params.page || '1')

  // ============================================
  // FETCH DATA (Server-side)
  // ============================================
  const { articles, total } = await getScienceArticles({
    articleType: params.articleType && params.articleType !== 'all' ? params.articleType : undefined,
    complexity: params.complexity && params.complexity !== 'all' ? params.complexity : undefined,
    search: params.search || undefined,
    page,
    limit: 12, // Solo 12 articoli per pagina (server-side pagination)
  })

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-900 via-orange-800 to-orange-900 py-20">
        <div className="absolute inset-0 bg-[url('/patterns/pastry-pattern.svg')] opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              La Scienza della Pasticceria
            </h1>
            <p className="text-xl text-orange-100 md:text-2xl">
              Scopri i principi scientifici dietro le tecniche e gli ingredienti della pasticceria
            </p>
            {/* Indicatori complessità */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-orange-200">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span>Base</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <span>Intermedio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <span>Avanzato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science List (Client Component con filtri e grid) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScienceList
            articles={articles}
            total={total}
            currentPage={page}
          />
        </div>
      </section>
    </div>
  )
}
