// descrizione del file : modello typescript per la struttura di una ricetta



export interface Ingredient {
    quantity: string
    unit: string
    name: string
  }
  
 export  interface IngredientGroup {
    name: string
    ingredients: Ingredient[]
  }

export interface prepTime {
    prepTime: string
    prepTimeUnit: string
  }

  export interface CookingTime {
    cookingTime: string
    cookingTimeUnit: string
  }
  
  interface Recipe {
    id: string

    title: string

    slug: string

    category: string

    description: string

    imageUrl: string

    
    // info della ricetta

    difficulty: string 
    
    prepTime: prepTime | string,

    moldSize: string

    portions : string

    cookingTime : CookingTime | string

    cost : string

    // // // /// //

    useSimpleIngredientList: boolean

    ingredientGroups: IngredientGroup[]

    simpleIngredients: Ingredient[]

    steps: string[]

    tips: string[]

    conservation: string

    createdAt: string

    updatedAt: string

    isPopular: boolean

    isSpecial: boolean

    isRecent: boolean
    
  }


export default Recipe;