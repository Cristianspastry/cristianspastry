'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChefHat, BookOpen, Beaker, Calendar } from 'lucide-react'
import type { SearchResult } from '@/sanity/lib/types'
import { motion } from 'framer-motion'

interface SearchResultsProps {
  results: SearchResult
  activeFilter: 'all' | 'recipes' | 'techniques' | 'science'
}

export default function SearchResults({ results, activeFilter }: SearchResultsProps) {
  const shouldShowSection = (type: string) => {
    return activeFilter === 'all' || activeFilter === type
  }

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'ricetta':
        return {
          icon: ChefHat,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Ricetta',
          basePath: '/ricette',
        }
      case 'tecnica':
        return {
          icon: BookOpen,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          label: 'Tecnica',
          basePath: '/tecniche',
        }
      case 'scienza':
        return {
          icon: Beaker,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          label: 'Scienza',
          basePath: '/scienza',
        }
      default:
        return {
          icon: ChefHat,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          label: 'Contenuto',
          basePath: '/',
        }
    }
  }

  const allResults = [
    ...(shouldShowSection('recipes') ? results.recipes : []),
    ...(shouldShowSection('techniques') ? results.techniques : []),
    ...(shouldShowSection('science') ? results.science : []),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  if (allResults.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          Nessun risultato trovato
        </h3>
        <p className="text-gray-600">
          Prova a cercare con parole chiave diverse o più generiche
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {allResults.map((item, index) => {
        const config = getTypeConfig(item._type)
        const Icon = config.icon
        const href = `${config.basePath}/${item.slug.current}`

        return (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              href={href}
              className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-gray-300"
            >
              {/* Image */}
              {item.imageUrl && (
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Type Badge */}
                  <div className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full ${config.bgColor} ${config.borderColor} border px-3 py-1 backdrop-blur-sm`}>
                    <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                    <span className={`text-xs font-semibold ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={item.publishedAt}>
                    {new Date(item.publishedAt).toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}