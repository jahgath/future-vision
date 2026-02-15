import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
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
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <li><Link href="/#destinations" className="hover:text-white transition-colors">Destinations</Link></li>
          <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
          <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
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
