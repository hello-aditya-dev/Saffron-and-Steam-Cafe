"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { X, Instagram, MapPin, Phone, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "@/components/shared/Logo";
import { mainNavigation } from "@/data/navigation";
import { cafe } from "@/data/cafe";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && navRef.current) {
        const focusable = navRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);

      // Focus first link after animation
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={navRef}
          className="fixed inset-0 z-[60] bg-espresso flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <LogoMark className="h-10 w-auto" dark />
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 text-ivory/70 hover:text-ivory transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 flex flex-col justify-center px-6 gap-6">
            {mainNavigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.06,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={onClose}
                  className="block font-serif text-3xl text-ivory hover:text-saffron transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom info */}
          <div className="px-6 pb-8 space-y-6">
            {/* Opening hours */}
            <div className="space-y-2">
              {cafe.hours.map((slot) => (
                <div key={slot.days} className="flex items-start gap-3 text-ivory/60 text-sm">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-ivory/90 font-medium">{slot.days}</p>
                    <p>{slot.time}</p>
                  </div>
                </div>
              ))}
              {cafe.kitchenNote && (
                <p className="text-ivory/40 text-xs pl-7">{cafe.kitchenNote}</p>
              )}
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 text-ivory/60 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <address className="not-italic text-ivory/90">{cafe.address.full}</address>
            </div>

            {/* Phone + Instagram */}
            <div className="flex items-center gap-4">
              <a
                href={`tel:${cafe.phone}`}
                className="flex items-center gap-2 text-ivory/60 hover:text-ivory text-sm transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                {cafe.phone}
              </a>
              <a
                href={cafe.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/60 hover:text-saffron transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href={cafe.reservationUrl}
                onClick={onClose}
                className="inline-flex items-center justify-center bg-tangerine text-ivory font-sans text-sm font-semibold uppercase tracking-wider rounded-full py-3 px-6 transition-transform duration-200 hover:scale-[1.02]"
              >
                Book a Table
              </Link>
              <Link
                href={cafe.orderingUrl}
                onClick={onClose}
                className="inline-flex items-center justify-center border border-ivory/30 text-ivory font-sans text-sm font-semibold uppercase tracking-wider rounded-full py-3 px-6 transition-colors duration-200 hover:border-ivory/60"
              >
                View Menu
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}