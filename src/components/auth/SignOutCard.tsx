"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

type SignOutCardProps = {
  isSignedIn: boolean;
  userLabel?: string | null;
  callbackUrl?: string | null;
};

export default function SignOutCard({
  isSignedIn,
  userLabel,
  callbackUrl,
}: SignOutCardProps) {
  if (!isSignedIn) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-primary-900">
          Nessuna sessione attiva
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Hai gia effettuato il logout o non sei autenticato.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">Vai alla home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/auth/signin">Accedi</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-primary-900">Esci</h2>
      <p className="mt-2 text-sm text-gray-600">
        Sei autenticato come {userLabel ?? "utente"}.
      </p>
      <p className="mt-1 text-sm text-gray-600">
        Conferma il logout per terminare la sessione.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          onClick={() => signOut({ callbackUrl: callbackUrl ?? "/" })}
        >
          Conferma logout
        </Button>
        <Button asChild variant="ghost">
          <Link href={callbackUrl ?? "/"}>Annulla</Link>
        </Button>
      </div>
    </div>
  );
}
