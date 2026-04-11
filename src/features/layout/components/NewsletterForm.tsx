/**
 * @fileoverview Form Newsletter con validazione e feedback
 *
 * NEWSLETTER TEMPORANEAMENTE DISABILITATA
 * Questo file è stato commentato perché la funzionalità newsletter è stata accantonata.
 * Per riattivare: decommentare questo file, newsletter.ts e la sezione nel Footer.tsx
 *
 * Client Component che gestisce l'iscrizione alla newsletter.
 * Usa Server Actions per sicurezza (API keys mai esposte al client).
 *
 * FEATURES:
 * - Validazione email client-side e server-side
 * - Loading state durante l'invio
 * - Toast notifications per feedback immediato
 * - Reset automatico del form dopo successo
 * - Gestione errori user-friendly
 */

'use client'

/* NEWSLETTER TEMPORANEAMENTE DISABILITATA - INIZIO CODICE COMMENTATO */

/*
import { useState, useTransition } from 'react'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import { subscribeToNewsletter } from '@/app/actions/newsletter'

// Form per iscrizione newsletter
export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isPending, startTransition] = useTransition()

  // Gestisce il submit del form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validazione base client-side
    if (!email || !email.includes('@')) {
      toast.error('Inserisci un indirizzo email valido')
      return
    }

    // Esegue l'iscrizione tramite Server Action
    startTransition(async () => {
      const result = await subscribeToNewsletter(email)

      if (result.success) {
        toast.success(result.message, {
          duration: 5000,
        })
        setEmail('')
      } else {
        toast.error(result.message, {
          duration: 5000,
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="La tua email"
          disabled={isPending}
          required
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Email per newsletter"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-primary-500 disabled:hover:to-primary-600"
      >
        <span>{isPending ? 'Invio in corso...' : 'Iscriviti'}</span>
        <Send className={`w-4 h-4 transition-transform ${!isPending && 'group-hover:translate-x-1'}`} />
      </button>
    </form>
  )
}
*/

/* NEWSLETTER TEMPORANEAMENTE DISABILITATA - FINE CODICE COMMENTATO */
