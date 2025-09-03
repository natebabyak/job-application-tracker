import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord, GitHub],
});
