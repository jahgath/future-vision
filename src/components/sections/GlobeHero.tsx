"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
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

const IMG = (id: string, label: string) => ({
  src: `https://images.unsplash.com/${id}?w=280&h=360&fit=crop&q=80`,
  label,
});

const imagePool = [
  IMG("photo-1537996194471-e657df975ab4", "Bali"),
  IMG("photo-1512453979798-5ea266f8880c", "Dubai"),
  IMG("photo-1528181304800-259b08848526", "Thailand"),
  IMG("photo-1507525428034-b723cf961d3e", "Goa"),
  IMG("photo-1525625293386-3f8f99389edd", "Singapore"),
  IMG("photo-1602216056096-3b40cc0c9944", "Kerala"),
  IMG("photo-1464822759023-fed622ff2c3b", "Georgia"),
  IMG("photo-1506905925346-21bda4d32df4", "Ladakh"),
  IMG("photo-1480714378408-67cf0d13bc1b", "Delhi"),
  IMG("photo-1505118380757-91f5f5632de0", "Andaman"),
  IMG("photo-1476514525535-07fb3b4ae5f1", "Malaysia"),
  IMG("photo-1469474968028-56623f02e42e", "Vietnam"),
  IMG("photo-1501785888041-af3ef285b470", "Sri Lanka"),
  IMG("photo-1470071459604-3b5ec3a7fe05", "Jaipur"),
  IMG("photo-1431794062232-2a99a5431c6c", "Varanasi"),
  IMG("photo-1509316785289-025f5b846b35", "Oman"),
  IMG("photo-1514282401047-d79a71a590e8", "Azerbaijan"),
  IMG("photo-1548013146-72479768bada", "Agra"),
  IMG("photo-1500382017468-9049fed747ef", "Munnar"),
  IMG("photo-1473116763249-2faaef81ccda", "Phuket"),
];

const SLOT_COUNT = 12;
const FADE_MS = 900;
const CYCLE_MS = 3500;
const REVEAL_MS = 2000; // how long a revealed image stays unmasked

function shuffle(length: number): number[] {
  const a = Array.from({ length }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useImageRotation() {
  // Deterministic initial state — avoids server/client hydration mismatch
  const [slots, setSlots] = useState<number[]>(
    Array.from({ length: SLOT_COUNT }, (_, i) => i),
  );
  const [fadingSlot, setFadingSlot] = useState(-1);
  const nextSlotRef = useRef(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Shuffle client-side only on mount
  useEffect(() => {
    setSlots(shuffle(imagePool.length).slice(0, SLOT_COUNT));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const slotIdx = nextSlotRef.current;
      nextSlotRef.current = (nextSlotRef.current + 1) % SLOT_COUNT;

      setFadingSlot(slotIdx);

      fadeTimerRef.current = setTimeout(() => {
        setSlots((prev) => {
          const inUse = new Set(prev);
          const available: number[] = [];
          for (let i = 0; i < imagePool.length; i++) {
            if (!inUse.has(i)) available.push(i);
          }
          if (available.length === 0) return prev;
          const next = [...prev];
          next[slotIdx] =
            available[Math.floor(Math.random() * available.length)];
          return next;
        });
        setFadingSlot(-1);
      }, FADE_MS);
    }, CYCLE_MS);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimerRef.current);
    };
  }, []);

  return { slots, fadingSlot };
}

