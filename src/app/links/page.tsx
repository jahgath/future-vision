import type { Metadata } from "next";
import Image from "next/image";
import siteInfo from "@/lib/siteInfo.json";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${siteInfo.shortName} | Links`,
  description: `All the ways to reach ${siteInfo.name} — website, WhatsApp, email and social media.`,
  alternates: { canonical: "/links" },
  robots: { index: false, follow: true },
  openGraph: {
    url: `${SITE_URL}/links`,
    title: `${siteInfo.shortName} | Links`,
    description: `All the ways to reach ${siteInfo.name}.`,
  },
};

type LinkItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const links: LinkItem[] = [
  {
    label: "Website",
    href: "https://www.futurevisiontours.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918943121169",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.83 14.24c-.25.7-1.24 1.3-2.02 1.46-.54.11-1.24.2-3.6-.77-3.02-1.25-4.96-4.32-5.11-4.52-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.09.93 2.24.08.15.13.32.02.52-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.35 1.44.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.08.13.08.72-.17 1.42z" />
      </svg>
    ),
  },
  {
    label: "Email Us",
    href: `mailto:${siteInfo.contact.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/futurevisiontravelandtours/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/FutureVisionTravelAndToursIndiaPvtLtd/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M13.5 21v-7.5H16l.5-3.5h-3V7.8c0-1 .3-1.7 1.7-1.7H16.5V3.1C16.2 3 15.3 3 14.3 3c-2.2 0-3.8 1.4-3.8 3.9V10H8v3.5h2.5V21h3z" />
      </svg>
    ),
  },
];

export default function LinksPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-primary/5 via-white to-white px-4 py-16">
      <div className="w-full max-w-sm text-center">
        <Image
          src="/images/future-vision-logo-2.png"
          alt={siteInfo.name}
          width={266}
          height={148}
          className="mx-auto h-auto w-56"
          priority
        />
        <h1 className="sr-only">{siteInfo.name}</h1>

        <nav className="mt-8 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
