'use client'

import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { ListOrdered, AlertCircle, Lightbulb, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Step {
  title: string
  description: any[]
  imageUrl?: string
  imageAlt?: string
  videoUrl?: string
  tips?: string[]
  commonMistakes?: Array<{
    mistake: string
    solution: string
  }>
}

interface TechniqueStepsProps {
  steps: Step[]
}

export default function TechniqueSteps({ steps }: TechniqueStepsProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <ListOrdered className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Passaggi</h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative border-l-4 border-blue-600 pl-8 pb-8 last:pb-0"
          >
            {/* Step Number */}
            <div className="absolute -left-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white shadow-lg">
              {index + 1}
            </div>

            {/* Step Content */}
            <div className="space-y-4">
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>

              {/* Media (Image or Video) */}
              {(step.imageUrl || step.videoUrl) && (
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  {step.videoUrl ? (
                    <div className="flex h-full items-center justify-center bg-gray-100">
                      <a
                        href={step.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                      >
                        <Play className="h-5 w-5" />
                        <span className="font-semibold">Guarda il Video</span>
                      </a>
                    </div>
                  ) : step.imageUrl ? (
                    <Image
                      src={step.imageUrl}
                      alt={step.imageAlt || step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  ) : null}
                </div>
              )}

              {/* Description */}
              <div className="prose max-w-none">
                <PortableText
                  value={step.description}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="mb-3 leading-relaxed text-gray-700">{children}</p>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-bold text-gray-900">{children}</strong>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="mb-3 ml-6 list-disc space-y-1 text-gray-700">{children}</ul>
                      ),
                    },
                  }}
                />
              </div>

              {/* Tips */}
              {step.tips && step.tips.length > 0 && (
                <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    <h4 className="font-bold text-blue-900">Suggerimenti</h4>
                  </div>
                  <ul className="space-y-2">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex gap-2 text-sm text-blue-800">
                        <span className="text-blue-600">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Mistakes */}
              {step.commonMistakes && step.commonMistakes.length > 0 && (
                <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <h4 className="font-bold text-red-900">Errori Comuni da Evitare</h4>
                  </div>
                  <div className="space-y-3">
                    {step.commonMistakes.map((mistake, mistakeIndex) => (
                      <div key={mistakeIndex} className="space-y-1">
                        <p className="flex gap-2 text-sm font-semibold text-red-800">
                          <span className="text-red-600">✗</span>
                          {mistake.mistake}
                        </p>
                        <p className="ml-6 text-sm text-red-700">
                          <span className="font-semibold">Soluzione:</span> {mistake.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
