import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";
import prismaClient from "./prisma";
import type { Adapter } from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient as unknown as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id } as {
        id: string;
        name: string;
        email: string;
      };
      return session;
    },
  },
};
