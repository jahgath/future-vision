import type { Metadata } from "next";
import siteInfo from "@/lib/siteInfo.json";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteInfo.name}. Plan your next trip with our travel experts in Kottayam, Kerala. Call, email, or send us a message.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: `Contact Us | ${siteInfo.name}`,
    description: `Get in touch with ${siteInfo.name}. Plan your next trip with our travel experts in Kottayam, Kerala.`,
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
