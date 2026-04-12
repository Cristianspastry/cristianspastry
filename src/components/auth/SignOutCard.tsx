"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";


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
      <div className="rounded-2xl border border-amber-100 bg-white/80 backdrop-blur-md p-8 text-center shadow-2xl shadow-amber-900/5">
        <h2 className="text-2xl font-serif font-bold text-amber-950">
          Nessuna sessione attiva
        </h2>
        <p className="mt-2 text-sm text-amber-950/70">
          Hai gia effettuato il logout o non sei autenticato.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full justify-center text-center bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-900/10 transition-all rounded-lg py-3 font-medium"
          >
            Vai alla home
          </Link>
          <Link
            href="/auth/signin"
            className="w-full justify-center text-center text-amber-600 hover:text-amber-700 transition-all rounded-lg py-3 font-medium"
          >
            Accedi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-100 bg-white/80 backdrop-blur-md p-8 text-center shadow-2xl shadow-amber-900/5">
      <h2 className="text-2xl font-serif font-bold text-amber-950">Esci</h2>
      <p className="mt-2 text-sm text-amber-950/70">
        Sei autenticato come {userLabel ?? "utente"}.
      </p>
      <p className="mt-1 text-sm text-amber-950/70">
        Conferma il logout per terminare la sessione.
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => signOut({ callbackUrl: callbackUrl ?? "/" })}
          className="w-full justify-center text-center bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-900/10 transition-all rounded-lg py-3 font-medium"
        >
          Conferma logout
        </button>
        <Link
          href={callbackUrl ?? "/"}
          className="w-full justify-center text-center text-amber-600 hover:text-amber-700 transition-all rounded-lg py-3 font-medium"
        >
          Annulla
        </Link>
      </div>
    </div>
  );
}
