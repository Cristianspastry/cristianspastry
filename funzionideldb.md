import { db } from '../infrastructure/firebase'
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy,limit, DocumentData, Timestamp } from 'firebase/firestore'
import Recipe, { CookingTime, Ingredient, IngredientGroup } from '@/core/entities/Recipe'

function convertToRecipe(id: string, data: DocumentData): Recipe {
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
const formatTime = (time: string | number, unit: string | number): { prepTime: string; prepTimeUnit: string } => ({
  prepTime: String(time || ''),      // Convertiamo 'time' in stringa
  prepTimeUnit: String(unit || '')   // Convertiamo 'unit' in stringa
});

const formatCookingTime = (time: string | number, unit: string | number): CookingTime => ({
  cookingTime: String(time || ''),
  cookingTimeUnit: String(unit || '')
});

  return {
    id,
    title: String(data.title || ''),
    slug: String(data.slug || ''),
    category: String(data.category || ''),
    description: String(data.description || ''),
    imageUrl: String(data.imageUrl || ''),
    difficulty: String(data.difficulty || ''),
    prepTime: formatTime(data.prepTime, data.prepTimeUnit),
    cookingTime: formatCookingTime(data.cookingTime, data.cookingTimeUnit),
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


// Create a new recipe
export async function createRecipe(recipe: Omit<Recipe, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'recipes'), {
    ...recipe,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  return docRef.id
}

// Get a single recipe by ID
export async function getRecipebyId(id: string): Promise<Recipe | null> {
  const recipeRef = doc(db, 'recipes', id)
  const recipeSnap = await getDoc(recipeRef)

  if (recipeSnap.exists()) {
    return convertToRecipe(recipeSnap.id, recipeSnap.data())
  } else {
    return null
  }
}

// Get a single recipe by slug
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  
  
 try { const q = query(collection(db, 'recipes'), where('slug', '==', slug))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) return null;

  const data = querySnapshot.docs[0].data();

  const combineTimeValues = (time: string | { prepTime: string; prepTimeUnit: string } | { cookingTime: string; cookingTimeUnit: string }): string => {
    if (typeof time === "string") {
      return time; // Se è già una stringa, restituiscila direttamente.
    }
    if ("prepTime" in time) {
      return `${time.prepTime} ${time.prepTimeUnit}`;
    }
    if ("cookingTime" in time) {
      return `${time.cookingTime} ${time.cookingTimeUnit}`;
    }
    return ""; // Ritorna una stringa vuota come fallback.
  };
  

  // Trasforma i dati recuperati nel modello `Recipe`
  const recipe : Recipe = {
    id: querySnapshot.docs[0].id,
    title: data.title,
    slug: data.slug,
    category: data.category,
    description: data.description,
    imageUrl: data.imageUrl,
    difficulty: data.difficulty,
    prepTime: combineTimeValues(data.prepTime),
    cookingTime: combineTimeValues(data.cookingTime),
    moldSize: data.moldSize || "",
    portions: data.portions || "",
    cost: data.cost || "",
    useSimpleIngredientList: data.useSimpleIngredientList || false,
    ingredientGroups: data.ingredientGroups || [],
    simpleIngredients: data.simpleIngredients || [],
    steps: data.steps || [],
    tips: data.tips || "",
    conservation: data.conservation || "",
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    isPopular: data.isPopular || false,
    isSpecial: data.isSpecial || false,
    isRecent: data.isRecent || false,
  }; 
  


  console.log('Ricetta recuperata:', recipe)

  return recipe;
} catch (error) {
  console.error('Errore nel recupero della ricetta:', error)
  return null
}

}

// Get all recipes
export async function getAllRecipes(): Promise<Recipe[]> {
  const recipesSnapshot = await getDocs(collection(db, 'recipes'));
  return recipesSnapshot.docs.map(doc => convertToRecipe(doc.id, doc.data()));
}

// Update a recipe
export async function updateRecipe(id: string, recipeData: Partial<Recipe>): Promise<void> {
  const recipeRef = doc(db, 'recipes', id)
  await updateDoc(recipeRef, {
    ...recipeData,
    updatedAt: new Date()
  })
}

// Delete a recipe
export async function deleteRecipe(id: string): Promise<void> {
  const recipeRef = doc(db, 'recipes', id)
  await deleteDoc(recipeRef)
}

// Get recipes by category
export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  const q = query(collection(db, 'recipes'), where('category', '==', category))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => convertToRecipe(doc.id, doc.data()))
}

// Get recent recipes
export async function getRecentRecipes(count: number = 5): Promise<Recipe[]> {
    const q = query(
      collection(db, 'recipes'), 
      orderBy('createdAt', 'desc'), 
      limit(count)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertToRecipe(doc.id, doc.data()))
  }

// Search recipes by title
export async function searchRecipes(searchTerm: string): Promise<Recipe[]> {
  // Note: This is a simple implementation and might not be efficient for large datasets
  // For production, consider using a dedicated search service like Algolia
  const q = query(collection(db, 'recipes'), where('title', '>=', searchTerm), where('title', '<=', searchTerm + '\uf8ff'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => convertToRecipe(doc.id, doc.data()))
}

