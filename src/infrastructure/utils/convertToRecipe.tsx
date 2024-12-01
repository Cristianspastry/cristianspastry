import Recipe, {Ingredient, IngredientGroup } from "@/core/entities/Recipe";
import { DocumentData, Timestamp } from "firebase/firestore";

export default function convertToRecipe(id: string, data: DocumentData): Recipe {
    // Helper function to safely convert Firestore Timestamp to ISO string
    const formatFirebaseDate = (timestamp: Timestamp | null | undefined): string => {
      if (!timestamp || !(timestamp instanceof Timestamp)) {
        return new Date().toISOString();
      }
      return timestamp.toDate().toISOString();
    };
  
    // Helper function to ensure array of strings
    const ensureStringArray = (arr: unknown): string[] => {
      if (!Array.isArray(arr)) return [];
      return arr.map(item => String(item || ''));
    };
  
    // Helper function to format ingredient groups
    const formatIngredientGroups = (groups: { name: unknown, ingredients: unknown }[]): IngredientGroup[] => {
      if (!Array.isArray(groups)) return [];
      return groups.map(group => ({
        name: String(group.name || ''), // Cast the name safely to string
        ingredients: Array.isArray(group.ingredients)
          ? (group.ingredients as { name: unknown; quantity: unknown; unit: unknown }[]).map(formatIngredient)
          : []
      }));
    };
  
    // Helper function to format simple ingredients
    const formatSimpleIngredients = (ingredients: { name: unknown; quantity: unknown; unit: unknown }[]): Ingredient[] => {
      if (!Array.isArray(ingredients)) return [];
      return ingredients.map(formatIngredient);
    };
  
    // Helper function to format an individual ingredient
    const formatIngredient = (ingredient: { name: unknown; quantity: unknown; unit: unknown }): Ingredient => {
      return {
        name: String(ingredient.name || ''),
        quantity: String(ingredient.quantity || ''),
        unit: String(ingredient.unit || '')
      };
    };
  
    // Ensure cooking and preparation times are properly formatted
    // Funzione per formattare il tempo di preparazione/cottura
  /*const formatTime = (time: string | number, unit: string | number): { prepTime: string; prepTimeUnit: string } => ({
    prepTime: String(time || ''),      // Convertiamo 'time' in stringa
    prepTimeUnit: String(unit || '')   // Convertiamo 'unit' in stringa
  });
  
  const formatCookingTime = (time: string | number, unit: string | number): CookingTime => ({
    cookingTime: String(time || ''),
    cookingTimeUnit: String(unit || '')
  });*/

  const combineTimeValues = 
      (time: string | { prepTime: string; prepTimeUnit: string } 
        | { cookingTime: string; cookingTimeUnit: string } ,
        formatTime: (time: string | number, unit: string | number) => string,
        fotmatCookingTime: (time: string | number, unit: string | number) => string
      ): 
        string => {
    if (typeof time === "string") {
      return time; // Se è già una stringa, restituiscila direttamente.
    }
    if ("prepTime" in time) { // Verifica se 'time' contiene la proprietà 'prepTime'
      return formatTime(time.prepTime, time.prepTimeUnit); // Ritorna la stringa formattata
    }
    if ("cookingTime" in time) { // Verifica se 'time' contiene la proprietà 'cookingTime'
      return fotmatCookingTime(time.cookingTime, time.cookingTimeUnit); // Ritorna la stringa formattata
    }
    return ""; // Ritorna una stringa vuota come fallback.
  };
  
    return {
      id,
      title: String(data.title || ''),
      slug: String(data.slug || ''),
      category: String(data.category || ''),
      description: String(data.description || ''),
      imageUrl: String(data.imageUrl || ''),
      difficulty: String(data.difficulty || ''),
      prepTime: combineTimeValues(data.prepTime,data.prepTime.prepTime,data.prepTime.prepTimeUnit),
      cookingTime: combineTimeValues(data.cookingTime,data.cookingTime.cookingTime,data.cookingTime.cookingTimeUnit),
      moldSize: String(data.moldSize || ''),
      portions: String(data.portions || ''),
      cost: String(data.cost || ''),
      useSimpleIngredientList: Boolean(data.useSimpleIngredientList),
      ingredientGroups: formatIngredientGroups(data.ingredientGroups), // Format groups properly
      simpleIngredients: formatSimpleIngredients(data.simpleIngredients), // Format simple ingredients properly
      steps: ensureStringArray(data.steps),
      tips: ensureStringArray(data.tips),
      conservation: String(data.conservation || ''),
      createdAt: formatFirebaseDate(data.createdAt),
      updatedAt: formatFirebaseDate(data.updatedAt),
      isPopular: Boolean(data.isPopular),
      isRecent: Boolean(data.isRecent),
      isSpecial: Boolean(data.isSpecial)
    };
  }