import Link from "next/link";
import Image from "next/image";
import siteInfo from "@/lib/siteInfo.json";

export default function Footer() {
  return (
    <footer className="border-t border-primary-lighter/20 bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Image
              src="/images/future-vision-logo-white.png"
              alt="Future Vision Travel and Tours"
              width={160}
              height={60}
            />
            <p className="mt-3 text-sm text-primary-lighter max-w-xs">
              {siteInfo.description}
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <p className="font-semibold mb-3">Pages</p>
              <ul className="space-y-2 text-primary-lighter">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/#destinations" className="hover:text-white transition-colors">Destinations</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Contact</p>
              <ul className="space-y-2 text-primary-lighter">
                <li>
                  <a href={`mailto:${siteInfo.contact.email}`} className="hover:text-white transition-colors">
                    {siteInfo.contact.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${siteInfo.contact.phone1.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                    {siteInfo.contact.phone1}
                  </a>
                </li>
                <li>
                  <a href={`tel:${siteInfo.contact.phone2.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                    {siteInfo.contact.phone2}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 text-sm text-primary-lighter">
          <p>{siteInfo.location.full}</p>
        </div>
        <div className="mt-6 border-t border-primary-light/30 pt-6 text-center text-xs text-primary-lighter">
          &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
