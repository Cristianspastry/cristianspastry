/**
 * Utility functions for Amazon product integration
 */

/**
 * Estrae l'ASIN da un URL Amazon
 * @param url - URL del prodotto Amazon
 * @returns ASIN o null se non trovato
 *
 * @example
 * extractASIN('https://www.amazon.it/dp/B07VGRJDFY') // 'B07VGRJDFY'
 * extractASIN('https://www.amazon.com/gp/product/B07VGRJDFY') // 'B07VGRJDFY'
 */
export function extractASIN(url: string): string | null {
  if (!url) return null

  try {
    // Pattern comuni per URL Amazon
    const patterns = [
      /\/dp\/([A-Z0-9]{10})/i,           // /dp/ASIN
      /\/product\/([A-Z0-9]{10})/i,      // /product/ASIN
      /\/gp\/product\/([A-Z0-9]{10})/i,  // /gp/product/ASIN
      /\/exec\/obidos\/ASIN\/([A-Z0-9]{10})/i, // vecchio formato
      /amazon\.[a-z.]+\/([A-Z0-9]{10})/i, // ASIN diretto dopo dominio
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  } catch (error) {
    console.error('Error extracting ASIN:', error)
    return null
  }
}

/**
 * Valida se una stringa è un ASIN valido
 * @param asin - Stringa da validare
 * @returns true se è un ASIN valido
 */
export function isValidASIN(asin: string): boolean {
  if (!asin) return false
  // ASIN sono sempre 10 caratteri alfanumerici
  return /^[A-Z0-9]{10}$/i.test(asin)
}

/**
 * Costruisce un URL Amazon con tag affiliazione
 * @param asin - ASIN del prodotto
 * @param marketplace - Marketplace Amazon (default: 'it')
 * @param affiliateTag - Tag di affiliazione
 * @returns URL completo Amazon
 */
export function buildAmazonURL(
  asin: string,
  affiliateTag: string,
  marketplace: string = 'it'
): string {
  if (!isValidASIN(asin)) {
    throw new Error('Invalid ASIN')
  }

  return `https://www.amazon.${marketplace}/dp/${asin}?tag=${affiliateTag}`
}

/**
 * Pulisce e normalizza un URL Amazon
 * @param url - URL Amazon originale
 * @param affiliateTag - Tag di affiliazione da usare
 * @returns URL pulito con tag affiliazione
 */
export function cleanAmazonURL(url: string, affiliateTag: string): string | null {
  const asin = extractASIN(url)
  if (!asin) return null

  // Estrae il marketplace dall'URL originale
  const marketplaceMatch = url.match(/amazon\.([a-z.]+)/)
  const marketplace = marketplaceMatch ? marketplaceMatch[1] : 'it'

  return buildAmazonURL(asin, affiliateTag, marketplace)
}

/**
 * Estrae informazioni dal link Amazon
 * @param url - URL Amazon
 * @returns Oggetto con ASIN e marketplace
 */
export function parseAmazonURL(url: string): {
  asin: string | null
  marketplace: string | null
  isValid: boolean
} {
  const asin = extractASIN(url)
  const marketplaceMatch = url.match(/amazon\.([a-z.]+)/)
  const marketplace = marketplaceMatch?.[1] || null

  return {
    asin,
    marketplace,
    isValid: asin !== null && marketplace !== null,
  }
}
