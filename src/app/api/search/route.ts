import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { SEARCH_QUERY } from '@/sanity/lib/queries'

// ✅ Con Cache Components, le API routes sono automaticamente dinamiche
// quando usano request data come searchParams

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      )
    }

    // Perform the search using Sanity client
    const results = await client.fetch(SEARCH_QUERY, {
      searchTerm: query.trim(),
    })

    return NextResponse.json(results, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}