import Link from "next/link";

import { Button } from "@/components/ui/button";

const ERROR_MESSAGES: Record<string, { title: string; description: string }> = {
  OAuthSignin: {
    title: "Accesso non riuscito",
    description: "Impossibile completare l'accesso con il provider scelto.",
  },
  OAuthCallback: {
    title: "Callback non valida",
    description: "La risposta del provider non e valida o e scaduta.",
  },
  OAuthCreateAccount: {
    title: "Creazione account fallita",
    description: "Non e stato possibile creare l'account.",
  },
  EmailCreateAccount: {
    title: "Creazione account fallita",
    description: "Non e stato possibile creare l'account email.",
  },
  EmailSignin: {
    title: "Accesso email non riuscito",
    description: "Il link di accesso non e valido o e scaduto.",
  },
  Callback: {
    title: "Errore di callback",
    description: "La callback non e valida o e scaduta.",
  },
  OAuthAccountNotLinked: {
    title: "Account non collegato",
    description:
      "Accedi con il metodo usato in precedenza, poi collega il provider dal profilo.",
  },
  CredentialsSignin: {
    title: "Credenziali non valide",
    description: "Email o password non valide.",
  },
  AccessDenied: {
    title: "Accesso negato",
    description: "Non hai i permessi per completare l'accesso.",
  },
  Configuration: {
    title: "Configurazione non valida",
    description: "Controlla le variabili di ambiente del provider.",
  },
  Default: {
    title: "Errore di accesso",
    description: "Si e verificato un problema durante l'accesso.",
  },
};

const PROVIDER_LABELS: Record<string, string> = {
  discord: "Discord",
  google: "Google",
  facebook: "Facebook",
  tiktok: "TikTok",
  credentials: "Email e password",
  email: "Email",
  resend: "Email (Magic link)",
};

type ErrorPageProps = {
  searchParams?: {
    error?: string;
    provider?: string;
  };
};

export default function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const errorKey = searchParams?.error ?? "Default";
  const message = ERROR_MESSAGES[errorKey] ?? ERROR_MESSAGES.Default;
  const providerId = searchParams?.provider?.toLowerCase();
  const providerLabel = providerId ? (PROVIDER_LABELS[providerId] ?? providerId) : null;
  const isDev = process.env.NODE_ENV !== "production";
  const devHint =
    isDev && errorKey === "CredentialsSignin"
      ? "Suggerimento dev: se hai aggiornato Prisma, esegui `npm run db:generate` e riavvia il server."
      : null;

  let title = message.title;
  let description = message.description;

  if (providerLabel) {
    if (errorKey === "OAuthSignin" || errorKey === "OAuthCallback") {
      title = `Accesso ${providerLabel} non riuscito`;
      description = `Non e stato possibile completare l'accesso con ${providerLabel}.`;
    }
    if (errorKey === "OAuthAccountNotLinked") {
      title = `Account ${providerLabel} non collegato`;
      description = `Accedi con il metodo già usato, poi collega ${providerLabel} dal profilo.`;
    }
    if (errorKey === "AccessDenied") {
      title = `Accesso negato (${providerLabel})`;
      description = `Non hai i permessi per completare l'accesso con ${providerLabel}.`;
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary-600">
        Autenticazione
      </p>
      <h1 className="mt-2 text-3xl font-serif font-bold text-primary-900">
        {title}
      </h1>
      <p className="mt-3 text-gray-600">{description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/auth/signin">Torna al login</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/">Vai alla home</Link>
        </Button>
      </div>

      {devHint && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {devHint}
        </p>
      )}

      {searchParams?.error && (
        <p className="mt-6 text-xs text-gray-400">
          Codice errore: {searchParams.error}
        </p>
      )}
    </div>
  );
}
