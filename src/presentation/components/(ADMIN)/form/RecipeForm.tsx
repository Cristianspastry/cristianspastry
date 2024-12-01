'use client'

import React from 'react'
import { useRecipeForm } from '@/presentation/hooks/useRecipeForm'
import Recipe from '@/core/entities/Recipe'
import RecipeGeneralInfoSection from './RecipeGeneralInfoSection'
import RecipeIngredientSection from './RecipeIngredientSection'
import RecipeStepsSection from './RecipeStepsSection'

interface RecipeFormProps {
  initialRecipe?: Recipe
  mode: 'add' | 'edit'
}

export default function RecipeForm({ initialRecipe, mode }: RecipeFormProps) {
  const {
    recipe,
    setRecipe,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleDescriptionChange,
    handleTimeChange,
    handleIngredientChange,
    addIngredient,
    removeIngredient,
    addIngredientGroup,
    removeIngredientGroup,
    addStep,
    removeStep,
    updateStep,
    addTip,
    removeTip,
    updateTip,
    handleSubmit
  } = useRecipeForm(
    initialRecipe || {
      id : '',
      title : '',
      slug : '',
      category : '',
      description : '',
      imageUrl : '',
      difficulty : '',
      moldSize : '',
      portions : '',
      cookingTime : { cookingTime : '', cookingTimeUnit : '' },
      cost : '',
      prepTime : 
      { 
        prepTime : '', 
        prepTimeUnit : '' 
      },
      useSimpleIngredientList : false,
      ingredientGroups : [],
      simpleIngredients : [],
      steps : [],
      tips : [],
      conservation : '',
      createdAt : '',
      updatedAt : '',
      isPopular : false,
      isSpecial : false,
      isRecent : false
    },
    mode
  )

  return (
    <form action={mode} onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <RecipeGeneralInfoSection
        recipe={recipe}
        errors={errors}
        handleChange={handleChange}
        handleDescriptionChange={handleDescriptionChange}
        handleTimeChange={handleTimeChange}
        addTip={addTip}
        removeTip={removeTip}
        updateTip={updateTip}
       
      />

      <RecipeIngredientSection
        recipe={recipe}
        setRecipe={setRecipe}
        errors={errors}
        handleIngredientChange={handleIngredientChange}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        addIngredientGroup={addIngredientGroup}
        removeIngredientGroup={removeIngredientGroup}
      />

      <RecipeStepsSection
        steps={recipe.steps}
        errors={errors}
        addStep={addStep}
        removeStep={removeStep}
        updateStep={updateStep}
      />

      

      {submitError && <p className="text-red-500 mb-4">{submitError}</p>}

      <button 
        type="submit" 
        className="w-full p-2 bg-green-500 text-white rounded" 
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? (mode === 'add' ? 'Aggiunta in corso...' : 'Aggiornamento in corso...') 
          : (mode === 'add' ? 'Aggiungi ricetta' : 'Aggiorna ricetta')
        }
      </button>
    </form>
  )
}