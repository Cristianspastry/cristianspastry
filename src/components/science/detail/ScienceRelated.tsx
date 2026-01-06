"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Wrench, Beaker, ChevronDown } from 'lucide-react'

// Mock type for demonstration
interface RecipePreview {
  _id: string
  title: string
  slug: { current: string }
}

interface TechniquePreview {
  _id: string
  title: string
  slug: { current: string }
}

interface SciencePreview {
  _id: string
  title: string
  slug: { current: string }
}

interface Science {
  relatedRecipes?: RecipePreview[]
  relatedTechniques?: TechniquePreview[]
  relatedScience?: SciencePreview[]
}

interface ScienceRelatedProps {
  article: Science
}

function ScienceRelated({ article }: ScienceRelatedProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('recipes')

  const hasRelatedContent =
    (article.relatedRecipes && article.relatedRecipes.length > 0) ||
    (article.relatedTechniques && article.relatedTechniques.length > 0) ||
    (article.relatedScience && article.relatedScience.length > 0)

  if (!hasRelatedContent) {
    return null
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contenuti Correlati</h2>
        <p className="text-sm text-gray-600">Approfondisci con questi contenuti</p>
      </div>

      {/* Related Recipes */}
      {article.relatedRecipes && article.relatedRecipes.length > 0 && (
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 border-2 border-green-100 shadow-lg">
          <button
            onClick={() => toggleSection('recipes')}
            className="w-full p-6 flex items-center justify-between hover:bg-green-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">Ricette Correlate</h3>
                <p className="text-sm text-gray-600">{article.relatedRecipes.length} ricette</p>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-600 transition-transform ${
                expandedSection === 'recipes' ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {expandedSection === 'recipes' && (
            <div className="px-6 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              {article.relatedRecipes.map((recipe) => (
                <Link
                  key={recipe._id}
                  href={`/ricette/${recipe.slug.current}`}
                  className="group flex items-center justify-between rounded-xl border border-green-200 bg-white p-4 transition-all hover:border-green-400 hover:bg-green-50 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">
                    {recipe.title}
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-green-600" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Related Techniques */}
      {article.relatedTechniques && article.relatedTechniques.length > 0 && (
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-2 border-blue-100 shadow-lg">
          <button
            onClick={() => toggleSection('techniques')}
            className="w-full p-6 flex items-center justify-between hover:bg-blue-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/30">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">Tecniche Correlate</h3>
                <p className="text-sm text-gray-600">{article.relatedTechniques.length} tecniche</p>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-600 transition-transform ${
                expandedSection === 'techniques' ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {expandedSection === 'techniques' && (
            <div className="px-6 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              {article.relatedTechniques.map((technique) => (
                <Link
                  key={technique._id}
                  href={`/tecniche/${technique.slug.current}`}
                  className="group flex items-center justify-between rounded-xl border border-blue-200 bg-white p-4 transition-all hover:border-blue-400 hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                    {technique.title}
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Related Science Articles */}
      {article.relatedScience && article.relatedScience.length > 0 && (
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 border-2 border-orange-100 shadow-lg">
          <button
            onClick={() => toggleSection('science')}
            className="w-full p-6 flex items-center justify-between hover:bg-orange-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-500/30">
                <Beaker className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900">Altri Articoli</h3>
                <p className="text-sm text-gray-600">{article.relatedScience.length} articoli</p>
              </div>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-gray-600 transition-transform ${
                expandedSection === 'science' ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {expandedSection === 'science' && (
            <div className="px-6 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              {article.relatedScience.map((science) => (
                <Link
                  key={science._id}
                  href={`/scienza/${science.slug.current}`}
                  className="group flex items-center justify-between rounded-xl border border-orange-200 bg-white p-4 transition-all hover:border-orange-400 hover:bg-orange-50 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                    {science.title}
                  </span>
                  <ArrowRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-orange-600" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ScienceRelated