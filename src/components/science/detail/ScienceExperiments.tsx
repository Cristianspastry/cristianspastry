'use client'

import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { FlaskConical } from 'lucide-react'
import type { Experiment } from '@/sanity/lib/types'

interface ScienceExperimentsProps {
  experiments: Experiment[]
}

export default function ScienceExperiments({ experiments }: ScienceExperimentsProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
          <FlaskConical className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Esperimenti</h2>
      </div>

      <div className="space-y-8">
        {experiments.map((exp, index) => (
          <div key={index} className="rounded-xl border-2 border-purple-100 bg-purple-50/50 p-6">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">{exp.title}</h3>
            
            {exp.hypothesis && (
              <div className="mb-4 rounded-lg bg-white p-4">
                <p className="text-sm font-semibold text-purple-700 mb-1">Ipotesi:</p>
                <p className="text-gray-700">{exp.hypothesis}</p>
              </div>
            )}

            {exp.method && exp.method.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-purple-700 mb-2">Metodo:</p>
                <div className="prose max-w-none">
                  <PortableText value={exp.method} />
                </div>
              </div>
            )}

            {exp.results && exp.results.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-purple-700 mb-2">Risultati:</p>
                <div className="prose max-w-none">
                  <PortableText value={exp.results} />
                </div>
              </div>
            )}

            {exp.conclusion && (
              <div className="rounded-lg bg-white p-4">
                <p className="text-sm font-semibold text-purple-700 mb-1">Conclusione:</p>
                <p className="text-gray-700">{exp.conclusion}</p>
              </div>
            )}

            {exp.images && exp.images.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {exp.images.map((img, imgIdx) => (
                  <div key={imgIdx} className="relative aspect-video overflow-hidden rounded-lg">
                    <Image src={img.url} alt={img.alt} fill className="object-cover" />
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                        <p className="text-xs text-white">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
