import { client } from "@/sanity/lib/client"
import { RECIPES_LIST_QUERY, RECIPE_DETAIL_QUERY, RECIPE_QUERY } from "@/sanity/lib/queries"
import type { Recipe } from "@/sanity/lib/types"

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    return await client.fetch<Recipe[]>(RECIPES_LIST_QUERY)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const recipe = await client.fetch<Recipe>(RECIPE_QUERY, { slug })
    if(!recipe) return null

      // Trasforma i dati per compatibilità
    return {
      ...recipe,
      //mainImageUrl : recipe.mainImageUrl ?? '',
      //mainImageAlt : recipe.mainImageAlt || recipe.title
    }

  } catch (error) {
    console.error(`Error fetching recipe with slug ${slug}:`, error)
    return null
  }
}

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  try {
    const query = `*[_type == "recipe" && category == $category] | order(publishedAt desc)`
    return await client.fetch<Recipe[]>(query, { category })
  } catch (error) {
    console.error(`Error fetching recipes for category ${category}:`, error)
    return []
  }
}