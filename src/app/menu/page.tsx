"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { menuCategories, dietaryLabels, type MenuCategory, type MenuItem, type DietaryKey } from "@/data/menu";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ReservationCTA from "@/components/shared/ReservationCTA";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

/* Dietary badge */
function DietaryBadge({ key_name }: { key_name: DietaryKey }) {
  return (
    <span
      className="inline-flex items-center justify-center min-w-[28px] h-[22px] px-1.5 text-[10px] font-bold rounded-full bg-cream text-olive border border-border"
      title={dietaryLabels[key_name]}
    >
      {key_name}
    </span>
  );
}

/* Menu item row */
function MenuItemRow({ item, index }: { item: MenuItem; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex items-start gap-3 sm:gap-4 py-4 sm:py-5 ${
        item.popular ? "bg-cream/60 sm:bg-cream -mx-2 sm:mx-0 px-2 sm:px-4 rounded-brand" : ""
      } transition-colors duration-200`}
    >
      {item.image && (
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-brand">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[1.0625rem] sm:text-lg leading-tight text-espresso">
            {item.name}
            {item.popular && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-tangerine ml-2">
                <Flame className="w-3 h-3" /> Popular
              </span>
            )}
          </h3>
          <span className="text-olive font-medium text-[0.875rem] whitespace-nowrap pt-0.5">
            ₹{item.price}
          </span>
        </div>
        <p className="text-[0.8125rem] text-olive/80 leading-relaxed max-w-md">
          {item.description}
        </p>
        {item.dietary && item.dietary.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {item.dietary.map((d) => (
              <DietaryBadge key={d} key_name={d} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* Category section */
function CategorySection({ category }: { category: MenuCategory }) {
  return (
    <section id={category.slug} className="scroll-mt-28">
      <div className="mb-6 border-b border-espresso/10 pb-3">
        <h2 className="font-serif text-subheading text-espresso">{category.name}</h2>
        {category.description && (
          <p className="mt-1 text-[0.875rem] text-olive">{category.description}</p>
        )}
      </div>
      <div className="space-y-0">
        {category.items.map((item, i) => (
          <MenuItemRow key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

/* Page */
export default function MenuPage() {
  const [activeSlug, setActiveSlug] = useState<string>(menuCategories[0]?.slug ?? "");
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const match = menuCategories.find((c) => c.slug === hash);
      if (match) {
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSlug(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    for (const cat of menuCategories) {
      const el = document.getElementById(cat.slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollToCategory = useCallback((slug: string) => {
    isScrollingRef.current = true;
    setActiveSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
    const el = document.getElementById(slug);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  }, []);

  const sortedCategories = useMemo(
    () => [...menuCategories].sort((a, b) => a.id.localeCompare(b.id)),
    [],
  );

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-cream py-section pt-28">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Menu" title="The menu follows the day." />
          <p className="mt-4 text-body-lg text-olive leading-relaxed">
            From a quick morning espresso to a long evening with shared plates. Everything
            here is made in-house, with seasonal ingredients and a bit of care.
          </p>
        </Container>
      </section>

      {/* Dietary legend */}
      <div className="bg-ivory border-b border-border">
        <Container className="py-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.75rem] text-olive">
          <span className="font-medium text-espresso mr-1">Dietary:</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 inline-flex items-center justify-center text-[10px] font-bold rounded-full bg-cream text-olive border border-border">V</span> Vegetarian</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 inline-flex items-center justify-center text-[10px] font-bold rounded-full bg-cream text-olive border border-border">VG</span> Vegan</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 inline-flex items-center justify-center text-[10px] font-bold rounded-full bg-cream text-olive border border-border">GF</span> GF option</span>
          <span className="flex items-center gap-1"><span className="w-4 h-4 inline-flex items-center justify-center text-[10px] font-bold rounded-full bg-cream text-olive border border-border">N</span> Contains nuts</span>
        </Container>
      </div>

      {/* Sticky category nav */}
      <div className="sticky top-[68px] md:top-[74px] z-30 border-b border-border bg-ivory/95 backdrop-blur-sm">
        <Container className="py-0">
          <nav aria-label="Menu categories" className="-mb-px">
            <ul className="flex gap-0.5 overflow-x-auto scrollbar-hide pb-px sm:gap-1 sm:overflow-x-visible sm:justify-start">
              {sortedCategories.map((cat) => (
                <li key={cat.slug} className="flex-shrink-0">
                  <button
                    onClick={() => scrollToCategory(cat.slug)}
                    aria-current={activeSlug === cat.slug ? "true" : undefined}
                    className={`relative whitespace-nowrap px-3.5 py-3.5 text-[0.8125rem] font-medium transition-colors sm:px-4 ${
                      activeSlug === cat.slug
                        ? "text-espresso"
                        : "text-olive hover:text-espresso"
                    }`}
                  >
                    {cat.name}
                    {activeSlug === cat.slug && (
                      <motion.span
                        layoutId="menu-tab-indicator"
                        className="absolute inset-x-0 bottom-0 h-[1.5px] bg-tangerine"
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

      {/* Menu categories — 2 col on desktop */}
      <section className="py-section">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 max-w-3xl">
            {sortedCategories.map((cat) => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          </div>
        </Container>
      </section>

      <ReservationCTA />
    </main>
  );
}