"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import Recipe from '@/models/recipe';
import Link from 'next/link';
import AdminRecipeCard from '@/components/admin/card/recipeCard';
import { useRouter } from 'next/navigation';

export default function RecipesAdminPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesCollection = collection(db, 'recipes');
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesList = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
      setRecipes(recipesList);
    };
    fetchRecipes();
  }, []);

  const handleEdit = (recipeId: string) => {
    router.push(`/admin/recipes/edit/${recipeId}`);
  };

  const onDelete = async (recipeId: string) => {
    try {
      await deleteDoc(doc(db, 'recipes', recipeId));
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold mb-6">Gestione delle Ricette</h1>
      </div>

      <div className="mb-4">
        <Link href="/admin/recipes/add" passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Aggiungi Ricetta
          </button>
        </Link>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Lista Ricette</h3>
        {recipes.map(recipe => (
          <AdminRecipeCard 
            key={recipe.id}
            {...recipe}
            onEdit={() => handleEdit(recipe.id)}
            onDelete={() => onDelete(recipe.id)}
          />
        ))}
      </div>


    </div>
  );
}