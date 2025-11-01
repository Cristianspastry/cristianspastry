# Cache Components - Guida all'Uso

## Panoramica

Questo progetto usa **Cache Components** (Partial Prerendering) di Next.js per ottimizzare le performance attraverso un sistema di caching intelligente.

## Come Funziona

### 1. Direttiva `'use cache'`

Tutte le funzioni di data fetching usano la direttiva `'use cache'` per marcare il loro output come cacheable:

```typescript
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  'use cache'
  // cacheLife({ hours: 1 }) // Da decommentare quando disponibile

  const recipe = await client.fetch<Recipe>(RECIPE_QUERY, { slug })
  return recipe
}
```

### 2. Configurazione

Il sistema è abilitato in `next.config.js`:

```javascript
experimental: {
  cacheComponents: true,
}
```

### 3. Invalidazione Cache

Quando modifichi contenuti nel CMS, usa le funzioni in `src/lib/revalidate.ts`:

```typescript
import { revalidateRecipe } from '@/lib/revalidate'

// Quando aggiorni una ricetta
revalidateRecipe('tiramisù')
```

## Strategie di Cache per Tipo di Contenuto

### Ricette
- **Cache**: 1 ora (`cacheLife({ hours: 1 })`)
- **Invalidazione**: Immediata con `revalidateRecipe(slug)`
- **Motivo**: Contenuto frequentemente visualizzato ma raramente modificato

### Categorie
- **Cache**: 1 giorno (`cacheLife({ days: 1 })`)
- **Invalidazione**: Manuale quando necessario
- **Motivo**: Cambiano raramente

### Liste e Filtri
- **Cache**: 1 ora (`cacheLife({ hours: 1 })`)
- **Invalidazione**: Automatica quando si modificano ricette
- **Motivo**: Bilancio tra freschezza e performance

## Migrazione dai Vecchi Pattern

### ❌ PRIMA (Pattern Vecchi)
```typescript
// In page.tsx
export const revalidate = 3600

// In funzioni di fetch
export async function getRecipe() {
  return await fetch('...', { next: { revalidate: 3600 } })
}
```

### ✅ DOPO (Cache Components)
```typescript
// Nelle funzioni di data fetching
export async function getRecipe() {
  'use cache'
  // cacheLife({ hours: 1 })

  return await client.fetch(...)
}

// Nessuna configurazione nella page
// La cache è gestita automaticamente!
```

## Best Practices

### 1. Cache Prima Ciò Che Conta
Dai priorità al caching di:
- Dati che non cambiano frequentemente
- Dati che non dipendono dall'utente
- Query costose (join, aggregazioni, ecc.)

### 2. Invalidazione Immediata vs Eventuale

**Usa `revalidatePath`** quando:
- Modifichi contenuti nel CMS
- L'utente deve vedere il cambiamento SUBITO
- Es: Pubblicazione di una nuova ricetta

**Usa `revalidateTag`** quando:
- La consistenza eventuale è accettabile
- Vuoi raggruppare invalidazioni
- Es: Aggiornamenti statistici, contatori

### 3. Evita Input Dinamici in Funzioni Cached

❌ **NON FARE**:
```typescript
'use cache'
export async function getRecipe(userId: string) {
  // userId potrebbe venire da cookies() o headers()
  // e causare errori!
}
```

✅ **FARE**:
```typescript
// Funzione cached - solo parametri statici
'use cache'
export async function getRecipe(slug: string) {
  return await client.fetch(RECIPE_QUERY, { slug })
}

// Wrapper per dati dinamici (non cached)
export async function getRecipeForUser(slug: string) {
  const userId = getUserIdFromCookies() // Dinamico
  const recipe = await getRecipe(slug)   // Cached

  return {
    ...recipe,
    isFavorite: await checkFavorite(userId, recipe._id)
  }
}
```

### 4. Usa Suspense per Dati Dinamici

Quando una parte della pagina usa API runtime (`cookies()`, `headers()`, `searchParams`), avvolgila con Suspense:

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      {/* Parte statica - può essere cached */}
      <RecipeContent />

      {/* Parte dinamica - avvolta in Suspense */}
      <Suspense fallback={<LoadingSkeleton />}>
        <UserFavorites />
      </Suspense>
    </div>
  )
}
```

## Monitoraggio e Debug

### Verificare se la Cache Funziona

1. **Build in produzione**:
```bash
npm run build
```

2. **Controlla l'output**: Cerca `○` (Static) vs `ƒ` (Dynamic) nelle route

3. **Test in produzione**:
```bash
npm run start
```

### Errori Comuni

#### "Uncached data accessed outside Suspense"
**Causa**: Stai usando `cookies()`, `headers()` o `searchParams` in un componente non avvolto da Suspense.

**Soluzione**: Avvolgi il componente con `<Suspense>`.

#### Cache non si invalida
**Causa**: Hai dimenticato di chiamare `revalidatePath` dopo le modifiche.

**Soluzione**: Aggiungi webhook o server actions che chiamano le funzioni di revalidazione.

## Prossimi Passi

1. **Decommentare `cacheLife()`** quando Next.js stable lo supporta
2. **Implementare `revalidateTag`** per invalidazioni più granulari
3. **Aggiungere Suspense boundaries** per ottimizzare ulteriormente
4. **Monitorare metriche** di cache hit/miss in produzione

## Risorse

- [Next.js Cache Components Docs](https://nextjs.org/docs/app/getting-started/cache-components)
- [Partial Prerendering](https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering)
- [Data Fetching Best Practices](https://nextjs.org/docs/app/building-your-application/data-fetching)
