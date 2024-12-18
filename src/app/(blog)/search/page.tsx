// src/app/search/page.tsx
"use client";
// src/app/search/page.tsx
// src/app/search/page.tsx
import { useSearchParams } from 'next/navigation';

import { getFilteredRecipes } from '@/utils/recipeUtils';
import RecipeCard from '@/presentation/components/(BLOG)/card/RecipeCard';
import Recipe from '@/core/entities/Recipe';
import {  Suspense, useEffect, useState ,} from 'react';

function SearchResultsContent() {
    const [query, setQuery] = useState<string>('');
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const queryParam = searchParams.get('query') || ''; // Ottieni il parametro 'query'
        setQuery(queryParam); // Imposta il parametro nel state
        const recipes = getFilteredRecipes(queryParam); // Filtro le ricette
        setFilteredRecipes(recipes); // Imposta le ricette filtrate
    }, [searchParams]); // Esegui di nuovo quando i parametri cambiano

    if (!query) {
        return (
            <div className="container mx-auto px-6 mt-10">Loading ....</div> // Stato di caricamento
        );
    }

    return (
        <>
      
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
     
        </>                             
    );
}

export default function SearchResults() {
    return (
        <Suspense fallback={<div className="container mx-auto px-6 mt-10">Loading ....</div>}>
            <SearchResultsContent />
        </Suspense>
    );
}