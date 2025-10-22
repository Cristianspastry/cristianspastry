import { revalidateRecipe, revalidateScience, revalidateTechnique } from "@/lib/revalidate"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  
  // Verifica il secret token
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    const body = await request.json() as { _type: string, slug: string }
    const { _type, slug } = body

    // Revalida basato sul tipo di documento
    switch (_type) {
      case 'ricetta':
        if (slug && typeof slug === 'string') {
          revalidateRecipe(slug)
        }
        break
      case 'tecnica':
        if (slug && typeof slug === 'string') {
          revalidateTechnique(slug)
        }
        break
      case 'scienza':
        if (slug && typeof slug === 'string') {
          revalidateScience(slug)
        }
        break
      default:
        break
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 }
    )
  }
}
