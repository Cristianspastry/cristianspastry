import  Recipe  from '@/models/recipe';
import { allRecipes } from '@/data/recipe';
export function getFilteredRecipes(query: string): Recipe[] {
    return allRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
    );
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
    return allRecipes.find(recipe => recipe.slug === slug);
}