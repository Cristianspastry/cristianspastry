# Guida alla Migrazione - Nuova Architettura

## 📋 Stato della Migrazione

### ✅ Completato

#### Core Module
- [x] `core/types/index.ts` - Tipi condivisi (Slug, ImageAsset, Recipe, Technique, ScienceArticle, etc.)
- [x] `core/utils/index.ts` - Utility functions (cn, formatDate, formatDuration, truncate, slugify, etc.)
- [x] `core/lib/clients.ts` - Configurazione client (sanityClient, prisma)
- [x] `core/constants/config.ts` - Costanti globali (siteConfig, ROUTES, CACHE_CONFIG)
- [x] `core/components/ui/*` - Componenti UI base (Button, Input, Badge, Card)

#### Features Implementate

**Recipes Feature** (`features/recipes/`)
- [x] `types/index.ts` - Tipi specifici ricette
- [x] `services/recipeService.ts` - Servizi dati (getRecipes, getRecipeBySlug, getRecipeCategories, etc.)
- [x] `components/list/RecipeCard.tsx` - Card ricetta migrata e refactorizzata
- [x] `components/list/RecipeGrid.tsx` - Griglia ricette
- [x] `hooks/index.ts` - Hooks (placeholder)
- [x] `index.ts` - Barrel export

**Techniques Feature** (`features/techniques/`)
- [x] `types/index.ts` - Tipi specifici tecniche (reexport da core)
- [x] `services/techniqueService.ts` - Servizi dati (getTechniques, getTechniqueBySlug, getAllTechniques)
- [x] `components/list/TechniqueCard.tsx` - Card tecnica migrata e refactorizzata
- [x] `index.ts` - Barrel export

**Science Feature** (`features/science/`)
- [x] `types/index.ts` - Tipi specifici articoli scientifici (reexport da core)
- [x] `services/scienceService.ts` - Servizi dati (getScienceArticles, getScienceArticleBySlug)
- [x] `components/list/ScienceCard.tsx` - Card articolo scientifico migrata
- [x] `index.ts` - Barrel export

**Search Feature** (`features/search/`)
- [x] `types/index.ts` - Tipi ricerca (reexport da services)
- [x] `services/searchService.ts` - Ricerca globale e suggerimenti
- [x] `index.ts` - Barrel export

**Favorites Feature** (`features/favorites/`)
- [x] `types/index.ts` - Tipi preferiti (reexport da hooks)
- [x] `components/FavoriteButton.tsx` - Bottone preferito (già esistente)
- [x] `hooks/useFavorites.ts` - Hook per gestione preferiti con localStorage
- [x] `index.ts` - Barrel export

---

## 🏗️ Nuova Struttura

```
src/
├── app/                          # Solo routing (App Router)
│   ├── (auth)/                   # Route group auth
│   ├── (main)/                   # Route group pubblico
│   │   ├── recipes/
│   │   ├── techniques/
│   │   └── science/
│   ├── api/
│   └── layout.tsx
│
├── core/                         # CODICE CONDIVISO
│   ├── components/
│   │   └── ui/                   # Button, Input, Badge, Card
│   ├── hooks/                    # Hook globali
│   ├── lib/                      # sanityClient, prisma
│   ├── types/                    # Tipi TypeScript globali
│   ├── utils/                    # Funzioni utility pure
│   └── constants/                # Costanti globali
│
├── features/                     # MODULI DI BUSINESS
│   ├── recipes/
│   │   ├── components/
│   │   │   ├── list/             # RecipeCard, RecipeGrid
│   │   │   ├── detail/           # Componenti dettaglio
│   │   │   └── shared/           # Componenti condivisi
│   │   ├── services/             # recipeService.ts
│   │   ├── hooks/                # useRecipeSearch, etc.
│   │   ├── types/                # Tipi specifici
│   │   └── index.ts              # Barrel export
│   │
│   ├── techniques/               # Stessa struttura
│   ├── science/                  # Stessa struttura
│   ├── search/                   # Stessa struttura
│   ├── favorites/                # Stessa struttura
│   └── auth/                     # Da implementare
│
└── public/                       # Asset statici
```

