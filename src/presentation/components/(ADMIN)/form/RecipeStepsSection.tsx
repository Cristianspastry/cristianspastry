import React from 'react'
import Recipe from '@/core/entities/Recipe'

interface RecipeStepsSectionProps {
  steps: string[]
  errors: Partial<Record<keyof Recipe, string>>
  addStep: () => void
  removeStep: (index: number) => void
  updateStep: (index: number, value: string) => void
}

export default function RecipeStepsSection({ 
  steps, 
  errors, 
  addStep, 
  removeStep, 
  updateStep 
}: RecipeStepsSectionProps) {
  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Procedimento</h3>
      {steps.map((step, index) => (
        <div key={index} className="mb-2 flex items-start">
          <textarea
            value={step}
            onChange={(e) => updateStep(index, e.target.value)}
            className="p-2 border rounded mr-2 flex-grow"
            placeholder={`Passo ${index + 1}`}
          />
          <button 
            type="button" 
            onClick={() => removeStep(index)} 
            className="p-2 bg-red-500 text-white rounded"
          >
            Rimuovi
          </button>
        </div>
      ))}
      <button 
        type="button" 
        onClick={addStep} 
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Aggiungi passo
      </button>
      {errors.steps && <p className="text-red-500">{errors.steps}</p>}
    </div>
  )
}