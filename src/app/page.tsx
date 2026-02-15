import type { Metadata } from "next";
import GlobeHero from "@/components/sections/GlobeHero";
import Destinations from "@/components/sections/Destinations";
import WhyUs from "@/components/sections/WhyUs";
import CTA from "@/components/sections/CTA";
import siteInfo from "@/lib/siteInfo.json";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    title: `${siteInfo.name} | Explore the World`,
    description: siteInfo.description,
  },
};

export default function Home() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Travel Agency Services",
    provider: {
      "@type": "TravelAgency",
      name: siteInfo.name,
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "Singapore" },
      { "@type": "Country", name: "Malaysia" },
      { "@type": "Country", name: "Indonesia" },
      { "@type": "Country", name: "Thailand" },
      { "@type": "Country", name: "Vietnam" },
      { "@type": "Country", name: "Azerbaijan" },
      { "@type": "Country", name: "Georgia" },
      { "@type": "Country", name: "Oman" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Sri Lanka" },
    ],
    description:
      "Curated travel packages and custom itineraries for India and international destinations including Southeast Asia, Middle East, and the Caucasus.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <GlobeHero />
      <Destinations />
      <WhyUs />
      <CTA />
    </>
  );
}
