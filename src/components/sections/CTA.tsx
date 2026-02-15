import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 px-6 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-primary">Ready for Your Next Adventure?</h2>
        <p className="mt-4 text-primary-light">
          Let us plan the perfect trip. Reach out and we&apos;ll handle the rest.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
