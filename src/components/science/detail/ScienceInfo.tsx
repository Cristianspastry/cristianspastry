'use client'

import { Clock, BookOpen, Calendar, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Science } from '@/sanity/lib/types'

interface ScienceInfoProps {
  article: Science
}

export default function ScienceInfo({ article }: ScienceInfoProps) {
  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900">Informazioni</h2>

      <div className="space-y-4">
        {/* Reading Time */}
        {article.readingTime && (
          <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
            <Clock className="h-5 w-5 flex-shrink-0 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Tempo di Lettura</p>
              <p className="text-lg font-bold text-gray-900">{article.readingTime} minuti</p>
            </div>
          </div>
        )}

        {/* Article Type */}
        {article.articleType && (
          <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
            <BookOpen className="h-5 w-5 flex-shrink-0 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Tipo di Articolo</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{article.articleType}</p>
            </div>
          </div>
        )}

        {/* Complexity */}
        {article.complexity && (
          <div className="border-b border-gray-100 pb-4">
            <p className="mb-2 text-sm font-semibold text-gray-700">Complessità</p>
            <Badge
              className={`
                ${article.complexity === 'base' && 'bg-green-500'}
                ${article.complexity === 'intermedio' && 'bg-yellow-500'}
                ${article.complexity === 'avanzato' && 'bg-red-500'}
                text-white
              `}
            >
              {article.complexity.charAt(0).toUpperCase() + article.complexity.slice(1)}
            </Badge>
          </div>
        )}

        {/* Author */}
        {article.author && (
          <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
            <User className="h-5 w-5 flex-shrink-0 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Autore</p>
              <p className="text-lg font-bold text-gray-900">{article.author.name}</p>
            </div>
          </div>
        )}

        {/* Published Date */}
        {article.publishedAt && (
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 flex-shrink-0 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Pubblicato il</p>
              <p className="text-lg font-bold text-gray-900">
                {new Date(article.publishedAt).toLocaleDateString('it-IT', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}