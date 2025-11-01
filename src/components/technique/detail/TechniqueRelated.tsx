'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Beaker, GraduationCap, Award } from 'lucide-react'
import type { Technique } from '@/sanity/lib/types'

interface TechniqueRelatedProps {
  technique: Technique
}

export default function TechniqueRelated({ technique }: TechniqueRelatedProps) {
  const hasRelatedContent =
    (technique.relatedRecipes && technique.relatedRecipes.length > 0) ||
    (technique.relatedScience && technique.relatedScience.length > 0) ||
    (technique.prerequisiteTechniques && technique.prerequisiteTechniques.length > 0) ||
    (technique.advancedTechniques && technique.advancedTechniques.length > 0)

  if (!hasRelatedContent) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Prerequisite Techniques */}
      {technique.prerequisiteTechniques && technique.prerequisiteTechniques.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Prerequisiti</h3>
          </div>
          <div className="space-y-2">
            {technique.prerequisiteTechniques.map((tech) => (
              <Link
                key={tech._id}
                href={`/tecniche/${tech.slug.current}`}
                className="group flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-all hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                  {tech.title}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Techniques */}
      {technique.advancedTechniques && technique.advancedTechniques.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">Tecniche Avanzate</h3>
          </div>
          <div className="space-y-2">
            {technique.advancedTechniques.map((tech) => (
              <Link
                key={tech._id}
                href={`/tecniche/${tech.slug.current}`}
                className="group flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-all hover:border-purple-300 hover:bg-purple-50"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">
                  {tech.title}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-purple-600" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Recipes */}
      {technique.relatedRecipes && technique.relatedRecipes.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Ricette Correlate</h3>
          </div>
          <div className="space-y-2">
            {technique.relatedRecipes.map((recipe) => (
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

      {/* Related Science */}
      {technique.relatedScience && technique.relatedScience.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="mb-4 flex items-center gap-2">
            <Beaker className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-900">Scienza Correlata</h3>
          </div>
          <div className="space-y-2">
            {technique.relatedScience.map((science) => (
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
