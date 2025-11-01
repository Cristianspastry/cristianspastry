'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Wrench, Beaker } from 'lucide-react'
import type { Science } from '@/sanity/lib/types'

interface ScienceRelatedProps {
  article: Science
}

export default function ScienceRelated({ article }: ScienceRelatedProps) {
  const hasRelatedContent =
    (article.relatedRecipes && article.relatedRecipes.length > 0) ||
    (article.relatedTechniques && article.relatedTechniques.length > 0) ||
    (article.relatedScience && article.relatedScience.length > 0)

  if (!hasRelatedContent) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Related Recipes */}
      {article.relatedRecipes && article.relatedRecipes.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Ricette Correlate</h3>
          </div>
          <div className="space-y-2">
            {article.relatedRecipes.map((recipe) => (
              <Link
                key={recipe._id}
                href={`/ricette/${recipe.slug.current}`}
                className="group flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-all hover:border-green-300 hover:bg-green-50"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">
                  {recipe.title}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-green-600" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Techniques */}
      {article.relatedTechniques && article.relatedTechniques.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Tecniche Correlate</h3>
          </div>
          <div className="space-y-2">
            {article.relatedTechniques.map((technique) => (
              <Link
                key={technique._id}
                href={`/tecniche/${technique.slug.current}`}
                className="group flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-all hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                  {technique.title}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Science Articles */}
      {article.relatedScience && article.relatedScience.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="mb-4 flex items-center gap-2">
            <Beaker className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-900">Altri Articoli</h3>
          </div>
          <div className="space-y-2">
            {article.relatedScience.map((science) => (
              <Link
                key={science._id}
                href={`/scienza/${science.slug.current}`}
                className="group flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-all hover:border-orange-300 hover:bg-orange-50"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                  {science.title}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-orange-600" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
