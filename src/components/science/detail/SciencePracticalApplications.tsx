'use client'

import { Lightbulb } from 'lucide-react'
import type { PracticalApplication } from '@/sanity/lib/types'

interface SciencePracticalApplicationsProps {
  applications: PracticalApplication[]
}

export default function SciencePracticalApplications({ applications }: SciencePracticalApplicationsProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
          <Lightbulb className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Applicazioni Pratiche</h2>
      </div>

      <div className="space-y-6">
        {applications.map((app, index) => (
          <div key={index} className="rounded-xl border-2 border-green-100 bg-green-50/50 p-6">
            <h3 className="mb-3 text-xl font-bold text-gray-900">{app.title}</h3>
            <p className="mb-3 text-gray-700 leading-relaxed">{app.description}</p>
            {app.example && (
              <div className="rounded-lg bg-white p-4 border border-green-200">
                <p className="text-sm font-semibold text-green-700 mb-1">Esempio:</p>
                <p className="text-sm text-gray-600">{app.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
