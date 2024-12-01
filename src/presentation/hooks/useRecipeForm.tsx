import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, addDoc, updateDoc, collection } from 'firebase/firestore'
import { db } from '@/infrastructure/firebase'
import Recipe, { Ingredient } from '@/core/entities/Recipe'
import { validateRecipeForm } from '@/infrastructure/utils/recipeFormValidation'

export const useRecipeForm = (initialRecipe: Recipe, mode: 'add' | 'edit') => {
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe)
  const [errors, setErrors] = useState<Partial<Record<keyof Recipe, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const generateSlug = (text: string) => {
    // Mappa di caratteri accentati ai loro equivalenti non accentati
    const accentMap: { [key: string]: string } = {
      'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
      'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
      'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
      'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
      'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
      'ý': 'y', 'ÿ': 'y',
      'ñ': 'n',
      'ç': 'c'
    };
  
    // Normalizza il testo sostituendo i caratteri accentati
    const normalizedText = text.toLowerCase().split('').map(char => {
      return accentMap[char] || char;
    }).join('');
  
    // Sostituisce spazi con trattini e rimuove caratteri non desiderati
    return normalizedText
      .replace(/\s+/g, '-')           // sostituisce spazi con trattini
      .replace(/[^a-z0-9-]/g, '')     // rimuove caratteri non alfanumerici eccetto trattini
      .replace(/-+/g, '-')            // rimuove trattini multipli consecutivi
      .replace(/^-|-$/g, '');         // rimuove trattini all'inizio e alla fine
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setRecipe((prev) => {
      if (name === 'title') {
        return { ...prev, [name]: value, slug: generateSlug(value) };
      }

      if (type === 'checkbox') {
        return { ...prev, [name]: value === 'on' };
      }

      return { ...prev, [name]: value };
    });
  };


  const handleDescriptionChange = (content: string) => {
    setRecipe(prev => ({ ...prev, description: content }))
  }

// In useRecipeForm.ts
const handleTimeChange = (
  field: 'prepTime' | 'cookingTime',
  subField: 'prepTime' | 'prepTimeUnit' | 'cookingTime' | 'cookingTimeUnit',
  value: string
) => {
  setRecipe(prev => ({
    ...prev,
    [field]: {
      ...prev[field],
      [subField]: value
    }
  }));
};


  // funzione che unisce il tempo per mandarlo come stringa a firebase
  const combineTimeValues = (timeObj: { prepTime: string; prepTimeUnit: string } | { cookingTime: string; cookingTimeUnit: string }): string => {
    if ('prepTime' in timeObj) {
      return `${timeObj.prepTime} ${timeObj.prepTimeUnit}`;
    } else {
      return `${timeObj.cookingTime} ${timeObj.cookingTimeUnit}`;
    }
  };

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

  const handleTipsChange = (tips: string[]) => {
    setRecipe(prev => ({
      ...prev,
      tips: tips
    }))
  }

  const addTip = () => {
    setRecipe(prev => ({ 
      ...prev, 
      tips: [...prev.tips, ''] 
    }))
  }

  const removeTip = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      tips: prev.tips.filter((_, i) => i !== index)
    }))
  }

  const updateTip = (index: number, value: string) => {
    setRecipe(prev => {
      const newTips = [...prev.tips]
      newTips[index] = value
      return { ...prev, tips: newTips }
    })
  }



  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form submit iniziato')
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
  
    console.log('Dati ricetta prima della validazione:', recipe)
    const validationErrors = validateRecipeForm(recipe)
    setErrors(validationErrors)
  
    if (Object.keys(validationErrors).length > 0) {
      console.log('Errori di validazione:', validationErrors)
      setIsSubmitting(false)
      return
    }


  
    try {
  
       const recipeToSubmit = {
        ...recipe,
        prepTime: combineTimeValues(recipe.prepTime),
        cookingTime: combineTimeValues(recipe.cookingTime)
      }

      if (mode === 'add') {
        console.log('Modalità aggiunta')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...recipeWithoutId } = recipeToSubmit
        const docRef = await addDoc(collection(db, 'recipes'), {
          ...recipeWithoutId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        console.log('Documento aggiunto con ID:', docRef.id)
        alert('Ricetta aggiunta con successo!')
      } else {
        console.log('Modalità modifica')
        const recipeRef = doc(db, 'recipes', recipe.id)
        await updateDoc(recipeRef, {
          ...recipe,
          updatedAt: new Date().toISOString()
        })
        console.log('Documento aggiornato')
        alert('Ricetta aggiornata con successo!')
      }
      router.push('/admin/recipes')
    } catch (error) {
      console.error('Errore durante il salvataggio della ricetta:', error)
      setSubmitError(`Si è verificato un errore durante il ${mode === 'add' ? 'salvataggio' : 'aggiornamento'} della ricetta. Riprova più tardi.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
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
    handleTipsChange,
    addTip,
    removeTip,
    updateTip,
    handleSubmit
  }
}