/**
 * Recipe Types - Tipi specifici per il dominio Recipes
 */

import type { Author, Category, SEO, InstructionPhase, IngredientGroup, PortableTextBlock } from '@/core/types';

export interface TechniquePreview {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  imageUrl?: string;
}

export interface SciencePreview {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  imageUrl?: string;
}

export interface RecipePreview {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  imageUrl: string;
  imageLqip?: string;
  imageAlt?: string;
  categories?: Category[];
  difficulty: string;
  prepTime: number;
  publishedAt: string;
}

export interface NutritionalInfo {
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
}

export interface Recipe {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImageUrl: string;
  mainImageLqip?: string;
  mainImageAlt: string;
  mainImageCaption?: string;
  mainImageMetadata?: any;
  difficulty: 'facile' | 'media' | 'difficile' | 'professionale';
  prepTime: number;
  cookTime: number;
  restTime?: number;
  servings: number;
  panSize?: number;
  categories: Category[];
  tags?: string[];
  ingredients: IngredientGroup[];
  instructions: InstructionPhase[];
  tips?: PortableTextBlock[];
  storage?: string;
  variations?: PortableTextBlock[];
  commonMistakes?: PortableTextBlock[];
  whenToUse?: PortableTextBlock[];
  relatedTechniques?: TechniquePreview[];
  relatedScience?: SciencePreview[];
  relatedRecipes?: RecipePreview[];
  publishedAt: string;
  author: Author;
  nutritionalInfo?: NutritionalInfo;
  seo: SEO;
  featured: boolean;
}

export interface RecipeFilters {
  category?: string;
  difficulty?: string;
  maxTime?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface RecipeStats {
  totalRecipes: number;
  avgDifficulty: string;
  avgTime: number;
  categories: number;
}

export interface RecipeResult {
  recipes: Recipe[];
  total: number;
  hasMore: boolean;
  stats: RecipeStats;
}
