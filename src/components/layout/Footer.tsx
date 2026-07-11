import Link from "next/link";
import { Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import { LogoWordmark } from "@/components/shared/Logo";
import { mainNavigation } from "@/data/navigation";
import { cafe } from "@/data/cafe";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-ivory">
      {/* Main grid */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <LogoWordmark className="h-7 w-auto" dark />
            <p className="text-ivory/50 text-sm tracking-wide font-sans">
              {cafe.descriptor}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ivory/40 mb-4">
              Navigate
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-ivory/70 hover:text-saffron font-sans text-sm transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ivory/40 mb-4">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-ivory/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-ivory/40" />
                <address className="not-italic leading-relaxed">
                  {cafe.address.street}
                  <br />
                  {cafe.address.city}, {cafe.address.state} {cafe.address.pin}
                </address>
              </li>
              <li>
                <a
                  href={`tel:${cafe.phone}`}
                  className="flex items-center gap-2.5 hover:text-saffron transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 shrink-0 text-ivory/40" />
                  {cafe.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${cafe.email}`}
                  className="flex items-center gap-2.5 hover:text-saffron transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 shrink-0 text-ivory/40" />
                  {cafe.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ivory/40 mb-4">
              Hours
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-ivory/70">
              {cafe.hours.map((slot) => (
                <li key={slot.days} className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-ivory/40" />
                  <div>
                    <p className="text-ivory/90 font-medium">{slot.days}</p>
                    <p>{slot.time}</p>
                  </div>
                </li>
              ))}
              {cafe.kitchenNote && (
                <li className="pl-6.5 text-ivory/40 text-xs">
                  {cafe.kitchenNote}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ivory/40 text-xs font-sans">
            &copy; {currentYear} {cafe.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-ivory/40 hover:text-ivory/70 text-xs font-sans transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-ivory/40 hover:text-ivory/70 text-xs font-sans transition-colors duration-200"
            >
              Terms
            </Link>
            <a
              href={cafe.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/40 hover:text-saffron transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}