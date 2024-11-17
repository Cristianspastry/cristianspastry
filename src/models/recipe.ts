import { StaticImageData } from "next/image";

export interface Ingredient {
    quantity: string
    unit: string
    name: string
  }
  
 export  interface IngredientGroup {
    name: string
    ingredients: Ingredient[]
  }
  
  interface Recipe {
    id: string
    title: string
    slug: string
    category: string
    description: string
    imageUrl: string
    difficulty: string
    prepTime: string
    prepTimeUnit: string
    panSize: string
    useSimpleIngredientList: boolean
    ingredientGroups: IngredientGroup[]
    simpleIngredients: Ingredient[]
    steps: string[]
    notes: string
    storage: string
  }

export interface RecipeFormData extends Omit<Recipe, 'id' | 'createdAt' | 'image'> {
    image: string | StaticImageData;
}

export default Recipe;