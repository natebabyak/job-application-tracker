import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Metadata } from "next";
import Header from "./header";
import Footer from "./footer";

export const metadata: Metadata = {
  title:
    "Track and optimize your job search from a single, intuitive dashboard - Apt",
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-around min-h-svh lg:pt-0">
        <div className="flex flex-col gap-8">
          <h1 className="text-7xl font-bold text-center max-w-7xl leading-tight">
            Track and optimize your job search from a single, intuitive
            dashboard
          </h1>
          <h2 className="text-lg text-center">
            Get started now with your GitHub account.
          </h2>
          <Button className="max-w-sm w-full mx-auto">
            <Image src={"/github.svg"} width={24} height={24} alt={"GitHub"} />
            Sign up with GitHub
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
