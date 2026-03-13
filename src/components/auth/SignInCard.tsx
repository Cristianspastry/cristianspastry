"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-primary-900">Accesso</h2>
      <p className="mt-1 text-sm text-gray-600">
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
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                placeholder="nome@dominio.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              className="w-full justify-center"
              disabled={credentialsLoading}
            >
              <LogIn className="h-4 w-4" />
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
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
              Facebook SDK
            </p>
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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
        <span>Continuando, accetti la policy di accesso e i cookie tecnici.</span>
        <a
          href="/auth/forgot-password"
          className="text-primary-600 hover:text-primary-700"
        >
          Password dimenticata?
        </a>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Non hai un account?{" "}
        <a href="/auth/register" className="text-primary-600 hover:text-primary-700">
          Registrati
        </a>
      </div>
    </div>
  );
}
