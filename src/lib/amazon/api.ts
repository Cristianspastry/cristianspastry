/**
 * Amazon Product Advertising API Integration
 *
 * Per abilitare questa funzionalità:
 * 1. Ottieni credenziali PA-API da https://webservices.amazon.com/paapi5/documentation/
 * 2. Aggiungi le variabili d'ambiente:
 *    - AMAZON_ACCESS_KEY
 *    - AMAZON_SECRET_KEY
 *    - AMAZON_PARTNER_TAG
 *    - AMAZON_MARKETPLACE (default: 'it')
 * 3. Installa il pacchetto: npm install amazon-paapi
 */

import { extractASIN } from './utils'

// Configurazione (da variabili d'ambiente)
const config = {
  accessKey: process.env.AMAZON_ACCESS_KEY || '',
  secretKey: process.env.AMAZON_SECRET_KEY || '',
  partnerTag: process.env.AMAZON_PARTNER_TAG || '',
  marketplace: process.env.AMAZON_MARKETPLACE || 'it',
  enabled: !!(
    process.env.AMAZON_ACCESS_KEY &&
    process.env.AMAZON_SECRET_KEY &&
    process.env.AMAZON_PARTNER_TAG
  ),
}

export interface AmazonProductData {
  asin: string
  title: string
  description?: string
  price?: string
  currency?: string
  imageUrl: string
  rating?: number
  reviewCount?: number
  availability?: string
  brand?: string
  features?: string[]
}

/**
 * Verifica se l'integrazione Amazon API è abilitata
 */
export function isAmazonAPIEnabled(): boolean {
  return config.enabled
}

/**
 * Recupera i dettagli del prodotto da Amazon PA-API
 * @param asinOrUrl - ASIN o URL Amazon
 * @returns Dati del prodotto o null
 */
export async function fetchAmazonProduct(
  asinOrUrl: string
): Promise<AmazonProductData | null> {
  // Estrae ASIN se è un URL
  const asin = asinOrUrl.includes('amazon') ? extractASIN(asinOrUrl) : asinOrUrl

  if (!asin) {
    console.error('Invalid ASIN or URL')
    return null
  }

  // Verifica se l'API è abilitata
  if (!config.enabled) {
    console.warn(
      'Amazon PA-API not configured. Please add credentials to environment variables.'
    )
    return null
  }

  try {
    // TODO: Implementare chiamata PA-API quando avrai le credenziali
    // Per ora ritorna null (fallback a dati manuali)

    /* Esempio di implementazione con amazon-paapi:

    const ProductAdvertisingAPIv1 = require('amazon-paapi');

    const api = new ProductAdvertisingAPIv1.DefaultApi();

    const requestParameters = {
      PartnerTag: config.partnerTag,
      PartnerType: 'Associates',
      Marketplace: `www.amazon.${config.marketplace}`,
      ItemIds: [asin],
      Resources: [
        'Images.Primary.Large',
        'ItemInfo.Title',
        'ItemInfo.Features',
        'ItemInfo.ByLineInfo',
        'Offers.Listings.Price',
        'CustomerReviews.StarRating',
        'CustomerReviews.Count',
      ],
    };

    const data = await api.getItems(requestParameters);

    if (data.ItemsResult?.Items?.[0]) {
      const item = data.ItemsResult.Items[0];

      return {
        asin,
        title: item.ItemInfo?.Title?.DisplayValue || '',
        description: item.ItemInfo?.Features?.DisplayValues?.join('. '),
        price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount,
        currency: item.Offers?.Listings?.[0]?.Price?.Currency,
        imageUrl: item.Images?.Primary?.Large?.URL || '',
        rating: item.CustomerReviews?.StarRating?.Value,
        reviewCount: item.CustomerReviews?.Count,
        brand: item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue,
        features: item.ItemInfo?.Features?.DisplayValues,
      };
    }
    */

    console.log('Amazon PA-API: Implementazione in attesa di credenziali')
    return null
  } catch (error) {
    console.error('Error fetching Amazon product:', error)
    return null
  }
}

/**
 * Recupera più prodotti in batch (più efficiente)
 * @param asins - Array di ASIN
 * @returns Array di dati prodotto
 */
export async function fetchAmazonProducts(
  asins: string[]
): Promise<(AmazonProductData | null)[]> {
  if (!config.enabled) {
    return asins.map(() => null)
  }

  // TODO: Implementare batch request quando avrai le credenziali
  // Per ora usa fetch singolo
  return Promise.all(asins.map((asin) => fetchAmazonProduct(asin)))
}

/**
 * Ottieni configurazione Amazon API (per debug)
 */
export function getAmazonAPIConfig() {
  return {
    enabled: config.enabled,
    marketplace: config.marketplace,
    hasAccessKey: !!config.accessKey,
    hasSecretKey: !!config.secretKey,
    hasPartnerTag: !!config.partnerTag,
  }
}
