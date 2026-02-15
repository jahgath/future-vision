import Link from "next/link";
import pageData from "@/lib/destinationsPage.json";

export default function DestinationsPage() {
  return (
    <>
      <section className="pt-8 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-center text-primary">
            {pageData.heading}
          </h1>
          <p className="mt-3 text-center text-primary-light max-w-2xl mx-auto">
            {pageData.subtitle}
          </p>
        </div>
      </section>

      {pageData.categories.map((category) => (
        <section key={category.title} className="pb-16 px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-primary">{category.title}</h2>
            <p className="mt-2 text-sm text-primary-light max-w-xl">
              {category.description}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="rounded-2xl border border-primary-lighter/20 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">
                    {dest.tagline}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-dark">
                    {dest.name}
                  </h3>
                  <p className="mt-2 text-sm text-primary-light leading-relaxed">
                    {dest.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {dest.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full bg-primary-lighter/10 px-3 py-1 text-xs text-primary-light"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 px-6 bg-primary-lighter/10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-primary">
            {pageData.cta.heading}
          </h2>
          <p className="mt-3 text-primary-light">{pageData.cta.text}</p>
          <Link
            href={pageData.cta.buttonLink}
            className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
          >
            {pageData.cta.buttonLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
