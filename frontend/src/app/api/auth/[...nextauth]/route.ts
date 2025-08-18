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
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.picture = user.image;
        token.name = user.name;
      }
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
