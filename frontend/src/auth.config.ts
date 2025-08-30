import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [Discord, GitHub],
  callbacks: {
    jwt({ token, user }) {
      token.id = user.id;
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
} satisfies NextAuthConfig;
