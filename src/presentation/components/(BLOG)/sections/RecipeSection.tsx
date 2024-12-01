"use client";

import Recipe from '@/core/entities/Recipe';
import RecipeCard from '../card/RecipeCard';

interface RecipeSectionProps {
    sectionTitle: string;
    recipes: Recipe[];
}

const RecipeSection: React.FC<RecipeSectionProps> = ({ sectionTitle, recipes }) => {
    
    return (
        <section className="w-full">
            <h2 id='section-recipes' className="text-3xl font-bold mb-8 text-gray-800">
                {sectionTitle}
            </h2>
            
            <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recipes.map(({id, slug, title, description, imageUrl, prepTime, difficulty, cost}: Recipe) => (
                    <RecipeCard
                        key={id}
                        slug={slug} 
                        title={title}
                        description={description}
                        imageUrl={imageUrl}
                        prepTime={prepTime}
                        difficulty={difficulty}
                        cost={cost}                       
                    />
                 ))}
            </div>
        </section>
    );
};

export default RecipeSection;
