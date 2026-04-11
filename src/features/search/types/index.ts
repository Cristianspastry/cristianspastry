/**
 * Feature: Search
 * Tipi TypeScript per la ricerca globale
 */

import type { RecipePreview } from '@/features/recipes/types'
import type { TechniquePreview } from '@/features/techniques/types'
import type { SciencePreview } from '@/features/science/types'

export type SearchResultType = 'recipe' | 'technique' | 'science'

export interface SearchResultItem {
  type: SearchResultType
  id: string
  title: string
  slug: string
  excerpt?: string
  imageUrl?: string
  imageLqip?: string
  category?: string
  publishedAt: string
  featured?: boolean
  score?: number
}

export interface SearchFilters {
  query: string
  types?: SearchResultType[]
  categories?: string[]
  featuredOnly?: boolean
  limit?: number
  offset?: number
}

export interface SearchResult {
  items: SearchResultItem[]
  total: number
  query: string
  hasMore: boolean
  suggestions?: string[]
}

export interface SearchHistoryItem {
  query: string
  timestamp: number
  count?: number
}

export type UnifiedContent = RecipePreview | TechniquePreview | SciencePreview

export interface UnifiedSearchResult {
  recipes: RecipePreview[]
  techniques: TechniquePreview[]
  sciences: SciencePreview[]
  total: number
  query: string
}
