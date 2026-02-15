import siteInfo from "@/lib/siteInfo.json";

const reasons = [
  { title: "Expert Guides", description: "Our local guides bring every destination to life." },
  { title: "Custom Itineraries", description: "Every trip is tailored to your preferences." },
  { title: "24/7 Support", description: "We're here for you before, during, and after your trip." },
];

export default function WhyUs() {
  return (
    <section id="about" className="bg-primary-lighter/10 py-20 px-6">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-bold text-primary">Why Travel With Us</h2>
        <p className="mt-3 text-primary-light">What sets {siteInfo.name} apart.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl bg-white p-8 shadow-sm border border-primary-lighter/20">
              <h3 className="text-lg font-semibold text-primary">{r.title}</h3>
              <p className="mt-2 text-sm text-primary-light">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
