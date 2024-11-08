// src/app/search/page.tsx
"use client";
// src/app/search/page.tsx
// src/app/search/page.tsx
import { useSearchParams } from 'next/navigation';

import { getFilteredRecipes } from '@/utils/recipeUtils';
import RecipeCard from '@/components/card/RecipeCard';
import Recipe from '@/models/recipe';
import { Suspense } from 'react';

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    const filteredRecipes: Recipe[] = getFilteredRecipes(query);

   if(query === null) {
    return (
        <div className="container mx-auto px-6 mt-10">Loading ....</div>
    );
   }

    return (
       <Suspense fallback={<div>Loading...</div>}>
        <div className="container mx-auto px-6 mt-10">
            <h1 className="text-2xl font-bold mb-6">Risultati della ricerca per: &quot;{query}&quot;</h1>
            
            {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id}
                           {...recipe}                     />
                    ))}
                </div>
            ) : (
                <p className="text-lg text-gray-600">Nessun risultato trovato per &quot;{query}&quot;.</p>
            )}
        </div>
      </Suspense>
    );
}

