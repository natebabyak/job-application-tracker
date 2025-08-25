// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      provider: string;
      providerId: string;
      picture: string;
      name: string;
      email: string;
    };
  }
}
