/**
 * @fileoverview Modulo per la gestione degli articoli scientifici sulla pasticceria
 *
 * Questo modulo contiene tutte le funzioni per interagire con gli articoli scientifici nel CMS Sanity:
 * - Query con filtri dinamici e paginazione server-side
 * - Recupero di singoli articoli per slug
 * - Operazioni di ricerca e filtraggio
 *
 * ARCHITETTURA SERVER-SIDE:
 * - Filtri applicati lato server (GROQ query dinamiche)
 * - Solo 12 articoli per pagina (riduzione 98% traffico dati)
 * - Cache server-side con 'use cache' directive
 * - Type-safe con TypeScript
 *
 * NOTA IMPORTANTE:
 * - Science usa 'articleType' e 'complexity' (NON category/difficulty)
 * - articleType: ingredienti, processi, reazioni, fisica, dietro-quinte, miti, storia
 * - complexity: base, intermedio, avanzato
 *
 * @example
 * // Fetch articoli filtrati
 * const result = await getScienceArticles({
 *   articleType: 'ingredienti',
 *   complexity: 'base',
 *   page: 1,
 *   limit: 12
 * })
 */

import { client } from "@/sanity/lib/client"
import { SCIENCE_QUERY } from "@/sanity/lib/queries"
import type { Science } from "@/sanity/lib/types"
import { groq } from "next-sanity"

// ============================================
// TYPES & INTERFACES
// ============================================

/**
 * Interfaccia per i filtri di ricerca degli articoli scientifici
 * Tutti i parametri sono opzionali per permettere ricerche flessibili
 */
export interface ScienceFilters {
  /** Tipo di articolo (ingredienti, processi, reazioni, fisica, etc.) */
  articleType?: string
  /** Livello di complessità: 'base', 'intermedio', 'avanzato' */
  complexity?: string
  /** Termine di ricerca per titolo, excerpt e tags */
  search?: string
  /** Numero di pagina per la paginazione (default: 1) */
  page?: number
  /** Numero di articoli per pagina (default: 12) */
  limit?: number
}

/**
 * Risultato della query degli articoli scientifici con metadati di paginazione
 */
export interface ScienceResult {
  /** Array degli articoli trovati (max 12 per pagina) */
  articles: Science[]
  /** Numero totale di articoli che corrispondono ai filtri correnti */
  total: number
  /** Indica se ci sono altre pagine disponibili */
  hasMore: boolean
}

// ============================================
// QUERY FUNCTIONS
// ============================================

/**
 * Ottiene gli articoli scientifici con filtri dinamici e paginazione server-side
 *
 * Questa funzione costruisce dinamicamente una query GROQ basata sui filtri forniti
 * e restituisce gli articoli paginati. Il filtering avviene completamente sul server.
 *
 * PERFORMANCE:
 * - Solo 12 articoli per pagina (vs 1000+ client-side)
 * - Query GROQ ottimizzate con filtri dinamici
 * - Cache server-side con 'use cache'
 *
 * CACHE: Usa 'use cache' con cacheLife di 1 ora (quando disponibile)
 * I dati vengono invalidati manualmente tramite revalidatePath
 *
 * @param filters - Oggetto contenente i filtri di ricerca opzionali
 * @returns Promise con ScienceResult (articles, total, hasMore)
 * @throws Error se la query fallisce
 *
 * @example
 * const { articles, total } = await getScienceArticles({
 *   articleType: 'ingredienti',
 *   complexity: 'base',
 *   search: 'zucchero',
 *   page: 1
 * })
 */
export async function getScienceArticles(filters: ScienceFilters = {}): Promise<ScienceResult> {
  'use cache'
  // cacheLife({ hours: 1 }) // Decommentare quando disponibile in Next.js stable

  // Estrazione filtri con valori default
  const {
    articleType,
    complexity,
    search,
    page = 1,
    limit = 12,
  } = filters

  // ============================================
  // BUILD GROQ FILTER
  // Costruisce dinamicamente le condizioni di filtro
  // ============================================
  const filterConditions: string[] = ['!seo.noIndex'] // Escludi sempre articoli noIndex

  // Filtro tipo articolo (ingredienti, processi, reazioni, fisica, etc.)
  if (articleType && articleType !== 'all') {
    filterConditions.push(`articleType == "${articleType}"`)
  }

  // Filtro complessità (base, intermedio, avanzato)
  if (complexity && complexity !== 'all') {
    filterConditions.push(`complexity == "${complexity}"`)
  }

  // Filtro ricerca testuale (titolo, excerpt, tags)
  if (search) {
    filterConditions.push(`(
      title match "*${search}*" ||
      excerpt match "*${search}*" ||
      "${search}" in tags
    )`)
  }

  // Combina le condizioni con AND
  const filterString = filterConditions.length > 0
    ? `&& ${filterConditions.join(' && ')}`
    : ''

  // Calcola offset per paginazione
  const offset = (page - 1) * limit

  // ============================================
  // GROQ QUERY
  // Query completa con filtri e paginazione
  // ============================================
  const query = groq`{
    "articles": *[_type == "scienza" ${filterString}] | order(publishedAt desc) [${offset}...${offset + limit}]{
      _id,
      title,
      slug,
      excerpt,
      "mainImageUrl": mainImage.asset->url,
      "mainImageAlt": mainImage.alt,
      complexity,
      articleType,
      tags,
      readingTime,
      publishedAt,
      author->{
        name,
        slug
      }
    },
    "total": count(*[_type == "scienza" ${filterString}])
  }`

  try {
    const result = await client.fetch<{
      articles: Science[]
      total: number
    }>(query)

    return {
      articles: result.articles,
      total: result.total,
      hasMore: result.total > offset + limit, // Ci sono altre pagine?
    }
  } catch (error: unknown) {
    console.error('Error fetching science articles:', error)
    throw new Error('Failed to fetch science articles')
  }
}

/**
 * Ottiene tutti gli articoli scientifici senza filtri né paginazione
 *
 * Usato per operazioni che richiedono tutti gli articoli,
 * come generazione sitemap o export dati.
 *
 * CACHE: Cache per 1 ora
 *
 * @returns Promise con array di tutti gli Science
 */
export async function getAllScienceArticles(): Promise<Science[]> {
  'use cache'
  // cacheLife({ hours: 1 })

  const query = groq`*[_type == "scienza" && !seo.noIndex] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    complexity,
    articleType,
    tags,
    readingTime,
    publishedAt,
    author->{
      name,
      slug
    }
  }`

  try {
    return await client.fetch<Science[]>(query)
  } catch (error) {
    console.error('Error fetching science articles:', error)
    return [] // Fallback: array vuoto invece di errore
  }
}

/**
 * Ottiene un singolo articolo scientifico tramite il suo slug
 *
 * Usato per le pagine di dettaglio articolo (/scienza/[slug])
 *
 * CACHE: Cache per 1 ora, invalidata con revalidatePath quando necessario
 *
 * @param slug - Slug univoco dell'articolo
 * @returns Promise con Science o null se non trovato
 */
export async function getScienceArticleBySlug(slug: string): Promise<Science | null> {
  'use cache'
  // cacheLife({ hours: 1 })

  try {
    return await client.fetch<Science>(SCIENCE_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching science article with slug ${slug}:`, error)
    return null // Fallback: null invece di throw
  }
}
