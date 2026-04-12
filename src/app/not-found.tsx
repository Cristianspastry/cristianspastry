import Link from 'next/link'
import { Home, Search, ChefHat, BookOpen, Beaker } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          {/* Error Code */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary-600 opacity-20">404</h1>
            <div className="-mt-16">
              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-primary-100">
                <ChefHat className="h-16 w-16 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Pagina Non Trovata
          </h2>
          <p className="mb-8 text-lg text-gray-600 md:text-xl">
            Sembra che questa ricetta non sia nel nostro ricettario.
            Forse è stata spostata o l&apos;indirizzo non è corretto.
          </p>

          {/* Quick Links */}
          <div className="mb-12">
            <p className="mb-6 text-sm font-medium uppercase tracking-wider text-gray-500">
              Prova una di queste sezioni
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/"
                className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 transition-colors group-hover:bg-primary-100">
                  <Home className="h-6 w-6 text-primary-600" />
                </div>
                <span className="font-medium text-gray-900">Home</span>
              </Link>

              <Link
                href="/ricette"
                className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 transition-colors group-hover:bg-primary-100">
                  <ChefHat className="h-6 w-6 text-primary-600" />
                </div>
                <span className="font-medium text-gray-900">Ricette</span>
              </Link>

              <Link
                href="/tecniche"
                className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 transition-colors group-hover:bg-primary-100">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <span className="font-medium text-gray-900">Tecniche</span>
              </Link>

              <Link
                href="/scienza"
                className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 transition-colors group-hover:bg-primary-100">
                  <Beaker className="h-6 w-6 text-primary-600" />
                </div>
                <span className="font-medium text-gray-900">Scienza</span>
              </Link>
            </div>
          </div>

          {/* Main Actions */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Torna alla Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Cerca nel Sito
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-sm text-gray-600">
              Se pensi che questa sia un&apos;errore o hai bisogno di aiuto,{' '}
              <Link href="/chi-sono" className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
                contattami
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
