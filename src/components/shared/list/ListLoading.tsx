import { Skeleton } from '@/components/ui/skeleton'

interface ListLoadingProps {
  itemCount?: number
  columns?: {
    sm?: number
    md?: number
    lg?: number
  }
  showSearchBar?: boolean
  showFilters?: boolean
  showResultInfo?: boolean
}

export default function ListLoading({
  itemCount = 6,
  columns = { sm: 1, md: 2, lg: 3 },
  showSearchBar = true,
  showFilters = true,
  showResultInfo = true,
}: ListLoadingProps) {
  const gridClass = `grid gap-8 ${columns.sm ? `grid-cols-${columns.sm}` : ''} ${columns.md ? `md:grid-cols-${columns.md}` : ''} ${columns.lg ? `lg:grid-cols-${columns.lg}` : ''}`

  return (
    <div className="space-y-8">
      {/* Search Bar Skeleton */}
      {showSearchBar && (
        <div className="mx-auto max-w-2xl">
          <Skeleton className="h-14 w-full rounded-full" />
        </div>
      )}

      {/* Filters Skeleton */}
      {showFilters && (
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>

            {/* Filter Groups */}
            <div>
              <Skeleton className="mb-3 h-4 w-24" />
              <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-32 rounded-full" />
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="mb-3 h-4 w-24" />
              <div className="flex flex-wrap gap-2">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-28 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Info Skeleton */}
      {showResultInfo && (
        <div className="text-center">
          <Skeleton className="mx-auto h-6 w-48" />
        </div>
      )}

      {/* Grid Skeleton */}
      <div className={gridClass}>
        {[...Array(itemCount)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

// Card Skeleton Component
function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
      {/* Image Skeleton */}
      <Skeleton className="aspect-[4/3] w-full" />

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Badge */}
        <Skeleton className="mb-3 h-6 w-24 rounded-full" />

        {/* Title */}
        <Skeleton className="mb-4 h-6 w-full" />
        <Skeleton className="mb-4 h-6 w-3/4" />

        {/* Meta Info */}
        <div className="mb-4 flex gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2 mb-5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Tags */}
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  )
}
