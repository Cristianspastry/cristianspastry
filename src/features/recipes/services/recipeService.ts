/**
 * Recipe Service
 * 
 * Servizio per la gestione delle operazioni sulle ricette.
 * Centralizza tutte le chiamate dati relative alle ricette.
 */

import { sanityClient } from "@/core/lib/clients"
import type { Category, Recipe, RecipePreview } from "@/core/types"
import { RECIPES_LIST_QUERY, RECIPE_QUERY, RELATED_RECIPES_FALLBACK_QUERY, RECIPES_SAME_CATEGORY_QUERY, CATEGORIES_QUERY, buildRecipesQuery } from "@/sanity/lib/queries"

// Type assertion per buildRecipesQuery
const buildQuery = buildRecipesQuery as (filterString: string, offset: number, limit: number) => string

export interface RecipesFilters {
  category?: string
  difficulty?: string
  maxTime?: number
  search?: string
  page?: number
  limit?: number
}

export interface RecipesResult {
  recipes: Recipe[]
  total: number
  hasMore: boolean
  stats: {
    totalRecipes: number
    avgDifficulty: string
    avgTime: number
    categories: number
  }
}

/**
 * Ottiene lista ricette con filtri e paginazione
 */
export async function getRecipes(filters: RecipesFilters = {}): Promise<RecipesResult> {
  'use cache'
  
  const {
    category,
    difficulty,
    maxTime,
    search,
    page = 1,
    limit = 12,
  } = filters

  const filterConditions: string[] = ['!seo.noIndex']
  
  if (category) {
    filterConditions.push(`"${category}" in categories[]->slug.current`)
  }
  
  if (difficulty) {
    filterConditions.push(`difficulty == "${difficulty}"`)
  }
  
  if (maxTime) {
    filterConditions.push(`(prepTime + cookTime) <= ${maxTime}`)
  }
  
  if (search) {
    filterConditions.push(`(
      title match "*${search}*" ||
      excerpt match "*${search}*" ||
      "${search}" in tags
    )`)
  }

  const filterString = filterConditions.length > 0
    ? `&& ${filterConditions.join(' && ')}`
    : ''

  const offset = (page - 1) * limit
  const query = buildQuery(filterString, offset, limit)

  try {
    const result = await sanityClient.fetch<{
      recipes: Recipe[]
      total: number
      stats: RecipesResult['stats']
    }>(query)

    return {
      recipes: result.recipes,
      total: result.total,
      hasMore: result.total > offset + limit,
      stats: result.stats,
    }
  } catch (error: unknown) {
    console.error('Error fetching recipes:', error)
    throw new Error('Failed to fetch recipes')
  }
}

/**
 * Ottiene una singola ricetta per slug con fallback per ricette correlate
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  'use cache'
  
  try {
    const recipe = await sanityClient.fetch<Recipe>(RECIPE_QUERY, { slug })
    if (!recipe) return null

    if (!recipe.relatedRecipes || recipe.relatedRecipes.length === 0) {
      const categoryIds = recipe.categories?.map(cat => cat._id) || []
      const currentRecipeId = String(recipe._id)
      
      try {
        let fallbackRecipes: RecipePreview[] = []
        
        if (categoryIds.length > 0) {
          const stringCategoryIds = categoryIds.map(id => String(id))
          fallbackRecipes = await sanityClient.fetch<RecipePreview[]>(RECIPES_SAME_CATEGORY_QUERY, {
            currentRecipeId: currentRecipeId,
            categoryIds: stringCategoryIds
          })
        }
        
        if (fallbackRecipes.length < 3) {
          const allRecipes = await sanityClient.fetch<RecipePreview[]>(RELATED_RECIPES_FALLBACK_QUERY, {
            currentRecipeId: currentRecipeId
          })
          
          const existingIds = new Set(fallbackRecipes.map(r => r._id))
          const additionalRecipes = allRecipes.filter(r => !existingIds.has(r._id))
          
          fallbackRecipes = [...fallbackRecipes, ...additionalRecipes].slice(0, 6)
        }
        
        recipe.relatedRecipes = fallbackRecipes
      } catch (fallbackError: unknown) {
        console.error('Error fetching fallback related recipes:', fallbackError)
      }
    }

    return recipe
  } catch (error: unknown) {
    console.error(`Error fetching recipe with slug ${slug}:`, error)
    return null
  }
}

/**
 * Ottiene tutte le categorie disponibili
 */
export async function getRecipeCategories(): Promise<Category[]> {
  'use cache'
  
  try {
    return await sanityClient.fetch<Category[]>(CATEGORIES_QUERY)
  } catch (error: unknown) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Ottiene tutte le ricette (per sitemap, export, etc.)
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  'use cache'
  
  try {
    return await sanityClient.fetch<Recipe[]>(RECIPES_LIST_QUERY)
  } catch (error: unknown) {
    console.error('Error fetching all recipes:', error)
    return []
  }
}

/**
 * Ottiene ricette per categoria specifica
 */
export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  'use cache'
  
  try {
    const query = `*[_type == "recipe" && category == $category] | order(publishedAt desc)`
    return await sanityClient.fetch<Recipe[]>(query, { category })
  } catch (error: unknown) {
    console.error(`Error fetching recipes for category ${category}:`, error)
    return []
  }
}
