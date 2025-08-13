import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const year = new Date().getFullYear();

export default function Home() {
  return (
    <>
      <header className="p-4 items-center flex justify-between fixed w-full">
        <Link href={"/"} className="flex items-center gap-2 select-none">
          <Image src={"/apt.svg"} width={24} height={24} alt={"Apt Logo"} />
          <h1 className="text-2xl font-bold">Apt</h1>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant={"ghost"}>Sign in</Button>
          <Button variant={"outline"}>Sign up</Button>
        </div>
      </header>
      <main className="flex items-center justify-around min-h-svh pt-[68px] lg:pt-0">
        <div className="flex flex-col gap-8">
          <h1 className="text-7xl font-bold text-center max-w-7xl leading-tight">
            Track and optimize your job search from a single, intuitive
            dashboard
          </h1>
          <h2 className="text-2xl text-center">
            Get started now with your GitHub account.
          </h2>
          <Button className="max-w-sm w-full mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96">
              <path
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                fill="currentColor"
              />
            </svg>
            Sign up with GitHub
          </Button>
        </div>
      </main>
      <footer>
        <p className="text-center p-8">
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
