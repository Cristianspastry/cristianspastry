import { DocumentActionComponent, useDocumentOperation } from 'sanity'
import { useCallback, useState } from 'react'

// Funzione per estrarre ASIN
function extractASIN(url: string): string | null {
  if (!url) return null

  try {
    const patterns = [
      /\/dp\/([A-Z0-9]{10})/i,
      /\/product\/([A-Z0-9]{10})/i,
      /\/gp\/product\/([A-Z0-9]{10})/i,
      /\/exec\/obidos\/ASIN\/([A-Z0-9]{10})/i,
      /amazon\.[a-z.]+\/([A-Z0-9]{10})/i,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }

    return null
  } catch (error) {
    return null
  }
}

export const ExtractASINAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published } = props
  const { patch } = useDocumentOperation(id, type)
  const [isExtracting, setIsExtracting] = useState(false)

  const handleExtractASIN = useCallback(() => {
    const doc = draft || published
    if (!doc) return

    setIsExtracting(true)

    // Estrai ASIN dall'URL Amazon
    const amazonUrl = (doc as any).amazonUrl
    if (amazonUrl) {
      const asin = extractASIN(amazonUrl)
      if (asin) {
        // Aggiorna il documento con l'ASIN estratto
        patch.execute([{ set: { asin } }])

        // Mostra notifica di successo
        setTimeout(() => {
          setIsExtracting(false)
        }, 500)
      } else {
        alert('ASIN non trovato nell\'URL. Verifica che il link sia corretto.')
        setIsExtracting(false)
      }
    } else {
      alert('Inserisci prima il link Amazon')
      setIsExtracting(false)
    }
  }, [draft, published, patch])

  // Mostra l'azione solo per documenti di tipo "product"
  if (type !== 'product') {
    return null
  }

  const doc = draft || published
  const hasAmazonUrl = !!(doc as any)?.amazonUrl
  const hasASIN = !!(doc as any)?.asin

  return {
    label: hasASIN ? 'Aggiorna ASIN' : 'Estrai ASIN',
    icon: () => '🔍',
    tone: hasASIN ? 'primary' : 'positive',
    disabled: !hasAmazonUrl || isExtracting,
    onHandle: handleExtractASIN,
    title: !hasAmazonUrl
      ? 'Inserisci prima il link Amazon'
      : 'Estrae l\'ASIN dal link Amazon e lo salva nel documento',
  }
}
