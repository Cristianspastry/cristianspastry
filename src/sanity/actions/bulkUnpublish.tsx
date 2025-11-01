// sanity/actions/bulkUnpublish.tsx
import type { DocumentActionComponent } from 'sanity'
import { useClient } from 'sanity'
import { UnpublishIcon } from '@sanity/icons'
import { useToast } from '@sanity/ui'

export const bulkUnpublishAction: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion: '2024-01-01' })
  const toast = useToast()
  const { type, published, id } = props

  // Solo per i tipi di contenuto che supportiamo
  if (!['ricetta', 'tecnica', 'scienza'].includes(type)) {
    return null
  }

  // Solo se è pubblicato
  if (!published) {
    return null
  }

  return {
    label: 'Depubblica',
    icon: UnpublishIcon,
    tone: 'caution',
    onHandle: async () => {
      try {
        // Rimuove la data di pubblicazione
        await client
          .patch(id)
          .unset(['publishedAt'])
          .commit()

        toast.push({
          status: 'success',
          title: 'Contenuto depubblicato',
          description: 'Il contenuto è stato rimosso dalla pubblicazione',
        })

        // Ricarica il documento
        props.onComplete()
      } catch (error) {
        console.error('Errore durante la depubblicazione:', error)
        toast.push({
          status: 'error',
          title: 'Errore',
          description: 'Impossibile depubblicare il contenuto',
        })
      }
    },
  }
}
