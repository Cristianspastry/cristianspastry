/**
 * Feature: Favorites
 * Servizi per la gestione dei preferiti degli utenti
 */

import { sanityClient } from '@/core/lib/clients'
import { CACHE_CONFIG } from '@/core/constants/config'
import type { FavoriteItem, FavoriteFilters, FavoriteResult } from '../types'

/**
 * Ottiene i preferiti di un utente
 */
export async function getUserFavorites(
  userId: string,
  filters: FavoriteFilters = {}
): Promise<FavoriteResult> {
  const { itemType, search, sortBy = 'newest' } = filters

  let filterQuery = `_type == "favorite" && userId == $userId`
  const params: Record<string, unknown> = { userId }

  if (itemType) {
    filterQuery += ' && itemType == $itemType'
    params.itemType = itemType
  }

  if (search) {
    filterQuery += ' && title match $search'
    params.search = `${search}*`
  }

  const orderClause = sortBy === 'newest' 
    ? 'addedAt desc' 
    : sortBy === 'oldest' 
      ? 'addedAt asc' 
      : 'title asc'

  const query = `
    *[${filterQuery}] | order(${orderClause})
    {
      _id,
      userId,
      "itemId": itemId,
      "itemType": itemType,
      title,
      "slug": slug.current,
      "imageUrl": imageUrl,
      category,
      addedAt
    }
  `

  const countQuery = `count(*[${filterQuery}])`

  const [items, total] = await Promise.all([
    sanityClient.fetch<FavoriteItem[]>(query, params, {
      next: { revalidate: CACHE_CONFIG.REVALIDATE_1M },
    }),
    sanityClient.fetch<number>(countQuery, params, {
      next: { revalidate: CACHE_CONFIG.REVALIDATE_30S },
    }),
  ])

  return {
    items: items.map(item => ({
      ...item,
      addedAt: new Date(item.addedAt),
    })),
    total,
    hasMore: false, // Per ora non implementiamo paginazione
  }
}

/**
 * Verifica se un elemento è nei preferiti
 */
export async function isFavorite(
  userId: string,
  itemId: string,
  itemType: 'recipe' | 'technique' | 'science'
): Promise<boolean> {
  const query = `
    count(*[_type == "favorite" && userId == $userId && itemId == $itemId && itemType == $itemType]) > 0
  `

  const result = await sanityClient.fetch<boolean>(query, { userId, itemId, itemType }, {
    next: { revalidate: CACHE_CONFIG.REVALIDATE_30S },
  })

  return result || false
}

/**
 * Aggiunge un elemento ai preferiti
 * Nota: Questa funzione dovrebbe essere chiamata da una API route o server action
 * che gestisce l'autenticazione
 */
export async function addFavorite(
  userId: string,
  itemId: string,
  itemType: 'recipe' | 'technique' | 'science',
  title: string,
  slug: string,
  imageUrl?: string,
  category?: string
): Promise<FavoriteItem> {
  // Verifica se esiste già
  const exists = await isFavorite(userId, itemId, itemType)
  if (exists) {
    throw new Error('Elemento già nei preferiti')
  }

  const doc = {
    _type: 'favorite',
    userId,
    itemId,
    itemType,
    title,
    slug: { current: slug },
    imageUrl,
    category,
    addedAt: new Date().toISOString(),
  }

  // In un ambiente reale, useresti il write client qui
  // Per ora ritorniamo il documento che verrebbe creato
  return {
    _id: `favorite-${userId}-${itemId}`,
    userId,
    itemId,
    itemType,
    title,
    slug,
    imageUrl,
    category,
    addedAt: new Date(),
  }
}

/**
 * Rimuove un elemento dai preferiti
 */
export async function removeFavorite(
  userId: string,
  itemId: string,
  itemType: 'recipe' | 'technique' | 'science'
): Promise<boolean> {
  // In un ambiente reale, useresti il write client qui
  // Per ora simuliamo la rimozione
  return true
}

/**
 * Ottiene statistiche sui preferiti di un utente
 */
export async function getFavoriteStats(userId: string): Promise<{ total: number; byType: Record<string, number> }> {
  const statsQuery = `
    {
      "total": count(*[_type == "favorite" && userId == $userId]),
      "byType": {
        "recipe": count(*[_type == "favorite" && userId == $userId && itemType == "recipe"]),
        "technique": count(*[_type == "favorite" && userId == $userId && itemType == "technique"]),
        "science": count(*[_type == "favorite" && userId == $userId && itemType == "science"])
      }
    }
  `

  return sanityClient.fetch(statsQuery, { userId }, {
    next: { revalidate: CACHE_CONFIG.REVALIDATE_5M },
  })
}

/**
 * Ottiene i preferiti recenti di un utente
 */
export async function getRecentFavorites(
  userId: string,
  limit = 5
): Promise<FavoriteItem[]> {
  const query = `
    *[_type == "favorite" && userId == $userId] | order(addedAt desc)[0...$limit]
    {
      _id,
      userId,
      "itemId": itemId,
      "itemType": itemType,
      title,
      "slug": slug.current,
      "imageUrl": imageUrl,
      category,
      addedAt
    }
  `

  const items = await sanityClient.fetch<FavoriteItem[]>(query, { userId, limit }, {
    next: { revalidate: CACHE_CONFIG.REVALIDATE_2M },
  })

  return (items || []).map(item => ({
    ...item,
    addedAt: new Date(item.addedAt),
  }))
}
