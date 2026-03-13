"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";

export default function ForgotPasswordCard() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/auth/reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Errore durante la richiesta");
      setLoading(false);
      return;
    }

    const data = await response.json().catch(() => null);
    setMessage(data?.message ?? "Controlla la tua email.");
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-primary-900">
        Recupera password
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Inserisci la tua email per ricevere il link di reset.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="nome@dominio.com"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Invio in corso..." : "Invia link reset"}
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
