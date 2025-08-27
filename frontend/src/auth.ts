import { AuthOptions, getServerSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider;
        token.providerId = account.providerAccountId;
      }

      if (profile) {
        token.picture = profile.image;
        token.name = profile.name;
        token.email = profile.email;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.provider = token.provider as string;
      session.user.providerId = token.providerId as string;
      session.user.picture = token.picture as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;

      return session;
    },
  },
};

export const getSession = () => getServerSession(authOptions);
