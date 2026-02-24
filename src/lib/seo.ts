import type { Metadata } from "next";
import siteInfo from "@/lib/siteInfo.json";

export const SITE_URL = "https://futurevisiontours.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteInfo.name} | Kerala Travel Agency — Tour Packages for India & International`,
    template: `%s | ${siteInfo.name}`,
  },
  description:
    "Future Vision Travel and Tours is a trusted Kerala-based travel agency offering curated tour packages for India, Southeast Asia, Dubai, Bali, Singapore & more. Plan your dream holiday with us.",
  keywords: [
    "Future Vision",
    "Future Vision Travel",
    "Future Vision Tours",
    "Future Vision Travel and Tours",
    "futurevisiontours",
    "travel agency",
    "travel agency Kerala",
    "travel agency Kottayam",
    "Kerala travel agency",
    "tour packages",
    "India travel",
    "international tours",
    "holiday packages",
    "vacation planning",
    "curated travel experiences",
    "Singapore tours",
    "Dubai tours",
    "Bali tours",
    "Thailand tours",
    "custom itineraries",
    "honeymoon packages",
    "family tour packages",
    "group tours India",
    "Southeast Asia tours",
    "Middle East tours",
  ],
  authors: [{ name: siteInfo.name, url: SITE_URL }],
  creator: siteInfo.name,
  publisher: siteInfo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: siteInfo.name,
    title: `${siteInfo.name} | Kerala Travel Agency — Tour Packages for India & International`,
    description:
      "Future Vision Travel and Tours is a trusted Kerala-based travel agency offering curated tour packages for India, Southeast Asia, Dubai, Bali, Singapore & more.",
    images: [
      {
        url: "/images/future-vision-logo-2.png",
        width: 1200,
        height: 630,
        alt: "Future Vision Travel and Tours — Your Trusted Travel Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} | Kerala Travel Agency`,
    description:
      "Future Vision Travel and Tours — curated tour packages for India, Southeast Asia, Dubai, Bali, Singapore & more.",
    images: ["/images/future-vision-logo-2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: siteInfo.name,
    alternateName: [siteInfo.shortName, "Future Vision Tours", "Future Vision Travel"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/future-vision-logo-2.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/images/future-vision-logo-2.png`,
    description:
      "Future Vision Travel and Tours is a trusted Kerala-based travel agency offering curated domestic and international tour packages since 2013.",
    foundingDate: "2013",
    foundingLocation: {
      "@type": "Place",
      name: "Kottayam, Kerala, India",
    },
    founder: {
      "@type": "Person",
      name: "Jijo Sreenivasan",
      jobTitle: "Managing Director",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteInfo.location.building}, ${siteInfo.location.junction}, ${siteInfo.location.street}`,
      addressLocality: siteInfo.location.district,
      addressRegion: siteInfo.location.state,
      postalCode: siteInfo.location.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.6721,
      longitude: 76.5687,
    },
    hasMap: siteInfo.location.mapLink,
    telephone: siteInfo.contact.phone1,
    email: siteInfo.contact.email,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
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
    sameAs: [
      siteInfo.location.mapLink,
      `https://wa.me/${siteInfo.contact.whatsapp1}`,
      "https://www.instagram.com/jijosreenivasan",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteInfo.contact.phone1,
        contactType: "customer service",
        availableLanguage: ["English", "Hindi", "Malayalam"],
      },
      {
        "@type": "ContactPoint",
        telephone: siteInfo.contact.phone2,
        contactType: "reservations",
        availableLanguage: ["English", "Hindi", "Malayalam"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: siteInfo.name,
    alternateName: [siteInfo.shortName, "Future Vision Tours"],
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://www.google.com/search?q=site:futurevisiontours.com+{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
