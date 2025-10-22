import { urlFor } from "@/sanity/lib/image"
import { PortableText as BasePortableText } from '@portabletext/react'
import type { PortableTextComponents, PortableTextBlock } from '@portabletext/react'
import Image from "next/image"

interface PortableTextImage extends PortableTextBlock {
  _type: 'image'
  asset: {
    _ref: string
  }
  alt?: string
  caption?: string
}

interface PortableTextLink {
  _type: 'link'
  href: string
}

type CustomPortableTextBlock = PortableTextBlock | PortableTextImage
const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: PortableTextImage }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative w-full aspect-video my-8">
          <Image
            src={urlFor(value).width(800).height(450).url()}
            alt={value.alt ?? ' '}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 text-center mt-2">{value.caption}</p>
          )}
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-3">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => {
      const linkValue = value as PortableTextLink
      const rel = !linkValue.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={linkValue.href} rel={rel} className="text-primary underline hover:no-underline">
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
}

export function PortableText({ value }: { value: CustomPortableTextBlock[] }) {
  return <BasePortableText value={value} components={components} />
}