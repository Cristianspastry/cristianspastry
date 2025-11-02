/**
 * Tecniche Page - Server Component
 *
 * Pagina principale per la visualizzazione delle tecniche di pasticceria con filtri server-side.
 *
 * ARCHITETTURA:
 * - Server Component → fetcha dati filtrati da Sanity (solo 12 tecniche/pagina)
 * - URL params → filtri passati via searchParams
 * - Client Component (TechniquesList) → gestisce UI e navigazione
 *
 * FLOW:
 * 1. Next.js passa searchParams al Server Component
 * 2. Parse params e costruisce filtri
 * 3. Fetch dati da Sanity con getTechniques() (server-side filtering)
 * 4. Passa dati al Client Component TechniquesList
 * 5. User interagisce con filtri → router.push() → ciclo ricomincia
 *
 * PERFORMANCE:
 * - Solo 12 tecniche fetchate per request (vs 1000+ client-side)
 * - Server-side cache con 'use cache'
 */

import type { Metadata } from 'next'
import TechniquesList from '@/components/technique/list/TechniquesList'
import { getTechniques } from '@/lib/data/techniques'

export const metadata: Metadata = {
  title: 'Tecniche di Pasticceria | Cristian\'s Pastry',
  description: 'Impara le tecniche fondamentali e avanzate della pasticceria professionale. Guide dettagliate con video e immagini per ogni livello.',
  keywords: [
    'tecniche pasticceria',
    'tecniche professionali',
    'guide pasticceria',
    'tutorial pasticceria',
    'impasti base',
  ],
  openGraph: {
    title: 'Tecniche di Pasticceria | Cristian\'s Pastry',
    description: 'Impara le tecniche fondamentali e avanzate della pasticceria professionale.',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Tecniche di Pasticceria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tecniche di Pasticceria | Cristian\'s Pastry',
    description: 'Impara le tecniche fondamentali e avanzate della pasticceria professionale.',
    images: ['/og-image.svg'],
  },
}

/**
 * Props ricevute dal Server Component
 * searchParams è automaticamente passato da Next.js come Promise
 */
interface TechniquesPageProps {
  searchParams: Promise<{
    category?: string    // Categoria tecnica (impasti, cottura, decorazione, etc.)
    difficulty?: string  // Difficoltà (base, intermedio, avanzato, professionale)
    search?: string     // Query di ricerca testuale
    page?: string       // Numero pagina corrente
  }>
}

export default async function TechniquesPage({ searchParams }: TechniquesPageProps) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams
  const page = parseInt(params.page || '1')

  // ============================================
  // FETCH DATA (Server-side)
  // ============================================
  const { techniques, total } = await getTechniques({
    category: params.category && params.category !== 'all' ? params.category : undefined,
    difficulty: params.difficulty && params.difficulty !== 'all' ? params.difficulty : undefined,
    search: params.search || undefined,
    page,
    limit: 12, // Solo 12 tecniche per pagina (server-side pagination)
  })

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20">
        <div className="absolute inset-0 bg-[url('/patterns/pastry-pattern.svg')] opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Tecniche di Pasticceria
            </h1>
            <p className="text-xl text-blue-100 md:text-2xl">
              Impara le tecniche fondamentali e avanzate della pasticceria professionale
            </p>
            {/* Indicatori difficoltà */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-blue-200">
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
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                <span>Professionale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Techniques List (Client Component con filtri e grid) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <TechniquesList
            techniques={techniques}
            total={total}
            currentPage={page}
          />
        </div>
      </section>
    </div>
  )
}
