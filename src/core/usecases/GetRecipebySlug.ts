import Recipe from "../entities/Recipe";
import { RecipeRepository } from "../interfaces/RecipeRepository";

export class GetRecipebySlugUseCase {
 
    private recipeRepository: RecipeRepository;

    constructor(recipeRepository: RecipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    async execute(slug: string): Promise<Recipe | null> {
        if (!slug) {
            throw new Error("Lo slug non può essere vuoto.");
        }

        return await this.recipeRepository.getRecipeBySlug(slug);
    }
}
