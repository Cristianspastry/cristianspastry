"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type ResetPasswordCardProps = {
  token: string;
};

export default function ResetPasswordCard({ token }: ResetPasswordCardProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirm) {
      setError("Le password non coincidono.");
      return;
    }

    setLoading(true);
    const response = await fetch("/api/auth/reset/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Impossibile aggiornare la password.");
      setLoading(false);
      return;
    }

    setMessage("Password aggiornata. Ora puoi accedere.");
    setLoading(false);
    setTimeout(() => router.push("/auth/signin"), 800);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-primary-900">
        Imposta nuova password
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Inserisci la nuova password per completare il reset.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Nuova password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="Almeno 6 caratteri"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Conferma password
          </label>
          <input
            type="password"
            required
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="Ripeti password"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Aggiornamento..." : "Aggiorna password"}
        </Button>
      </form>

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
  );
}
