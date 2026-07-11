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
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(38,25,20,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-[calc(100%-40px)] max-w-[1320px]">
          <div className="flex items-center justify-between h-[72px] md:h-[80px] lg:h-[84px]">
            {/* Logo */}
            <Link href="/" className="relative z-10 shrink-0" aria-label={cafe.name}>
              <LogoWordmark className="h-6 md:h-7 w-auto" dark={false} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main navigation">
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative text-[0.8125rem] font-medium tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-tangerine"
                        : "text-espresso/70 hover:text-espresso"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-tangerine" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact?reason=reservation"
                className="hidden md:inline-flex items-center px-5 py-2.5 text-[0.8125rem] font-semibold uppercase tracking-wider bg-tangerine text-ivory rounded-sm hover:bg-tangerine-hover transition-colors duration-300"
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
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNavigation isOpen={mobileNavOpen} onClose={closeMobileNav} />
    </>
  );
}