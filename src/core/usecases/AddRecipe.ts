import Recipe from "../entities/Recipe";
import { RecipeRepository } from "../interfaces/RecipeRepository";

export class AddRecipeUseCase {
    constructor(private recipeRepository: RecipeRepository) {}

    async execute(recipe: Recipe): Promise<void> {
        return this.recipeRepository.addRecipe(recipe);
    }
}
