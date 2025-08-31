import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord, GitHub],
  callbacks: {
    jwt({ token }) {
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub!;
      return session;
    },
  },
});
