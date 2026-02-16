"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import siteInfo from "@/lib/siteInfo.json";
import { destinations, travelArcs } from "@/lib/destinations";
import type { GlobeDestination } from "@/types";
import type { GlobeConfig } from "@/components/ui/Globe";

const World = dynamic(() => import("@/components/ui/Globe"), { ssr: false });

function useIdleLoad() {
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const activate = () => {
      if (typeof requestIdleCallback === "function") {
        requestIdleCallback(() => setReady(true));
      } else {
        setTimeout(() => setReady(true), 200);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          activate();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ready, sectionRef };
}

const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#143d6b",
  showAtmosphere: true,
  atmosphereColor: "#6db3e8",
  atmosphereAltitude: 0.15,
  emissive: "#1a5a9a",
  emissiveIntensity: 0.35,
  shininess: 0.8,
  polygonColor: "rgba(160, 210, 255, 0.9)",
  ambientLight: "#dce8f5",
  arcTime: 1200,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.5,
  initialPosition: { lat: 20.5937, lng: 0 },
};

export default function GlobeHero() {
  const [selected, setSelected] = useState<GlobeDestination | null>(null);
  const { ready, sectionRef } = useIdleLoad();

  const handleDestinationClick = useCallback((dest: GlobeDestination) => {
    setSelected((prev) => (prev?.id === dest.id ? null : dest));
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #000510 0%, #000a1a 20%, #010e2a 40%, #061a38 52%, #0e2d55 62%, #1a4a7a 72%, #3070a0 80%, #5a9ac0 86%, #8ab8d8 90%, #b0d0e8 93%, #d4e6f2 96%, #ffffff 100%)",
      }}
    >
      {/* Header text */}
      <div className="relative z-10 pt-32 pb-2 text-center px-6">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Explore the World with&nbsp;
          <span className="text-[#f58220]">{siteInfo.shortName}</span>
        </h1>
        <p className="mt-3 text-sm text-white/60 sm:text-base">
          Discover some of our most popular destinations
        </p>
      </div>

      {/* Globe container */}
      <div className="relative z-0 mx-auto w-full max-w-2xl aspect-square -mt-4">
        {ready ? (
          <World
            globeConfig={globeConfig}
            data={travelArcs}
            destinations={destinations}
            selectedDestination={selected?.id ?? null}
            onDestinationClick={handleDestinationClick}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="h-12 w-12 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
          </div>
        )}
      </div>

      {/* Destination popup card */}
      <div
        className={`absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] max-w-md transition-all duration-300 ease-out ${
          selected
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-5 scale-95 pointer-events-none"
        }`}
      >
        {selected && (
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#f58220]">
                  {selected.tagline}
                </p>
                <h3 className="mt-1 text-xl font-bold text-white">
                  {selected.name}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-1.5 text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {selected.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {selected.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
                >
                  {h}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[#f58220] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#f58220]/90 transition-colors"
              >
                Inquire Now
              </Link>
              <button
                onClick={handleClose}
                className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Keep Exploring
              </button>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
