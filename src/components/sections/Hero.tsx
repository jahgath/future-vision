import Link from "next/link";
import siteInfo from "@/lib/siteInfo.json";

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-primary-lighter/10 to-primary-lighter/25 px-6 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Explore the World with&nbsp;{siteInfo.shortName}
        </h1>
        <p className="mt-6 text-lg text-primary-light">
          Curated travel experiences to the most breathtaking destinations on earth.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#destinations"
            className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            View Destinations
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-accent bg-white px-8 py-3 text-sm font-medium text-accent hover:bg-accent hover:text-white transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
