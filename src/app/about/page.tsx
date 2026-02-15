export default function AboutPage() {
  return (
    <section className="pt-8 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-primary">
          About Us
        </h1>
        <p className="mt-3 text-center text-primary-light">
          Learn more about Future Vision Travel and Tours.
        </p>

        <div className="mt-12 space-y-8">
          <div className="rounded-2xl border border-primary-lighter/20 bg-primary-lighter/10 p-6">
            <h2 className="text-xl font-semibold text-primary">Our Story</h2>
            <p className="mt-3 text-sm text-primary-light leading-relaxed">
              Placeholder content about the company story, mission, and vision
              will go here. This section will describe how Future Vision Travel
              was founded and what drives the team.
            </p>
          </div>

          <div className="rounded-2xl border border-primary-lighter/20 bg-primary-lighter/10 p-6">
            <h2 className="text-xl font-semibold text-primary">Our Mission</h2>
            <p className="mt-3 text-sm text-primary-light leading-relaxed">
              Placeholder content about the company mission and values will go
              here. This section will describe the commitment to creating
              unforgettable travel experiences.
            </p>
          </div>

          <div className="rounded-2xl border border-primary-lighter/20 bg-primary-lighter/10 p-6">
            <h2 className="text-xl font-semibold text-primary">Our Team</h2>
            <p className="mt-3 text-sm text-primary-light leading-relaxed">
              Placeholder content about the team members and their expertise
              will go here. This section will introduce the people behind Future
              Vision Travel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
