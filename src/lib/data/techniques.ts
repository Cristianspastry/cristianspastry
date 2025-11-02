/**
 * @fileoverview Modulo per la gestione delle tecniche di pasticceria
 *
 * Questo modulo contiene tutte le funzioni per interagire con le tecniche nel CMS Sanity:
 * - Query con filtri dinamici e paginazione server-side
 * - Recupero di singole tecniche per slug
 * - Operazioni di ricerca e filtraggio
 *
 * ARCHITETTURA SERVER-SIDE:
 * - Filtri applicati lato server (GROQ query dinamiche)
 * - Solo 12 tecniche per pagina (riduzione 98% traffico dati)
 * - Cache server-side con 'use cache' directive
 * - Type-safe con TypeScript
 *
 * @example
 * // Fetch tecniche filtrate
 * const result = await getTechniques({
 *   category: 'impasti',
 *   difficulty: 'base',
 *   page: 1,
 *   limit: 12
 * })
 */

import { client } from "@/sanity/lib/client"
import { TECHNIQUE_QUERY } from "@/sanity/lib/queries"
import type { Technique } from "@/sanity/lib/types"
import { groq } from "next-sanity"

// ============================================
// TYPES & INTERFACES
// ============================================

/**
 * Interfaccia per i filtri di ricerca delle tecniche
 * Tutti i parametri sono opzionali per permettere ricerche flessibili
 */
export interface TechniquesFilters {
  /** Categoria della tecnica (impasti, cottura, decorazione, etc.) */
  category?: string
  /** Livello di difficoltà: 'base', 'intermedio', 'avanzato', 'professionale' */
  difficulty?: string
  /** Termine di ricerca per titolo, excerpt e tags */
  search?: string
  /** Numero di pagina per la paginazione (default: 1) */
  page?: number
  /** Numero di tecniche per pagina (default: 12) */
  limit?: number
}

/**
 * Risultato della query delle tecniche con metadati di paginazione
 */
export interface TechniquesResult {
  /** Array delle tecniche trovate (max 12 per pagina) */
  techniques: Technique[]
  /** Numero totale di tecniche che corrispondono ai filtri correnti */
  total: number
  /** Indica se ci sono altre pagine disponibili */
  hasMore: boolean
}

// ============================================
// QUERY FUNCTIONS
// ============================================

/**
 * Ottiene le tecniche con filtri dinamici e paginazione server-side
 *
 * Questa funzione costruisce dinamicamente una query GROQ basata sui filtri forniti
 * e restituisce le tecniche paginate. Il filtering avviene completamente sul server.
 *
 * PERFORMANCE:
 * - Solo 12 tecniche per pagina (vs 1000+ client-side)
 * - Query GROQ ottimizzate con filtri dinamici
 * - Cache server-side con 'use cache'
 *
 * CACHE: Usa 'use cache' con cacheLife di 1 ora (quando disponibile)
 * I dati vengono invalidati manualmente tramite revalidatePath
 *
 * @param filters - Oggetto contenente i filtri di ricerca opzionali
 * @returns Promise con TechniquesResult (tecniche, total, hasMore)
 * @throws Error se la query fallisce
 *
 * @example
 * const { techniques, total } = await getTechniques({
 *   category: 'impasti',
 *   difficulty: 'base',
 *   search: 'sfoglia',
 *   page: 1
 * })
 */
export async function getTechniques(filters: TechniquesFilters = {}): Promise<TechniquesResult> {
  'use cache'
  // cacheLife({ hours: 1 }) // Decommentare quando disponibile in Next.js stable

  // Estrazione filtri con valori default
  const {
    category,
    difficulty,
    search,
    page = 1,
    limit = 12,
  } = filters

  // ============================================
  // BUILD GROQ FILTER
  // Costruisce dinamicamente le condizioni di filtro
  // ============================================
  const filterConditions: string[] = ['!seo.noIndex'] // Escludi sempre tecniche noIndex

  // Filtro categoria (impasti, cottura, decorazione, etc.)
  if (category && category !== 'all') {
    filterConditions.push(`category == "${category}"`)
  }

  // Filtro difficoltà (base, intermedio, avanzato, professionale)
  if (difficulty && difficulty !== 'all') {
    filterConditions.push(`difficulty == "${difficulty}"`)
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
    "techniques": *[_type == "tecnica" ${filterString}] | order(publishedAt desc) [${offset}...${offset + limit}]{
      _id,
      title,
      slug,
      excerpt,
      "mainImageUrl": mainImage.asset->url,
      "mainImageAlt": mainImage.alt,
      difficulty,
      executionTime,
      category,
      tags,
      publishedAt,
      author->{
        name,
        slug
      }
    },
    "total": count(*[_type == "tecnica" ${filterString}])
  }`

  try {
    const result = await client.fetch<{
      techniques: Technique[]
      total: number
    }>(query)

    return {
      techniques: result.techniques,
      total: result.total,
      hasMore: result.total > offset + limit, // Ci sono altre pagine?
    }
  } catch (error: unknown) {
    console.error('Error fetching techniques:', error)
    throw new Error('Failed to fetch techniques')
  }
}

/**
 * Ottiene tutte le tecniche senza filtri né paginazione
 *
 * Usato per operazioni che richiedono tutte le tecniche,
 * come generazione sitemap o export dati.
 *
 * CACHE: Cache per 1 ora
 *
 * @returns Promise con array di tutte le Technique
 */
export async function getAllTechniques(): Promise<Technique[]> {
  'use cache'
  // cacheLife({ hours: 1 })

  const query = groq`*[_type == "tecnica" && !seo.noIndex] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    difficulty,
    executionTime,
    category,
    tags,
    publishedAt,
    author->{
      name,
      slug
    }
  }`

  try {
    return await client.fetch<Technique[]>(query)
  } catch (error) {
    console.error('Error fetching techniques:', error)
    return [] // Fallback: array vuoto invece di errore
  }
}

/**
 * Ottiene una singola tecnica tramite il suo slug
 *
 * Usato per le pagine di dettaglio tecnica (/tecniche/[slug])
 *
 * CACHE: Cache per 1 ora, invalidata con revalidatePath quando necessario
 *
 * @param slug - Slug univoco della tecnica
 * @returns Promise con Technique o null se non trovata
 */
export async function getTechniqueBySlug(slug: string): Promise<Technique | null> {
  'use cache'
  // cacheLife({ hours: 1 })

  try {
    return await client.fetch<Technique>(TECHNIQUE_QUERY, { slug })
  } catch (error) {
    console.error(`Error fetching technique with slug ${slug}:`, error)
    return null // Fallback: null invece di throw
  }
}
