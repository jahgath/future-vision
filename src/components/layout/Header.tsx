"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`${isHome ? "absolute" : "sticky"} top-0 left-0 right-0 z-50 ${
        isHome
          ? "backdrop-blur-xl md:backdrop-blur-none bg-white/5 md:bg-transparent border-b border-white/10 md:border-transparent"
          : "backdrop-blur-xl bg-primary/10 border-b border-primary/10 shadow-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <Link href="/">
          <Image
            src={isHome ? "/images/future-vision-logo-white.png" : "/images/future-vision-logo-2.png"}
            alt="Future Vision Travel and Tours"
            width={130}
            height={44}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`pb-1 transition-colors ${
                    isActive
                      ? `${isHome ? "text-white" : "text-primary"} border-b-2 border-accent`
                      : `${isHome ? "text-white/80 hover:text-white" : "text-foreground/60 hover:text-foreground"}`
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/contact"
          className="hidden md:inline-flex rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
        >
          Inquire Now
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-[5px]"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-[2px] w-5 rounded-full ${isHome ? "bg-white" : "bg-foreground"} transition-all duration-300 origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[2px] w-5 rounded-full ${isHome ? "bg-white" : "bg-foreground"} transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block h-[2px] w-5 rounded-full ${isHome ? "bg-white" : "bg-foreground"} transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-5">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg font-medium transition-colors ${
                  isActive
                    ? "text-accent"
                    : `${isHome ? "text-white/80 hover:text-white" : "text-foreground/60 hover:text-foreground"}`
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-1 w-fit rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
          >
            Inquire Now
          </Link>
        </div>
      </div>
    </header>
  );
}
