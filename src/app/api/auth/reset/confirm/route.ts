import { NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";

import {
  markPasswordResetTokenUsed,
  validatePasswordResetToken,
} from "@/features/auth/lib/password-reset";
import { db } from "@/server/db";
import { ensurePrismaClientHasFields } from "@/server/prisma-check";

const ConfirmSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(6).max(64),
});

export async function POST(request: Request) {
  try {
    const check = ensurePrismaClientHasFields(["PasswordResetToken", "passwordHash"]);
    if (!check.ok) {
      return NextResponse.json(
        { error: check.message ?? "Prisma Client out of date", missing: check.missing },
        { status: 500 },
      );
    }

    const body = await request.json();
    const data = ConfirmSchema.parse(body);

    const record = await validatePasswordResetToken(data.token);
    if (!record) {
      return NextResponse.json(
        { error: "Token non valido o scaduto" },
        { status: 400 },
      );
    }

    const passwordHash = await hash(data.password, 10);
    await db.user.update({
      where: { id: record.userId },
      data: { passwordHash },
    });

    await markPasswordResetTokenUsed(record.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dati non validi", issues: error.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Errore server" }, { status: 500 });
  }
}
