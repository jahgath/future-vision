import type { Metadata } from "next";
import siteInfo from "@/lib/siteInfo.json";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Future Vision Travel — Call, Email, or Visit Us in Kottayam",
  description: `Get in touch with Future Vision Travel and Tours in Kottayam, Kerala. Call +91 94477 36469, email info@futurevisiontours.com, or visit our office to plan your next trip.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: `Contact Future Vision Travel and Tours — Kottayam, Kerala`,
    description: `Get in touch with Future Vision Travel and Tours. Call, email, or visit our office in Kottayam, Kerala to plan your next trip.`,
  },
};

export default function ContactPage() {
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Future Vision Travel and Tours",
    description: `Get in touch with ${siteInfo.name} to plan your next trip.`,
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "TravelAgency",
      "@id": `${SITE_URL}/#organization`,
      name: siteInfo.name,
      telephone: siteInfo.contact.phone1,
      email: siteInfo.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${siteInfo.location.building}, ${siteInfo.location.junction}, ${siteInfo.location.street}`,
        addressLocality: siteInfo.location.district,
        addressRegion: siteInfo.location.state,
        postalCode: siteInfo.location.pincode,
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      hasMap: siteInfo.location.mapLink,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <section className="pt-8 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-center text-primary">Get in Touch</h1>
          <p className="mt-3 text-center text-primary-light">
            Have a question or ready to plan your next trip? We&apos;d love to hear from you.
          </p>

          <div className="mt-12 flex flex-col lg:flex-row gap-10">
            {/* Left column — map & contact info */}
            <div className="flex-1">
              <div className="rounded-2xl overflow-hidden border border-primary-lighter/20">
                <iframe
                  src={siteInfo.location.mapEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Future Vision Travel office location"
                />
              </div>

              <div className="mt-6 rounded-2xl bg-primary-lighter/10 p-6 text-sm text-primary-light space-y-2 border border-primary-lighter/20">
                <p className="font-semibold text-primary">{siteInfo.name}</p>
                <a
                  href={siteInfo.location.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-accent hover:underline"
                >
                  {siteInfo.location.full}
                </a>
                <p>
                  Email:{" "}
                  <a href={`mailto:${siteInfo.contact.email}`} className="text-accent hover:underline">
                    {siteInfo.contact.email}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a href={`https://wa.me/${siteInfo.contact.whatsapp1}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    {siteInfo.contact.phone1}
                  </a>
                  {" / "}
                  <a href={`https://wa.me/${siteInfo.contact.whatsapp2}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    {siteInfo.contact.phone2}
                  </a>
                </p>
              </div>
            </div>

            {/* Right column — contact form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
