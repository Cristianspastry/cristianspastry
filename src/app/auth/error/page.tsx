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
  searchParams: Promise<{
    error?: string;
    provider?: string;
  }>;
};

export default async function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const resolvedSearchParams = await searchParams;
  const errorKey = resolvedSearchParams?.error ?? "Default";
  const message =
    ERROR_MESSAGES[errorKey] ??
    ERROR_MESSAGES.Default ??
    {
      title: "Errore di accesso",
      description: "Si e verificato un problema durante l'accesso.",
    };
  const providerId = resolvedSearchParams?.provider?.toLowerCase();
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto w-full">
      <div className="w-full rounded-2xl border border-amber-100 bg-white/80 backdrop-blur-md p-8 text-center shadow-2xl shadow-amber-900/5">
        <p className="text-xs uppercase tracking-[0.25em] text-red-600 font-medium">
          Autenticazione Fallita
        </p>
        <h1 className="mt-2 text-2xl font-serif font-bold text-amber-950">
          {title}
        </h1>
        <p className="mt-3 text-amber-950/70">{description}</p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/auth/signin"
            className="w-full justify-center text-center bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-900/10 transition-all rounded-lg py-3 font-medium"
          >
            Torna al login
          </Link>
          <Link
            href="/"
            className="w-full justify-center text-center text-amber-600 hover:text-amber-700 transition-all rounded-lg py-3 font-medium"
          >
            Vai alla home
          </Link>
        </div>

        {devHint && (
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            {devHint}
          </p>
        )}

        {resolvedSearchParams?.error && (
          <p className="mt-6 text-xs text-gray-400">
            Codice errore: {resolvedSearchParams.error}
          </p>
        )}
      </div>
    </div>
  );
}
