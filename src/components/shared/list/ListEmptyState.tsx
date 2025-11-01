'use client'

import { LucideIcon, Search, Frown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FadeInView from '../FadeInView'

interface ListEmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  hasFilters?: boolean
  searchTerm?: string
}

export default function ListEmptyState({
  icon: Icon = Search,
  title,
  description,
  action,
  hasFilters = false,
  searchTerm,
}: ListEmptyStateProps) {
  // Messaggi personalizzati in base al contesto
  const getContextualMessage = () => {
    if (searchTerm) {
      return {
        title: `Nessun risultato per "${searchTerm}"`,
        description: 'Prova con termini diversi o più generici',
        icon: Frown,
      }
    }
    if (hasFilters) {
      return {
        title: 'Nessun risultato con questi filtri',
        description: 'Prova a rimuovere alcuni filtri per vedere più risultati',
        icon: Search,
      }
    }
    return { title, description, icon: Icon }
  }

  const contextual = getContextualMessage()
  const DisplayIcon = contextual.icon

  return (
    <FadeInView direction="up">
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-gray-50 to-white p-12 text-center">
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
          <DisplayIcon className="h-10 w-10 text-primary-600" />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-2xl font-bold text-gray-900">
          {contextual.title}
        </h3>

        {/* Description */}
        <p className="mb-8 max-w-md text-gray-600">
          {contextual.description}
        </p>

        {/* Action Button */}
        {action && (
          <Button
            onClick={action.onClick}
            size="lg"
            className="hover-lift"
          >
            {action.label}
          </Button>
        )}

        {/* Suggestions for search */}
        {searchTerm && (
          <div className="mt-8 space-y-2">
            <p className="text-sm font-medium text-gray-700">Suggerimenti:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Verifica l'ortografia</li>
              <li>• Usa parole chiave più generiche</li>
              <li>• Rimuovi i filtri applicati</li>
            </ul>
          </div>
        )}
      </div>
    </FadeInView>
  )
}
