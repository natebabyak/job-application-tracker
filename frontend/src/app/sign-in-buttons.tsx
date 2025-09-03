"use client";

import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/icons/discord";
import { GithubIcon } from "@/components/icons/github";
import { signIn } from "next-auth/react";

export function SignInButtons() {
  return (
    <div className="grid w-full max-w-sm gap-2 px-4 md:px-4">
      <Button onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
        <GithubIcon />
        Sign in with GitHub
      </Button>
      <Button
        onClick={() => signIn("github", { redirectTo: "/dashboard" })}
        variant="outline"
      >
        <DiscordIcon />
        Sign in with Discord
      </Button>
    </div>
  );
}
