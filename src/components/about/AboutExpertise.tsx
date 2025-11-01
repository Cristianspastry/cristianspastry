'use client'

import { Award, CheckCircle } from 'lucide-react'

interface AboutExpertiseProps {
  expertise: string[]
}

export default function AboutExpertise({ expertise }: AboutExpertiseProps) {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg border-2 border-purple-200 md:p-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
          <Award className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Le Mie Specializzazioni</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm border border-purple-100 transition-all hover:shadow-md"
          >
            <CheckCircle className="h-6 w-6 flex-shrink-0 text-purple-600" />
            <span className="font-semibold text-gray-900">{skill}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
