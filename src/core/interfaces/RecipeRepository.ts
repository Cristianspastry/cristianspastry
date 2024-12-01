// import { Recipe } from "../entities/Recipe";

import Recipe from "../entities/Recipe";

export interface RecipeRepository {
    getAllRecipes(): Promise<Recipe[]>;
    getRecipeBySlug(slug: string): Promise<Recipe | null>;
    addRecipe(recipe: Recipe): Promise<string>;
    updateRecipe(id: string, recipeData: Partial<Recipe>): Promise<void>;
    deleteRecipe(id: string): Promise<void>;
    getRecipebyId(id: string): Promise<Recipe | null>;
    getRecipesByCategory(category: string): Promise<Recipe[]>
    searchRecipes(searchTerm: string): Promise<Recipe[]>
    getRecentRecipes(count: number): Promise<Recipe[]>
    
}
