'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-16 w-16 text-red-600" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Qualcosa è Andato Storto
          </h1>
          <p className="mb-8 text-lg text-gray-600 md:text-xl">
            Ops! Si è verificato un errore inaspettato.
            Non preoccuparti, stiamo lavorando per risolverlo.
          </p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-6 text-left">
              <h3 className="mb-2 font-mono text-sm font-bold text-red-900">
                Dettagli Errore (solo in sviluppo):
              </h3>
              <p className="font-mono text-xs text-red-700 break-words">
                {error.message}
              </p>
              {error.digest && (
                <p className="mt-2 font-mono text-xs text-red-600">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Main Actions */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={reset}
              size="lg"
              className="min-w-[200px]"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Riprova
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[200px]">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Torna alla Home
              </Link>
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="mb-2 font-semibold text-gray-900">
              Cosa puoi fare?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Prova a ricaricare la pagina cliccando su &quot;Riprova&quot;</li>
              <li>• Torna alla home page e riprova da lì</li>
              <li>• Se il problema persiste,{' '}
                <Link href="/chi-sono" className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
                  contattaci
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-xs text-gray-500">
            {error.digest && (
              <p>
                Codice errore: {error.digest.slice(0, 8)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
