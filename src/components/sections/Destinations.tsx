const destinations = [
  { name: "Bali, Indonesia", description: "Tropical paradise with stunning temples and beaches." },
  { name: "Santorini, Greece", description: "Iconic sunsets and whitewashed coastal villages." },
  { name: "Kyoto, Japan", description: "Ancient temples, gardens, and timeless culture." },
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-primary">Popular Destinations</h2>
        <p className="mt-3 text-center text-primary-light">Hand-picked places our travelers love.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <div
              key={d.name}
              className="rounded-2xl border border-primary-lighter/20 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <div className="h-40 rounded-xl bg-primary-lighter/15 mb-4" />
              <h3 className="text-lg font-semibold text-dark">{d.name}</h3>
              <p className="mt-1 text-sm text-primary-light">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
