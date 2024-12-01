import React from 'react'
import { Constants } from '@/infrastructure/utils/constants'
import Recipe, { Ingredient } from '@/core/entities/Recipe'

interface RecipeIngredientSectionProps {
  recipe: Recipe
  setRecipe: React.Dispatch<React.SetStateAction<Recipe>>
  errors: Partial<Record<keyof Recipe, string>>
  handleIngredientChange: (groupIndex: number, ingredientIndex: number, field: keyof Ingredient, value: string) => void
  addIngredient: (groupIndex?: number) => void
  removeIngredient: (groupIndex: number, ingredientIndex: number) => void
  addIngredientGroup: () => void
  removeIngredientGroup: (groupIndex: number) => void
}

export default function RecipeIngredientSection({
  recipe,
  setRecipe,
  errors,
  handleIngredientChange,
  addIngredient,
  removeIngredient,
  addIngredientGroup,
  removeIngredientGroup
}: RecipeIngredientSectionProps) {
  return (
    <>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={recipe.useSimpleIngredientList}
            onChange={() => setRecipe(prev => ({ 
              ...prev, 
              useSimpleIngredientList: !prev.useSimpleIngredientList 
            }))}
            className="mr-2"
          />
          Usa lista semplice di ingredienti
        </label>
      </div>

      {recipe.useSimpleIngredientList ? (
        <SimpleIngredientList 
          recipe={recipe}
          errors={errors}
          handleIngredientChange={handleIngredientChange}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          addIngredientGroup={addIngredientGroup}
          removeIngredientGroup={removeIngredientGroup}
          setRecipe={setRecipe}
        />
      ) : (
        <GroupedIngredientList 
          recipe={recipe}
          errors={errors}
          handleIngredientChange={handleIngredientChange}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          addIngredientGroup={addIngredientGroup}
          removeIngredientGroup={removeIngredientGroup}
          setRecipe={setRecipe}
        />
      )}
      {errors.ingredientGroups && <p className="text-red-500 text-sm mt-1">{errors.ingredientGroups}</p>}
    </>
  )
}

const SimpleIngredientList: React.FC<RecipeIngredientSectionProps> = ({
  recipe,
  handleIngredientChange,
  addIngredient,
  removeIngredient
}) => (
  <div className="mb-4">
    <h3 className="font-bold mb-2">Ingredienti</h3>
    {recipe.simpleIngredients.map((ingredient, index) => (
      <div key={index} className="flex mb-2 items-center">
        <input
          type="number"
          value={ingredient.quantity}
          onChange={(e) => handleIngredientChange(0, index, 'quantity', e.target.value)}
          className="p-2 border rounded mr-2 w-1/4"
          placeholder="Quantità"
        />
        <select
          value={ingredient.unit}
          onChange={(e) => handleIngredientChange(0, index, 'unit', e.target.value)}
          className="p-2 border rounded mr-2 w-1/4"
        >
          <option value="">Unità</option>
          {Constants.QuantityType.map(unit => <option key={unit} value={unit}>{unit}</option>)}
        </select>
        <select
          value={ingredient.name}
          onChange={(e) => handleIngredientChange(0, index, 'name', e.target.value)}
          className="p-2 border rounded mr-2 w-1/4 flex-grow"
        >
          {Object.entries(Constants.Ingredients).map(([categoria, lista]) => (
            <optgroup key={categoria} label={categoria.replace(/([A-Z])/g, " $1").trim()}>
              <option key={`${categoria}-empty`} value="">Seleziona un ingrediente</option>
              {lista.map((ingrediente, index) => (
                <option key={`${categoria}-${ingrediente}-${index}`} value={ingrediente}>
                  {ingrediente}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <button 
          type="button" 
          onClick={() => removeIngredient(0, index)} 
          className="p-2 bg-red-500 text-white rounded"
        >
          Rimuovi
        </button>
      </div>
    ))}
    <button 
      type="button" 
      onClick={() => addIngredient()} 
      className="mt-2 p-2 bg-blue-500 text-white rounded"
    >
      Aggiungi ingrediente
    </button>
  </div>
)

const GroupedIngredientList: React.FC<RecipeIngredientSectionProps> = ({
  recipe,
  handleIngredientChange,
  addIngredient,
  removeIngredient,
  addIngredientGroup,
  removeIngredientGroup,
  setRecipe,
}) => (
  <div className="mb-4">
    <h3 className="font-bold mb-2">Gruppi di Ingredienti</h3>
    {recipe.ingredientGroups.map((group, groupIndex) => (
      <div key={groupIndex} className="mb-4 p-4 border rounded">
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={group.name}
            onChange={(e) => {
              const newGroups = [...recipe.ingredientGroups]
              newGroups[groupIndex].name = e.target.value
              setRecipe(prev => ({ ...prev, ingredientGroups: newGroups }))
            }}
            className="p-2 border rounded mr-2 flex-grow"
            placeholder="Nome del gruppo (opzionale)"
          />
          <button 
            type="button" 
            onClick={() => removeIngredientGroup(groupIndex)} 
            className="p-2 bg-red-500 text-white rounded"
          >
            Rimuovi gruppo
          </button>
        </div>
        {group.ingredients.map((ingredient, ingredientIndex) => (
          <div key={ingredientIndex} className="flex mb-2 items-center">
            <input
              type="text"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(groupIndex, ingredientIndex, 'quantity', e.target.value)}
              className="p-2 border rounded mr-2 w-1/4"
              placeholder="Quantità"
            />
            <select
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(groupIndex, ingredientIndex, 'unit', e.target.value)}
              className="p-2 border rounded mr-2 w-1/4"
            >
              <option value="">Unità</option>
              {Constants.QuantityType.map(unit => <option key={unit} value={unit}>{unit}</option>)}
            </select>
            <select
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(groupIndex, ingredientIndex, 'name', e.target.value)}
              className="p-2 border rounded mr-2 w-1/4 flex-grow"
            >
              {Object.entries(Constants.Ingredients).map(([categoria, lista]) => (
                <optgroup key={categoria} label={categoria.replace(/([A-Z])/g, " $1").trim()}>
                  <option value="">Seleziona un ingrediente</option>
                  {lista.map((ingrediente, index) => (
                    <option key={index} value={ingrediente}>
                      {ingrediente}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <button 
              type="button" 
              onClick={() => removeIngredient(groupIndex, ingredientIndex)} 
              className="p-2 bg-red-500 text-white rounded"
            >
              Rimuovi
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={() => addIngredient(groupIndex)} 
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Aggiungi ingrediente
        </button>
      </div>
    ))}
    <button 
      type="button" 
      onClick={addIngredientGroup} 
      className="mt-2 p-2 bg-green-500 text-white rounded"
    >
      Aggiungi gruppo di ingredienti
    </button>
  </div>
)