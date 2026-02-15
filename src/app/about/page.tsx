import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Future Vision Travel and Tours — a trusted Kerala-based travel agency crafting unforgettable journeys across India and the world since 2013.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About Us | Future Vision Travel and Tours",
    description:
      "Learn about Future Vision Travel and Tours — a trusted Kerala-based travel agency crafting unforgettable journeys across India and the world since 2013.",
  },
};

const stats = [
  { value: "13+", label: "Years of Experience" },
  { value: "50+", label: "Destinations" },
  { value: "1000+", label: "Happy Travellers" },
  { value: "24/7", label: "Travel Support" },
];

const values = [
  {
    title: "Personalized Journeys",
    description:
      "No two travellers are the same. We craft every itinerary around your interests, pace, and budget — whether it's a spiritual retreat in Varanasi or a beach holiday in Bali.",
  },
  {
    title: "Local Expertise",
    description:
      "Rooted in Kerala and connected across Asia, we leverage first-hand destination knowledge and trusted local partners to deliver authentic, hassle-free experiences.",
  },
  {
    title: "Transparent Pricing",
    description:
      "What you see is what you pay. We believe in honest pricing with no hidden charges, so you can plan your trip with complete confidence.",
  },
  {
    title: "End-to-End Care",
    description:
      "From visa assistance and flight bookings to on-ground support and 24/7 emergency help, we handle every detail so you can focus on making memories.",
  },
];

export default function AboutPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="pt-10 pb-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            About Us
          </p>
          <h1 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
            Your Journey Begins with Trust
          </h1>
          <p className="mt-4 text-primary-light leading-relaxed">
            Future Vision Travel &amp; Tours India Pvt. Ltd. has been turning
            dream holidays into reality since 2013. Based in Kottayam, Kerala,
            we specialise in curated domestic and international travel
            experiences — from the backwaters of Kerala to the skyline of Dubai
            and beyond.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-primary-lighter/20 bg-primary-lighter/10 p-6 text-center"
            >
              <p className="text-3xl font-bold text-accent">{s.value}</p>
              <p className="mt-1 text-xs font-medium text-primary-light">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-primary-lighter/10 py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary">Our Story</h2>
          <div className="mt-4 space-y-4 text-sm text-primary-light leading-relaxed">
            <p>
              Future Vision Travel was founded in 2013 by Jijo Sreenivasan with
              a simple belief: every person deserves a travel experience that is
              well-planned, fairly priced, and truly memorable. What started as a
              small office in Ettumanoor, Kottayam has grown into a trusted name
              across Kerala and beyond.
            </p>
            <p>
              Over the past decade, we have helped thousands of travellers
              explore the best of India — from the royal forts of Rajasthan and
              the serene hills of Munnar to the sacred ghats of Varanasi. Our
              international portfolio spans Southeast Asia, the Middle East, the
              Caucasus, and island getaways like Bali, Sri Lanka, and the
              Andaman Islands.
            </p>
            <p>
              As a registered private limited company under the Ministry of
              Corporate Affairs, we hold ourselves to the highest standards of
              professionalism, transparency, and customer care. Our growth has
              always been driven by word-of-mouth — because when your travellers
              return happy, they bring the next ones along.
            </p>
          </div>
        </div>
      </section>

      {/* What We Value */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-primary text-center">
            What We Stand For
          </h2>
          <p className="mt-3 text-center text-primary-light">
            The principles that guide every trip we plan.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-primary-lighter/20 bg-primary-lighter/10 p-6"
              >
                <h3 className="text-lg font-semibold text-primary">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-primary-light leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-primary-lighter/10 py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary">Leadership</h2>
          <p className="mt-3 text-primary-light">
            The people behind Future Vision Travel.
          </p>
          <div className="mt-10 inline-block rounded-2xl border border-primary-lighter/20 bg-white p-8 shadow-sm">
            <Image
              src="/images/managing-director.jpg"
              alt="Jijo Sreenivasan"
              width={96}
              height={96}
              className="mx-auto h-24 w-24 rounded-full object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-primary">
              Jijo Sreenivasan
            </h3>
            <p className="text-sm text-accent font-medium">
              Managing Director
            </p>
            <p className="mt-3 text-sm text-primary-light leading-relaxed max-w-md">
              With over a decade at the helm, Jijo founded Future Vision Travel
              in 2013 driven by a passion for creating seamless travel
              experiences. His hands-on approach and deep industry relationships
              ensure every trip meets the highest standards of quality and care.
            </p>
            <a
              href="https://www.instagram.com/jijosreenivasan"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @jijosreenivasan
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary">
            Ready to Plan Your Next Trip?
          </h2>
          <p className="mt-3 text-primary-light">
            Get in touch and let us craft the perfect itinerary for you.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
