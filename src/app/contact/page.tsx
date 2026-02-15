"use client";

import { useState, type FormEvent } from "react";
import siteInfo from "@/lib/siteInfo.json";
import countryCodes from "@/lib/countryCodes";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const countryCode = (form.elements.namedItem("countryCode") as HTMLSelectElement).value;
    const phoneNumber = (form.elements.namedItem("phone") as HTMLInputElement).value;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: `${countryCode} ${phoneNumber}`,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

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
            {status === "success" ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                <p className="text-lg font-semibold text-green-800">Message sent!</p>
                <p className="mt-2 text-sm text-green-700">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 rounded-full bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <label htmlFor="phone" className="block text-sm font-medium text-primary">Phone</label>
                  <div className="mt-1 flex gap-2">
                    <select
                      id="countryCode"
                      name="countryCode"
                      defaultValue="+91"
                      className="w-[140px] shrink-0 rounded-lg border border-primary-lighter/30 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {countryCodes.map((c) => (
                        <option key={`${c.code}-${c.country}`} value={c.code}>
                          {c.code} {c.country}
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="Phone number"
                      className="w-full rounded-lg border border-primary-lighter/30 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
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

                {status === "error" && (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-accent py-3 text-sm font-medium text-white hover:bg-accent/90 transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
