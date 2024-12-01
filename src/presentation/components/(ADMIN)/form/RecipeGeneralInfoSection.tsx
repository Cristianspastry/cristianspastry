import React from 'react'
import { Constants } from '@/infrastructure/utils/constants'
import Recipe from '@/core/entities/Recipe'
import TextEditor from './RichTextEditor'

interface RecipeGeneralInfoSectionProps {
  recipe: Recipe
  errors: Partial<Record<keyof Recipe, string>>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleDescriptionChange: (content: string) => void
  handleTimeChange: (field: 'prepTime' | 'cookingTime', subField: 'prepTime' | 'prepTimeUnit' | 'cookingTime' | 'cookingTimeUnit', value: string) => void
  addTip: (tip: string) => void
  removeTip: (index: number) => void
  updateTip: (index: number, value: string) => void
}

export default function RecipeGeneralInfoSection({
  recipe,
  errors,
  handleChange,
  handleDescriptionChange,
  handleTimeChange,
  addTip,
  removeTip,
  updateTip
}: RecipeGeneralInfoSectionProps) {


  return (
    <>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-medium">Titolo</label>
        <input
          type="text"
          id="title"
          name="title"
          value={recipe.title}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="slug" className="block mb-2 font-medium">Slug</label>
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
        <label htmlFor="category" className="block mb-2 font-medium">Categoria</label>
        <select
          id="category"
          name="category"
          value={recipe.category}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleziona una categoria</option>
          {Constants.Categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Descrizione</label>
        <TextEditor value={recipe.description} onChange={handleDescriptionChange} />
      </div>

      <div className="mb-4">
        <label htmlFor="imageUrl" className="block mb-2 font-medium">URL dell&apos;immagine</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="difficulty" className="block mb-2 font-medium">Difficoltà</label>
        <select
          id="difficulty"
          name="difficulty"
          value={recipe.difficulty}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleziona la difficoltà</option>
          {Constants.Difficulty.map(difficulty => (
            <option key={difficulty} value={difficulty}>{difficulty}</option>
          ))}
        </select>
        {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="prepTime" className="block mb-2 font-medium">Tempo di preparazione</label>
          <input
            type="text"
            id="prepTime"
            value={recipe.prepTime.prepTime}
            onChange={(e) => handleTimeChange('prepTime', 'prepTime', e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.prepTime && <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>}
        </div>
        <div>
          <label htmlFor="prepTimeUnit" className="block mb-2 font-medium">Unità di tempo</label>
          <select
            id="prepTimeUnit"
            value={recipe.prepTime.prepTimeUnit}
            onChange={(e) => handleTimeChange('prepTime', 'prepTimeUnit', e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleziona l&apos;unità</option>
            {Constants.TimeUnity.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cookingTime" className="block mb-2 font-medium">Tempo di cottura</label>
          <input
            type="text"
            id="cookingTime"
            value={recipe.cookingTime.cookingTime}
            onChange={(e) => handleTimeChange('cookingTime', 'cookingTime', e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.cookingTime && <p className="text-red-500 text-sm mt-1">{errors.cookingTime}</p>}
        </div>
        <div>
          <label htmlFor="cookingTimeUnit" className="block mb-2 font-medium">Unità di tempo</label>
          <select
            id="cookingTimeUnit"
            value={recipe.cookingTime.cookingTimeUnit}
            onChange={(e) => handleTimeChange('cookingTime', 'cookingTimeUnit', e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleziona l&apos;unità</option>
            {Constants.TimeUnity.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="moldSize" className="block mb-2 font-medium">Dimensioni stampo (opzionale)</label>
        <input
          type="text"
          id="moldSize"
          name="moldSize"
          value={recipe.moldSize}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="es. 24 cm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="portions" className="block mb-2 font-medium">Porzioni</label>
        <input
          type="text"
          id="portions"
          name="portions"
          value={recipe.portions}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.portions && <p className="text-red-500 text-sm mt-1">{errors.portions}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="cost" className="block mb-2 font-medium">Costo</label>
        <input
          type="text"
          id="cost"
          name="cost"
          value={recipe.cost}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="createdAt" className="block mb-2 font-medium">Data di creazione</label>
        <input
          type="date"
          id="createdAt"
          name="createdAt"
          value={recipe.createdAt}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        {errors.createdAt && <p className="text-red-500 text-sm mt-1">{errors.createdAt}</p>}
      </div>



      <div className="mb-4">
        <label className="block mb-2 font-medium">Consigli di Cristian</label>
        {recipe.tips.map((tip, index) => (
          <div key={index} className="mb-2 flex items-start">
            <textarea
              value={tip}
              onChange={(e) => updateTip(index, e.target.value)}
              className="p-2 border rounded mr-2 flex-grow focus:ring-2 focus:ring-blue-500"
              placeholder={`Consiglio ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeTip(index)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Rimuovi
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addTip('')}
          className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Aggiungi consiglio
        </button>
        {errors.tips && <p className="text-red-500 text-sm mt-1">{errors.tips}</p>}
      </div>



      <div className="mb-4">
        <label htmlFor="conservation" className="block mb-2 font-medium">Conservazione</label>
        <textarea
          id="conservation"
          name="conservation"
          value={recipe.conservation}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isPopular"
            checked={recipe.isPopular}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="font-medium">Ricetta popolare</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isSpecial"
            checked={recipe.isSpecial}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="font-medium">Ricetta speciale</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isRecent"
            checked={recipe.isRecent}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="font-medium">Ricetta recente</span>
        </label>
      </div>
    </>
  )
}

