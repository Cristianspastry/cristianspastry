/**
 * @fileoverview Modulo per la gestione delle ricette e operazioni CRUD
 * 
 * Questo modulo contiene tutte le funzioni per interagire con le ricette nel CMS Sanity:
 * - Query con filtri dinamici e paginazione
 * - Recupero di singole ricette con sistema di fallback per ricette correlate
 * - Gestione delle categorie
 * - Operazioni di ricerca e filtraggio
 * 
 * Tutte le funzioni implementano gestione degli errori robusta e restituiscono
 * valori di fallback appropriati per mantenere una buona UX anche in caso di errori.
 */

import { client } from "@/sanity/lib/client"
import { RECIPES_LIST_QUERY, RECIPE_QUERY, RELATED_RECIPES_FALLBACK_QUERY, RECIPES_SAME_CATEGORY_QUERY, CATEGORIES_QUERY, buildRecipesQuery } from "@/sanity/lib/queries"
import type { Category, Recipe, RecipePreview } from "@/sanity/lib/types"

/**
 * Type assertion per risolvere il problema di inferenza TypeScript
 * La funzione buildRecipesQuery viene erroneamente inferita come error type invece di string
 */
const buildQuery = buildRecipesQuery as (filterString: string, offset: number, limit: number) => string


/**
 * Interfaccia per i filtri di ricerca delle ricette
 * Tutti i campi sono opzionali per permettere ricerche flessibili
 */
export interface RecipesFilters {
  /** Slug della categoria per filtrare per categoria specifica */
  category?: string
  /** Livello di difficoltà: 'facile', 'medio', 'difficile', 'professionale' */
  difficulty?: string
  /** Tempo massimo totale (prepTime + cookTime) in minuti */
  maxTime?: number
  /** Termine di ricerca per titolo, excerpt e tags */
  search?: string
  /** Numero di pagina per la paginazione (default: 1) */
  page?: number
  /** Numero di ricette per pagina (default: 12) */
  limit?: number
}

/**
 * Risultato della query delle ricette con metadati di paginazione e statistiche
 */
export interface RecipesResult {
  /** Array delle ricette trovate */
  recipes: Recipe[]
  /** Numero totale di ricette che corrispondono ai filtri */
  total: number
  /** Indica se ci sono altre pagine disponibili */
  hasMore: boolean
  /** Statistiche aggregate per la dashboard */
  stats: {
    /** Numero totale di ricette nel database */
    totalRecipes: number
    /** Difficoltà media (attualmente non calcolata) */
    avgDifficulty: string
    /** Tempo medio (attualmente non calcolato) */
    avgTime: number
    /** Numero di categorie che hanno ricette */
    categories: number
  }
}


/**
 * Query principale per lista ricette con filtri dinamici e paginazione
 *
 * Questa funzione costruisce dinamicamente una query GROQ basata sui filtri forniti
 * e restituisce le ricette paginate con metadati di paginazione e statistiche.
 *
 * CACHE: Usa 'use cache' con cacheLife di 1 ora per ottimizzare le performance.
 * I dati vengono invalidati manualmente tramite revalidatePath quando necessario.
 *
 * @param filters - Oggetto contenente i filtri di ricerca opzionali
 * @returns Promise che risolve con RecipesResult contenente ricette, totali e statistiche
 */
export async function getRecipes(filters: RecipesFilters = {}): Promise<RecipesResult> {
  'use cache'
  // cacheLife({ hours: 1 }) // Decommentare quando disponibile in Next.js stable
  // Estrai i filtri con valori di default
  const {
    category,      // Slug della categoria
    difficulty,    // Livello di difficoltà
    maxTime,       // Tempo massimo in minuti
    search,        // Termine di ricerca
    page = 1,      // Pagina corrente (default: 1)
    limit = 12,    // Ricette per pagina (default: 12)
  } = filters

  // Costruisci array di condizioni GROQ dinamicamente
  const filterConditions: string[] = ['!seo.noIndex'] // Escludi sempre le ricette marcate come noIndex
  
  // Filtro per categoria: cerca nello slug delle categorie collegate
  if (category) {
    filterConditions.push(`"${category}" in categories[]->slug.current`)
  }
  
  // Filtro per difficoltà: match esatto
  if (difficulty) {
    filterConditions.push(`difficulty == "${difficulty}"`)
  }
  
  // Filtro per tempo massimo: somma prepTime + cookTime
  if (maxTime) {
    filterConditions.push(`(prepTime + cookTime) <= ${maxTime}`)
  }
  
  // Filtro di ricerca: cerca in titolo, excerpt e tags
  // Evita di cercare negli ingredienti per motivi di performance
  if (search) {
    filterConditions.push(`(
      title match "*${search}*" ||
      excerpt match "*${search}*" ||
      "${search}" in tags
    )`)
  }

  // Combina tutte le condizioni con AND
  const filterString = filterConditions.length > 0
    ? `&& ${filterConditions.join(' && ')}`
    : ''

  // Calcola offset per la paginazione (ricette da saltare)
  const offset = (page - 1) * limit

  // Costruisci la query GROQ completa con filtri e paginazione
  const query = buildQuery(filterString, offset, limit)

  try {
    // Esegui la query su Sanity
    const result = await client.fetch<{
      recipes: Recipe[]
      total: number
      stats: RecipesResult['stats']
    }>(query)

    // Restituisci il risultato formattato
    return {
      recipes: result.recipes,
      total: result.total,
      hasMore: result.total > offset + limit, // Calcola se ci sono altre pagine
      stats: result.stats,
    }
  } catch (error: unknown) {
    console.error('Error fetching recipes:', error)
    throw new Error('Failed to fetch recipes')
  }
}

