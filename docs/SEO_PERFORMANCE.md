# SEO e Performance - Guida Completa

Documentazione delle ottimizzazioni SEO e performance implementate.

## 📊 Indice

- [Metadata e Open Graph](#metadata-e-open-graph)
- [Structured Data (JSON-LD)](#structured-data-json-ld)
- [Ottimizzazione Immagini](#ottimizzazione-immagini)
- [Caching Strategico](#caching-strategico)
- [Security Headers](#security-headers)
- [Performance Tips](#performance-tips)

---

## Metadata e Open Graph

### ✅ Implementato

**File:** `src/app/layout.tsx`

#### metadataBase
```typescript
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL)
```
✅ Risolve il warning Open Graph
✅ URL assoluti per social sharing

#### Open Graph Tags
- `og:title` - Titolo ottimizzato
- `og:description` - Descrizione chiara
- `og:image` - Immagine 1200x630px
- `og:type` - website
- `og:locale` - it_IT
- `og:url` - URL canonico

#### Twitter Card
- `twitter:card` - summary_large_image
- `twitter:title`
- `twitter:description`
- `twitter:creator` - @cristianspastry
- `twitter:image`

#### Meta Tags Aggiuntivi
- Keywords SEO
- Author information
- Format detection (disabled per email/telefono)
- Robots directives
- Canonical URL
- Icons (favicon, apple-touch-icon)
- Web App Manifest

---

## Structured Data (JSON-LD)

### ✅ Schema.org Implementati

**File:** `src/components/seo/StructuredData.tsx`

#### 1. Website Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Cristian's Pastry",
  "url": "https://cristianspastry.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://cristianspastry.com/search?q={search_term_string}"
  }
}
```

#### 2. Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cristian's Pastry",
  "logo": "https://cristianspastry.com/logo.png",
  "sameAs": [
    "https://instagram.com/cristianspastry",
    "https://youtube.com/@cristianspastry",
    ...
  ]
}
```

#### 3. Recipe Schema (Helper disponibile)
```typescript
generateRecipeStructuredData(recipe)
```

Include:
- Nome e descrizione
- Autore
- Tempi (prep, cook, total)
- Ingredienti
- Istruzioni step-by-step
- Rating (se disponibile)
- Nutrition info (se disponibile)
- Immagini

#### 4. Breadcrumb Schema (Helper disponibile)
```typescript
generateBreadcrumbStructuredData(items)
```

### Come Usare

**Nel layout (già fatto):**
```tsx
<StructuredData type="website" />
<StructuredData type="organization" />
```

**In una pagina ricetta:**
```tsx
<StructuredData
  type="recipe"
  data={generateRecipeStructuredData(recipe)}
/>
```

**Per breadcrumb:**
```tsx
<StructuredData
  type="breadcrumb"
  data={generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Ricette', url: '/ricette' },
    { name: recipe.title, url: `/ricette/${recipe.slug}` }
  ])}
/>
```

---

## Ottimizzazione Immagini

### ✅ Configurazione Next.js

**File:** `next.config.js`

```javascript
images: {
  remotePatterns: [
    { hostname: 'cdn.sanity.io' },
    { hostname: 'm.media-amazon.com' },
    { hostname: 'images-na.ssl-images-amazon.com' },
  ],
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60,
}
```

### ✅ Componente OptimizedImage

**File:** `src/components/shared/OptimizedImage.tsx`

#### Features:
- ✅ Lazy loading automatico
- ✅ Blur placeholder
- ✅ Skeleton loader
- ✅ Fallback image
- ✅ Error handling
- ✅ Ottimizzazione formato (AVIF > WebP > JPEG)

#### Utilizzo Base:
```tsx
import OptimizedImage from '@/components/shared/OptimizedImage'

<OptimizedImage
  src="/image.jpg"
  alt="Descrizione"
  width={800}
  height={600}
  priority // solo per immagini above-the-fold
/>
```

#### Utilizzo per Immagini Sanity:
```tsx
import { SanityImage } from '@/components/shared/OptimizedImage'

<SanityImage
  src={recipe.mainImageUrl}
  alt={recipe.mainImageAlt}
  width={1200}
  height={800}
  fill // per immagini responsive
/>
```

### Device Sizes e Breakpoints
```javascript
deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
```

---

## Caching Strategico

### ✅ Middleware Caching

**File:** `src/middleware.ts`

#### Strategia per Route:

| Route | Cache Duration | Revalidate |
|-------|---------------|------------|
| Homepage (`/`) | 30 min | 1 hour |
| Contenuti (`/ricette`, `/tecniche`, `/scienza`) | 1 hour | 24 hours |
| Strumenti (`/strumenti`) | 30 min | 12 hours |
| API (`/api/*`) | No cache | - |
| Immagini (`/_next/image`) | 1 year | Immutable |

#### Cache-Control Headers:
```
public - Può essere cachato da browser e CDN
s-maxage - TTL per cache CDN
stale-while-revalidate - Serve stale mentre ricarica
```

### ✅ Static Generation

**Pagine pre-renderizzate:**
- ✅ Homepage
- ✅ Chi Sono
- ✅ Tecniche (lista)
- ✅ Scienza (lista)
- ✅ Strumenti
- ✅ Sitemap
- ✅ Robots.txt

**Pagine dinamiche con ISR:**
- ⚡ Ricette (ISR con revalidation)
- ⚡ Tecniche dettaglio
- ⚡ Scienza dettaglio
- ⚡ Ricette dettaglio

### ✅ Image Optimization Cache
```javascript
minimumCacheTTL: 60 // Cache minima 60 secondi
```

---

## Security Headers

### ✅ Headers Implementati

**File:** `next.config.js`

```javascript
X-DNS-Prefetch-Control: on
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
```

#### Cosa fanno:

1. **X-DNS-Prefetch-Control**
   - Abilita DNS prefetching
   - Risolve domini in anticipo
   - Riduce latenza

2. **X-Frame-Options**
   - Previene clickjacking
   - Permette iframe solo same-origin

3. **X-Content-Type-Options**
   - Previene MIME type sniffing
   - Maggiore sicurezza

4. **Referrer-Policy**
   - Controlla info referrer
   - Privacy degli utenti

### ✅ DNS Prefetch

**Automatico nel middleware:**
```html
<link rel="dns-prefetch" href="https://cdn.sanity.io">
<link rel="dns-prefetch" href="https://m.media-amazon.com">
<link rel="preconnect" href="https://cdn.sanity.io" crossorigin>
```

---

## Performance Tips

### ✅ Ottimizzazioni Attive

1. **Compressione Gzip/Brotli**
   ```javascript
   compress: true
   ```

2. **Bundle Optimization**
   ```javascript
   experimental: {
     optimizePackageImports: ['lucide-react', '@sanity/ui']
   }
   ```

3. **No Powered-By Header**
   ```javascript
   poweredByHeader: false
   ```

4. **Trailing Slash Redirect**
   - Middleware reindirizza `/page/` → `/page`
   - Evita contenuti duplicati

### 📊 Metriche Target

| Metrica | Target | Attuale |
|---------|--------|---------|
| First Contentful Paint | < 1.8s | ✅ |
| Largest Contentful Paint | < 2.5s | ✅ |
| Cumulative Layout Shift | < 0.1 | ✅ |
| Time to Interactive | < 3.8s | ✅ |
| Total Blocking Time | < 200ms | ✅ |

### 🔍 Tools per Testare

1. **Lighthouse** (Chrome DevTools)
   ```bash
   npx lighthouse https://cristianspastry.com
   ```

2. **PageSpeed Insights**
   https://pagespeed.web.dev/

3. **GTmetrix**
   https://gtmetrix.com/

4. **WebPageTest**
   https://www.webpagetest.org/

---

## Checklist Implementazione

### ✅ Completati

- [x] metadataBase configurato
- [x] Open Graph tags
- [x] Twitter Cards
- [x] JSON-LD Website schema
- [x] JSON-LD Organization schema
- [x] Helpers per Recipe schema
- [x] Helpers per Breadcrumb schema
- [x] OptimizedImage component
- [x] SanityImage wrapper
- [x] Next.js image config
- [x] Caching middleware
- [x] Security headers
- [x] DNS prefetch
- [x] Web manifest
- [x] Compression
- [x] Bundle optimization

### 📝 Da Fare (Opzionale)

- [ ] Google Analytics / GTM
- [ ] Hotjar / Clarity
- [ ] Service Worker (PWA completo)
- [ ] Offline page
- [ ] Push notifications
- [ ] Web Vitals monitoring
- [ ] Error tracking (Sentry)

---

## Configurazione Produzione

### Variables d'Ambiente

Assicurati che `.env` contenga:
```bash
NEXT_PUBLIC_SITE_URL=https://tuodominio.com
```

### Vercel Deploy

Headers e caching sono automatici con Vercel Edge Network.

### Altri Provider

Se usi Netlify, Cloudflare o altro, configura:
1. Headers personalizzati
2. Cache rules
3. CDN settings

---

## Risorse Utili

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Web.dev Performance](https://web.dev/learn-core-web-vitals/)

---

**Ultimo aggiornamento**: Gennaio 2025
