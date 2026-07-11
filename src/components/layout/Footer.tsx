import Link from "next/link";
import { Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import { LogoWordmark } from "@/components/shared/Logo";
import { mainNavigation } from "@/data/navigation";
import { cafe } from "@/data/cafe";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg text-footer-text">
      {/* Main grid */}
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1320px] py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <LogoWordmark className="h-6 w-auto" dark />
            <p className="text-footer-text/50 text-[0.875rem] tracking-wide font-sans leading-relaxed max-w-xs">
              A warm neighbourhood café for thoughtful coffee, generous brunch plates and relaxed evenings in New Delhi.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-widest text-footer-text/40 mb-4">
              Navigate
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-footer-text/70 hover:text-saffron font-sans text-[0.875rem] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-widest text-footer-text/40 mb-4">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-[0.875rem] text-footer-text/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-footer-text/40" strokeWidth={1.5} />
                <address className="not-italic leading-relaxed">
                  {cafe.address.street}
                  <br />
                  {cafe.address.city}, {cafe.address.state} {cafe.address.pin}
                </address>
              </li>
              <li>
                <a
                  href={`tel:${cafe.phone}`}
                  className="hover:text-saffron transition-colors duration-200 flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-footer-text/40" strokeWidth={1.5} />
                  {cafe.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${cafe.email}`}
                  className="hover:text-saffron transition-colors duration-200 flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-footer-text/40" strokeWidth={1.5} />
                  {cafe.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h3 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-widest text-footer-text/40 mb-4">
              Hours
            </h3>
            <ul className="flex flex-col gap-3 text-[0.875rem] text-footer-text/70">
              {cafe.hours.map((slot) => (
                <li key={slot.days} className="flex items-start gap-2.5">
                  <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-footer-text/40" strokeWidth={1.5} />
                  <div>
                    <p className="text-footer-text/90 font-medium">{slot.days}</p>
                    <p>{slot.time}</p>
                  </div>
                </li>
              ))}
              {cafe.kitchenNote && (
                <li className="pl-6 text-footer-text/40 text-xs">
                  {cafe.kitchenNote}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-footer-text/10">
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1320px] py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-footer-text/40 text-[0.75rem] font-sans">
            &copy; {currentYear} {cafe.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-footer-text/40 hover:text-footer-text/70 text-[0.75rem] font-sans transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-footer-text/40 hover:text-footer-text/70 text-[0.75rem] font-sans transition-colors duration-200"
            >
              Terms
            </Link>
            <a
              href={cafe.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-footer-text/40 hover:text-saffron transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}