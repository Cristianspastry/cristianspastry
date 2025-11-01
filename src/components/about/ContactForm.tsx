'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { sendContactEmail, type ContactFormState } from '@/lib/actions/contact'

// ============================================
// SUBMIT BUTTON COMPONENT
// ============================================

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-12 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-base font-semibold transition-all"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Invio in corso...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          Invia Messaggio
        </span>
      )}
    </Button>
  )
}

// ============================================
// CONTACT FORM COMPONENT
// ============================================

export default function ContactForm() {
  const [state, formAction] = useActionState<ContactFormState | null, FormData>(
    sendContactEmail,
    null
  )
  const formRef = useRef<HTMLFormElement>(null)

  // Reset del form dopo successo
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()

      // Scroll smooth al messaggio di successo
      const successMessage = document.getElementById('form-message')
      if (successMessage) {
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [state?.success])

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Inviami un Messaggio</h2>

      {/* Messaggio di Successo/Errore */}
      {state?.message && (
        <div
          id="form-message"
          className={`mb-6 rounded-lg p-4 flex items-start gap-3 transition-all ${
            state.success
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
          role="alert"
        >
          {state.success ? (
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm font-medium">{state.message}</p>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
            Nome *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Il tuo nome"
            className="h-12"
            aria-describedby={state?.errors?.name ? 'name-error' : undefined}
            aria-invalid={state?.errors?.name ? 'true' : 'false'}
          />
          {state?.errors?.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tua@email.com"
            className="h-12"
            aria-describedby={state?.errors?.email ? 'email-error' : undefined}
            aria-invalid={state?.errors?.email ? 'true' : 'false'}
          />
          {state?.errors?.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-gray-700">
            Oggetto *
          </label>
          <Input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="Di cosa vuoi parlare?"
            className="h-12"
            aria-describedby={state?.errors?.subject ? 'subject-error' : undefined}
            aria-invalid={state?.errors?.subject ? 'true' : 'false'}
          />
          {state?.errors?.subject && (
            <p id="subject-error" className="mt-1 text-sm text-red-600">
              {state.errors.subject[0]}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
            Messaggio *
          </label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Scrivi il tuo messaggio qui..."
            rows={6}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            aria-describedby={state?.errors?.message ? 'message-error' : undefined}
            aria-invalid={state?.errors?.message ? 'true' : 'false'}
          />
          {state?.errors?.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600">
              {state.errors.message[0]}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <SubmitButton />

        <p className="text-xs text-gray-500 text-center">
          I tuoi dati saranno utilizzati solo per rispondere alla tua richiesta
        </p>
      </form>
    </div>
  )
}
