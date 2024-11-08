// Home.tsx
"use client";

import HeroSection from "@/components/sections/HeroSection";
import RecipeSection from "@/components/sections/RecipeSection";
import { allRecipes } from "@/data/recipe";

export default function Home() {
    // Filtra le ricette per sezione
    const popularRecipes = allRecipes.filter(recipe => recipe.isPopular).slice(0, 4);
    const recentRecipes = allRecipes.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 4);
    const specialRecipes = allRecipes.filter(recipe => recipe.isSpecial).slice(0, 4);

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