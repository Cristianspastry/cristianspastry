
"use client"

import React, { useState } from 'react'
import TextEditor from '../RichTextEditor'
import Form from 'next/form'
import Recipe, { Ingredient } from '@/models/recipe'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { Constants } from '@/utils/constants'
import { uuidv7 } from 'uuidv7'



const AddRecipeForm = () => {
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe>({
    id: uuidv7(),
    title: '',
    slug: '',
    category: '',
    description: '',
    imageUrl: '',
    difficulty: '',
    prepTime: '',
    prepTimeUnit: '',
    panSize: '',
    useSimpleIngredientList: false,
    ingredientGroups: [{ name: '', ingredients: [{ quantity: '', unit: '', name: '' }] }],
    simpleIngredients: [{ quantity: '', unit: '', name: '' }],
    steps: [''],
    notes: '',
    storage: ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof Recipe, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setRecipe(prev => ({ ...prev, [name]: value }))
    if (name === 'title') {
      setRecipe(prev => ({ ...prev, slug: generateSlug(value) }))
    }
  }

  const handleDescriptionChange = (content: string) => {
    setRecipe(prev => ({ ...prev, description: content }))
  }

  const handleIngredientChange = (groupIndex: number, ingredientIndex: number, field: keyof Ingredient, value: string) => {
    setRecipe(prev => {
      const newRecipe = { ...prev }
      if (prev.useSimpleIngredientList) {
        newRecipe.simpleIngredients[ingredientIndex][field] = value
      } else {
        newRecipe.ingredientGroups[groupIndex].ingredients[ingredientIndex][field] = value
      }
      return newRecipe
    })
  }

  const addIngredient = (groupIndex?: number) => {
    setRecipe(prev => {
      const newRecipe = { ...prev }
      if (prev.useSimpleIngredientList) {
        newRecipe.simpleIngredients.push({ quantity: '', unit: '', name: '' })
      } else {
        newRecipe.ingredientGroups[groupIndex!].ingredients.push({ quantity: '', unit: '', name: '' })
      }
      return newRecipe
    })
  }

  const removeIngredient = (groupIndex: number, ingredientIndex: number) => {
    setRecipe(prev => {
      const newRecipe = { ...prev }
      if (prev.useSimpleIngredientList) {
        newRecipe.simpleIngredients = newRecipe.simpleIngredients.filter((_, index) => index !== ingredientIndex)
      } else {
        newRecipe.ingredientGroups[groupIndex].ingredients = newRecipe.ingredientGroups[groupIndex].ingredients.filter((_, index) => index !== ingredientIndex)
      }
      return newRecipe
    })
  }

  const addIngredientGroup = () => {
    setRecipe(prev => ({
      ...prev,
      ingredientGroups: [...prev.ingredientGroups, { name: '', ingredients: [{ quantity: '', unit: '', name: '' }] }]
    }))
  }

  const removeIngredientGroup = (groupIndex: number) => {
    setRecipe(prev => ({
      ...prev,
      ingredientGroups: prev.ingredientGroups.filter((_, index) => index !== groupIndex)
    }))
  }

  const addStep = () => {
    setRecipe(prev => ({ ...prev, steps: [...prev.steps, ''] }))
  }

  const removeStep = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }))
  }

  const updateStep = (index: number, value: string) => {
    setRecipe(prev => {
      const newSteps = [...prev.steps]
      newSteps[index] = value
      return { ...prev, steps: newSteps }
    })
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Recipe, string>> = {}

    if (!recipe.title.trim()) newErrors.title = 'Il titolo è obbligatorio'
    if (!recipe.category) newErrors.category = 'La categoria è obbligatoria'
    if (!recipe.difficulty) newErrors.difficulty = 'La difficoltà è obbligatoria'
    if (!recipe.prepTime) newErrors.prepTime = 'Il tempo di preparazione è obbligatorio'
    if (!recipe.prepTimeUnit) newErrors.prepTimeUnit = "L'unità di tempo è obbligatoria"

    const ingredientsValid = recipe.useSimpleIngredientList
      ? recipe.simpleIngredients.every(ing => ing.name.trim())
      : recipe.ingredientGroups.every(group => group.ingredients.every(ing => ing.name.trim()))

    if (!ingredientsValid) {
      newErrors.ingredientGroups = 'Tutti gli ingredienti devono avere un nome'
    }

    if (recipe.steps.some(step => !step.trim())) {
      newErrors.steps = 'Tutti i passi devono essere compilati'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    

    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
    
    // Add recipe to Firestore
    await addDoc(collection(db, 'recipes'), {
      ...recipe,
      createdAt: new Date(),
    })      
        console.log(recipe);
        
        alert("Ricetta salvata con successo!");

      // Reset form or redirect
      setRecipe({
        id: '',
        title: '',
        slug: '',
        category: '',
        description: '',
        imageUrl: '',
        difficulty: '',
        prepTime: '',
        prepTimeUnit: '',
        panSize: '',
        useSimpleIngredientList: false,
        ingredientGroups: [{ name: '', ingredients: [{ quantity: '', unit: '', name: '' }] }],
        simpleIngredients: [{ quantity: '', unit: '', name: '' }],
        steps: [''],
        notes: '',
        storage: ''
      })
      router.push('/admin/recipes')
    } catch (error) {
      console.error('Errore durante il salvataggio della ricetta:', error)
      setSubmitError('Si è verificato un errore durante il salvataggio della ricetta. Riprova più tardi.')
    } finally {
      setIsSubmitting(false)
    }
  }





  return (
    <Form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6" action={''}>
    <h1 className="text-2xl font-bold mb-6">Aggiungi una nuova ricetta</h1>
    
    <div className="mb-4">
      <label htmlFor="title" className="block mb-2">Titolo</label>
      <input
        type="text"
        id="title"
        name="title"
        value={recipe.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="slug" className="block mb-2">Slug</label>
      <input
        type="text"
        id="slug"
        name="slug"
        value={recipe.slug}
        className="w-full p-2 border rounded bg-gray-100"
        readOnly
      />
    </div>

    <div className="mb-4">
      <label htmlFor="category" className="block mb-2">Categoria</label>
      <select
        id="category"
        name="category"
        value={recipe.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Seleziona una categoria</option>
        {Constants.Categories.map(category => <option key={category} value={category}>{category}</option>)}
      </select>
      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
    </div>

    <div className="mb-4">
      <label className="block mb-2">Descrizione</label>
      <TextEditor value={recipe.description} onChange={handleDescriptionChange} />
    </div>

    <div className="mb-4">
      <label htmlFor="imageUrl" className="block mb-2">URL dell&apos;immagine</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={recipe.imageUrl}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="difficulty" className="block mb-2">Difficoltà</label>
      <select
        id="difficulty"
        name="difficulty"
        value={recipe.difficulty}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Seleziona la difficoltà</option>
        {Constants.Difficulty.map(difficulty => <option key={difficulty} value={difficulty}>{difficulty}</option>)}
      </select>
      {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>}
    </div>

    <div className="mb-4 grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="prepTime" className="block mb-2">Tempo di preparazione</label>
        <input
          type="number"
          id="prepTime"
          name="prepTime"
          value={recipe.prepTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {errors.prepTime && <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>}
      </div>
      <div>
        <label htmlFor="prepTimeUnit" className="block mb-2">Unità di tempo</label>
        <select
          id="prepTimeUnit"
          name="prepTimeUnit"
          value={recipe.prepTimeUnit}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleziona l&apos;unità</option>
          {Constants.TimeUnity.map(unit => <option key={unit} value={unit}>{unit}</option>)}
        </select>
        {errors.prepTimeUnit && <p className="text-red-500 text-sm mt-1">{errors.prepTimeUnit}</p>}
      </div>
    </div>

    <div className="mb-4">
      <label htmlFor="panSize" className="block mb-2">Dimensioni stampo (opzionale)</label>
      <input
        type="text"
        id="panSize"
        name="panSize"
        value={recipe.panSize}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="es. 24 cm"
      />
    </div>

    <div className="mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={recipe.useSimpleIngredientList}
          onChange={() => setRecipe(prev => ({ ...prev, useSimpleIngredientList: !prev.useSimpleIngredientList }))}
          className="mr-2"
        />
        Usa lista semplice di ingredienti
      </label>
    </div>

    {recipe.useSimpleIngredientList ? (
      <div className="mb-4">
        <h3 className="font-bold mb-2">Ingredienti</h3>
        {recipe.simpleIngredients.map((ingredient, index) => (
          <div key={index} className="flex mb-2 items-center">
            <input
              type="text"
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
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(0, index, 'name', e.target.value)}
              className="p-2 border rounded mr-2 flex-grow"
              placeholder="Nome ingrediente"
            />
            <button type="button" onClick={() => removeIngredient(0, index)} className="p-2 bg-red-500 text-white rounded">
              Rimuovi
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addIngredient()} className="mt-2 p-2 bg-blue-500 text-white rounded">
          Aggiungi ingrediente
        </button>
      </div>
    ) : (
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
              <button type="button" onClick={() => removeIngredientGroup(groupIndex)} className="p-2 bg-red-500 text-white rounded">
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
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(groupIndex, ingredientIndex, 'name', e.target.value)}
                  className="p-2 border rounded mr-2 flex-grow"
                  placeholder="Nome ingrediente"
                />
                <button type="button" onClick={() => removeIngredient(groupIndex, ingredientIndex)} className="p-2 bg-red-500 text-white rounded">
                  Rimuovi
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addIngredient(groupIndex)} className="mt-2 p-2 bg-blue-500 text-white rounded">
              Aggiungi ingrediente
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredientGroup} className="mt-2 p-2 bg-green-500 text-white rounded">
          Aggiungi gruppo di ingredienti
        </button>
      </div>
    )}
    {errors.ingredientGroups && <p className="text-red-500 text-sm mt-1">{errors.ingredientGroups}</p>}

    <div className="mb-4">
      <h3 className="font-bold mb-2">Procedimento</h3>
      {recipe.steps.map((step, index) => (
        <div key={index} className="mb-2 flex items-start">
          <textarea
            value={step}
            onChange={(e) => updateStep(index, e.target.value)}
            className="p-2 border rounded mr-2 flex-grow"
            placeholder={`Passo ${index + 1}`}
          />
          <button type="button" onClick={() => removeStep(index)} className="p-2 bg-red-500 text-white rounded">
            Rimuovi
          </button>
        </div>
      ))}
      <button type="button" onClick={addStep} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Aggiungi passo
      </button>
      {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
    </div>

    <div className="mb-4">
      <label htmlFor="notes" className="block mb-2">Note (opzionale)</label>
      <textarea
        id="notes"
        name="notes"
        value={recipe.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="storage" className="block mb-2">Conservazione (opzionale)</label>
      <textarea
        id="storage"
        name="storage"
        value={recipe.storage}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
    </div>

    {submitError && <p className="text-red-500 mb-4">{submitError}</p>}

    <button type="submit" className="w-full p-2 bg-green-500 text-white rounded" disabled={isSubmitting}>
      {isSubmitting ? 'Salvataggio in corso...' : 'Salva ricetta'}
    </button>
  </Form>


  )
}

export default AddRecipeForm
