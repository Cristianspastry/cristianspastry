import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import RecipeSection from "@/components/sections/RecipeSection";
import Recipe from "@/models/recipe";
import { getAllRecipesbyJson } from "@/utils/recipeUtils";

export default async function Home() {

    const recipes = await getAllRecipesbyJson();
    console.log(recipes);

    const popularRecipes = recipes.filter((recipe: Recipe) => recipe.isPopular).slice(0, 4);
    const recentRecipes = recipes.sort((a:Recipe,b:Recipe) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 4);
    const specialRecipes = recipes.filter((recipe: Recipe) => recipe.isSpecial).slice(0, 4);

    /*const popularRecipes = JSON.parse(JSON.stringify(recipeJson)).filter((recipe: Recipe) => recipe.isPopular).slice(0, 4);
    const recentRecipes = JSON.parse(JSON.stringify(recipeJson)).sort(({a, b}: {a: Recipe, b: Recipe}) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 4);
    const specialRecipes = JSON.parse(JSON.stringify(recipeJson)).filter((recipe: Recipe) => recipe.isSpecial).slice(0, 4);
*/
    return (
        <main className="flex flex-col min-h-screen">
           
            {/* Hero Section */}
            <HeroSection />

            {/* Content Sections */}
            <div className="container mx-auto px-6 py-16 space-y-16">
                <RecipeSection
                    sectionTitle="Ricette Popolari"
                    recipes={popularRecipes}
                />
                
                <RecipeSection
                    sectionTitle="Ultime Ricette"
                    recipes={recentRecipes}
                />
                
                <RecipeSection
                    sectionTitle="Ricette per Occasioni Speciali"
                    recipes={specialRecipes}
                />
            </div>
        </main>
    );
}