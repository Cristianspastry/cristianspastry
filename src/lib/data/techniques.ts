import { client } from "@/sanity/lib/client"
import { TECHNIQUES_LIST_QUERY, TECHNIQUE_QUERY } from "@/sanity/lib/queries"
import type { Technique } from "@/sanity/lib/types"

export async function getAllTechniques(): Promise<Technique[]> {
  try {
    return await client.fetch<Technique[]>(TECHNIQUES_LIST_QUERY)
  } catch (error) {
    console.error('Error fetching techniques:', error)
    return []
  }
}

export async function getTechniqueBySlug(slug: string): Promise<Technique | null> {
  try {
    return await client.fetch<Technique>(TECHNIQUE_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching technique with slug ${slug}:`, error)
    return null
  }
}