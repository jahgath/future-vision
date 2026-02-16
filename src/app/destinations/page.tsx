import type { Metadata } from "next";
import Link from "next/link";
import pageData from "@/lib/destinationsPage.json";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import siteInfo from "@/lib/siteInfo.json";
import DestinationTabs from "@/components/sections/DestinationTabs";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore curated travel destinations across India and the world — from Kerala backwaters and Rajasthan forts to Bali beaches and Dubai skylines.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    url: "/destinations",
    title: "Destinations | Future Vision Travel and Tours",
    description:
      "Explore curated travel destinations across India and the world — from Kerala backwaters and Rajasthan forts to Bali beaches and Dubai skylines.",
  },
};

export default function DestinationsPage() {
  const allDestinations = pageData.categories.flatMap((cat) =>
    cat.destinations.map((dest) => ({
      "@type": "TouristDestination" as const,
      name: dest.name,
      description: dest.description,
    })),
  );

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Travel Destinations",
    description: pageData.subtitle,
    numberOfItems: allDestinations.length,
    itemListElement: allDestinations.map((dest, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristDestination",
        name: dest.name,
        description: dest.description,
        touristType: "Leisure traveler",
        availableFrom: {
          "@type": "TravelAgency",
          name: siteInfo.name,
          url: SITE_URL,
        },
      },
    })),
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Destinations", url: "/destinations" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="pt-8 pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-center text-primary">
            {pageData.heading}
          </h1>
          <p className="mt-3 text-center text-primary-light max-w-2xl mx-auto">
            {pageData.subtitle}
          </p>

          <div className="mt-8">
            <DestinationTabs categories={pageData.categories} />
          </div>
        </div>
      </section>

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
