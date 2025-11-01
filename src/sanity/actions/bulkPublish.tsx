// sanity/actions/bulkPublish.tsx
import type { DocumentActionComponent } from 'sanity'
import { useClient } from 'sanity'
import { PublishIcon } from '@sanity/icons'
import { useToast } from '@sanity/ui'

export const bulkPublishAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: '2024-01-01' })
  const toast = useToast()
  const { type, draft, published, id } = props

  // Solo per i tipi di contenuto che supportiamo
  if (!['ricetta', 'tecnica', 'scienza'].includes(type)) {
    return null
  }

  // Solo se è una bozza non pubblicata
  if (!draft || published) {
    return null
  }

  return {
    label: 'Pubblica ora',
    icon: PublishIcon,
    tone: 'positive',
    onHandle: async () => {
      try {
        // Imposta la data di pubblicazione a ora
        await client
          .patch(id)
          .set({ publishedAt: new Date().toISOString() })
          .commit()

        toast.push({
          status: 'success',
          title: 'Contenuto pubblicato',
          description: 'Il contenuto è stato pubblicato con successo',
        })

        // Ricarica il documento
        props.onComplete()
      } catch (error) {
        console.error('Errore durante la pubblicazione:', error)
        toast.push({
          status: 'error',
          title: 'Errore',
          description: 'Impossibile pubblicare il contenuto',
        })
      }
    },
  }
}
