import Link from "next/link";

import ResetPasswordCard from "@/features/auth/components/ResetPasswordCard";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const resolvedSearchParams = await searchParams;
  const token = resolvedSearchParams?.token ?? "";

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto w-full">
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-3xl font-serif font-bold text-amber-950">
            Link non valido
          </h1>
          <p className="text-xs mt-2 uppercase tracking-[0.25em] text-red-600 font-medium">
            Reset password
          </p>
        </div>

        <div className="w-full rounded-2xl border border-amber-100 bg-white/80 backdrop-blur-md p-8 shadow-2xl shadow-amber-900/5 text-center">
          <p className="text-amber-950/70 mb-8">
            Il link non è valido oppure è scaduto.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/auth/forgot-password"
              className="w-full justify-center text-center bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-900/10 transition-all rounded-lg py-3 font-medium"
            >
              Richiedi nuovo link
            </Link>
            <Link
              href="/"
              className="w-full justify-center text-center text-amber-600 hover:text-amber-700 transition-all rounded-lg py-3 font-medium"
            >
              Torna alla home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto w-full">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-amber-950">
          Cristian's Pastry
        </h1>
        <p className="text-xs mt-2 uppercase tracking-[0.25em] text-amber-600 font-medium">
          Nuova password
        </p>
      </div>

      <div className="w-full">
        <ResetPasswordCard token={token} />
      </div>
    </div>
  );
}
