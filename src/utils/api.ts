import Recipe from "@/models/recipe"

// utils/api.ts
export async function fetchRecipes() {
    const response = await fetch('/api/recipes')
    if (!response.ok) throw new Error('Errore nel caricamento delle ricette')
    return response.json()
  }
  
  export async function createRecipe(recipe: Omit<Recipe, 'id'>) {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
    if (!response.ok) throw new Error('Errore nella creazione della ricetta')
    return response.json()
  }
  
  export async function updateRecipe(id: string, recipe: Partial<Recipe>) {
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
    if (!response.ok) throw new Error('Errore nell\'aggiornamento della ricetta')
    return response.json()
  }
  
  export async function deleteRecipe(id: string) {
    const response = await fetch(`/api/recipes/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Errore nell\'eliminazione della ricetta')
    return response.json()
  }