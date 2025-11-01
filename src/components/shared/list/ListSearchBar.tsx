'use client'

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ListSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onClear?: () => void
  showSearchButton?: boolean
  onSubmit?: () => void
}

export default function ListSearchBar({
  value,
  onChange,
  placeholder = 'Cerca...',
  onClear,
  showSearchButton = false,
  onSubmit,
}: ListSearchBarProps) {
  const handleClear = () => {
    onChange('')
    onClear?.()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 rounded-full border-2 pl-12 pr-24 text-base shadow-lg focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20"
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="h-10 w-10 rounded-full"
              aria-label="Cancella ricerca"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {showSearchButton && (
            <Button
              type="submit"
              size="sm"
              className="h-10 rounded-full px-6"
            >
              Cerca
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
