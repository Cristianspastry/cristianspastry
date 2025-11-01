'use client'

import { PortableText } from '@portabletext/react'
import { FileText, AlertCircle, Info, Lightbulb } from 'lucide-react'
import type { ScienceSection, HighlightBox } from '@/sanity/lib/types'

interface ScienceSectionsProps {
  sections: ScienceSection[]
}

const sectionTypeIcons = {
  text: FileText,
  scientific: AlertCircle,
  example: Lightbulb,
  curiosity: Info,
  myth: AlertCircle,
  comparison: FileText,
}

const highlightBoxStyles = {
  tip: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' },
  warning: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600' },
  info: { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-600' },
  science: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600' },
}

function HighlightBoxComponent({ box }: { box: HighlightBox }) {
  const styles = highlightBoxStyles[box.type]
  return (
    <div className={`rounded-xl ${styles.bg} border-2 ${styles.border} p-4 my-4`}>
      {box.title && (
        <h4 className={`mb-2 font-bold ${styles.icon}`}>{box.title}</h4>
      )}
      <p className="text-sm text-gray-700">{box.content}</p>
    </div>
  )
}

export default function ScienceSections({ sections }: ScienceSectionsProps) {
  return (
    <section className="space-y-8">
      {sections.map((section, index) => {
        const Icon = sectionTypeIcons[section.sectionType] || FileText

        return (
          <div
            key={index}
            className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <Icon className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{section.sectionTitle}</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <PortableText
                value={section.content}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-3 mt-6 text-xl font-bold text-gray-900">{children}</h3>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-bold text-gray-900">{children}</strong>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>
                    ),
                  },
                }}
              />
            </div>

            {section.highlightBox && <HighlightBoxComponent box={section.highlightBox} />}
          </div>
        )
      })}
    </section>
  )
}
