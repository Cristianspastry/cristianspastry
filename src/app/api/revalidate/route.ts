
// File: app/api/revalidate/route.ts

import { revalidateCategories, revalidateRecipe, revalidateScience, revalidateTechnique } from '@/lib/revalidate'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Typo per il payload del webhook
type WebhookPayload = {
  _type: 'recipe' | 'technique' | 'science' | 'category'
  slug?: {
    current: string
  }
  _id: string
}

export async function POST(req: NextRequest) {
  try {
    // Verifica il secret per sicurezza
    const secret = req.nextUrl.searchParams.get('secret')
    
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      console.error('❌ Invalid revalidation secret')
      return new NextResponse('Invalid secret', { status: 401 })
    }

    // Parse del body manualmente (senza next-sanity)
    const body: WebhookPayload = await req.json()

    if (!body?._type) {
      console.error('❌ Missing _type in webhook payload')
      return new NextResponse('Bad Request: Missing _type', { status: 400 })
    }

    const slug = body.slug?.current

    console.log(`🔄 Webhook received: ${body._type} - ${slug || 'no slug'}`)

    // Revalida in base al tipo di documento
    switch (body._type) {
      case 'science':
        if (slug) {
          revalidateScience(slug)
        } else {
          // Se non c'è slug, revalida tutte le pagine science
          revalidatePath('/scienza')
          revalidatePath('/')
          console.info(`✅ Revalidated all science articles`)
        }
        break

      case 'recipe':
        if (slug) {
          revalidateRecipe(slug)
        } else {
          revalidatePath('/ricette')
          revalidatePath('/')
          console.info(`✅ Revalidated all recipes`)
        }
        break

      case 'technique':
        if (slug) {
          revalidateTechnique(slug)
        } else {
          revalidatePath('/tecniche')
          revalidatePath('/')
          console.info(`✅ Revalidated all techniques`)
        }
        break

      case 'category':
        revalidateCategories()
        break

      default:
        console.warn(`⚠️ Unknown document type: ${body._type}`)
        return new NextResponse(`Unknown type: ${body._type}`, { status: 400 })
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      slug: slug || null,
      timestamp: new Date().toISOString(),
    })

  } catch (err: any) {
    console.error('❌ Revalidation error:', err)
    return new NextResponse(
      JSON.stringify({ 
        error: err.message,
        revalidated: false 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

// Permetti anche GET per test manuali (solo in dev)
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not allowed', { status: 403 })
  }

  return NextResponse.json({
    message: 'Revalidation endpoint',
    usage: 'POST with secret parameter',
    example: '/api/revalidate?secret=YOUR_SECRET',
  })
}


// ============================================
// 3. VARIABILI AMBIENTE
// ============================================
// File: .env.local

/*
# Secret per proteggere l'endpoint (genera uno casuale!)
SANITY_REVALIDATE_SECRET="genera-una-stringa-casuale-molto-lunga"

# Genera secret con:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
*/


// ============================================
// 4. CONFIGURAZIONE WEBHOOK SU SANITY.IO
// ============================================
/*
ISTRUZIONI PASSO-PASSO:

1. Vai su: https://www.sanity.io/manage
2. Seleziona il tuo progetto
3. Vai su: API → Webhooks
4. Clicca: "Create webhook"

WEBHOOK PER SCIENCE:
- Name: "Revalidate Science Articles"
- URL: https://tuosito.com/api/revalidate?secret=TUO_SECRET_QUI
- Dataset: production
- Trigger on: Create, Update, Delete
- Filter: _type == "science"
- HTTP method: POST
- API version: v2021-06-07
- Projection: { _type, slug }
- Include drafts: NO

WEBHOOK PER RECIPES:
- Name: "Revalidate Recipes"
- URL: https://tuosito.com/api/revalidate?secret=TUO_SECRET_QUI
- Filter: _type == "recipe"
- (resto uguale)

WEBHOOK PER TECHNIQUES:
- Name: "Revalidate Techniques"
- URL: https://tuosito.com/api/revalidate?secret=TUO_SECRET_QUI
- Filter: _type == "technique"
- (resto uguale)

WEBHOOK PER CATEGORIES:
- Name: "Revalidate Categories"
- URL: https://tuosito.com/api/revalidate?secret=TUO_SECRET_QUI
- Filter: _type == "category"
- (resto uguale)

5. Salva ogni webhook
6. Testa cliccando su "Send test notification"
*/


// ============================================
// 5. TESTA IL WEBHOOK MANUALMENTE
// ============================================
/*
# Test locale (in development):
curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "science",
    "slug": { "current": "test-slug" }
  }'

# Test produzione:
curl -X POST "https://tuosito.com/api/revalidate?secret=YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "science",
    "slug": { "current": "articolo-test" }
  }'

# Dovresti vedere nei log:
# 🔄 Webhook received: science - articolo-test
# ✅ Revalidated science article: articolo-test
*/




// ============================================
// 6. PACKAGE.JSON - Dipendenze opzionali
// ============================================
/*
NON è più necessario installare next-sanity per i webhook!
Il parsing del body viene fatto manualmente con req.json()
*/