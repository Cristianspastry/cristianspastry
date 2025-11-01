// lib/data/home.ts
// ============================================
// DATA FETCHING FUNCTIONS - HOME PAGE
// ============================================

import { client } from "@/sanity/lib/client"
import {
  RECIPES_LIST_QUERY,
  SCIENCE_LIST_QUERY,
  TECHNIQUES_LIST_QUERY,
} from "@/sanity/lib/queries"
import type { Recipe, Science, Technique } from "@/sanity/lib/types"

const START = 0
const END = 6 // Mostra 6 items per sezione

/**
 * Fetches featured recipes for the home page
 *
 * CACHE: Cache per 1 ora - homepage visitata frequentemente
 *
 * @returns Promise<Recipe[]>
 */
export async function getFeaturedRecipes(): Promise<Recipe[]> {
  'use cache'
  // cacheLife({ hours: 1 })

  try {
    return await client.fetch<Recipe[]>(RECIPES_LIST_QUERY, {
      start: START,
      end: END,
    })
  } catch (error) {
    console.error('Error fetching featured recipes:', error)
    return []
  }
}

/**
 * Fetches latest techniques for the home page
 *
 * CACHE: Cache per 1 ora
 *
 * @returns Promise<Technique[]>
 */
export async function getLatestTechniques(): Promise<Technique[]> {
  'use cache'
  // cacheLife({ hours: 1 })

  try {
    return await client.fetch<Technique[]>(TECHNIQUES_LIST_QUERY, {
      start: START,
      end: END,
    })
  } catch (error) {
    console.error('Error fetching latest techniques:', error)
    return []
  }
}

/**
 * Fetches latest science articles for the home page
 *
 * CACHE: Cache per 1 ora
 *
 * @returns Promise<Science[]>
 */
export async function getLatestScience(): Promise<Science[]> {
  'use cache'
  // cacheLife({ hours: 1 })

  try {
    return await client.fetch<Science[]>(SCIENCE_LIST_QUERY, {
      start: START,
      end: END,
    })
  } catch (error) {
    console.error('Error fetching latest science:', error)
    return []
  }
}

/**
 * Fetches all home page data in parallel
 *
 * CACHE: Eredita la cache dalle singole funzioni chiamate
 *
 * @returns Promise with all home page data
 */
export async function getHomePageData() {
  'use cache'
  // cacheLife({ hours: 1 })
  const [featuredRecipes, latestTechniques, latestScience] = await Promise.all([
    getFeaturedRecipes(),
    getLatestTechniques(),
    getLatestScience(),
  ])

  return {
    featuredRecipes,
    latestTechniques,
    latestScience,
  }
}