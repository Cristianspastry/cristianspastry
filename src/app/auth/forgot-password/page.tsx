import Image from "next/image";

import ForgotPasswordCard from "@/components/auth/ForgotPasswordCard";

export default function ForgotPasswordPage() {
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
              Password dimenticata
            </h1>
          </div>
        </div>

        <p className="mt-6 text-lg text-gray-700">
          Ti invieremo un link per impostare una nuova password.
        </p>
      </div>

      <ForgotPasswordCard />
    </div>
  );
}
