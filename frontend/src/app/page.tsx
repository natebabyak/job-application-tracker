import { AptIcon } from "@/components/icons/apt";
import Link from "next/link";
import { Metadata } from "next";
import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import ThemeMenu from "../components/home/theme-menu";
import SignInButtons from "../components/home/sign-in-buttons";

export const metadata: Metadata = {
  title:
    "Track and optimize your job search from a single, powerful dashboard - Apt",
};

const year = new Date().getFullYear();

export default async function Home() {
  return (
    <>
      <header className="fixed flex w-full justify-between p-4 backdrop-blur-md">
        <Link href={"/"} className="flex items-center gap-2">
          <AptIcon className="size-6" />
          <h1 className="text-2xl font-bold select-none">Apt</h1>
        </Link>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <a href="https://github.com/natebabyak/job-application-tracker">
              <GithubIcon />
            </a>
          </Button>
          <ThemeMenu />
        </div>
      </header>
      <main className="flex min-h-svh flex-col items-center pt-16">
        <h1 className="px-4 text-center text-4xl leading-normal font-bold text-balance md:line-clamp-3 md:px-0 md:text-5xl lg:line-clamp-2 lg:text-6xl">
          Track and optimize your job search from a single, powerful dashboard
        </h1>
        <p className="text-center text-lg font-medium text-balance">
          Join now and stay on top of your job search.
        </p>
        <SignInButtons />
      </main>
      <footer className="w-full p-4">
        <p className="text-center text-balance">
          &copy; {year} Nate Babyak. Apt is{" "}
          <a
            href="https://github.com/natebabyak/job-application-tracker"
            className="underline underline-offset-4"
          >
            free and open-source software
          </a>{" "}
          released under the MIT license.
        </p>
      </footer>
    </>
  );
}
