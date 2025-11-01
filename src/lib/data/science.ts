import { client } from "@/sanity/lib/client"
import { SCIENCE_LIST_QUERY, SCIENCE_QUERY } from "@/sanity/lib/queries"
import type { Science } from "@/sanity/lib/types"

/**
 * Ottiene tutti gli articoli scientifici
 *
 * CACHE: Cache per 1 ora
 */
export async function getAllScienceArticles(): Promise<Science[]> {
  'use cache'
  // cacheLife({ hours: 1 })

  try {
    return await client.fetch<Science[]>(SCIENCE_LIST_QUERY)
  } catch (error) {
    console.error('Error fetching science articles:', error)
    return []
  }
}

/**
 * Ottiene un singolo articolo scientifico tramite slug
 *
 * CACHE: Cache per 1 ora, invalidata con revalidateScience()
 */
export async function getScienceArticleBySlug(slug: string): Promise<Science | null> {
  'use cache'
  // cacheLife({ hours: 1 })

  try {
    return await client.fetch<Science>(SCIENCE_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching science article with slug ${slug}:`, error)
    return null
  }
} 