import { Suspense } from 'react'
import type { Metadata } from 'next'
import TechniquesList from '@/components/technique/list/TechniquesList'
import TechniquesLoading from '@/components/technique/list/TechniquesLoading'

export const metadata: Metadata = {
  title: 'Tecniche di Pasticceria | Cristian\'s Pastry',
  description: 'Impara le tecniche fondamentali e avanzate della pasticceria professionale. Guide dettagliate con video e immagini per ogni livello.',
  keywords: [
    'tecniche pasticceria',
    'tecniche professionali',
    'guide pasticceria',
    'tutorial pasticceria',
    'impasti base',
  ],
  openGraph: {
    title: 'Tecniche di Pasticceria | Cristian\'s Pastry',
    description: 'Impara le tecniche fondamentali e avanzate della pasticceria professionale.',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Tecniche di Pasticceria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tecniche di Pasticceria | Cristian\'s Pastry',
    description: 'Impara le tecniche fondamentali e avanzate della pasticceria professionale.',
    images: ['/og-image.svg'],
  },
}

export default function TechniquesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20">
        <div className="absolute inset-0 bg-[url('/patterns/pastry-pattern.svg')] opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Tecniche di Pasticceria
            </h1>
            <p className="text-xl text-blue-100 md:text-2xl">
              Impara le tecniche fondamentali e avanzate della pasticceria professionale
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-blue-200">
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
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                <span>Professionale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Techniques List with Filters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<TechniquesLoading />}>
            <TechniquesList />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
