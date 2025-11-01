import { client } from "@/sanity/lib/client"
import { 
  CATEGORIES_QUERY, 
  CATEGORY_QUERY, 
  RECIPES_BY_CATEGORY_QUERY,
  HOMEPAGE_QUERY 
} from "@/sanity/lib/queries"
import type { Category, Recipe } from "@/sanity/lib/types"

/**
 * Ottiene tutte le categorie con il conteggio delle ricette
 *
 * CACHE: Cache per 1 giorno - le categorie cambiano raramente
 */
export async function getAllCategories(): Promise<Category[]> {
  'use cache'
  // cacheLife({ days: 1 })

  try {
    return await client.fetch<Category[]>(CATEGORIES_QUERY)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Ottiene una singola categoria tramite slug
 *
 * CACHE: Cache per 1 giorno
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  'use cache'
  // cacheLife({ days: 1 })

  try {
    const category = await client.fetch<Category>(CATEGORY_QUERY, { slug })
    return category || null
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error)
    return null
  }
}

/**
 * Ottiene tutte le ricette di una specifica categoria
 *
 * CACHE: Cache per 1 ora
 */
export async function getRecipesByCategory(categorySlug: string): Promise<Recipe[]> {
  'use cache'
  // cacheLife({ hours: 1 })

  try {
    return await client.fetch<Recipe[]>(RECIPES_BY_CATEGORY_QUERY, { slug: categorySlug })
  } catch (error) {
    console.error(`Error fetching recipes for category ${categorySlug}:`, error)
    return []
  }
}

/**
 * Ottiene le categorie in evidenza per la homepage (prime 8)
 *
 * CACHE: Cache per 1 giorno
 */
export async function getFeaturedCategories(): Promise<Category[]> {
  'use cache'
  // cacheLife({ days: 1 })

  try {
    const homepageData = await client.fetch<{ categories: Category[] }>(HOMEPAGE_QUERY)
    return homepageData.categories || []
  } catch (error) {
    console.error('Error fetching featured categories:', error)
    return []
  }
}

/**
 * Ottiene le categorie con conteggio delle ricette (versione ottimizzata)
 *
 * CACHE: Eredita cache da getAllCategories()
 */
export async function getCategoriesWithCounts(): Promise<Category[]> {
  'use cache'
  // cacheLife({ days: 1 })

  try {
    const categories = await client.fetch<Category[]>(CATEGORIES_QUERY)
    return categories.sort((a, b) => (b.recipeCount ?? 0) - (a.recipeCount ?? 0))
  } catch (error) {
    console.error('Error fetching categories with counts:', error)
    return []
  }
}

/**
 * Ottiene le categorie più popolari (con più ricette)
 *
 * CACHE: Eredita cache da getAllCategories()
 */
export async function getPopularCategories(limit = 6): Promise<Category[]> {
  'use cache'
  // cacheLife({ days: 1 })

  try {
    const categories = await getAllCategories()
    return categories
      .filter(category => (category.recipeCount ?? 0) > 0)
      .sort((a, b) => (b.recipeCount ?? 0) - (a.recipeCount ?? 0))
      .slice(0, limit)
  } catch (error) {
    console.error('Error fetching popular categories:', error)
    return []
  }
}

/**
 * Verifica se una categoria esiste tramite slug
 */
export async function categoryExists(slug: string): Promise<boolean> {
  try {
    const category = await getCategoryBySlug(slug)
    return category !== null
  } catch (error) {
    console.error(`Error checking if category exists ${slug}:`, error)
    return false
  }
}

/**
 * Ottiene le statistiche delle categorie
 */
export async function getCategoryStats(): Promise<{
  totalCategories: number
  totalRecipes: number
  averageRecipesPerCategory: number
  mostPopularCategory?: Category
}> {
  try {
    const categories = await getAllCategories()
    const totalCategories = categories.length
    const totalRecipes = categories.reduce((sum, cat) => sum + (cat.recipeCount ?? 0), 0)
    const averageRecipesPerCategory = totalCategories > 0 ? totalRecipes / totalCategories : 0
    const mostPopularCategory = categories.reduce((max, cat) => 
      (cat.recipeCount ?? 0) > (max?.recipeCount ?? 0) ? cat : max, 
      categories[0]
    )

    return {
      totalCategories,
      totalRecipes,
      averageRecipesPerCategory: Math.round(averageRecipesPerCategory * 100) / 100,
      mostPopularCategory: mostPopularCategory?.recipeCount ? mostPopularCategory : undefined
    }
  } catch (error) {
    console.error('Error fetching category stats:', error)
    return {
      totalCategories: 0,
      totalRecipes: 0,
      averageRecipesPerCategory: 0
    }
  }
}
