import { RecipeRepository } from "@/core/interfaces/RecipeRepository";
import { firestore } from "../datasources/firestore";
import Recipe from "@/core/entities/Recipe";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import convertToRecipe from "@/infrastructure/utils/convertToRecipe";

export class FirestoreRecipeRepository implements RecipeRepository {
    
    async addRecipe(recipe: Omit<Recipe, "id">): Promise<string> { // Omit<Recipe, "id">Recipe): Promise<string> {
        const docRef = await addDoc(collection(firestore, "recipes"), {
            ...recipe,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    }

    async getRecipebyId(id: string): Promise<Recipe | null> {
        const recipeRef = doc(firestore, "recipes", id);
        const recipeSnap = await getDoc(recipeRef);
        if (recipeSnap.exists()) {
            return convertToRecipe(recipeSnap.id, recipeSnap.data());
        } else {
            throw new Error("Recipe not found");

        }
    }

    async getRecipeBySlug(slug: string): Promise<Recipe | null> {
        try {
            const q = query(collection(firestore, "recipes"), where("slug", "==", slug));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                return null;
            }

            const data = querySnapshot.docs[0].data();
            return convertToRecipe(querySnapshot.docs[0].id, data) as Recipe;
        } catch (error) {
            console.error("Error getting recipe by slug:", error);
            return null;
        }
    }

    async getAllRecipes(): Promise<Recipe[]> {
        const recipesSnapshot = await getDocs(collection(firestore, 'recipes'));
        return recipesSnapshot.docs.map(doc => convertToRecipe(doc.id, doc.data()));
    }

    async updateRecipe(id: string, recipeData: Partial<Recipe>): Promise<void> {
        const recipeRef = doc(firestore, 'recipes', id)
        await updateDoc(recipeRef, {
            ...recipeData,
        })
    }

    async deleteRecipe(id: string): Promise<void> {
        const recipeRef = doc(firestore, 'recipes', id)
        await deleteDoc(recipeRef)
    }

    async getRecipesByCategory(category: string): Promise<Recipe[]> {
        const q = query(collection(firestore, 'recipes'), where('category', '==', category))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => convertToRecipe(doc.id, doc.data()))

    }

    async getRecentRecipes(count: number = 5): Promise<Recipe[]> {
        const q = query(
            collection(firestore, 'recipes'),
            orderBy('createdAt', 'desc'),
            limit(count)
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => convertToRecipe(doc.id, doc.data()))
    }

    // Search recipes by title
    async searchRecipes(searchTerm: string): Promise<Recipe[]> {
        // Note: This is a simple implementation and might not be efficient for large datasets
        // For production, consider using a dedicated search service like Algolia
        const q = query(collection(firestore, 'recipes'), where('title', '>=', searchTerm), where('title', '<=', searchTerm + '\uf8ff'))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => convertToRecipe(doc.id, doc.data()))
    }

}
