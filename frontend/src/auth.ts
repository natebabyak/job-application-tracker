import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { Pool } from "pg";
import PostgresAdapter from "@auth/pg-adapter";

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: {
    strategy: "database",
  },
  ...authConfig,
});
