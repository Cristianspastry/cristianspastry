// app/ricette/[slug]/page.tsx
import { RecipeActions } from '@/components/recipes/RecipeActions'
import { RecipeHero } from '@/components/recipes/RecipeHero'
import { RecipeInfo } from '@/components/recipes/RecipeInfo'
import { RecipeIngredients } from '@/components/recipes/RecipeIngredients'
import { RecipeInstructions } from '@/components/recipes/RecipeInstructions'
import { RecipeNutrition } from '@/components/recipes/RecipeNutrition'
import { RecipeRelated } from '@/components/recipes/RecipeRelated'
import { RecipeTips } from '@/components/recipes/RecipeTips'
import { getRecipeBySlug } from '@/lib/data/recipes'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600

interface RecipePageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const recipe = await getRecipeBySlug(params.slug)

  if (!recipe) {
    return {
      title: 'Ricetta non trovata',
    }
  }

  return {
    title: recipe.seo?.metaTitle ?? `${recipe.title} - Ricetta completa`,
    description: recipe.seo?.metaDescription ?? recipe.excerpt,
    openGraph: {
      title: recipe.seo?.metaTitle ?? recipe.title,
      description: recipe.seo?.metaDescription ?? recipe.excerpt,
      images: [
        {
          url: recipe.seo?.ogImageUrl ?? recipe.mainImageUrl,
          alt: recipe.mainImageAlt,
        },
      ],
      type: 'article',
      publishedTime: recipe.publishedAt,
    },
    robots: {
      index: !recipe.seo?.noIndex,
      follow: !recipe.seo?.noIndex,
    },
    keywords: recipe.seo?.focusKeyphrase
      ? [recipe.seo.focusKeyphrase, ...(recipe.seo.synonyms ?? [])]
      : undefined,
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeBySlug(params.slug)

  if (!recipe) {
    notFound()
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0) + (recipe.restTime ?? 0)

  // JSON-LD Schema.org per SEO
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.excerpt,
    image: recipe.mainImageUrl,
    author: {
      '@type': 'Person',
      name: recipe.author?.name || 'Chef',
    },
    datePublished: recipe.publishedAt,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${totalTime}M`,
    recipeYield: `${recipe.servings} porzioni`,
    recipeCategory: recipe.categories?.map(c => c.title).join(', '),
    recipeCuisine: 'Italiana',
    keywords: recipe.tags?.join(', '),
    recipeIngredient: recipe.ingredients?.flatMap(group =>
      group.items.map(item => 
        `${item.quantity}${item.unit ? ' ' + item.unit : ''} ${item.ingredient}`
      )
    ),
    recipeInstructions: recipe.instructions?.flatMap(phase =>
      phase.steps.map((step, idx) => ({
        '@type': 'HowToStep',
        text: step.description,
        position: idx + 1,
      }))
    ),
    ...(recipe.nutritionalInfo && {
      nutrition: {
        '@type': 'NutritionInformation',
        calories: recipe.nutritionalInfo.calories ? `${recipe.nutritionalInfo.calories} kcal` : undefined,
        proteinContent: recipe.nutritionalInfo.protein ? `${recipe.nutritionalInfo.protein}g` : undefined,
        carbohydrateContent: recipe.nutritionalInfo.carbohydrates ? `${recipe.nutritionalInfo.carbohydrates}g` : undefined,
        fatContent: recipe.nutritionalInfo.fat ? `${recipe.nutritionalInfo.fat}g` : undefined,
        fiberContent: recipe.nutritionalInfo.fiber ? `${recipe.nutritionalInfo.fiber}g` : undefined,
        sugarContent: recipe.nutritionalInfo.sugar ? `${recipe.nutritionalInfo.sugar}g` : undefined,
      },
    }),
  }
console.info(recipe.mainImageUrl)
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />

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
                <RecipeIngredients ingredients={recipe.ingredients} servings={recipe.servings} />

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
    </>
  )
}

