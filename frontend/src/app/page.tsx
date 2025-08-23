import { AptIcon } from "@/components/icons/apt";
import Link from "next/link";
import { Metadata } from "next";
import { SignInButtons } from "./sign-in-buttons";

export const metadata: Metadata = {
  title:
    "Track and optimize your job search from a single, powerful dashboard - Apt",
};

const year = new Date().getFullYear();

export default function Home() {
  return (
    <>
      <header className="p-4 w-full backdrop-blur-md flex fixed">
        <Link href={"/"} className="flex items-center gap-2 select-none">
          <AptIcon className="size-6" />
          <h1 className="text-2xl font-bold">Apt</h1>
        </Link>
      </header>
      <main className="grid pt-16 gap-4 justify-around">
        <h1 className="text-4xl lg:text-[4rem] font-bold text-center leading-tight max-w-6xl">
          Track and optimize your job search from a single, powerful dashboard
        </h1>
        <p className="text-lg font-medium text-center">
          Get started now for free
        </p>
        <SignInButtons />
      </main>
      <footer className="w-full text-center p-4 fixed bottom-0 left-0">
        <p>
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
