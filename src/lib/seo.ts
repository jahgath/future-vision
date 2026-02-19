import type { Metadata } from "next";
import siteInfo from "@/lib/siteInfo.json";

export const SITE_URL = "https://futurevisiontours.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteInfo.name} | Explore the World`,
    template: `%s | ${siteInfo.name}`,
  },
  description: siteInfo.description,
  keywords: [
    "travel agency",
    "tour packages",
    "India travel",
    "international tours",
    "Kerala travel agency",
    "holiday packages",
    "vacation planning",
    "curated travel experiences",
    "Singapore tours",
    "Dubai tours",
    "Bali tours",
    "Thailand tours",
    "custom itineraries",
    "Future Vision Travel",
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
    title: `${siteInfo.name} | Explore the World`,
    description: siteInfo.description,
    images: [
      {
        url: "/images/future-vision-logo-2.png",
        width: 1200,
        height: 630,
        alt: siteInfo.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} | Explore the World`,
    description: siteInfo.description,
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
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteInfo.name,
    alternateName: siteInfo.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/future-vision-logo-2.png`,
    image: `${SITE_URL}/images/future-vision-logo-2.png`,
    description: siteInfo.description,
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
    telephone: siteInfo.contact.phone1,
    email: siteInfo.contact.email,
    sameAs: [
      `https://wa.me/${siteInfo.contact.whatsapp1}`,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteInfo.contact.phone1,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Malayalam"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteInfo.name,
    alternateName: siteInfo.shortName,
    url: SITE_URL,
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
