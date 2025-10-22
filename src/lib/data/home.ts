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
 * @returns Promise<Recipe[]>
 */
export async function getFeaturedRecipes(): Promise<Recipe[]> {
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
 * @returns Promise<Technique[]>
 */
export async function getLatestTechniques(): Promise<Technique[]> {
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
 * @returns Promise<Science[]>
 */
export async function getLatestScience(): Promise<Science[]> {
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
 * @returns Promise with all home page data
 */
export async function getHomePageData() {
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