"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { menuCategories, dietaryLabels, type MenuCategory, type MenuItem, type DietaryKey } from "@/data/menu";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ReservationCTA from "@/components/shared/ReservationCTA";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

function DietaryBadge({ key_name }: { key_name: DietaryKey }) {
  return (
    <span className="inline-flex items-center rounded-brand bg-cream px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-olive">
      {dietaryLabels[key_name]}
    </span>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group relative flex flex-col gap-2 rounded-brand p-4 transition-colors sm:flex-row sm:items-start sm:gap-4 ${
        item.popular
          ? "bg-cream/70 sm:bg-cream"
          : "hover:bg-cream/40"
      }`}
    >
      {item.popular && (
        <span className="absolute -top-1 right-3 flex items-center gap-1 rounded-brand bg-tangerine px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ivory">
          <Flame className="h-3 w-3" /> Popular
        </span>
      )}

      {item.image && (
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-brand sm:h-20 sm:w-20">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl leading-tight text-espresso">{item.name}</h3>
          <span className="flex-shrink-0 text-tangerine font-semibold text-lg">₹{item.price}</span>
        </div>
        <p className="text-sm leading-relaxed text-olive">{item.description}</p>
        {item.dietary && item.dietary.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {item.dietary.map((d) => (
              <DietaryBadge key={d} key_name={d} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CategorySection({ category }: { category: MenuCategory }) {
  return (
    <section id={category.slug} className="scroll-mt-28">
      <div className="mb-8 border-b border-espresso/10 pb-4">
        <h2 className="font-serif text-subheading text-espresso">{category.name}</h2>
        {category.description && (
          <p className="mt-1 text-sm text-olive">{category.description}</p>
        )}
      </div>
      <div className="space-y-1">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  const [activeSlug, setActiveSlug] = useState<string>(menuCategories[0]?.slug ?? "");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // URL hash support on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const match = menuCategories.find((c) => c.slug === hash);
      if (match) {
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    }
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    for (const cat of menuCategories) {
      const el = document.getElementById(cat.slug);
      if (el) {
        sectionRefs.current.set(cat.slug, el);
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  const scrollToCategory = useCallback((slug: string) => {
    isScrollingRef.current = true;
    setActiveSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  }, []);

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Menu"
            title="The menu follows the day."
          />
          <p className="mt-4 max-w-2xl text-body-lg text-olive">
            From a quick morning espresso to a long evening with shared plates. Everything here is made in-house, with seasonal ingredients and a bit of care.
          </p>
        </Container>
      </section>

      {/* Sticky category nav */}
      <div className="sticky top-0 z-30 border-b border-espresso/10 bg-ivory/95 backdrop-blur-sm">
        <Container className="py-0">
          <nav aria-label="Menu categories" className="-mb-px">
            <ul className="flex gap-1 overflow-x-auto pb-px scrollbar-hide sm:gap-2 sm:overflow-x-visible sm:justify-start">
              {menuCategories.map((cat) => (
                <li key={cat.slug} className="flex-shrink-0">
                  <button
                    onClick={() => scrollToCategory(cat.slug)}
                    aria-current={activeSlug === cat.slug ? "true" : undefined}
                    className={`relative whitespace-nowrap px-3 py-3.5 text-sm font-medium transition-colors sm:px-4 ${
                      activeSlug === cat.slug
                        ? "text-espresso"
                        : "text-olive hover:text-espresso"
                    }`}
                  >
                    {cat.name}
                    {activeSlug === cat.slug && (
                      <motion.span
                        layoutId="menu-tab-indicator"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-tangerine"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      {/* Menu categories */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="space-y-16 sm:space-y-20 max-w-3xl">
            {menuCategories.map((cat) => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          </div>
        </Container>
      </section>

      <ReservationCTA />
    </main>
  );
}