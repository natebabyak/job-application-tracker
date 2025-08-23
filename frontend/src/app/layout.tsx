import { getSession } from "@/auth";
import "./globals.css";
import { Providers } from "@/components/providers/providers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
