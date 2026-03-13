import Image from "next/image";

import SignOutCard from "@/components/auth/SignOutCard";
import { auth } from "@/server/auth";

type SignOutPageProps = {
  searchParams?: {
    callbackUrl?: string;
  };
};

export default async function SignOutPage({ searchParams }: SignOutPageProps) {
  const session = await auth();
  const userLabel =
    session?.user?.email ?? session?.user?.name ?? session?.user?.id ?? null;

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
              Logout
            </h1>
          </div>
        </div>

        <p className="mt-6 text-lg text-gray-700">
          Termina la sessione in modo sicuro e torna al blog.
        </p>
      </div>

      <SignOutCard
        isSignedIn={!!session?.user}
        userLabel={userLabel}
        callbackUrl={searchParams?.callbackUrl ?? null}
      />
    </div>
  );
}
