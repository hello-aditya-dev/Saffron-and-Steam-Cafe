"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Wheat, AlertTriangle } from "lucide-react";
import {
  menuCategories,
  type MenuCategory,
  type MenuItem,
  type DietaryKey,
} from "@/data/menu";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Dietary badge configuration                                        */
/* ------------------------------------------------------------------ */

const dietaryConfig: Record<
  DietaryKey,
  {
    Icon: React.ComponentType<{ className?: string }>;
    label: string;
    badgeClass: string;
  }
> = {
  V: {
    Icon: Leaf,
    label: "Vegetarian",
    badgeClass: "bg-olive-green/10 text-olive-green",
  },
  VG: {
    Icon: Leaf,
    label: "Vegan",
    badgeClass: "bg-olive-green/10 text-olive-green",
  },
  GF: {
    Icon: Wheat,
    label: "GF option",
    badgeClass: "bg-saffron/10 text-saffron",
  },
  N: {
    Icon: AlertTriangle,
    label: "Contains nuts",
    badgeClass: "bg-rose/10 text-rose",
  },
};

function DietaryBadge({ code }: { code: DietaryKey }) {
  const config = dietaryConfig[code];
  const { Icon, label } = config;
  return (
    <span
      className={`inline-flex items-center gap-1 min-w-[22px] h-[20px] px-1.5 text-[10px] font-bold rounded-full ${config.badgeClass}`}
      title={label}
    >
      <Icon className="w-2.5 h-2.5" />
      <span>{code}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Dotted leader (fills space between name & price)                   */
/* ------------------------------------------------------------------ */

function DottedLeader() {
  return (
    <div
      className="flex-1 mx-2 border-b border-dotted border-espresso/10 self-end mb-1 min-w-[16px] hidden sm:block"
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Menu item row                                                      */
/* ------------------------------------------------------------------ */

interface MenuItemRowProps {
  item: MenuItem;
}

function MenuItemRow({ item }: MenuItemRowProps) {
  const isFeatured = Boolean(item.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="py-4 border-b border-border last:border-b-0"
    >
      {isFeatured ? (
        /* Featured item with image */
        <div className="flex gap-4">
          <div className="w-24 h-24 flex-shrink-0 rounded-brand overflow-hidden">
            <Image
              src={item.image!}
              alt={item.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline">
              <div className="flex items-center gap-1.5 flex-shrink-0 mr-1">
                {item.dietary?.map((d) => (
                  <DietaryBadge key={d} code={d} />
                ))}
              </div>
              <h3 className="font-serif text-[1.125rem] lg:text-[1.1875rem] text-espresso leading-snug truncate">
                {item.name}
                {item.popular && (
                  <span className="text-[10px] uppercase tracking-wider text-tangerine font-sans font-semibold ml-1.5 normal-case">
                    Popular
                  </span>
                )}
              </h3>
              <DottedLeader />
              <span className="font-medium text-[0.9375rem] text-olive-green flex-shrink-0 tabular-nums">
                ₹{item.price}
              </span>
            </div>
            <p className="text-[0.8125rem] lg:text-[0.875rem] text-olive leading-relaxed mt-1.5">
              {item.description}
            </p>
          </div>
        </div>
      ) : (
        /* Standard text-only item */
        <>
          <div className="flex items-baseline">
            <div className="flex items-center gap-1.5 flex-shrink-0 mr-1">
              {item.dietary?.map((d) => (
                <DietaryBadge key={d} code={d} />
              ))}
            </div>
            <h3 className="font-serif text-[1.125rem] lg:text-[1.1875rem] text-espresso leading-snug">
              {item.name}
              {item.popular && (
                <span className="text-[10px] uppercase tracking-wider text-tangerine font-sans font-semibold ml-1.5 normal-case">
                  Popular
                </span>
              )}
            </h3>
            <DottedLeader />
            <span className="font-medium text-[0.9375rem] text-olive-green flex-shrink-0 tabular-nums">
              ₹{item.price}
            </span>
          </div>
          <p className="text-[0.8125rem] lg:text-[0.875rem] text-olive leading-relaxed mt-1.5 max-w-xl">
            {item.description}
          </p>
        </>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Category section                                                   */
/* ------------------------------------------------------------------ */

function CategorySection({ category }: { category: MenuCategory }) {
  return (
    <section id={category.slug} className="scroll-mt-[120px] md:scroll-mt-[132px] lg:scroll-mt-[140px]">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-5 pb-3 border-b border-espresso/10">
          <h2 className="font-serif text-subheading text-espresso leading-tight">
            {category.name}
          </h2>
          {category.description && (
            <p className="mt-1.5 text-[0.875rem] text-olive leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
        <div>
          {category.items.map((item) => (
            <MenuItemRow key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Column balancing — find optimal split maintaining order            */
/* ------------------------------------------------------------------ */

function findSplitIndex(categories: MenuCategory[]): number {
  const weights = categories.map((cat) => {
    const featuredCount = cat.items.filter((i) => i.image).length;
    return cat.items.length + featuredCount * 1.5;
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let bestSplit = Math.floor(categories.length / 2);
  let bestDiff = Infinity;
  let leftWeight = 0;

  for (let i = 0; i < categories.length - 1; i++) {
    leftWeight += weights[i];
    const rightWeight = totalWeight - leftWeight;
    const diff = Math.abs(leftWeight - rightWeight);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestSplit = i + 1;
    }
  }

  return bestSplit;
}

/* ------------------------------------------------------------------ */
/*  Dietary legend strip                                               */
/* ------------------------------------------------------------------ */

function DietaryLegend() {
  const entries: DietaryKey[] = ["V", "VG", "GF", "N"];

  return (
    <div className="bg-ivory border-b border-border">
      <Container>
        <div
          className="py-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem]"
          role="list"
          aria-label="Dietary legend"
        >
          <span className="font-sans font-medium text-espresso mr-0.5">
            Dietary:
          </span>
          {entries.map((code) => {
            const config = dietaryConfig[code];
            const { Icon } = config;
            return (
              <span
                key={code}
                role="listitem"
                className="flex items-center gap-1.5 text-olive"
              >
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${config.badgeClass}`}
                >
                  <Icon className="w-3 h-3" />
                </span>
                <span className="font-sans">{config.label}</span>
              </span>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky category navigation                                         */
/* ------------------------------------------------------------------ */

interface CategoryNavProps {
  categories: MenuCategory[];
  activeSlug: string;
  onNavigate: (slug: string) => void;
}

function CategoryNav({ categories, activeSlug, onNavigate }: CategoryNavProps) {
  return (
    <div className="sticky top-[72px] md:top-[80px] lg:top-[84px] z-30 border-b border-border bg-ivory/95 backdrop-blur-sm">
      <Container>
        <nav aria-label="Menu categories" className="-mb-px">
          <ul className="flex gap-0.5 overflow-x-auto scrollbar-hide pb-px sm:gap-1 sm:overflow-x-visible sm:justify-start">
            {categories.map((cat) => {
              const isActive = activeSlug === cat.slug;
              return (
                <li key={cat.slug} className="flex-shrink-0">
                  <button
                    onClick={() => onNavigate(cat.slug)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative whitespace-nowrap px-3.5 py-3.5 text-[0.8125rem] font-sans font-medium transition-colors duration-200 sm:px-4 ${
                      isActive
                        ? "text-espresso"
                        : "text-olive hover:text-espresso"
                    }`}
                  >
                    {cat.name}
                    {isActive && (
                      <motion.span
                        layoutId="menu-tab-indicator"
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-tangerine rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function MenuPage() {
  const [activeSlug, setActiveSlug] = useState<string>(
    menuCategories[0]?.slug ?? "",
  );
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  /* Categories in data order (thematic: drinks → food → sweets → cold) */
  const categories = useMemo(() => menuCategories, []);

  /* Scroll to hash on mount */
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

  /* IntersectionObserver — update active category on scroll */
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
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    for (const cat of menuCategories) {
      const el = document.getElementById(cat.slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  /* Smooth scroll to category (programmatic) */
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

  /* Balanced column split */
  const splitIndex = useMemo(() => findSplitIndex(categories), [categories]);
  const leftColumn = categories.slice(0, splitIndex);
  const rightColumn = categories.slice(splitIndex);

  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      {/* ── Page intro (compact) ── */}
      <section className="bg-cream">
        <Container className="pt-28 pb-12 md:pt-32 md:pb-14 lg:pt-36 lg:pb-16">
          <SectionHeading
            eyebrow="MENU"
            title="The menu follows the day."
            align="center"
          />
          <p className="mt-4 text-body-lg text-olive leading-relaxed max-w-2xl">
            From a quick morning espresso to a long evening with shared plates.
            Everything here is made in-house, with seasonal ingredients and a bit
            of care.
          </p>
        </Container>
      </section>

      {/* ── Dietary legend ── */}
      <DietaryLegend />

      {/* ── Sticky category navigation ── */}
      <CategoryNav
        categories={categories}
        activeSlug={activeSlug}
        onNavigate={scrollToCategory}
      />

      {/* ── Menu content — full-width 2-column balanced grid ── */}
      <section className="py-section">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14">
            {/* Left column */}
            <div className="flex flex-col gap-y-12 md:gap-y-14 lg:gap-y-16">
              {leftColumn.map((cat) => (
                <CategorySection key={cat.id} category={cat} />
              ))}
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-y-12 md:gap-y-14 lg:gap-y-16">
              {rightColumn.map((cat) => (
                <CategorySection key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Reservation CTA ── */}
      <section className="pb-section">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <div className="border-2 border-espresso/15 rounded-md px-6 py-8 md:px-10 md:py-10 bg-surface-warm/40">
              <p className="font-serif text-subheading text-espresso leading-tight">
                Reserve a table
              </p>
              <p className="mt-3 text-body text-olive leading-relaxed max-w-md mx-auto">
                Reserve a table and try the menu in person. We&apos;d love to
                welcome you.
              </p>
              <div className="mt-6">
                <Button
                  variant="secondary"
                  size="md"
                  href="/contact?reason=reservation"
                  ariaLabel="Book a table"
                >
                  Book a Table
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}