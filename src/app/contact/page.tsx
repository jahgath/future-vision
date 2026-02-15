import siteInfo from "@/lib/siteInfo.json";

export default function ContactPage() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold text-center text-primary">Get in Touch</h1>
        <p className="mt-3 text-center text-primary-light">
          Have a question or ready to plan your next trip? We&apos;d love to hear from you.
        </p>

        <div className="mt-8 rounded-2xl bg-primary-lighter/10 p-6 text-sm text-primary-light space-y-2 border border-primary-lighter/20">
          <p className="font-semibold text-primary">{siteInfo.name}</p>
          <p>{siteInfo.location.full}</p>
          <p>
            Email:{" "}
            <a href={`mailto:${siteInfo.contact.email}`} className="text-accent hover:underline">
              {siteInfo.contact.email}
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href={`tel:${siteInfo.contact.phone1.replace(/\s/g, "")}`} className="text-accent hover:underline">
              {siteInfo.contact.phone1}
            </a>
            {" / "}
            <a href={`tel:${siteInfo.contact.phone2.replace(/\s/g, "")}`} className="text-accent hover:underline">
              {siteInfo.contact.phone2}
            </a>
          </p>
        </div>

        <form className="mt-10 space-y-6">
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
    </section>
  );
}
