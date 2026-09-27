import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Destinations from "@/components/sections/Destinations";

const GlobeHero = dynamic(() => import("@/components/sections/GlobeHero"), {
  loading: () => (
    <section
      className="relative min-h-[90vh]"
      style={{
        background:
          "linear-gradient(to bottom, #010b1f 0%, #011638 25%, #012a5c 55%, #1a4a7a 70%, #4a7aa5 80%, #8ab0d0 88%, #c8daea 94%, #ffffff 100%)",
      }}
    />
  ),
});
import WhyUs from "@/components/sections/WhyUs";
import CTA from "@/components/sections/CTA";
import siteInfo from "@/lib/siteInfo.json";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    title: `${siteInfo.name} | Kerala Travel Agency — Tour Packages for India & International`,
    description:
      "Future Vision Travel and Tours is a trusted Kerala-based travel agency offering curated tour packages for India, Southeast Asia, Dubai, Bali, Singapore & more.",
  },
};

const homeFaqs = [
  {
    question: "What is Future Vision Travel and Tours?",
    answer:
      "Future Vision Travel and Tours is a Kerala-based travel agency founded in 2013, offering curated domestic and international tour packages. We specialise in destinations across India, Southeast Asia, the Middle East, and the Caucasus region.",
  },
  {
    question: "Where is Future Vision Travel located?",
    answer:
      "Future Vision Travel and Tours is located at Vanchipurackal Buildings, Mangarakulangu Jn., Pala Road, Ettumanoor P.O, Kottayam, Kerala - 686631, India.",
  },
  {
    question: "What destinations does Future Vision Travel offer?",
    answer:
      "We offer tour packages to 50+ destinations including Kerala, Rajasthan, Goa, Kashmir, Singapore, Dubai, Bali, Thailand, Vietnam, Malaysia, Azerbaijan, Georgia, Oman, UAE, and Sri Lanka.",
  },
  {
    question: "How can I contact Future Vision Travel?",
    answer:
      "You can reach us by phone at +91 94477 36469, by email at info@futurevisiontours.com, or visit our office in Kottayam, Kerala. We are also available on WhatsApp.",
  },
  {
    question: "Does Future Vision Travel offer custom itineraries?",
    answer:
      "Yes, Future Vision Travel specialises in personalised travel itineraries tailored to your interests, budget, and schedule — whether it's a honeymoon, family holiday, group tour, or solo adventure.",
  },
];

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

  const breadcrumb = breadcrumbJsonLd([{ name: "Home", url: "/" }]);
  const faq = faqJsonLd(homeFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <GlobeHero />
      <Destinations />
      <WhyUs />
      <CTA />
    </>
  );
}
