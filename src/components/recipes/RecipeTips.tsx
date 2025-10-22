import { PortableText } from '@portabletext/react'
import { Card } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

interface RecipeTipsProps {
  tips: any[] // PortableText content
}

export function RecipeTips({ tips }: RecipeTipsProps) {
  return (
    <Card className="mt-8 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-primary-900">
        <Lightbulb className="h-6 w-6 text-yellow-500" />
        Consigli dello Chef
      </h3>
      <div className="prose prose-gray max-w-none">
        <PortableText value={tips} />
      </div>
    </Card>
  )
}
