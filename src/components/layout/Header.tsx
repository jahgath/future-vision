"use client";

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

  return (
    <header className={`${isHome ? "absolute" : "sticky"} top-0 left-0 right-0 z-50 ${isHome ? "" : "bg-primary shadow-lg"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Image
            src="/images/future-vision-logo-white.png"
            alt="Future Vision Travel and Tours"
            width={160}
            height={60}
            priority
          />
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`pb-1 transition-colors ${
                    isActive
                      ? "text-white border-b-2 border-accent"
                      : "text-white/80 hover:text-white"
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
      </nav>
    </header>
  );
}
