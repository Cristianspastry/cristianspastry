/**
 * Ricette Page - Server Component
 *
 * Pagina principale per la visualizzazione delle ricette con filtri server-side.
 *
 * ARCHITETTURA:
 * - Server Component → fetcha dati filtrati da Sanity (solo 12 ricette/pagina)
 * - URL params → filtri passati via searchParams
 * - Client Component (RecipesList) → gestisce UI e navigazione
 *
 * FLOW:
 * 1. Next.js passa searchParams al Server Component
 * 2. Parse params e costruisce filtri
 * 3. Fetch dati da Sanity con getRecipes() (server-side filtering)
 * 4. Passa dati al Client Component RecipesList
 * 5. User interagisce con filtri → router.push() → ciclo ricomincia
 *
 * PERFORMANCE:
 * - Solo 12 ricette fetchate per request (vs 1000+ client-side)
 * - Parallel fetching di recipes e categories
 * - Server-side cache con 'use cache'
 */

import type { Metadata } from 'next'
import { getRecipes, getRecipeCategories } from '@/lib/data/recipes'
import RecipesList from '@/components/recipes/list/RecipesList'

export const metadata: Metadata = {
  title: 'Ricette di Pasticceria | Scopri Dolci Deliziosi',
  description: 'Esplora la nostra collezione di ricette di pasticceria: torte, biscotti, desserts e molto altro. Filtra per difficoltà, tempo e categorie.',
  openGraph: {
    title: 'Ricette di Pasticceria',
    description: 'Scopri deliziose ricette di pasticceria per ogni occasione',
  },
}

/**
 * Props ricevute dal Server Component
 * searchParams è automaticamente passato da Next.js come Promise
 */
interface RecipesPageProps {
  searchParams: Promise<{
    category?: string    // Slug categoria (es. "torte", "biscotti")
    difficulty?: string  // Difficoltà ("facile", "media", "difficile", "professionale")
    time?: string       // Tempo massimo in minuti ("30", "60", "120", "180")
    search?: string     // Query di ricerca testuale
    page?: string       // Numero pagina corrente
  }>
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  // Await searchParams (Next.js 15+ requirement)
  const params = await searchParams

  // ============================================
  // PARSE SEARCH PARAMS
  // Converte string params in valori tipizzati
  // ============================================
  const page = parseInt(params.page || '1')
  const maxTime = params.time && params.time !== 'all' ? parseInt(params.time) : undefined

  // ============================================
  // FETCH DATA (Server-side)
  // Parallel fetch di recipes e categories
  // ============================================
  const [recipesData, categories] = await Promise.all([
    getRecipes({
      category: params.category && params.category !== 'all' ? params.category : undefined,
      difficulty: params.difficulty && params.difficulty !== 'all' ? params.difficulty : undefined,
      maxTime,
      search: params.search || undefined,
      page,
      limit: 12, // Solo 12 ricette per pagina (server-side pagination)
    }),
    getRecipeCategories(),
  ])

  const { recipes, total } = recipesData

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 py-20">
        <div className="absolute inset-0 bg-[url('/patterns/pastry-pattern.svg')] opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Ricette di Pasticceria
            </h1>
            <p className="text-xl text-primary-100 md:text-2xl">
              Esplora la nostra collezione di ricette dolci e salate per ogni occasione
            </p>
            {/* Indicatori difficoltà */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-primary-200">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span>Facile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <span>Medio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <span>Difficile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipes List (Client Component con filtri e grid) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <RecipesList
            recipes={recipes}
            categories={categories}
            total={total}
            currentPage={page}
          />
        </div>
      </section>
    </div>
  )
}
