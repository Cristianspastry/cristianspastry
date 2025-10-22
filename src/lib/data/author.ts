import { client } from "@/sanity/lib/client"
import { AUTHOR_QUERY } from "@/sanity/lib/queries"
import type { Author } from "@/sanity/lib/types"

export async function getAuthor(): Promise<Author | null> {
  try {
    return await client.fetch<Author>(AUTHOR_QUERY)
  } catch (error) {
    console.error('Error fetching author:', error)
    return null
  }
}