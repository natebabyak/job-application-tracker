import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id;
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
