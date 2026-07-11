"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-ivory px-4">
      <div className="text-center">
        <p className="font-serif text-display-sm text-cream select-none sm:text-display">
          404
        </p>
        <h1 className="font-serif text-heading text-espresso mt-2 sm:mt-4">
          This table seems to have moved.
        </h1>
        <p className="mt-4 text-body-lg text-olive max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist — or it&apos;s somewhere else now.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-brand bg-tangerine px-8 py-3 font-semibold text-ivory transition-colors hover:bg-saffron hover:text-espresso"
        >
          Return to the café
        </Link>
      </div>
    </main>
  );
}