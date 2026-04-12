import { NextResponse } from "next/server";
import { z } from "zod";

import { createPasswordResetToken } from "@/lib/auth/password-reset";
import { ensurePrismaClientHasFields } from "@/server/prisma-check";

const RequestSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const check = ensurePrismaClientHasFields(["PasswordResetToken"]);
    if (!check.ok) {
      return NextResponse.json(
        { error: check.message ?? "Prisma Client out of date", missing: check.missing },
        { status: 500 },
      );
    }

    const body = await request.json();
    const data = RequestSchema.parse(body);

    const result = await createPasswordResetToken(data.email);

    // TODO: send email via Resend when ready
    if (result.rawToken) {
      console.info("Password reset token (dev):", result.rawToken);
    }

    return NextResponse.json({
      ok: true,
      message: "Se esiste un account, riceverai una email con le istruzioni.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Email non valida" },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Errore server" }, { status: 500 });
  }
}
