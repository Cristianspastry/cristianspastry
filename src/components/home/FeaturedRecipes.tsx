'use client'

import { motion } from 'framer-motion'
import type { Recipe } from '@/sanity/lib/types'
import RecipeCard from '../recipes/RecipeCard'

interface FeaturedRecipesProps {
  recipes: Recipe[]
}

export function FeaturedRecipes({ recipes }: FeaturedRecipesProps) {
  if (!recipes || recipes.length === 0) return null

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-900 md:text-4xl">
            Ricette in Evidenza
          </h2>
          <p className="text-gray-600">
            Le nostre creazioni più amate dalla community
          </p>
        </div>

        {/* Griglia principale - rimuovi il motion.div wrapper e usa direttamente la griglia */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
            <RecipeCard key={recipe._id} recipe={recipe} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}