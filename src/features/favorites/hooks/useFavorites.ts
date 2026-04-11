'use client'

/**
 * useFavorites Hook
 * 
 * Hook per gestire i preferiti dell'utente (ricette, tecniche, articoli).
 * Utilizza localStorage per la persistenza lato client.
 */

import { useState, useEffect, useCallback } from 'react'

export interface FavoriteItem {
  itemId: string
  itemType: 'recipe' | 'technique' | 'scienceArticle'
  addedAt: Date
}

const STORAGE_KEY = 'culinary_science_favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Carica i preferiti dal localStorage dopo l'idratazione
  useEffect(() => {
    setIsHydrated(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setFavorites(parsed.map((item: FavoriteItem) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })))
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Salva i preferiti nel localStorage quando cambiano
  useEffect(() => {
    if (isHydrated && isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
      } catch (error) {
        console.error('Error saving favorites:', error)
      }
    }
  }, [favorites, isHydrated, isLoaded])

  // Controlla se un elemento è nei preferiti
  const isFavorite = useCallback((itemId: string) => {
    return favorites.some(fav => fav.itemId === itemId)
  }, [favorites])

  // Aggiungi un elemento ai preferiti
  const addFavorite = useCallback((itemId: string, itemType: FavoriteItem['itemType']) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.itemId === itemId)) {
        return prev // Già presente
      }
      return [...prev, { itemId, itemType, addedAt: new Date() }]
    })
  }, [])

  // Rimuovi un elemento dai preferiti
  const removeFavorite = useCallback((itemId: string) => {
    setFavorites(prev => prev.filter(fav => fav.itemId !== itemId))
  }, [])

  // Toggle preferito
  const toggleFavorite = useCallback((itemId: string, itemType: FavoriteItem['itemType']) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.itemId === itemId)
      if (exists) {
        return prev.filter(fav => fav.itemId !== itemId)
      } else {
        return [...prev, { itemId, itemType, addedAt: new Date() }]
      }
    })
  }, [])

  // Ottieni tutti gli ID dei preferiti
  const favoriteIds = useCallback(() => {
    return favorites.map(fav => fav.itemId)
  }, [favorites])

  // Conta i preferiti per tipo
  const countByType = useCallback((type: FavoriteItem['itemType']) => {
    return favorites.filter(fav => fav.itemType === type).length
  }, [favorites])

  // Rimuovi tutti i preferiti
  const clearFavorites = useCallback(() => {
    setFavorites([])
    if (isHydrated) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [isHydrated])

  return {
    favorites,
    isLoaded,
    isHydrated,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    favoriteIds,
    countByType,
    clearFavorites,
  }
}
