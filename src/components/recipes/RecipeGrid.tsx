// components/recipes/RecipeGrid.tsx
// Componente opzionale per gestire la griglia di ricette

import type { Recipe } from "@/sanity/lib/types"
import  RecipeCard  from "./RecipeCard"

interface RecipeGridProps {
    recipes: Recipe[]
    columns?: 2 | 3 | 4
  }
  
  export function RecipeGrid({ recipes, columns = 3 }: RecipeGridProps) {
    const gridCols = {
      2: 'grid-cols-1 lg:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
    }
  
    return (
      <div className={`grid gap-8 ${gridCols[columns]}`}>
        {recipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} index={index} key={recipe._id}  />
        ))}
      </div>
    )
  }