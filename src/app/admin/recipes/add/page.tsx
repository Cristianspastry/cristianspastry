
import RecipeForm from '@/presentation/components/(ADMIN)/form/RecipeForm'
import React from 'react'


function AddRecipePage({ }) {

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg border border-gray-300 overflow-y-auto max-h-[90vh]">
        <h1 className="text-3xl font-bold mb-6">
          Aggiungi una ricetta
        </h1>
        <RecipeForm mode="add" />
      </div>
    </div>
  )
}

export default AddRecipePage