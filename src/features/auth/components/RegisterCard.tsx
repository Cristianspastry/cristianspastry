"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import FacebookSdkLoginButton from "@/features/auth/components/FacebookSdkLoginButton";

type Provider = {
  id: string;
  name: string;
};

export default function RegisterCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";

  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
  const [providersLoading, setProvidersLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setProvidersLoading(true);

    getProviders()
      .then((result) => {
        if (!active) return;
        setProviders((result ?? null) as Record<string, Provider> | null);
      })
      .finally(() => {
        if (!active) return;
        setProvidersLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const facebookProvider = providers?.facebook ?? null;
  const oauthProviders = useMemo(() => {
    if (!providers) return [];
    return Object.values(providers).filter(
      (provider) =>
        provider.id !== "credentials" &&
        provider.id !== "resend" &&
        provider.id !== "email",
    );
  }, [providers]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Registrazione fallita");
      setLoading(false);
      return;
    }

    setMessage("Registrazione completata. Ora puoi accedere.");
    setLoading(false);

    setTimeout(() => {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }, 800);
  };

  return (
    <div className="rounded-2xl border border-amber-100 bg-white/80 backdrop-blur-md p-8 shadow-2xl shadow-amber-900/5">
      <h2 className="text-2xl font-serif font-bold text-amber-950">Registrati</h2>
      <p className="mt-2 text-sm text-amber-950/60">
        Crea un account per accedere all'area riservata.
      </p>

      <div className="mt-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-amber-950/80">Nome</label>
            <input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-amber-200/60 px-4 py-2.5 text-sm transition-all focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/10"
              placeholder="Nome e cognome"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-amber-950/80">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-amber-200/60 px-4 py-2.5 text-sm transition-all focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/10"
              placeholder="nome@dominio.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-amber-950/80">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-amber-200/60 px-4 py-2.5 text-sm transition-all focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/10"
              placeholder="Almeno 6 caratteri"
            />
          </div>
          <Button
            type="submit"
            className="w-full justify-center bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-900/10 transition-all rounded-lg py-5 mt-2"
            disabled={loading}
          >
            {loading ? "Creazione in corso..." : "Crea account"}
          </Button>
        </form>

        {!providersLoading && oauthProviders.length > 0 && (
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-amber-950/40 py-2">
            <div className="h-px flex-1 bg-amber-200/50" />
            <span>Oppure</span>
            <div className="h-px flex-1 bg-amber-200/50" />
          </div>
        )}

        {!providersLoading && facebookProvider && (
          <div className="rounded-lg border border-amber-200/50 bg-amber-50/50 px-4 py-3 flex justify-center">
            <FacebookSdkLoginButton />
          </div>
        )}

        {!providersLoading &&
          oauthProviders.map((provider) => (
            <Button
              key={provider.id}
              className="w-full justify-center bg-white text-amber-950 border border-amber-200/60 hover:bg-amber-50 shadow-sm"
              onClick={() => signIn(provider.id, { callbackUrl })}
            >
              <LogIn className="h-4 w-4 mr-2 text-amber-600" />
              Registrati con {provider.name}
            </Button>
          ))}

        {message && (
          <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-950/50">
        <span>Creando l'account accetti i nostri Termini.</span>
      </div>

      <div className="mt-6 text-sm text-center text-amber-950/70">
        Hai già un account?{" "}
        <a href="/auth/signin" className="text-amber-600 font-semibold transition-colors hover:text-amber-700">
          Accedi
        </a>
      </div>
    </div>
  );
}
