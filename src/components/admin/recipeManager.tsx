// components/RecipeManager.tsx
'use client'

import { useState, useEffect, useCallback } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Recipe, IngredientGroup } from '@/models/recipe';
import RecipeForm from './form/AddRecipeForm/addRecipeForm';
const RecipeManager = () => {
  
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Aggiungi una nuova ricetta</h2>
        <RecipeForm />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Ricette esistenti</h2>
        {recipes.map(recipe => (
          <div key={recipe.id} className="mb-4 p-4 bg-white shadow-md rounded-lg">
            {/* Dettagli della ricetta... */}
            <button
              onClick={() => handleDelete(recipe.id.toString())}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Elimina
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeManager;