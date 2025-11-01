import { Suspense } from 'react'
import type { Metadata } from 'next'
import ScienceList from '@/components/science/list/ScienceList'
import ScienceLoading from '@/components/science/list/ScienceLoading'

export const metadata: Metadata = {
  title: 'La Scienza della Pasticceria | Cristian\'s Pastry',
  description: 'Scopri la scienza dietro le tecniche e gli ingredienti della pasticceria. Articoli approfonditi su reazioni chimiche, fisica e processi.',
  keywords: [
    'scienza pasticceria',
    'chimica pasticceria',
    'fisica pasticceria',
    'reazioni chimiche',
    'ingredienti scienza',
  ],
  openGraph: {
    title: 'La Scienza della Pasticceria | Cristian\'s Pastry',
    description: 'Scopri la scienza dietro le tecniche e gli ingredienti della pasticceria.',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Scienza della Pasticceria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Scienza della Pasticceria | Cristian\'s Pastry',
    description: 'Scopri la scienza dietro le tecniche e gli ingredienti della pasticceria.',
    images: ['/og-image.svg'],
  },
}

export default function SciencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-900 via-orange-800 to-orange-900 py-20">
        <div className="absolute inset-0 bg-[url('/patterns/pastry-pattern.svg')] opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              La Scienza della Pasticceria
            </h1>
            <p className="text-xl text-orange-100 md:text-2xl">
              Scopri i principi scientifici dietro le tecniche e gli ingredienti della pasticceria
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-orange-200">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span>Base</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-400" />
                <span>Intermedio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <span>Avanzato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science List with Filters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<ScienceLoading />}>
            <ScienceList />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
