import { StaticImageData } from "next/image";



export type IngredientGroup = {
    name: string;
    ingredients: string[];
}

// src/models/recipe.ts
interface Recipe {
    id: number;
    slug : string;
    title: string;
    category?: string;
    description: string;
    image: string | StaticImageData;
    prepTime: string;
    difficulty: string;
    moldSize?: string;
    ingredients: IngredientGroup[] | string[];
    steps: string[]; 
    isSpecial: boolean;
    createdAt: string | number | Date;
    isPopular: boolean;
    tips? : string[];
    conservation?: string;
}
export default Recipe;