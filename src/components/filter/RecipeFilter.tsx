// src/components/RecipeFilters.tsx
"use client";

import { RecipeFiltersType } from '@/utils/types';
import React, { useState } from 'react';

const RecipeFilters = ({ onFilterChange }: { onFilterChange: (filters: RecipeFiltersType) => void }) => {
  const [difficulty, setDifficulty] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [category, setCategory] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ difficulty, prepTime, category });
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-md shadow">
      {/* Filtro per difficoltà */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Difficoltà</label>
        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            handleFilterChange();
          }}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Tutti</option>
          <option value="facile">Facile</option>
          <option value="medio">Medio</option>
          <option value="difficile">Difficile</option>
        </select>
      </div>

      {/* Filtro per tempo di preparazione */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Tempo di preparazione</label>
        <select
          value={prepTime}
          onChange={(e) => {
            setPrepTime(e.target.value);
            handleFilterChange();
          }}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Tutti</option>
          <option value="breve">Breve (fino a 30 min)</option>
          <option value="medio">Medio (30-60 min)</option>
          <option value="lungo">Lungo (più di 60 min)</option>
        </select>
      </div>

      {/* Filtro per categoria */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Categoria</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFilterChange();
          }}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Tutte</option>
          <option value="dolci">Dolci</option>
          <option value="salati">Salati</option>
          <option value="antipasti">Antipasti</option>
        </select>
      </div>
    </div>
  );
};

export default RecipeFilters;
