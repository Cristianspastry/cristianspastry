import { sanityClient } from '@/core/lib/clients'
import type { Technique, TechniquePreview, TechniquesFilters, TechniquesResult } from '../types'

const TECHNIQUE_PREVIEW_FIELDS = `
  _id,
  _createdAt,
  _updatedAt,
  slug,
  title,
  excerpt,
  mainImageUrl,
  mainImageAlt,
  difficulty,
  timeMinutes,
  "categories": categories[]->{
    _id,
    title,
    slug,
    emoji
  },
  author->{
    _id,
    name,
    imageUrl,
    bio
  },
  publishedAt
`

const TECHNIQUE_FULL_FIELDS = `
  ${TECHNIQUE_PREVIEW_FIELDS},
  content,
  equipment,
  keyPoints,
  troubleshooting,
  variations,
  relatedTechniques[]->{
    ${TECHNIQUE_PREVIEW_FIELDS}
  }
`

/**
 * Ottiene le tecniche con filtri dinamici e paginazione server-side
 */
export async function getTechniques(filters: TechniquesFilters = {}): Promise<TechniquesResult> {
  'use cache'
  
  const {
    category,
    difficulty,
    search,
    page = 1,
    limit = 12,
  } = filters

  // Costruzione query dinamica
  let filterConditions = ['_type == "technique"']
  
  if (category) {
    filterConditions.push(`references(*[_type == "category" && slug.current == "${category}"]._id)`)
  }
  
  if (difficulty) {
    filterConditions.push(`difficulty == "${difficulty}"`)
  }
  
  if (search) {
    filterConditions.push(`(title match "${search}*" || excerpt match "${search}*" || tags[] match "${search}*")`)
  }

  const filterQuery = filterConditions.join(' && ')
  const offset = (page - 1) * limit

  // Query per i dati
  const dataQuery = `*[${filterQuery}] | order(publishedAt desc) [${offset}...${offset + limit}] {
    ${TECHNIQUE_PREVIEW_FIELDS}
  }`

  // Query per il totale
  const countQuery = `count(*[${filterQuery}])`

  const [techniques, total] = await Promise.all([
    sanityClient.fetch(dataQuery),
    sanityClient.fetch(countQuery),
  ])

  return {
    techniques,
    total,
    hasMore: offset + techniques.length < total,
  }
}

/**
 * Ottiene una tecnica specifica per slug
 */
export async function getTechniqueBySlug(slug: string): Promise<Technique | null> {
  'use cache'
  
  const query = `*[_type == "technique" && slug.current == $slug] [0] {
    ${TECHNIQUE_FULL_FIELDS}
  }`
  
  return await sanityClient.fetch(query, { slug })
}

/**
 * Ottiene tutte le categorie di tecniche
 */
export async function getTechniqueCategories(): Promise<Array<{ _id: string; title: string; slug: string; emoji?: string }>> {
  'use cache'
  
  const query = `*[_type == "category" && defined(categories[0]._ref)] | order(title asc) {
    _id,
    title,
    slug,
    emoji
  }`
  
  return await sanityClient.fetch(query)
}

/**
 * Ottiene tutte le tecniche (per sitemap o export)
 */
export async function getAllTechniques(): Promise<Technique[]> {
  'use cache'
  
  const query = `*[_type == "technique"] | order(publishedAt asc) {
    ${TECHNIQUE_FULL_FIELDS}
  }`
  
  return await sanityClient.fetch(query)
}

/**
 * Ottiene tecniche per categoria
 */
export async function getTechniquesByCategory(categorySlug: string, limit = 12): Promise<TechniquePreview[]> {
  'use cache'
  
  const query = `*[_type == "technique" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) [0...${limit}] {
    ${TECHNIQUE_PREVIEW_FIELDS}
  }`
  
  return await sanityClient.fetch(query, { categorySlug })
}
