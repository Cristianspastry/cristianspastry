/**
 * Feature: Techniques
 * Tipi TypeScript specifici per il dominio delle tecniche culinarie
 */

import type { Slug, ImageAsset, PortableTextBlock } from '@/core/types'

export type TechniqueDifficulty = 'base' | 'intermedio' | 'avanzato' | 'professionale'

export interface TechniqueCategory {
  _id: string
  name: string
  slug: Slug
  description?: string
}

export interface TechniqueEquipment {
  name: string
  quantity?: number
  unit?: string
  notes?: string
}

export interface TechniqueStep {
  title: string
  content: PortableTextBlock[]
  order: number
  imageUrl?: string
  imageAlt?: string
  videoUrl?: string
  tips?: string[]
}

export interface TechniqueTroubleshooting {
  problem: string
  solution: string
  cause?: string
}

export interface TechniqueVariation {
  title: string
  description: string
  differences: string[]
}

export interface Technique {
  _id: string
  _type: 'technique'
  title: string
  slug: Slug
  excerpt: string
  category?: string
  difficulty?: TechniqueDifficulty
  executionTime?: number
  equipment?: TechniqueEquipment[]
  steps: TechniqueStep[]
  troubleshooting?: TechniqueTroubleshooting[]
  variations?: TechniqueVariation[]
  mainImageUrl?: string
  mainImageAlt?: string
  mainImageLqip?: string
  tags?: string[]
  featured?: boolean
  publishedAt: string
  updatedAt?: string
  relatedRecipes?: string[]
  relatedTechniques?: string[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

export interface TechniquePreview {
  _id: string
  _type: 'technique'
  title: string
  slug: Slug
  excerpt: string
  category?: string
  difficulty?: TechniqueDifficulty
  executionTime?: number
  imageUrl?: string
  imageLqip?: string
  featured?: boolean
  publishedAt: string
}

export interface TechniqueFilters {
  category?: string
  difficulty?: TechniqueDifficulty[]
  executionTimeMax?: number
  search?: string
  featured?: boolean
  tags?: string[]
}

export interface TechniqueResult {
  techniques: Technique[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface TechniqueStats {
  total: number
  byCategory: Record<string, number>
  byDifficulty: Record<TechniqueDifficulty, number>
  avgExecutionTime: number
}
