import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TikTokProvider from "next-auth/providers/tiktok";
import ResendProvider from "next-auth/providers/resend";
import CredentialsProvider from "next-auth/providers/credentials";
import { type UserRole } from "@prisma/client";
import { compare } from "bcryptjs";
import { z } from "zod";

import { env } from "@/env";
import { db } from "@/server/db";
import { DEFAULT_ROLE } from "@/server/auth/roles";
import { ensurePrismaClientHasFields } from "@/server/prisma-check";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
import "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    signOut: "/auth/signout",
    newUser: "/auth/register",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    ...(env.AUTH_DISCORD_ID && env.AUTH_DISCORD_SECRET
      ? [
        DiscordProvider({
          clientId: env.AUTH_DISCORD_ID,
          clientSecret: env.AUTH_DISCORD_SECRET,
        }),
      ]
      : []),
    ...(env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET
      ? [
        GoogleProvider({
          clientId: env.AUTH_GOOGLE_ID,
          clientSecret: env.AUTH_GOOGLE_SECRET,
          allowDangerousEmailAccountLinking: false,
        }),
      ]
      : []),
    ...(env.AUTH_FACEBOOK_ID && env.AUTH_FACEBOOK_SECRET
      ? [
        FacebookProvider({
          clientId: env.AUTH_FACEBOOK_ID,
          clientSecret: env.AUTH_FACEBOOK_SECRET,
        }),
      ]
      : []),
    ...(env.AUTH_TIKTOK_ID && env.AUTH_TIKTOK_SECRET
      ? [
        TikTokProvider({
          clientId: env.AUTH_TIKTOK_ID,
          clientSecret: env.AUTH_TIKTOK_SECRET,
        }),
      ]
      : []),
    ...(env.RESEND_API_KEY && env.AUTH_EMAIL_FROM
      ? [
        ResendProvider({
          apiKey: env.RESEND_API_KEY,
          from: env.AUTH_EMAIL_FROM,
        }),
      ]
      : []),
    CredentialsProvider({
      name: "Email e password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const check = ensurePrismaClientHasFields(["passwordHash"]);
        if (!check.ok) {
          throw new Error(check.message ?? "Prisma Client out of date");
        }

        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const user = await db.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user || !user.passwordHash) return null;

        const isValid = await compare(parsed.data.password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  secret: env.NEXT_AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? DEFAULT_ROLE;
        return token;
      }

      const tokenId = (token.id ?? token.sub) as string | undefined;
      if (tokenId) {
        token.id = tokenId;
        try {
          const dbUser = await db.user.findUnique({
            where: { id: tokenId },
            select: { role: true },
          });
          if (dbUser?.role) {
            token.role = dbUser.role;
          }
        } catch {
          // ignore transient DB errors and keep existing token role
        }
      }

      return token;
    },
    session: ({ session, token, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: (token?.id ?? user?.id) as string,
        role: (token?.role ?? user?.role ?? DEFAULT_ROLE) as UserRole,
      },
    }),
  },
} satisfies NextAuthConfig;
