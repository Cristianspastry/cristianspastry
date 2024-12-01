import React from "react";
import HeroSection from "@/presentation/components/(BLOG)/sections/HeroSection";
import RecipeSection from "@/presentation/components/(BLOG)/sections/RecipeSection";
import { FirestoreRecipeRepository } from "@/data/repositories/FirestoreRecipeRepository";
import { GetAllRecipesUseCase } from "@/core/usecases/GetAllRecipesUseCase";

export default async function Home() {


     // Recupera le ricette tramite il caso d’uso
    const recipeRepository = new FirestoreRecipeRepository();
    const getAllRecipesUseCase = new GetAllRecipesUseCase(recipeRepository);

    const recipes = await getAllRecipesUseCase.execute();

    // Filtro per sezioni (ad esempio, popolari e recenti)
    const popularRecipes = recipes.filter((recipe) => recipe.isPopular);
    const recentRecipes = recipes.slice(0, 5); // Prendi le prime 5 ricette recenti

    return (
        <main className="flex flex-col min-h-screen">
           
            {/* Hero Section */}
            <HeroSection />

            {/* Content Sections */}
            <div className="container mx-auto px-6 py-16 space-y-16">
              
                {/* Recipe Section */}
                <RecipeSection 
                    sectionTitle="Ricette Popolari"
                    recipes={recipes}
                />
                <RecipeSection 
                    sectionTitle=" Ricette Recenti"
                    recipes={popularRecipes}
                />
                <RecipeSection 
                    sectionTitle=" Ricette Speciali"
                    recipes={recentRecipes.slice(0, 4)}
                />

            </div>
        </main>
    );
}