import Recipe from '@/models/recipe';
import RecipeCard from '../card/RecipeCard';

interface RecipeSectionProps {
    sectionTitle: string;
    recipes: Recipe[];
}

const RecipeSection: React.FC<RecipeSectionProps> = ({ sectionTitle, recipes }) => {
    return (
        <section className="w-full">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
                {sectionTitle}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} {...recipe} />
                ))}
            </div>
        </section>
    );
};

export default RecipeSection;
