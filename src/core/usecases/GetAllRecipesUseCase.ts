// src/core/usecases/GetAllRecipesUseCase.tsì

import Recipe from "../entities/Recipe";
import { RecipeRepository } from "../interfaces/RecipeRepository";


export class GetAllRecipesUseCase {
    private recipeRepository: RecipeRepository;

    constructor(recipeRepository: RecipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    async execute(): Promise<Recipe[]> {
        return await this.recipeRepository.getAllRecipes();
    }
}
