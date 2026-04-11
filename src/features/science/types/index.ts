/**
 * Feature: Science
 * Tipi TypeScript specifici per il dominio della scienza alimentare
 */

import type { Slug, PortableTextBlock } from '@/core/types'

export type ScienceArticleType = 
  | 'ingredienti'
  | 'processi'
  | 'reazioni'
  | 'fisica'
  | 'dietro-quinte'
  | 'miti'
  | 'storia'

export type ScienceComplexity = 'base' | 'intermedio' | 'avanzato'

export interface ScienceSection {
  title: string
  content: PortableTextBlock[]
  order: number
  imageUrl?: string
  imageAlt?: string
}

export interface ScienceExperiment {
  title: string
  description: string
  materials: string[]
  steps: string[]
  explanation: string
  safetyNotes?: string[]
}

export interface ScienceReference {
  title: string
  authors?: string[]
  year?: number
  url?: string
  doi?: string
}

export interface Science {
  _id: string
  _type: 'science'
  title: string
  slug: Slug
  excerpt: string
  articleType: ScienceArticleType
  complexity?: ScienceComplexity
  readingTime?: number
  sections: ScienceSection[]
  experiments?: ScienceExperiment[]
  references?: ScienceReference[]
  mainImageUrl?: string
  mainImageAlt?: string
  mainImageLqip?: string
  tags?: string[]
  featured?: boolean
  publishedAt: string
  updatedAt?: string
  relatedArticles?: string[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

export interface SciencePreview {
  _id: string
  _type: 'science'
  title: string
  slug: Slug
  excerpt: string
  articleType: ScienceArticleType
  complexity?: ScienceComplexity
  readingTime?: number
  imageUrl?: string
  imageLqip?: string
  featured?: boolean
  publishedAt: string
}

export interface ScienceFilters {
  articleType?: ScienceArticleType[]
  complexity?: ScienceComplexity[]
  readingTimeMax?: number
  search?: string
  featured?: boolean
  tags?: string[]
}

export interface ScienceResult {
  articles: Science[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface ScienceStats {
  total: number
  byType: Record<ScienceArticleType, number>
  byComplexity: Record<ScienceComplexity, number>
  avgReadingTime: number
}
