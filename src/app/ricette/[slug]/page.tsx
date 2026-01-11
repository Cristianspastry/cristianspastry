// app/ricette/[slug]/page.tsx
import { RecipeActions } from '@/components/recipes/detail/RecipeActions'
import { RecipeCommonMistakes } from '@/components/recipes/detail/RecipeCommonMistakes'
import { RecipeHero } from '@/components/recipes/detail/RecipeHero'
import { RecipeInfo } from '@/components/recipes/detail/RecipeInfo'
import { RecipeIngredients } from '@/components/recipes/detail/RecipeIngredients'
import { RecipeInstructions } from '@/components/recipes/detail/RecipeInstructions'
import { RecipeNutrition } from '@/components/recipes/detail/RecipeNutrition'
import { RecipeRelated } from '@/components/recipes/detail/RecipeRelated'
import { RecipeStorage } from '@/components/recipes/detail/RecipeStorage'
import { RecipeTips } from '@/components/recipes/detail/RecipeTips'
import { RecipeVariations } from '@/components/recipes/detail/RecipeVariations'
import { RecipeWhenToUse } from '@/components/recipes/detail/RecipeWhenToUse'
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

  console.log("Rendering recipe page for:", recipe);


// Calcolo di tutti gli ingredienti dai vari gruppi
  const allIngredients = recipe.ingredients.flatMap(group => 
    group.items.map(item => 
      `${item.quantity} ${item.unit || ''} ${item.ingredient}${item.notes ? ` (${item.notes})` : ''}`.trim()
    )
  );

  // Calcolo di tutti i passaggi dalle varie fasi
  const allInstructions = recipe.instructions.flatMap(phase => 
    phase.steps.map(step => ({
      '@type': 'HowToStep',
      text: step.description,
      // Se il singolo step ha una foto, la aggiungiamo allo schema
      image: step.image?.url || undefined 
    }))
  );

// --- LOGICA SCHEMA.ORG POTENZIATA ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    image: recipe.mainImageUrl,
    description: recipe.excerpt,
    datePublished: recipe.publishedAt,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${totalTime}M`,
    recipeYield: `${recipe.servings} porzioni`,
    recipeCategory: recipe.categories?.[0]?.title || 'Pasticceria',
    recipeIngredient: allIngredients,
    recipeInstructions: allInstructions,
    author: {
      '@type': 'Person',
      name: recipe.author?.name || 'Cristian'
    },
    // Dati nutrizionali opzionali
    ...(recipe.nutritionalInfo && {
      nutrition: {
        '@type': 'NutritionInformation',
        calories: recipe.nutritionalInfo.calories ? `${recipe.nutritionalInfo.calories} kcal` : undefined,
        proteinContent: recipe.nutritionalInfo.protein ? `${recipe.nutritionalInfo.protein}g` : undefined,
        fatContent: recipe.nutritionalInfo.fat ? `${recipe.nutritionalInfo.fat}g` : undefined,
        carbohydrateContent: recipe.nutritionalInfo.carbohydrates ? `${recipe.nutritionalInfo.carbohydrates}g` : undefined,
        sugarContent: recipe.nutritionalInfo.sugar ? `${recipe.nutritionalInfo.sugar}g` : undefined,
        fiberContent: recipe.nutritionalInfo.fiber ? `${recipe.nutritionalInfo.fiber}g` : undefined,
      }
    }),
    // Se hai un sistema di tag, li aggiungiamo come keywords
    keywords: recipe.tags?.join(', ')
  };

  // Aggiunta dinamica dei dati nutrizionali se presenti
  if (recipe.nutritionalInfo) {
    jsonLd.nutrition = {
      '@type': 'NutritionInformation',
      calories: `${recipe.nutritionalInfo.calories} calories`,
      fatContent: `${recipe.nutritionalInfo.fat}g`,
      proteinContent: `${recipe.nutritionalInfo.protein}g`,
      carbohydrateContent: `${recipe.nutritionalInfo.carbohydrates}g`,
      sugarContent: `${recipe.nutritionalInfo.sugar}g`,
      fiberContent: `${recipe.nutritionalInfo.fiber}g`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

              {/* Consigli*/}
              {recipe.tips && recipe.tips.length > 0 && (
                <>
                  <RecipeTips tips={recipe.tips} />
                </>

              )}

              {/* Conservazione */}
              {recipe.storage && (
                <RecipeStorage storage={recipe.storage} />
              )}

              {/* Varianti */}
              {recipe.variations && recipe.variations.length > 0 && (
                <RecipeVariations variations={recipe.variations} />
              )}
              {/* Errori comuni */}
              {recipe.commonMistakes && recipe.commonMistakes.length > 0 && (
                <RecipeCommonMistakes mistakes={recipe.commonMistakes} />
              )}

              {/* Quando usarlo */}
              {recipe.whenToUse && recipe.whenToUse.length > 0 && (
                <RecipeWhenToUse whenToUse={recipe.whenToUse} />
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