/**
 * Ottiene tutte le categorie disponibili per popolare i filtri
 *
 * Questa funzione viene utilizzata per popolare i dropdown dei filtri
 * nella pagina delle ricette, mostrando tutte le categorie che hanno
 * almeno una ricetta associata.
 *
 * CACHE: Le categorie cambiano raramente, quindi cache con durata lunga.
 *
 * @returns Promise che risolve con array di Category, o array vuoto in caso di errore
 */
export async function getRecipeCategories(): Promise<Category[]> {
  'use cache'
  // cacheLife({ days: 1 }) // Cache per 1 giorno
  try {
    return await client.fetch<Category[]>(CATEGORIES_QUERY)
  } catch (error: unknown) {
    console.error('Error fetching categories:', error)
    return [] // Restituisci array vuoto invece di lanciare errore per UX migliore
  }
}

/**
 * Ottiene tutte le ricette senza filtri per scopi di backup o export
 *
 * Questa funzione è utile per operazioni che richiedono tutte le ricette,
 * come generazione di sitemap, export dati, o operazioni di amministrazione.
 *
 * CACHE: Cache per 1 ora, invalidata quando si pubblica una nuova ricetta.
 *
 * @returns Promise che risolve con array di Recipe, o array vuoto in caso di errore
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  'use cache'
  // cacheLife({ hours: 1 })
  try {
    return await client.fetch<Recipe[]>(RECIPES_LIST_QUERY)
  } catch (error: unknown) {
    console.error('Error fetching recipes:', error)
    return [] // Restituisci array vuoto invece di lanciare errore per UX migliore
  }
}

/**
 * Ottiene una singola ricetta tramite il suo slug con sistema di fallback per ricette correlate
 *
 * Questa funzione implementa un sistema intelligente di ricette correlate:
 * 1. Prima cerca ricette della stessa categoria
 * 2. Se non ne trova abbastanza, completa con ricette recenti
 * 3. Evita duplicati e limita a 6 ricette correlate
 *
 * CACHE: Cache per 1 ora. Questa è la pagina più visitata, quindi la cache è cruciale.
 * Viene invalidata quando la ricetta viene aggiornata tramite revalidatePath.
 *
 * @param slug - Slug univoco della ricetta da recuperare
 * @returns Promise che risolve con Recipe completa o null se non trovata
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  'use cache'
  // cacheLife({ hours: 1 })
  try {
    // Recupera la ricetta principale
    const recipe = await client.fetch<Recipe>(RECIPE_QUERY, { slug })
    if(!recipe) return null

    // Sistema di fallback per ricette correlate se non sono specificate
    if (!recipe.relatedRecipes || recipe.relatedRecipes.length === 0) {
      const categoryIds = recipe.categories?.map(cat => cat._id) || []
      const currentRecipeId = String(recipe._id)
      
      try {
        let fallbackRecipes: RecipePreview[] = []
        
        // STEP 1: Cerca ricette della stessa categoria (priorità alta)
        if (categoryIds.length > 0) {
          const stringCategoryIds = categoryIds.map(id => String(id))
          fallbackRecipes = await client.fetch<RecipePreview[]>(RECIPES_SAME_CATEGORY_QUERY, {
            currentRecipeId: currentRecipeId,
            categoryIds: stringCategoryIds
          })
        }
        
        // STEP 2: Se non trova abbastanza ricette della categoria, completa con ricette recenti
        if (fallbackRecipes.length < 3) {
          const allRecipes = await client.fetch<RecipePreview[]>(RELATED_RECIPES_FALLBACK_QUERY, {
            currentRecipeId: currentRecipeId
          })
          
          // Combina evitando duplicati usando Set per performance
          const existingIds = new Set(fallbackRecipes.map(r => r._id))
          const additionalRecipes = allRecipes.filter(r => !existingIds.has(r._id))
          
          // Limita a 6 ricette correlate totali
          fallbackRecipes = [...fallbackRecipes, ...additionalRecipes].slice(0, 6)
        }
        
        // Aggiorna la ricetta con le ricette correlate trovate
        recipe.relatedRecipes = fallbackRecipes
      } catch (fallbackError: unknown) {
        console.error('Error fetching fallback related recipes:', fallbackError)
        // Se il fallback fallisce, lascia relatedRecipes vuoto (non blocca la ricetta principale)
      }
    }

    // Restituisci la ricetta completa
    return {
      ...recipe,
    }

  } catch (error: unknown) {
    console.error(`Error fetching recipe with slug ${slug}:`, error)
    return null
  }
}

/**
 * Ottiene tutte le ricette di una categoria specifica
 *
 * Questa funzione è utilizzata per le pagine di categoria e per
 * operazioni che richiedono tutte le ricette di una categoria specifica.
 *
 * CACHE: Cache per 1 ora, invalidata quando si aggiungono ricette alla categoria.
 *
 * @param category - Slug della categoria per cui recuperare le ricette
 * @returns Promise che risolve con array di Recipe, o array vuoto in caso di errore
 */
export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  'use cache'
  // cacheLife({ hours: 1 })
  try {
    // Query GROQ semplice per ricette di una categoria specifica
    const query = `*[_type == "recipe" && category == $category] | order(publishedAt desc)`
    return await client.fetch<Recipe[]>(query, { category })
  } catch (error: unknown) {
    console.error(`Error fetching recipes for category ${category}:`, error)
    return [] // Restituisci array vuoto invece di lanciare errore per UX migliore
  }
}