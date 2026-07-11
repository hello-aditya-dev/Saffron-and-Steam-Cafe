"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { menuCategories, dietaryLabels, type MenuItem } from "@/data/menu";
import { galleryImages } from "@/data/gallery";
import Container from "@/components/shared/Container";
import Reveal from "@/components/ui/Reveal";

const popularItems = menuCategories
  .flatMap((c) => c.items)
  .filter((i) => i.popular)
  .slice(0, 8);

const foodGalleryImages = galleryImages.filter(
  (g) => g.category === "food" || g.category === "coffee",
);

function getFallbackImage(item: MenuItem): string {
  return item.image || foodGalleryImages[popularItems.indexOf(item) % foodGalleryImages.length]?.src || "/images/gallery/brunch-spread-table.webp";
}

export default function FeaturedMenu() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [
      Autoplay({ delay: 5000, stopOnInteraction: true }),
    ],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const handler = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", handler);
    emblaApi.on("init", handler);
    return () => {
      emblaApi.off("select", handler);
      emblaApi.off("init", handler);
    };
  }, [emblaApi]);

  return (
    <section className="py-[--spacing-section] bg-ivory">
      <Container>
        <Reveal className="mb-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-overline font-semibold uppercase tracking-[0.18em] text-tangerine">
                From the kitchen
              </span>
              <h2 className="font-serif text-heading text-espresso mt-2">A few favourites</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollPrev}
                className="w-9 h-9 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso hover:text-ivory hover:border-espresso transition-colors duration-300"
                aria-label="Previous menu item"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-caption text-olive tabular-nums min-w-[3rem] text-center">
                {selectedIndex + 1} / {popularItems.length}
              </span>
              <button
                onClick={scrollNext}
                className="w-9 h-9 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso hover:text-ivory hover:border-espresso transition-colors duration-300"
                aria-label="Next menu item"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="overflow-hidden" ref={emblaRef} role="region" aria-label="Popular menu items">
          <div className="flex gap-4">
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_31%] min-w-0"
              >
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
          <button
            onClick={scrollPrev}
            className="w-9 h-9 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso hover:text-ivory hover:border-espresso transition-colors duration-300"
            aria-label="Previous menu item"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-caption text-olive tabular-nums min-w-[3rem] text-center">
            {selectedIndex + 1} / {popularItems.length}
          </span>
          <button
            onClick={scrollNext}
            className="w-9 h-9 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso hover:text-ivory hover:border-espresso transition-colors duration-300"
            aria-label="Next menu item"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-tangerine font-medium text-body-lg link-underline"
          >
            View full menu
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const imgSrc = getFallbackImage(item);

  return (
    <div className="group bg-cream rounded-md border border-border overflow-hidden transition-transform duration-300 hover:-translate-y-[3px]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imgSrc}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 31vw"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-[1.0625rem] text-espresso">
            {item.name}
          </h3>
          <span className="text-olive font-medium text-[0.875rem] whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>
        <p className="text-[0.8125rem] text-olive/80 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        {item.dietary && item.dietary.length > 0 && (
          <div className="flex gap-1.5 pt-1">
            {item.dietary.map((d) => (
              <span
                key={d}
                className="inline-flex items-center justify-center min-w-[28px] h-[22px] px-1.5 text-[10px] font-bold rounded-full bg-ivory text-olive border border-border"
                title={dietaryLabels[d]}
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}