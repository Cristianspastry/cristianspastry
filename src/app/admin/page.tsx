import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/server/auth";
import { isRoleAtLeast } from "@/server/auth/roles";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent("/admin")}`);
  }

  if (!isRoleAtLeast(session.user.role, "ADMIN")) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold text-primary-900">
        Admin
      </h1>
      <p className="mt-2 text-gray-600">
        Accesso riservato agli amministratori.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/studio">Apri Studio</Link>
        </Button>
        <Button asChild variant="ghost">
          <a href="/api/admin/ping">Test API Admin</a>
        </Button>
      </div>

      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-500">Utente</p>
        <p className="text-base font-medium text-gray-900">
          {session.user.email ?? session.user.name ?? session.user.id}
        </p>
        <p className="mt-1 text-sm text-gray-500">Ruolo</p>
        <p className="text-base font-medium text-gray-900">
          {session.user.role}
        </p>
      </div>
    </div>
  );
}
