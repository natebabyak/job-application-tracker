"use client";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <>
      <footer className="w-full text-center pb-8">
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
