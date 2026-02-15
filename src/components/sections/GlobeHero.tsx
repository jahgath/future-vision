"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import siteInfo from "@/lib/siteInfo.json";
import { destinations, travelArcs } from "@/lib/destinations";
import type { GlobeDestination } from "@/types";
import type { GlobeConfig } from "@/components/ui/Globe";

const World = dynamic(() => import("@/components/ui/Globe"), { ssr: false });

const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#0c3a6b",
  showAtmosphere: true,
  atmosphereColor: "#4a7aa5",
  atmosphereAltitude: 0.12,
  emissive: "#0c3a6b",
  emissiveIntensity: 0.25,
  shininess: 0.7,
  polygonColor: "rgba(138, 180, 214, 0.85)",
  ambientLight: "#c8daea",
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

  const handleDestinationClick = useCallback((dest: GlobeDestination) => {
    setSelected((prev) => (prev?.id === dest.id ? null : dest));
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #010b1f 0%, #011638 25%, #012a5c 55%, #1a4a7a 70%, #4a7aa5 80%, #8ab0d0 88%, #c8daea 94%, #ffffff 100%)",
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
        <World
          globeConfig={globeConfig}
          data={travelArcs}
          destinations={destinations}
          selectedDestination={selected?.id ?? null}
          onDestinationClick={handleDestinationClick}
        />
      </div>

      {/* Destination popup card */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] max-w-md"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
