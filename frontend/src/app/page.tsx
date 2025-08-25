import { AptIcon } from "@/components/icons/apt";
import Link from "next/link";
import { Metadata } from "next";
import { SignInButtons } from "./sign-in-buttons";
import { GithubIcon } from "@/components/icons/github";

export const metadata: Metadata = {
  title:
    "Track and optimize your job search from a single, powerful dashboard - Apt",
};

const year = new Date().getFullYear();

export default function Home() {
  return (
    <>
      <header className="p-4 w-full backdrop-blur-md flex fixed justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <AptIcon className="size-6" />
          <h1 className="text-2xl font-bold select-none">Apt</h1>
        </Link>
        <a href="https://github.com/natebabyak/job-application-tracker">
          <GithubIcon className="size-6" />
        </a>
      </header>
      <main className="h-svh flex items-center">
        <div className="flex flex-col gap-8 items-center justify-around">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-normal lg:line-clamp-2 md:line-clamp-3 text-balance px-4 md:px-0">
            Track and optimize your job search from a single, powerful dashboard
          </h1>
          <p className="text-lg font-medium text-center text-balance">
            Join now and stay on top of your job search.
          </p>
          <SignInButtons />
        </div>
      </main>
      <footer className="w-full p-4 fixed bottom-0">
        <p className="text-center text-balance">
          &copy; {year} Nate Babyak. Apt is{" "}
          <a
            href="https://github.com/natebabyak/job-application-tracker"
            className="underline-offset-4 underline"
          >
            free and open-source software
          </a>{" "}
          released under the MIT license.
        </p>
      </footer>
    </>
  );
}
