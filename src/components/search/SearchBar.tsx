'use client'

import { useState, FormEvent } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  initialValue?: string
  onSearch: (query: string) => void
  isLoading?: boolean
}

export default function SearchBar({ initialValue = '', onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState(initialValue)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Cerca ricette, tecniche, articoli..."
          className="w-full rounded-xl border border-gray-300 bg-white px-12 py-4 text-lg text-gray-900 placeholder-gray-500 shadow-sm transition-all focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />

        {/* Search Icon */}
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <Search className={`h-6 w-6 ${isLoading ? 'animate-pulse text-gray-400' : 'text-gray-400'}`} />
        </div>

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            aria-label="Cancella ricerca"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Tips */}
      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-gray-500">Suggerimenti:</span>
        {['tiramisù', 'lievitazione', 'caramellizzazione'].map((tip) => (
          <button
            key={tip}
            type="button"
            onClick={() => {
              setValue(tip)
              onSearch(tip)
            }}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {tip}
          </button>
        ))}
      </div>
    </form>
  )
}