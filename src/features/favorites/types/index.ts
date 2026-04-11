/**
 * Feature: Favorites
 * Tipi TypeScript per i preferiti degli utenti
 */

export type FavoriteItemType = 'recipe' | 'technique' | 'science'

export interface FavoriteItem {
  _id: string
  userId: string
  itemId: string
  itemType: FavoriteItemType
  title: string
  slug: string
  imageUrl?: string
  category?: string
  addedAt: Date
}

export interface FavoriteFilters {
  itemType?: FavoriteItemType
  search?: string
  sortBy?: 'newest' | 'oldest' | 'title'
}

export interface FavoriteResult {
  items: FavoriteItem[]
  total: number
  hasMore: boolean
}

export interface ToggleFavoriteParams {
  itemId: string
  itemType: FavoriteItemType
}

export interface FavoriteStats {
  total: number
  byType: Record<FavoriteItemType, number>
}
