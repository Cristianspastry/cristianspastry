import Image from "next/image";
import Link from "next/link";

import ResetPasswordCard from "@/components/auth/ResetPasswordCard";

type ResetPasswordPageProps = {
  searchParams?: {
    token?: string;
  };
};

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const token = searchParams?.token ?? "";

  if (!token) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-600">
          Reset password
        </p>
        <h1 className="mt-2 text-3xl font-serif font-bold text-primary-900">
          Link non valido
        </h1>
        <p className="mt-3 text-gray-600">
          Il link non e valido o manca il token.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/auth/forgot-password"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Richiedi nuovo link
          </Link>
          <Link
            href="/"
            className="rounded-md px-4 py-2 text-sm font-medium text-primary-600"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
      <div>
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Cristian's Pastry"
            width={64}
            height={64}
            className="h-16 w-16"
            priority
          />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-600">
              Area riservata
            </p>
            <h1 className="text-4xl font-serif font-bold text-primary-900">
              Nuova password
            </h1>
          </div>
        </div>

        <p className="mt-6 text-lg text-gray-700">
          Imposta la nuova password per completare il reset.
        </p>
      </div>

      <ResetPasswordCard token={token} />
    </div>
  );
}
