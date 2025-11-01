// src/components/recipes/SearchBar.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ListSearchBar from '@/components/shared/list/ListSearchBar'

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('search') ?? '')

  // Sync con URL params
  useEffect(() => {
    setSearchValue(searchParams.get('search') ?? '')
  }, [searchParams])

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (searchValue.trim()) {
      params.set('search', searchValue.trim())
    } else {
      params.delete('search')
    }

    // Reset alla prima pagina quando si cerca
    params.delete('page')

    router.push(`/ricette?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearchValue('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    params.delete('page')
    router.push(`/ricette?${params.toString()}`)
  }

  return (
    <ListSearchBar
      value={searchValue}
      onChange={setSearchValue}
      placeholder="Cerca ricette... (es: torta al cioccolato, biscotti, tiramisu)"
      onClear={clearSearch}
      showSearchButton
      onSubmit={handleSearch}
    />
  )
}