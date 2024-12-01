import Recipe from '@/core/entities/Recipe'

export const validateRecipeForm = (recipe: Recipe): Partial<Record<keyof Recipe, string>> => {
  const errors: Partial<Record<keyof Recipe, string>> = {}

  console.log('Validazione campi:', {
    title: recipe.title,
    category: recipe.category,
    difficulty: recipe.difficulty,
    prepTime: recipe.prepTime,
    cookingTime: recipe.cookingTime,
    portions: recipe.portions,
    steps: recipe.steps
    
  })

  if (!recipe.title) errors.title = 'Il titolo è obbligatorio'
  if (!recipe.category) errors.category = 'La categoria è obbligatoria'
  if (!recipe.difficulty) errors.difficulty = 'La difficoltà è obbligatoria'
  if (!recipe.prepTime.prepTime || !recipe.prepTime.prepTimeUnit) {
    errors.prepTime = 'Il tempo di preparazione è obbligatorio'
  }
  if (!recipe.cookingTime.cookingTime || !recipe.cookingTime.cookingTimeUnit) {
    errors.cookingTime = 'Il tempo di cottura è obbligatorio'
  }
  if (!recipe.portions) errors.portions = 'Le porzioni sono obbligatorie'

  return errors
}