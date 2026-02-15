import siteInfo from "@/lib/siteInfo.json";

export default function ContactPage() {
  return (
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
          <div className="flex-1">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-primary-lighter/30 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-primary-lighter/30 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1 w-full rounded-lg border border-primary-lighter/30 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-accent py-3 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
