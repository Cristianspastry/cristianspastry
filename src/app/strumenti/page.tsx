import { Suspense } from 'react'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import type { Product } from '@/sanity/lib/types'
import ProductCategorySection from '@/components/products/ProductCategorySection'
import PageTransition from '@/components/shared/PageTransition'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Gli Strumenti che Uso | Attrezzatura per Pasticceria',
  description:
    'Scopri gli strumenti e i prodotti che uso nelle mie ricette. Una selezione curata di attrezzatura, ingredienti e accessori per pasticceria, provati e testati.',
  openGraph: {
    title: 'Gli Strumenti che Uso | Attrezzatura per Pasticceria',
    description:
      'Scopri gli strumenti e i prodotti che uso nelle mie ricette. Attrezzatura per pasticceria provata e testata.',
  },
}

const categoryInfo: Record<
  string,
  { title: string; description: string; emoji: string }
> = {
  crostate: {
    title: '🥧 Crostate perfette',
    description:
      'Scopri la selezione per ottenere crostate classiche e moderne perfette. Stampi, attrezz ature, ingredienti...',
    emoji: '🥧',
  },
  ingredienti: {
    title: '🧈 Ingredienti migliori',
    description:
      'Le ricette migliori meritano gli ingredienti migliori, ecco una selezione ideale per ottenere il massimo',
    emoji: '🧈',
  },
  cottura: {
    title: '🔥 Gli strumenti di cottura',
    description:
      'Ghisa, acciaio, rame, alluminio, ogni ricetta ha il suo strumento migliore per cuocerlo al meglio',
    emoji: '🔥',
  },
  decorazione: {
    title: '🎨 Tutto per le decorazioni',
    description:
      'Scopri la selezione per provare a realizzare la tua prima colomba perfetta. Stampi, coloranti...',
    emoji: '🎨',
  },
  attrezzatura: {
    title: '🔪 Attrezzatura base',
    description:
      'Gli strumenti essenziali per ogni pasticciere: coltelli, spatole, fruste e tutto il necessario',
    emoji: '🔪',
  },
  elettrodomestici: {
    title: '⚡ Elettrodomestici',
    description:
      'Impastatrici, forni, termometri digitali e altri elettrodomestici professionali per la tua cucina',
    emoji: '⚡',
  },
}

// Loading Component
function ProductsLoading() {
  return (
    <div className="space-y-16">
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-8">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-12 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function StrumentiPage() {
  const products: Product[] = await client.fetch(ALL_PRODUCTS_QUERY)

  // Raggruppa prodotti per categoria
  const productsByCategory = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category]?.push(product)
      return acc
    },
    {} as Record<string, Product[]>
  )

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-orange-50 to-transparent">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Gli Strumenti che Uso
              </h1>
              <p className="mb-4 text-lg text-gray-700 md:text-xl">
                Per realizzare al meglio le ricette, gli strumenti rappresentano un alleato
                importante, e qua troverete alcuni di quelli che mi vedete usare nelle ricette e
                nei miei video.
              </p>
              <p className="text-base text-gray-600">
                Qua troverete una selezione dei prodotti che io uso nel mio quotidiano, provati e
                testati in modo indipendente.
              </p>

              {/* Disclaimer */}
              <div className="mx-auto mt-8 max-w-2xl rounded-xl bg-orange-100 p-4 text-sm text-orange-900">
                <p>
                  <strong>Nota:</strong> I link presenti in questa pagina sono link di affiliazione
                  Amazon. Acquistando tramite questi link supporti il mio lavoro senza costi
                  aggiuntivi per te.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products by Category */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <Suspense fallback={<ProductsLoading />}>
            {Object.keys(categoryInfo).map((categoryKey) => {
              const categoryProducts = productsByCategory[categoryKey] || []
              const info = categoryInfo[categoryKey as keyof typeof categoryInfo]

              if (!info) return null

              return (
                <ProductCategorySection
                  key={categoryKey}
                  title={info.title}
                  description={info.description}
                  products={categoryProducts}
                  categoryKey={categoryKey}
                />
              )
            })}
          </Suspense>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <p className="text-xl text-gray-600">
                Nessun prodotto disponibile al momento.
              </p>
              <p className="mt-2 text-gray-500">
                Torna presto per scoprire i miei strumenti preferiti!
              </p>
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  )
}
