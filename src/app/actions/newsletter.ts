/**
 * @fileoverview Server Actions per gestione newsletter EmailOctopus
 *
 * NEWSLETTER TEMPORANEAMENTE DISABILITATA
 * Questo file è stato commentato perché la funzionalità newsletter è stata accantonata.
 * Per riattivare: decommentare questo file, NewsletterForm.tsx e la sezione nel Footer.tsx
 *
 * Gestisce l'iscrizione alla newsletter in modo sicuro lato server.
 * Le API keys non vengono mai esposte al client.
 *
 * @see https://emailoctopus.com/api-documentation
 */

'use server'

/* NEWSLETTER TEMPORANEAMENTE DISABILITATA - INIZIO CODICE COMMENTATO */

/*
// Risposta dell'API EmailOctopus (successo)
interface EmailOctopusSuccessResponse {
  id: string
  email_address: string
  fields: Record<string, string>
  tags: string[]
  status: 'SUBSCRIBED' | 'UNSUBSCRIBED' | 'PENDING'
  created_at: string
}

// Risposta dell'API EmailOctopus (errore)
interface EmailOctopusErrorResponse {
  code: string
  message: string
}

// Stato dell'operazione di iscrizione
export interface NewsletterSubscribeResult {
  success: boolean
  message: string
  error?: string
}

// Iscrive un utente alla newsletter tramite EmailOctopus
export async function subscribeToNewsletter(
  email: string
): Promise<NewsletterSubscribeResult> {
  try {
    // Validazione email lato server
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return {
        success: false,
        message: 'Inserisci un indirizzo email valido',
        error: 'INVALID_EMAIL',
      }
    }

    // Verifica che le credenziali EmailOctopus siano configurate
    const apiKey = process.env.EMAILOCTOPUS_API_KEY
    const listId = process.env.EMAILOCTOPUS_LIST_ID

    if (!apiKey || !listId) {
      console.error('EmailOctopus non configurato correttamente')
      return {
        success: false,
        message: 'Servizio temporaneamente non disponibile',
        error: 'MISSING_CONFIG',
      }
    }

    // Chiamata API a EmailOctopus
    const response = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${listId}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: apiKey,
          email_address: email,
        }),
      }
    )

    const data = await response.json()

    // Gestione risposta
    if (!response.ok) {
      const errorData = data as EmailOctopusErrorResponse
      console.error('EmailOctopus API error:', errorData)

      if (errorData.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
        return {
          success: false,
          message: 'Sei già iscritto alla newsletter!',
          error: 'ALREADY_SUBSCRIBED',
        }
      }

      if (errorData.code === 'INVALID_PARAMETERS') {
        return {
          success: false,
          message: 'Email non valida',
          error: 'INVALID_EMAIL',
        }
      }

      return {
        success: false,
        message: 'Errore durante l\'iscrizione. Riprova più tardi.',
        error: errorData.code || 'API_ERROR',
      }
    }

    // Successo
    const successData = data as EmailOctopusSuccessResponse
    const message = successData.status === 'PENDING'
      ? 'Iscrizione completata! Controlla la tua email per confermare.'
      : 'Iscrizione completata con successo!'

    return {
      success: true,
      message,
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'Errore di connessione. Riprova più tardi.',
      error: 'NETWORK_ERROR',
    }
  }
}
*/

/* NEWSLETTER TEMPORANEAMENTE DISABILITATA - FINE CODICE COMMENTATO */
