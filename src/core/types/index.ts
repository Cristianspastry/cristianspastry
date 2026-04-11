/**
 * Core Types - Tipi TypeScript condivisi in tutto il progetto
 * 
 * Questo file centralizza i tipi fondamentali utilizzati da tutte le feature.
 * I tipi specifici di dominio dovrebbero essere definiti nelle rispettive feature.
 */

// ============================================
// TIPI BASE COMUNI
// ============================================

export interface Slug {
  current: string;
}

export interface ImageAsset {
  url: string;
  alt?: string;
  caption?: string;
  lqip?: string;
  metadata?: any;
}

export interface PortableTextBlock {
  _type: string;
  _key: string;
  value?: any;
  children?: any[];
}

// ============================================
// SEO SHARED TYPES
// ============================================

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyphrase?: string;
  synonyms?: string[];
  ogImageUrl?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

// ============================================
// AUTHOR (Condiviso tra Recipes, Techniques, Science)
// ============================================

export interface Author {
  _id: string;
  name: string;
  slug: Slug;
  imageUrl: string;
  imageLqip?: string;
  imageAlt: string;
  bio: PortableTextBlock[];
  role?: string;
  expertise?: string[];
  social?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    website?: string;
    twitter?: string;
  };
  email?: string;
  recipeCount?: number;
  techniqueCount?: number;
  scienceCount?: number;
}

// ============================================
// CATEGORY (Condiviso tra Recipes, Techniques)
// ============================================

export interface Category {
  _id: string | number;
  title: string;
  emoji: string;
  featured?: boolean;
  slug: Slug;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  color?: string;
  recipeCount?: number;
}

// ============================================
// PAGINATION & FILTERING
// ============================================

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface BaseFilters extends PaginationParams {
  search?: string;
  category?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiError {
  error: string;
  message?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

// ============================================
// RESULT TYPES PER LISTE
// ============================================

export interface ListResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  page: number;
  limit: number;
}
