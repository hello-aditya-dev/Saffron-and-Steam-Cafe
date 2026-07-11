"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { LogoWordmark } from "@/components/shared/Logo";
import { mainNavigation } from "@/data/navigation";
import { cafe } from "@/data/cafe";
import MobileNavigation from "@/components/layout/MobileNavigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-cream shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10"
              aria-label={cafe.name}
            >
              <LogoWordmark
                className={`h-7 md:h-8 w-auto transition-colors duration-200 ${
                  scrolled ? "" : ""
                }`}
                dark={false}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-sans text-sm font-medium tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-tangerine"
                        : "text-espresso/80 hover:text-espresso"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA + Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link
                href={cafe.reservationUrl}
                className="hidden md:inline-flex items-center bg-tangerine text-ivory font-sans text-sm font-semibold uppercase tracking-wider rounded-full px-5 py-2 transition-transform duration-200 hover:scale-[1.02]"
              >
                Book a Table
              </Link>

              <button
                type="button"
                className="md:hidden relative z-10 p-2 -mr-2 text-espresso"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileNavOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNavigation isOpen={mobileNavOpen} onClose={closeMobileNav} />
    </>
  );
}