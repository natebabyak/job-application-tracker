import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const year = new Date().getFullYear();

export default function Home() {
  return (
    <>
      <header className="p-4 items-center flex justify-between fixed w-full">
        <Link href={"/"} className="flex items-center gap-2 select-none">
          <Image src={"/apt.svg"} width={24} height={24} alt={"Apt"} />
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
            <Image src={"/github.svg"} width={24} height={24} alt={"GitHub"} />
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
