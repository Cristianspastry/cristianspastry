import { client } from "@/sanity/lib/client"
import { SCIENCE_LIST_QUERY, SCIENCE_QUERY } from "@/sanity/lib/queries"
import type { Science } from "@/sanity/lib/types"

export async function getAllScienceArticles(): Promise<Science[]> {
  try {
    return await client.fetch<Science[]>(SCIENCE_LIST_QUERY)
  } catch (error) {
    console.error('Error fetching science articles:', error)
    return []
  }
}

export async function getScienceArticleBySlug(slug: string): Promise<Science | null> {
  try {
    return await client.fetch<Science>(SCIENCE_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching science article with slug ${slug}:`, error)
    return null
  }
} 