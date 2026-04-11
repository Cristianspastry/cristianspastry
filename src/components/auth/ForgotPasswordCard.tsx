"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/core/components/ui/button";

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
    <div className="rounded-2xl border border-amber-100 bg-white/80 backdrop-blur-md p-8 shadow-2xl shadow-amber-900/5">
      <h2 className="text-2xl font-serif font-bold text-amber-950">
        Recupera password
      </h2>
      <p className="mt-2 text-sm text-amber-950/60">
        Inserisci la tua email per ricevere il link di reset.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
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
        <Button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-900/10 transition-all rounded-lg py-5 mt-2"
          disabled={loading}
        >
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
