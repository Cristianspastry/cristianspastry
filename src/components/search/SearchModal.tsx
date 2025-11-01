'use client'

import { useState, useEffect, FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { Search, X, ChefHat, BookOpen, Beaker, Calendar, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { SearchResult } from '@/sanity/lib/types'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState<'all' | 'recipes' | 'techniques' | 'science'>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults(null)
      setActiveFilter('all')
    }
  }, [isOpen])

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Perform search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults(null)
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setResults(data)
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [query])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'ricetta':
        return {
          icon: ChefHat,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          label: 'Ricetta',
          basePath: '/ricette',
        }
      case 'tecnica':
        return {
          icon: BookOpen,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          label: 'Tecnica',
          basePath: '/tecniche',
        }
      case 'scienza':
        return {
          icon: Beaker,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          label: 'Scienza',
          basePath: '/scienza',
        }
      default:
        return {
          icon: ChefHat,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          label: 'Contenuto',
          basePath: '/',
        }
    }
  }

  const shouldShowSection = (type: string) => {
    return activeFilter === 'all' || activeFilter === type
  }

  const allResults = results
    ? [
        ...(shouldShowSection('recipes') ? results.recipes : []),
        ...(shouldShowSection('techniques') ? results.techniques : []),
        ...(shouldShowSection('science') ? results.science : []),
      ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    : []

  const totalResults = results
    ? results.recipes.length + results.techniques.length + results.science.length
    : 0

  if (!mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 mx-auto max-w-4xl"
          >
            <div className="flex max-h-[calc(100vh-10rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-4 border-b border-gray-200 p-4">
                <Search className={`h-5 w-5 flex-shrink-0 ${isLoading ? 'animate-pulse text-gray-400' : 'text-gray-400'}`} />
                <form onSubmit={handleSubmit} className="flex-1">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cerca ricette, tecniche, articoli..."
                    className="w-full bg-transparent text-lg text-gray-900 placeholder-gray-500 focus:outline-none"
                    autoFocus
                  />
                </form>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  aria-label="Chiudi"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filters */}
              {results && totalResults > 0 && (
                <div className="flex gap-2 border-b border-gray-200 p-4">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                      activeFilter === 'all'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Tutti ({totalResults})
                  </button>
                  {results.recipes.length > 0 && (
                    <button
                      onClick={() => setActiveFilter('recipes')}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                        activeFilter === 'recipes'
                          ? 'bg-green-600 text-white'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      <ChefHat className="h-3.5 w-3.5" />
                      Ricette ({results.recipes.length})
                    </button>
                  )}
                  {results.techniques.length > 0 && (
                    <button
                      onClick={() => setActiveFilter('techniques')}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                        activeFilter === 'techniques'
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Tecniche ({results.techniques.length})
                    </button>
                  )}
                  {results.science.length > 0 && (
                    <button
                      onClick={() => setActiveFilter('science')}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                        activeFilter === 'science'
                          ? 'bg-orange-600 text-white'
                          : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                      }`}
                    >
                      <Beaker className="h-3.5 w-3.5" />
                      Scienza ({results.science.length})
                    </button>
                  )}
                </div>
              )}

              {/* Results */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Loading */}
                {isLoading && query && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                )}

                {/* Empty state - no query */}
                {!query && !isLoading && (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Inizia la tua ricerca
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cerca ricette, tecniche o articoli scientifici
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      <span className="text-xs text-gray-500">Prova con:</span>
                      {['tiramisù', 'lievitazione', 'caramellizzazione'].map((tip) => (
                        <button
                          key={tip}
                          onClick={() => setQuery(tip)}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          {tip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state - no results */}
                {!isLoading && query && allResults.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      Nessun risultato trovato
                    </h3>
                    <p className="text-sm text-gray-600">
                      Prova con parole chiave diverse o più generiche
                    </p>
                  </div>
                )}

                {/* Results Grid */}
                {!isLoading && allResults.length > 0 && (
                  <div className="space-y-2">
                    {allResults.map((item) => {
                      const config = getTypeConfig(item._type)
                      const Icon = config.icon
                      const href = `${config.basePath}/${item.slug.current}`

                      return (
                        <Link
                          key={item._id}
                          href={href}
                          onClick={onClose}
                          className="group flex gap-4 rounded-xl border border-gray-100 bg-white p-3 transition-all hover:border-gray-300 hover:shadow-md"
                        >
                          {/* Image */}
                          {item.imageUrl && (
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                              <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="mb-1 flex items-center gap-2">
                              <div className={`flex items-center gap-1 rounded-full ${config.bgColor} px-2 py-0.5`}>
                                <Icon className={`h-3 w-3 ${config.color}`} />
                                <span className={`text-xs font-semibold ${config.color}`}>
                                  {config.label}
                                </span>
                              </div>
                            </div>
                            <h3 className="mb-1 text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-gray-700">
                              {item.title}
                            </h3>
                            {item.excerpt && (
                              <p className="mb-2 text-xs text-gray-600 line-clamp-2">
                                {item.excerpt}
                              </p>
                            )}
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <time dateTime={item.publishedAt}>
                                {new Date(item.publishedAt).toLocaleDateString('it-IT', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </time>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Footer with keyboard hint */}
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded bg-white px-2 py-1 font-mono text-xs shadow-sm border border-gray-200">ESC</kbd>
                      per chiudere
                    </span>
                  </div>
                  {totalResults > 0 && (
                    <span>
                      {totalResults} {totalResults === 1 ? 'risultato' : 'risultati'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}