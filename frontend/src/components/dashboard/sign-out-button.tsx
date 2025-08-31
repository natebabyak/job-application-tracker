"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <DropdownMenuItem onClick={() => signOut({ redirectTo: "/dashboard" })}>
      <LogOutIcon />
      Sign out
    </DropdownMenuItem>
  );
}