---

## 📖 Regole di Import

### ✅ DO's (Cosa Fare)

1. **Importa dal barrel export delle feature:**
   ```typescript
   // ✅ CORRETTO
   import { RecipeCard, getRecipes } from '@/features/recipes'
   import { TechniqueCard } from '@/features/techniques'
   import { ScienceCard } from '@/features/science'
   import { useFavorites } from '@/features/favorites'
   ```

2. **Usa i tipi da core/types:**
   ```typescript
   // ✅ CORRETTO
   import type { Recipe, Technique, ScienceArticle } from '@/core/types'
   ```

3. **Usa le utility da core/utils:**
   ```typescript
   // ✅ CORRETTO
   import { cn, formatDuration, formatDate } from '@/core/utils'
   ```

4. **Usa i client da core/lib:**
   ```typescript
   // ✅ CORRETTO
   import { sanityClient } from '@/core/lib/clients'
   ```

### ❌ DON'Ts (Cosa Non Fare)

1. **Non importare direttamente dai file interni:**
   ```typescript
   // ❌ SBAGLIATO
   import RecipeCard from '@/features/recipes/components/list/RecipeCard'
   
   // ✅ CORRETTO
   import { RecipeCard } from '@/features/recipes'
   ```

2. **Non importare tra feature direttamente:**
   ```typescript
   // ❌ SBAGLIATO
   import { RecipeCard } from '@/features/recipes/components/RecipeCard'
   
   // ✅ CORRETTO - Usa componenti core se necessario
   import { Card } from '@/core/components/ui/card'
   ```

3. **Non duplicare codice:**
   - Se una utility è utile in più feature → spostala in `core/utils`
   - Se un componente è riutilizzabile → spostalo in `core/components`

---

## 🔧 Prossimi Passi

### Componenti da Migrare (Priorità Alta)

#### Recipes Detail Components
- [ ] `RecipeHero.tsx`
- [ ] `RecipeInfo.tsx`
- [ ] `RecipeIngredients.tsx`
- [ ] `RecipeInstructions.tsx`
- [ ] `RecipeNutrition.tsx`
- [ ] `RecipeStorage.tsx`
- [ ] `RecipeWhenToUse.tsx`
- [ ] `RecipeRelated.tsx`
- [ ] `RecipeActions.tsx`

#### Recipes List Components
- [ ] `RecipesList.tsx`
- [ ] `RecipesLoading.tsx`
- [ ] `RecipeSearch.tsx`
- [ ] `RecipeSort.tsx`
- [ ] `ActiveFilters.tsx`
- [ ] `RecipeHorizontalFilters.tsx`
- [ ] `SearchBar.tsx`
- [ ] `Pagination.tsx`

#### Techniques Detail Components
- [ ] `TechniqueHero.tsx`
- [ ] `TechniqueInfo.tsx`
- [ ] `TechniqueIntroduction.tsx`
- [ ] `TechniqueKeyPoints.tsx`
- [ ] `TechniqueSteps.tsx`
- [ ] `TechniqueEquipment.tsx`
- [ ] `TechniqueTroubleshooting.tsx`
- [ ] `TechniqueVariations.tsx`
- [ ] `TechniqueRelated.tsx`

#### Techniques List Components
- [ ] `TechniquesList.tsx`
- [ ] `TechniquesLoading.tsx`

#### Science Detail Components
- [ ] `ScienceHero.tsx`
- [ ] `ScienceInfo.tsx`
- [ ] `ScienceIntroduction.tsx`
- [ ] `ScienceSections.tsx`
- [ ] `ScienceKeyTakeaways.tsx`
- [ ] `ScienceExperiments.tsx`
- [ ] `SciencePracticalApplications.tsx`
- [ ] `ScienceReferences.tsx`
- [ ] `ScienceConclusion.tsx`
- [ ] `ScienceRelated.tsx`

