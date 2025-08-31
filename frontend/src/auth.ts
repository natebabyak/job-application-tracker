import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord, GitHub],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (token.id) session.user.id = token.id;
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
});
