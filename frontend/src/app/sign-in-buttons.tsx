"use client";

import { Button } from "@/components/ui/button";
import { DiscordIcon } from "@/components/icons/discord";
import { GithubIcon } from "@/components/icons/github";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";

export function SignInButtons() {
  return (
    <div className="grid gap-4 w-sm mx-auto">
      <Button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
        <GithubIcon />
        Continue with GitHub
      </Button>
      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs bg-background p-2 font-medium">
          OR
        </span>
      </div>
      <Button onClick={() => signIn("discord")} variant="outline">
        <DiscordIcon />
        Continue with Discord
      </Button>
    </div>
  );
}
