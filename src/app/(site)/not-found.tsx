import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist. Browse our travel destinations or contact us to plan your next trip.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-primary-light">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or no longer exists.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/destinations"
          className="rounded-full border border-accent px-6 py-3 text-sm font-medium text-accent hover:bg-accent/5 transition-colors"
        >
          Explore Destinations
        </Link>
      </div>
    </section>
  );
}