function useScrollZoom() {
  const [transform, setTransform] = useState({ scale: 1, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(
        window.scrollY / (window.innerHeight * 0.8),
        1,
      );
      setTransform({ scale: 1 + progress * 0.1, y: progress * -15 });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return transform;
}

function useOverlayReveal() {
  const [revealedSlot, setRevealedSlot] = useState(-1);

  useEffect(() => {
    const pick = () => {
      const slot = Math.floor(Math.random() * SLOT_COUNT);
      setRevealedSlot(slot);
      setTimeout(() => setRevealedSlot(-1), REVEAL_MS);
    };

    // Initial reveal after a short delay
    const startTimer = setTimeout(pick, 1500);
    const interval = setInterval(pick, REVEAL_MS + 1500);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, []);

  return revealedSlot;
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
  const { slots, fadingSlot } = useImageRotation();
  const scrollZoom = useScrollZoom();
  const revealedSlot = useOverlayReveal();

  const handleDestinationClick = useCallback((dest: GlobeDestination) => {
    setSelected((prev) => (prev?.id === dest.id ? null : dest));
  }, []);

  const handleClose = useCallback(() => {
    setSelected(null);
  }, []);

  const findDestination = useCallback(
    (label: string) =>
      destinations.find(
        (d) =>
          d.name.toLowerCase().includes(label.toLowerCase()) ||
          d.id.includes(label.toLowerCase()),
      ),
    [],
  );

  const handleImageClick = useCallback(
    (label: string) => {
      const dest = findDestination(label);
      if (dest) handleDestinationClick(dest);
    },
    [findDestination, handleDestinationClick],
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] landscape:min-h-[max(100vh,500px)] w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #000510 0%, #000a1a 20%, #010e2a 40%, #061a38 52%, #0e2d55 62%, #1a4a7a 72%, #3070a0 80%, #5a9ac0 86%, #8ab8d8 90%, #b0d0e8 93%, #d4e6f2 96%, #ffffff 100%)",
      }}
    >
      {/* Header text */}
      <div className="relative z-10 pt-32 landscape:pt-20 pb-2 text-center px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Explore the World with&nbsp;
          <span className="text-[#f58220]">{siteInfo.shortName}</span>
        </h1>
        <p className="mt-3 text-sm text-white/60 sm:text-base">
          Discover some of our most popular destinations
        </p>
      </div>

      {/* Globe + side image grids — CSS Grid prevents overlap */}
      <div className="relative z-0 grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] items-center px-3 xl:px-8 -mt-4 w-full">
        {/* Left grid */}
        <div
          className="hidden lg:block"
          style={{
            perspective: "900px",
            transform: `scale(${scrollZoom.scale}) translateY(${scrollZoom.y}px)`,
          }}
        >
          <div
            className="grid grid-cols-3 gap-1.5 xl:gap-2 ml-auto"
            style={{
              transform: "rotateY(16deg)",
              transformOrigin: "right center",
            }}
          >
            {slots.slice(0, 6).map((poolIdx, slotIdx) => {
              const img = imagePool[poolIdx];
              const isFading = fadingSlot === slotIdx;
              const isRevealed = revealedSlot === slotIdx;
              return (
                <div
                  key={slotIdx}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.07] cursor-pointer"
                  onClick={() => handleImageClick(img.label)}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className={`object-cover transition-opacity duration-[900ms] ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}
                    sizes="(min-width: 1280px) 105px, 80px"
                  />
                  <div className={`absolute inset-0 bg-primary/75 transition-opacity duration-700 ${isRevealed ? "opacity-0" : "opacity-100"} group-hover:opacity-0`} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-1.5 py-1">
                    <span
                      className={`text-[9px] xl:text-[10px] font-semibold text-white tracking-wide transition-opacity duration-[900ms] ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}
                    >
                      {img.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Globe */}
        <div className="mx-auto w-full max-w-2xl aspect-square">
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

        {/* Right grid */}
        <div
          className="hidden lg:block"
          style={{
            perspective: "900px",
            transform: `scale(${scrollZoom.scale}) translateY(${scrollZoom.y}px)`,
          }}
        >
          <div
            className="grid grid-cols-3 gap-1.5 xl:gap-2 mr-auto"
            style={{
              transform: "rotateY(-16deg)",
              transformOrigin: "left center",
            }}
          >
            {slots.slice(6, 12).map((poolIdx, slotIdx) => {
              const img = imagePool[poolIdx];
              const isFading = fadingSlot === slotIdx + 6;
              const isRevealed = revealedSlot === slotIdx + 6;
              return (
                <div
                  key={slotIdx}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 shadow-lg transition-transform duration-300 ease-out hover:scale-[1.07] cursor-pointer"
                  onClick={() => handleImageClick(img.label)}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className={`object-cover transition-opacity duration-[900ms] ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}
                    sizes="(min-width: 1280px) 105px, 80px"
                  />
                  <div className={`absolute inset-0 bg-primary/75 transition-opacity duration-700 ${isRevealed ? "opacity-0" : "opacity-100"} group-hover:opacity-0`} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-1.5 py-1">
                    <span
                      className={`text-[9px] xl:text-[10px] font-semibold text-white tracking-wide transition-opacity duration-[900ms] ease-in-out ${isFading ? "opacity-0" : "opacity-100"}`}
                    >
                      {img.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Destination popup card */}
      <div
        className={`absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[92%] max-w-md transition-all duration-300 ease-out ${
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
