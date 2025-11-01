'use client'

import Link from 'next/link'
import { BookOpen, Wrench, Beaker, ArrowRight } from 'lucide-react'
import RecipeCard from '@/components/recipes/list/RecipeCard'
import { TechniqueCard } from '@/components/technique/list/TechniqueCard'
import { ScienceCard } from '@/components/science/list/ScienceCard'

interface AboutContentProps {
  content: {
    recipes?: any[]
    techniques?: any[]
    science?: any[]
  }
}

export default function AboutContent({ content }: AboutContentProps) {
  const hasContent =
    (content.recipes && content.recipes.length > 0) ||
    (content.techniques && content.techniques.length > 0) ||
    (content.science && content.science.length > 0)

  if (!hasContent) {
    return null
  }

  return (
    <section className="space-y-12">
      <h2 className="text-center text-3xl font-bold text-gray-900">
        I Miei Contenuti
      </h2>

      {/* Recipes */}
      {content.recipes && content.recipes.length > 0 && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Le Mie Ricette</h3>
            </div>
            <Link
              href="/ricette"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
            >
              <span>Vedi tutte</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.recipes.slice(0, 3).map((recipe, index) => (
              <RecipeCard key={recipe._id} recipe={recipe} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Techniques */}
      {content.techniques && content.techniques.length > 0 && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Le Mie Tecniche</h3>
            </div>
            <Link
              href="/tecniche"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <span>Vedi tutte</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.techniques.slice(0, 3).map((technique, index) => (
              <TechniqueCard key={technique._id} technique={technique} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Science Articles */}
      {content.science && content.science.length > 0 && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Beaker className="h-6 w-6 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-900">I Miei Articoli</h3>
            </div>
            <Link
              href="/scienza"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
            >
              <span>Vedi tutti</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.science.slice(0, 3).map((article, index) => (
              <ScienceCard key={article._id} article={article} index={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
