'use client'

import Image from 'next/image'
import { Wrench, CheckCircle, Circle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Equipment } from '@/sanity/lib/types'

interface TechniqueEquipmentProps {
  equipment: Equipment[]
}

export default function TechniqueEquipment({ equipment }: TechniqueEquipmentProps) {
  const requiredEquipment = equipment.filter((item) => item.required)
  const optionalEquipment = equipment.filter((item) => !item.required)

  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <Wrench className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Strumenti Necessari</h2>
      </div>

      {/* Required Equipment */}
      {requiredEquipment.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <CheckCircle className="h-5 w-5 text-red-600" />
            Strumenti Essenziali
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {requiredEquipment.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl border-2 border-red-100 bg-red-50/50 p-4 transition-all hover:border-red-200"
              >
                {item.image?.url && (
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <Badge className="bg-red-600 text-white">Essenziale</Badge>
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optional Equipment */}
      {optionalEquipment.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
            <Circle className="h-5 w-5 text-blue-600" />
            Strumenti Opzionali
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {optionalEquipment.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl border-2 border-blue-100 bg-blue-50/50 p-4 transition-all hover:border-blue-200"
              >
                {item.image?.url && (
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <Badge variant="secondary">Opzionale</Badge>
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
