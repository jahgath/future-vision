"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import pageData from "@/lib/destinationsPage.json";

const allDestinations = pageData.categories.flatMap((c) => c.destinations);
const CARD_WIDTH = 288;
const GAP = 24;
const SCROLL_STEP = CARD_WIDTH + GAP;

function DestinationCard({ d }: { d: (typeof allDestinations)[number] }) {
  return (
    <div className="w-72 shrink-0 rounded-2xl border border-primary-lighter/20 bg-white p-6 hover:shadow-md transition-shadow">
      <p className="text-xs font-medium uppercase tracking-wider text-accent">
        {d.tagline}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-dark">{d.name}</h3>
      <p className="mt-2 text-sm text-primary-light leading-relaxed line-clamp-3">
        {d.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {d.highlights.map((h) => (
          <span
            key={h}
            className="rounded-full bg-primary-lighter/10 px-3 py-1 text-xs text-primary-light"
          >
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Destinations() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = trackRef.current?.parentElement;
    if (!el) return;
    const offset = direction === "left" ? -SCROLL_STEP : SCROLL_STEP;
    el.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  return (
    <section id="destinations" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-center text-primary">
          Popular Destinations
        </h2>
        <p className="mt-3 text-center text-primary-light">
          Hand-picked places our travelers love.
        </p>
      </div>

      <div className="relative mt-12 group">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-primary hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-primary hover:bg-white transition-all opacity-0 group-hover:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Scrollable track with continuous animation */}
        <div className="overflow-x-auto scrollbar-hide">
          <div
            ref={trackRef}
            className="flex gap-6 px-6 pb-4 w-max animate-carousel group-hover:[animation-play-state:paused]"
          >
            {/* Original set */}
            {allDestinations.map((d) => (
              <DestinationCard key={d.id} d={d} />
            ))}
            {/* Duplicate set for seamless loop */}
            {allDestinations.map((d) => (
              <DestinationCard key={`dup-${d.id}`} d={d} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/destinations"
          className="inline-flex rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
        >
          View All Destinations
        </Link>
      </div>
    </section>
  );
}
