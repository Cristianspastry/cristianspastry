import { NextResponse } from "next/server";

import { auth } from "@/server/auth";
import { isRoleAtLeast } from "@/server/auth/roles";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isRoleAtLeast(session.user.role, "ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    ok: true,
    userId: session.user.id,
    role: session.user.role,
    timestamp: new Date().toISOString(),
  });
}
