// app/ricette/[slug]/page.tsx
import { RecipeActions } from '@/components/recipes/detail/RecipeActions'
import { RecipeHero } from '@/components/recipes/detail/RecipeHero'
import { RecipeInfo } from '@/components/recipes/detail/RecipeInfo'
import { RecipeIngredients } from '@/components/recipes/detail/RecipeIngredients'
import { RecipeInstructions } from '@/components/recipes/detail/RecipeInstructions'
import { RecipeNutrition } from '@/components/recipes/detail/RecipeNutrition'
import { RecipeRelated } from '@/components/recipes/detail/RecipeRelated'
import { RecipeTips } from '@/components/recipes/detail/RecipeTips'
import { getRecipeBySlug } from '@/lib/data/recipes'
import { generateRecipeMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// ❌ RIMOSSO: export const revalidate = 3600
// ✅ Ora la cache è gestita tramite 'use cache' nelle funzioni di data fetching

interface RecipePageProps {
  params: Promise<{ slug: string }>
}


export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)

  if (!recipe) {
    return {
      title: 'Ricetta non trovata',
    }
  }

  return generateRecipeMetadata(recipe)
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params
  const recipe = await getRecipeBySlug(slug)

  if (!recipe) {
    notFound()
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0) + (recipe.restTime ?? 0)

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section con immagine principale */}
        <RecipeHero recipe={recipe} />

        {/* Container principale */}
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-7xl">
            {/* Actions: Print, Share, Save */}
            <RecipeActions recipe={recipe} />

            {/* Info Card: Tempo, Difficoltà, Porzioni */}
            <RecipeInfo recipe={recipe} totalTime={totalTime} />

            {/* Layout a 2 colonne per desktop */}
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {/* Sidebar sinistra - Ingredienti */}
              <div className="lg:col-span-1">
                <RecipeIngredients ingredients={recipe.ingredients} servings={recipe.servings} panSize={recipe.panSize} />

                {/* Info nutrizionali se disponibili */}
                {recipe.nutritionalInfo && (
                  <>
                   <RecipeNutrition nutritionalInfo={recipe.nutritionalInfo} />
                  </>
                )}
              </div>

              {/* Contenuto principale - Procedimento */}
              <div className="lg:col-span-2">
                <RecipeInstructions instructions={recipe.instructions} />

                {/* Consigli dello chef */}
                {recipe.tips && recipe.tips.length > 0 && (
                  <>
                    <RecipeTips tips={recipe.tips} />
                  </>
                  
                )}

                {/* Conservazione */}
                {recipe.storage && (
                  <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-primary-900">
                      🧊 Conservazione
                    </h3>
                    <p className="leading-relaxed text-gray-700">{recipe.storage}</p>
                  </div>
                )}

                {/* Varianti */}
                {recipe.variations && recipe.variations.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-primary-900">
                      🔄 Varianti
                    </h3>
                    <div className="prose prose-gray max-w-none">
                      {/* Render PortableText per le varianti */}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sezioni correlate */}
            <RecipeRelated 
              relatedRecipes={recipe.relatedRecipes}
              relatedTechniques={recipe.relatedTechniques}
              relatedScience={recipe.relatedScience}
            />
          </div>
        </div>
      </div>
  )
}

