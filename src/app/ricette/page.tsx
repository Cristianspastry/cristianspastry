// src/app/ricette/page.tsx
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getRecipes, getRecipeCategories } from '@/lib/data/recipes'
import RecipesList from '@/components/recipes/list/RecipesList'
import RecipesLoading from '@/components/recipes/list/RecipesLoading'

export const metadata: Metadata = {
  title: 'Ricette di Pasticceria | Scopri Dolci Deliziosi',
  description: 'Esplora la nostra collezione di ricette di pasticceria: torte, biscotti, desserts e molto altro. Filtra per difficoltà, tempo e categorie.',
  openGraph: {
    title: 'Ricette di Pasticceria',
    description: 'Scopri deliziose ricette di pasticceria per ogni occasione',
  },
}

export default async function RecipesPage() {
  // Fetch all recipes and categories
  const [recipesData, categories] = await Promise.all([
    getRecipes({ limit: 1000 }), // Fetch all recipes for client-side filtering
    getRecipeCategories(),
  ])

  const { recipes } = recipesData

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

      {/* Recipes List with Filters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<RecipesLoading />}>
            <RecipesList initialRecipes={recipes} categories={categories} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}