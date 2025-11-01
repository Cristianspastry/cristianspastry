import { client } from "@/sanity/lib/client"
import { TECHNIQUES_LIST_QUERY, TECHNIQUE_QUERY } from "@/sanity/lib/queries"
import type { Technique } from "@/sanity/lib/types"

/**
 * Ottiene tutte le tecniche
 *
 * CACHE: Cache per 1 ora
 */
export async function getAllTechniques(): Promise<Technique[]> {
  'use cache'
  // cacheLife({ hours: 1 })

  try {
    return await client.fetch<Technique[]>(TECHNIQUES_LIST_QUERY)
  } catch (error) {
    console.error('Error fetching techniques:', error)
    return []
  }
}

/**
 * Ottiene una singola tecnica tramite slug
 *
 * CACHE: Cache per 1 ora, invalidata con revalidateTechnique()
 */
export async function getTechniqueBySlug(slug: string): Promise<Technique | null> {
  'use cache'
  // cacheLife({ hours: 1 })

  try {
    return await client.fetch<Technique>(TECHNIQUE_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching technique with slug ${slug}:`, error)
    return null
  }
}