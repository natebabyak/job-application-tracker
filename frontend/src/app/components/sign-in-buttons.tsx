"use client";

import { signIn } from "next-auth/react";
import { DiscordIcon } from "@/components/icons/discord";
import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";

export default function SignInButtons() {
  return (
    <div className="flex max-w-sm gap-2">
      <Button onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
        <GithubIcon />
        Sign in with GitHub
      </Button>
      <Button
        onClick={() => signIn("discord", { redirectTo: "/dashboard" })}
        variant="outline"
      >
        <DiscordIcon />
        Sign in with Discord
      </Button>
    </div>
  );
}
