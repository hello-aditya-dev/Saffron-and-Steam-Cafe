"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import Container from "@/components/shared/Container";
import Reveal from "@/components/ui/Reveal";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "center", loop: true },
    [Autoplay({ delay: 6000, stopOnInteraction: true })],
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
    <section className="py-[--spacing-section] bg-sand">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal className="mb-10">
            <span className="font-serif text-[5rem] leading-none text-espresso/10 select-none">
              &ldquo;
            </span>
          </Reveal>

          <div className="overflow-hidden" ref={emblaRef} role="region" aria-label="Testimonials">
            <div className="flex">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-[0_0_100%] min-w-0 flex flex-col items-center text-center px-4"
                >
                  <AnimatePresence mode="wait">
                    {selectedIndex === testimonials.indexOf(t) && (
                      <motion.blockquote
                        key={t.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                      >
                        <p className="font-serif text-subheading text-espresso italic leading-snug">
                          {t.quote}
                        </p>
                      </motion.blockquote>
                    )}
                  </AnimatePresence>
                  <p className="mt-5 text-caption font-medium text-olive tracking-wide uppercase">
                    &mdash; {t.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-9 h-9 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso hover:text-ivory hover:border-espresso transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === selectedIndex}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? "bg-tangerine w-5"
                      : "bg-espresso/15 hover:bg-espresso/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="w-9 h-9 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso hover:text-ivory hover:border-espresso transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}