#### Science List Components
- [ ] `ScienceList.tsx`
- [ ] `ScienceLoading.tsx`

#### Search Components
- [ ] `SearchModal.tsx`
- [ ] `SearchResults.tsx`
- [ ] `SearchContent.tsx`
- [ ] `SearchBar.tsx`
- [ ] `SearchFilters.tsx`

### Pagine da Aggiornare
- [ ] `app/(main)/ricette/page.tsx`
- [ ] `app/(main)/ricette/[slug]/page.tsx`
- [ ] `app/(main)/tecniche/page.tsx`
- [ ] `app/(main)/tecniche/[slug]/page.tsx`
- [ ] `app/(main)/scienza/page.tsx`
- [ ] `app/(main)/scienza/[slug]/page.tsx`
- [ ] `app/(main)/search/page.tsx`

### Pulizia Finale
- [ ] Verificare tutti gli import
- [ ] Rimuovere vecchie cartelle `src/components/recipes/`
- [ ] Rimuovere vecchie cartelle `src/components/technique/`
- [ ] Rimuovere vecchie cartelle `src/components/science/`
- [ ] Rimuovere `src/lib/data/*.ts` (ora sono nei services)
- [ ] Aggiornare documentazione API

---

## 🚀 Comandi Utili

### Trovare import da aggiornare
```bash
# Cerca import dalle vecchie posizioni
grep -r "from '@/components/recipes" src/
grep -r "from '@/components/technique" src/
grep -r "from '@/components/science" src/
grep -r "from '@/lib/data" src/
```

### Verificare la struttura
```bash
# Visualizza la nuova struttura
find src/features -type f -name "*.ts" -o -name "*.tsx" | sort
find src/core -type f -name "*.ts" -o -name "*.tsx" | sort
```

---

## 📝 Esempi di Utilizzo

### Pagina Lista Ricette
```typescript
// app/(main)/ricette/page.tsx
import { getRecipes, RecipeGrid } from '@/features/recipes'
import { getRecipeCategories } from '@/features/recipes'

export default async function RecipesPage({ searchParams }: Props) {
  const filters = {
    category: searchParams.category,
    difficulty: searchParams.difficulty,
    page: Number(searchParams.page) || 1,
  }
  
  const { recipes, total, hasMore } = await getRecipes(filters)
  const categories = await getRecipeCategories()
  
  return (
    <div>
      <h1>Ricette</h1>
      <RecipeGrid recipes={recipes} />
    </div>
  )
}
```

### Componente con Preferiti
```typescript
'use client'
import { useFavorites } from '@/features/favorites'
import { RecipeCard } from '@/features/recipes'

export function FavoritesList() {
  const { favorites, removeFavorite } = useFavorites()
  
  return (
    <div>
      {favorites.map(fav => (
        <div key={fav.itemId}>
          <button onClick={() => removeFavorite(fav.itemId)}>
            Rimuovi
          </button>
        </div>
      ))}
    </div>
  )
}
```

### Ricerca Globale
```typescript
import { search } from '@/features/search'

export default async function SearchPage({ query }: Props) {
  const { results, total } = await search(query, {
    types: ['recipe', 'technique', 'scienceArticle'],
    limit: 20,
  })
  
  return (
    <div>
      <h1>Risultati: {total}</h1>
      {/* Render risultati */}
    </div>
  )
}
```

---

## 🎯 Benefici della Nuova Architettura

1. **Scalabilità**: Nuove feature aggiunte come moduli isolati senza impattare il resto
2. **Manutenibilità**: Tutto il codice correlato a una feature è nello stesso posto
3. **Niente Duplicazione**: Core centralizzato per codice condiviso
4. **Performance**: Services ottimizzati con caching strategico
5. **Testing**: Moduli isolati facilitano unit test e integration test
6. **Onboarding**: Nuova struttura intuitiva per nuovi sviluppatori
