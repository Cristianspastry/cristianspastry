import Link from 'next/link'
import { Home, Search, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TechniqueNotFound() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-blue-100">
              <BookOpen className="h-16 w-16 text-blue-600" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Tecnica Non Trovata
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            La tecnica che stai cercando non esiste o è stata rimossa.
            Esplora le altre tecniche disponibili!
          </p>

          {/* Main Actions */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/tecniche">
                <BookOpen className="mr-2 h-5 w-5" />
                Tutte le Tecniche
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Cerca Tecniche
              </Link>
            </Button>
          </div>

          {/* Additional Link */}
          <div className="mt-8">
            <Link href="/" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
              <Home className="mr-1 inline h-4 w-4" />
              Torna alla Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
