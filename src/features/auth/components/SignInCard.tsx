"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import FacebookSdkLoginButton from "@/components/auth/FacebookSdkLoginButton";

type Provider = {
  id: string;
  name: string;
};

type SignInCardProps = {
  devWarning?: string | null;
};

export default function SignInCard({ devWarning }: SignInCardProps) {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsLoading, setCredentialsLoading] = useState(false);
  const [magicEmail, setMagicEmail] = useState("");
  const [magicLoading, setMagicLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";

  useEffect(() => {
    let active = true;
    setLoading(true);

    getProviders()
      .then((result) => {
        if (!active) return;
        setProviders((result ?? null) as Record<string, Provider> | null);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const credentialsProvider = providers?.credentials ?? null;
  const emailProvider = providers?.resend ?? providers?.email ?? null;
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

  const handleCredentialsSignIn = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setCredentialsLoading(true);
    await signIn("credentials", { email, password, callbackUrl });
    setCredentialsLoading(false);
  };

  const handleMagicLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailProvider) return;
    setMagicLoading(true);
    await signIn(emailProvider.id, { email: magicEmail, callbackUrl });
    setMagicLoading(false);
  };

  return (
    <div className="rounded-2xl border border-amber-100 bg-white/80 backdrop-blur-md p-8 shadow-2xl shadow-amber-900/5">
      <h2 className="text-2xl font-serif font-bold text-amber-950">Accesso</h2>
      <p className="mt-2 text-sm text-amber-950/60">
        Seleziona un provider per continuare.
      </p>

      <div className="mt-6 space-y-4">
        {devWarning && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {devWarning}
          </div>
        )}
        {loading && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
            Caricamento provider...
          </div>
        )}

        {!loading && (!providers || Object.keys(providers).length === 0) && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Nessun provider disponibile. Contatta un amministratore.
          </div>
        )}

        {!loading && credentialsProvider && (
          <form onSubmit={handleCredentialsSignIn} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-amber-950/80">
                Email
              </label>
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
              <label className="text-sm font-medium text-amber-950/80">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-amber-200/60 px-4 py-2.5 text-sm transition-all focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/10"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              className="w-full justify-center bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-900/10 transition-all rounded-lg py-5"
              disabled={credentialsLoading}
            >
              <LogIn className="h-4 w-4 mr-2" />
              {credentialsLoading ? "Accesso in corso..." : "Accedi"}
            </Button>
          </form>
        )}

        {!loading && emailProvider && (
          <form onSubmit={handleMagicLink} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email per link magico
              </label>
              <input
                type="email"
                required
                value={magicEmail}
                onChange={(event) => setMagicEmail(event.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                placeholder="nome@dominio.com"
              />
            </div>
            <Button
              type="submit"
              className="w-full justify-center"
              disabled={magicLoading}
              variant="outline"
            >
              <LogIn className="h-4 w-4" />
              {magicLoading ? "Invio in corso..." : "Invia link magico"}
            </Button>
          </form>
        )}

        {!loading && (credentialsProvider || emailProvider) && oauthProviders.length > 0 && (
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-gray-400">
            <div className="h-px flex-1 bg-gray-200" />
            <span>Oppure</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
        )}

        {!loading && facebookProvider && (
          <div className="rounded-lg border border-amber-200/50 bg-amber-50/50 px-4 py-3">
            <FacebookSdkLoginButton />
          </div>
        )}

        {!loading &&
          oauthProviders.map((provider) => (
            <Button
              key={provider.id}
              className="w-full justify-center"
              onClick={() => signIn(provider.id, { callbackUrl })}
            >
              <LogIn className="h-4 w-4" />
              Accedi con {provider.name}
            </Button>
          ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-950/50">
        <span>Continuando, accetti la policy di accesso e i cookie tecnici.</span>
        <a
          href="/auth/forgot-password"
          className="text-amber-600 transition-colors hover:text-amber-700 font-medium"
        >
          Password dimenticata?
        </a>
      </div>

      <div className="mt-6 text-sm text-center text-amber-950/70">
        Non hai un account?{" "}
        <a href="/auth/register" className="text-amber-600 font-semibold transition-colors hover:text-amber-700">
          Registrati ora
        </a>
      </div>
    </div>
  );
}
