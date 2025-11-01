import type { Metadata } from 'next'
import { Suspense } from 'react'
import SearchContent from '@/components/search/SearchContent'

export const metadata: Metadata = {
  title: 'Ricerca | Cristian\'s Pastry',
  description: 'Cerca tra ricette, tecniche e articoli scientifici sulla pasticceria',
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Cerca nel Sito
            </h1>
            <p className="text-lg text-gray-300">
              Esplora ricette, tecniche e articoli scientifici sulla pasticceria
            </p>
          </div>
        </div>
      </section>

      {/* Search Content */}
      <section className="container mx-auto px-4 py-12">
        <Suspense fallback={<SearchSkeleton />}>
          <SearchContent />
        </Suspense>
      </section>
    </div>
  )
}

function SearchSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search Bar Skeleton */}
      <div className="mx-auto max-w-3xl">
        <div className="h-14 rounded-xl bg-gray-200 animate-pulse" />
      </div>

      {/* Filters Skeleton */}
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-24 rounded-lg bg-gray-200 animate-pulse" />
        ))}
      </div>

      {/* Results Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
            <div className="aspect-video rounded-lg bg-gray-200 animate-pulse mb-4" />
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}
