import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect trailing slash
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 308)
  }

  // Headers per sicurezza e performance
  const response = NextResponse.next()

  // Preconnect solo per pagine che usano effettivamente immagini Sanity
  const needsSanityImages =
    pathname === '/' ||
    pathname.startsWith('/ricette/') || // Dettaglio ricetta (non lista)
    pathname.startsWith('/scienza/') ||
    pathname.startsWith('/tecniche/') ||
    pathname === '/chi-sono'

  if (needsSanityImages) {
    // DNS Prefetch per domini esterni
    response.headers.set(
      'Link',
      '<https://cdn.sanity.io>; rel=dns-prefetch, <https://m.media-amazon.com>; rel=dns-prefetch'
    )

    // Preconnect per risorse critiche
    response.headers.append(
      'Link',
      '<https://cdn.sanity.io>; rel=preconnect; crossorigin'
    )
  }

  // Cache-Control dinamico basato sulla route
  if (pathname.startsWith('/ricette') || pathname.startsWith('/tecniche') || pathname.startsWith('/scienza')) {
    // Pagine contenuto: cache con revalidation
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    )
  } else if (pathname.startsWith('/strumenti')) {
    // Pagina strumenti: cache moderata
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=1800, stale-while-revalidate=43200'
    )
  } else if (pathname === '/') {
    // Homepage: cache breve con stale-while-revalidate
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=1800, stale-while-revalidate=3600'
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$|api/).*)',
  ],
}
