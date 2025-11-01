'use client'

import { useEffect } from 'react'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error:', error)
  }, [error])

  return (
    <html lang="it">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-16 w-16 text-red-600" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Errore Critico
            </h1>
            <p className="mb-8 text-lg text-gray-600 md:text-xl">
              Si è verificato un errore critico nell&apos;applicazione.
              Ci scusiamo per l&apos;inconveniente.
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
                {error.stack && (
                  <details className="mt-4">
                    <summary className="cursor-pointer font-mono text-xs text-red-900 font-semibold">
                      Stack Trace
                    </summary>
                    <pre className="mt-2 overflow-auto rounded bg-red-100 p-2 font-mono text-xs text-red-800">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Main Actions */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={reset}
                className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <RefreshCw className="h-5 w-5" />
                Riprova
              </button>
              <a
                href="/"
                className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <Home className="h-5 w-5" />
                Torna alla Home
              </a>
            </div>

            {/* Help Text */}
            <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="mb-2 font-semibold text-gray-900">
                Cosa è successo?
              </h3>
              <p className="text-sm text-gray-600">
                Si è verificato un errore che ha impedito il corretto funzionamento dell&apos;applicazione.
                Il nostro team è stato notificato e sta lavorando per risolvere il problema.
              </p>
            </div>

            {/* Error Code */}
            {error.digest && (
              <div className="mt-8 text-xs text-gray-500">
                <p>Codice errore: {error.digest.slice(0, 8)}</p>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
