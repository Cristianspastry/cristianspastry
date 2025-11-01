import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-600" />
        <p className="mt-4 text-lg font-medium text-gray-600">
          Caricamento in corso...
        </p>
      </div>
    </div>
  )
}
