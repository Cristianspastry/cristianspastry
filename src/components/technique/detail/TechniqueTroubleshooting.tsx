'use client'

import { AlertTriangle } from 'lucide-react'
import type { Troubleshooting } from '@/sanity/lib/types'

interface TechniqueTroubleshootingProps {
  troubleshooting: Troubleshooting[]
}

export default function TechniqueTroubleshooting({ troubleshooting }: TechniqueTroubleshootingProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
          <AlertTriangle className="h-6 w-6 text-orange-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Risoluzione Problemi</h2>
      </div>

      <div className="space-y-6">
        {troubleshooting.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border-l-4 border-orange-500 bg-orange-50/50 p-6"
          >
            {/* Problem */}
            <div className="mb-3">
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-orange-600">
                Problema
              </h3>
              <p className="text-lg font-bold text-gray-900">{item.problem}</p>
            </div>

            {/* Cause */}
            {item.cause && (
              <div className="mb-3">
                <h4 className="mb-1 text-sm font-semibold uppercase tracking-wide text-orange-600">
                  Causa
                </h4>
                <p className="text-gray-700">{item.cause}</p>
              </div>
            )}

            {/* Solution */}
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-600">
                Soluzione
              </h4>
              <p className="font-medium text-gray-900">{item.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
