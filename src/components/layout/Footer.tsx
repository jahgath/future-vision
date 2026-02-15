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
                <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
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
                  <a href={`https://wa.me/${siteInfo.contact.whatsapp1}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {siteInfo.contact.phone1}
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${siteInfo.contact.whatsapp2}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {siteInfo.contact.phone2}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 text-sm text-primary-lighter">
          <a
            href={siteInfo.location.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-1.5 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0 mt-0.5">
              <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
            </svg>
            {siteInfo.location.full}
          </a>
        </div>
        <div className="mt-6 border-t border-primary-light/30 pt-6 text-center text-xs text-primary-lighter">
          &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
