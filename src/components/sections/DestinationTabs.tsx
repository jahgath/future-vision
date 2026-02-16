"use client";

import { useState } from "react";

interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
}

interface Category {
  title: string;
  description: string;
  destinations: Destination[];
}

export default function DestinationTabs({ categories }: { categories: Category[] }) {
  // Reorder so International is first
  const sorted = [...categories].sort((a, b) =>
    a.title === "International" ? -1 : b.title === "International" ? 1 : 0,
  );

  const [active, setActive] = useState(sorted[0]?.title ?? "");
  const current = sorted.find((c) => c.title === active) ?? sorted[0];

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center gap-2 sm:gap-3">
        {sorted.map((cat) => (
          <button
            key={cat.title}
            onClick={() => setActive(cat.title)}
            className={`rounded-full px-5 sm:px-7 py-2 sm:py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              active === cat.title
                ? "bg-primary text-white shadow-md"
                : "bg-primary-lighter/15 text-primary hover:bg-primary-lighter/25"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Category description */}
      {current && (
        <p className="mt-6 text-center text-sm text-primary-light max-w-xl mx-auto">
          {current.description}
        </p>
      )}

      {/* Cards grid */}
      {current && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {current.destinations.map((dest) => (
            <div
              key={dest.id}
              className="rounded-2xl border border-primary-lighter/20 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-accent">
                {dest.tagline}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-dark">
                {dest.name}
              </h3>
              <p className="mt-2 text-sm text-primary-light leading-relaxed">
                {dest.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {dest.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-primary-lighter/10 px-3 py-1 text-xs text-primary-light"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
