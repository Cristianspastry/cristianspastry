

"use client";

import RecipeCard from '@/presentation/components/(BLOG)/card/RecipeCard';
import { useState, useEffect } from 'react'
 // Assumo che questo sia il tuo componente Card personalizzato

// Supponiamo che tu abbia un array di ricette come questo
const recipes = [
  { id: 1, title: 'Torta al cioccolato', category: 'Torte', difficulty: 'Media', time: 60, dietary: ['Vegetariano'], image: '/placeholder.svg?height=200&width=300' },
  { id: 2, title: 'Biscotti alla vaniglia', category: 'Biscotti', difficulty: 'Facile', time: 30, dietary: ['Vegano'], image: '/placeholder.svg?height=200&width=300' },
  { id: 3, title: 'Tiramisù', category: 'Dolci al cucchiaio', difficulty: 'Difficile', time: 120, dietary: [], image: '/placeholder.svg?height=200&width=300' },
  { id: 4, title: 'Pancakes', category: 'Colazione', difficulty: 'Facile', time: 20, dietary: ['Senza lattosio'], image: '/placeholder.svg?height=200&width=300' },
  // ... altre ricette
]

const categories = ['Tutte', 'Torte', 'Biscotti', 'Dolci al cucchiaio', 'Colazione']
const difficulties = ['Tutte', 'Facile', 'Media', 'Difficile']
const dietaryOptions = ['Tutte', 'Vegetariano', 'Vegano', 'Senza glutine', 'Senza lattosio']

export default function RecipePage() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
  const [activeFilters, setActiveFilters] = useState({
    category: 'Tutte',
    difficulty: 'Tutte',
    dietary: 'Tutte',
    time: 120
  })

  useEffect(() => {
    const newFilteredRecipes = recipes.filter(recipe => 
      (activeFilters.category === 'Tutte' || recipe.category === activeFilters.category) &&
      (activeFilters.difficulty === 'Tutte' || recipe.difficulty === activeFilters.difficulty) &&
      (activeFilters.dietary === 'Tutte' || recipe.dietary.includes(activeFilters.dietary)) &&
      recipe.time <= activeFilters.time
    )
    setFilteredRecipes(newFilteredRecipes)
  }, [activeFilters])

  const handleFilterChange = (filterType: string, value: string | number) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Le Nostre Ricette</h1>
      
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-4">
          <select
            className="p-2 border rounded-full bg-white shadow-sm"
            onChange={(e) => handleFilterChange('category', e.target.value)}
            value={activeFilters.category}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="p-2 border rounded-full bg-white shadow-sm"
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            value={activeFilters.difficulty}
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
          <select
            className="p-2 border rounded-full bg-white shadow-sm"
            onChange={(e) => handleFilterChange('dietary', e.target.value)}
            value={activeFilters.dietary}
          >
            {dietaryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="timeRange" className="text-sm font-medium">
            Tempo massimo di preparazione: {activeFilters.time} minuti
          </label>
          <input
            type="range"
            id="timeRange"
            min="10"
            max="120"
            step="10"
            value={activeFilters.time}
            onChange={(e) => handleFilterChange('time', parseInt(e.target.value))}
            className="w-full max-w-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <RecipeCard  {...recipe} isPopular={false} key={recipe.id}  />
        ))}
      </div>
      
      {filteredRecipes.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          Nessuna ricetta trovata con i filtri selezionati. Prova a modificare i tuoi criteri di ricerca.
        </p>
      )}
    </div>
  )
}