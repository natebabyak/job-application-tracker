"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard", RedirectType.replace);
  }

  return (
    <>
      <header className="p-4 items-center flex justify-between fixed w-full">
        <Link href={"/"} className="flex items-center gap-2 select-none">
          <Image src={"/apt.svg"} width={24} height={24} alt={"Apt"} />
          <h1 className="text-2xl font-bold">Apt</h1>
        </Link>
        <div className="flex items-center gap-2">
          <Button onClick={() => signIn("github")} variant={"ghost"}>
            Sign in
          </Button>
          <Button onClick={() => signIn("github")} variant={"outline"}>
            Sign up
          </Button>
        </div>
      </header>
    </>
  );
}
