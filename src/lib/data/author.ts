import { client } from "@/sanity/lib/client"
import { AUTHOR_QUERY } from "@/sanity/lib/queries"
import type { Author } from "@/sanity/lib/types"

/**
 * Ottiene i dati dell'autore
 *
 * CACHE: Cache per 1 giorno - i dati dell'autore cambiano raramente
 */
export async function getAuthor(): Promise<Author | null> {
  'use cache'
  // cacheLife({ days: 1 })

  try {
    return await client.fetch<Author>(AUTHOR_QUERY)
  } catch (error) {
    console.error('Error fetching author:', error)
    return null
  }
}