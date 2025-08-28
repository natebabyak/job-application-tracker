import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Discord],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      token.email = user.email;
      token.name = user.name;
      token.picture = user.image;

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.name = token.name;
      }

      return session;
    },
  },
  events: {
    async signIn({ account }) {
      const response = await fetch(`${process.env.API_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: account?.provider,
          provider_account_id: Number(account?.providerAccountId),
        }),
      });
    },
  },
});
