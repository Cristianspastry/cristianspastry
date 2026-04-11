import { sanityClient } from '@/core/lib/clients'

export interface SearchResult {
  _type: 'recipe' | 'technique' | 'scienceArticle'
  _id: string
  slug: string
  title: string
  excerpt?: string
  mainImageUrl?: string
  publishedAt: string
  categories?: Array<{ title: string; emoji?: string }>
}

const BASE_FIELDS = `
  _id,
  slug,
  title,
  excerpt,
  mainImageUrl,
  publishedAt,
  "categories": categories[]->{
    title,
    emoji
  }
`

export async function searchAll(query: string, limit = 20): Promise<SearchResult[]> {
  const groqQuery = `*[_type in ["recipe", "technique", "scienceArticle"] && (
    title match $query || 
    excerpt match $query ||
    content match $query
  )] | order(publishedAt desc) [0...${limit}] {
    _type,
    ${BASE_FIELDS}
  }`
  
  return await sanityClient.fetch(groqQuery, { query: `*${query}*` })
}

export async function searchRecipes(query: string, limit = 10): Promise<SearchResult[]> {
  const groqQuery = `*[_type == "recipe" && (
    title match $query || 
    excerpt match $query ||
    content match $query
  )] | order(publishedAt desc) [0...${limit}] {
    _type,
    ${BASE_FIELDS}
  }`
  
  return await sanityClient.fetch(groqQuery, { query: `*${query}*` })
}

export async function searchTechniques(query: string, limit = 10): Promise<SearchResult[]> {
  const groqQuery = `*[_type == "technique" && (
    title match $query || 
    excerpt match $query
  )] | order(publishedAt desc) [0...${limit}] {
    _type,
    ${BASE_FIELDS}
  }`
  
  return await sanityClient.fetch(groqQuery, { query: `*${query}*` })
}

export async function searchScience(query: string, limit = 10): Promise<SearchResult[]> {
  const groqQuery = `*[_type == "scienceArticle" && (
    title match $query || 
    excerpt match $query ||
    content match $query
  )] | order(publishedAt desc) [0...${limit}] {
    _type,
    ${BASE_FIELDS}
  }`
  
  return await sanityClient.fetch(groqQuery, { query: `*${query}*` })
}
