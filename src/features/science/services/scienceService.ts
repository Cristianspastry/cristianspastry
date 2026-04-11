import { sanityClient } from '@/core/lib/clients'
import type { ScienceArticle, SciencePreview, ScienceFilters, ScienceResult } from '../types'

const SCIENCE_PREVIEW_FIELDS = `
  _id,
  _createdAt,
  _updatedAt,
  slug,
  title,
  excerpt,
  mainImageUrl,
  mainImageAlt,
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

const SCIENCE_FULL_FIELDS = `
  ${SCIENCE_PREVIEW_FIELDS},
  content,
  keyTakeaways,
  experiments,
  practicalApplications,
  conclusion,
  references,
  glossary,
  relatedArticles[]->{
    ${SCIENCE_PREVIEW_FIELDS}
  }
`

/**
 * Ottiene gli articoli scientifici con filtri dinamici e paginazione server-side
 */
export async function getScienceArticles(filters: ScienceFilters = {}): Promise<ScienceResult> {
  'use cache'
  
  const {
    articleType,
    complexity,
    search,
    page = 1,
    limit = 12,
  } = filters

  // Costruzione query dinamica
  let filterConditions = ['_type == "scienceArticle"']
  
  if (articleType) {
    filterConditions.push(`articleType == "${articleType}"`)
  }
  
  if (complexity) {
    filterConditions.push(`complexity == "${complexity}"`)
  }
  
  if (search) {
    filterConditions.push(`(title match "${search}*" || excerpt match "${search}*" || tags[] match "${search}*")`)
  }

  const filterQuery = filterConditions.join(' && ')
  const offset = (page - 1) * limit

  // Query per i dati
  const dataQuery = `*[${filterQuery}] | order(publishedAt desc) [${offset}...${offset + limit}] {
    ${SCIENCE_PREVIEW_FIELDS}
  }`

  // Query per il totale
  const countQuery = `count(*[${filterQuery}])`

  const [articles, total] = await Promise.all([
    sanityClient.fetch(dataQuery),
    sanityClient.fetch(countQuery),
  ])

  return {
    articles,
    total,
    hasMore: offset + articles.length < total,
  }
}

/**
 * Ottiene un articolo scientifico specifico per slug
 */
export async function getScienceArticleBySlug(slug: string): Promise<ScienceArticle | null> {
  'use cache'
  
  const query = `*[_type == "scienceArticle" && slug.current == $slug] [0] {
    ${SCIENCE_FULL_FIELDS}
  }`
  
  return await sanityClient.fetch(query, { slug })
}

/**
 * Ottiene tutte le categorie di articoli scientifici
 */
export async function getScienceCategories(): Promise<Array<{ _id: string; title: string; slug: string; emoji?: string }>> {
  'use cache'
  
  const query = `*[_type == "category" && defined(scienceCategories[0]._ref)] | order(title asc) {
    _id,
    title,
    slug,
    emoji
  }`
  
  return await sanityClient.fetch(query)
}

/**
 * Ottiene tutti gli articoli scientifici (per sitemap o export)
 */
export async function getAllScienceArticles(): Promise<ScienceArticle[]> {
  'use cache'
  
  const query = `*[_type == "scienceArticle"] | order(publishedAt asc) {
    ${SCIENCE_FULL_FIELDS}
  }`
  
  return await sanityClient.fetch(query)
}

/**
 * Ottiene articoli scientifici per categoria
 */
export async function getScienceArticlesByCategory(categorySlug: string, limit = 12): Promise<SciencePreview[]> {
  'use cache'
  
  const query = `*[_type == "scienceArticle" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) [0...${limit}] {
    ${SCIENCE_PREVIEW_FIELDS}
  }`
  
  return await sanityClient.fetch(query, { categorySlug })
}
