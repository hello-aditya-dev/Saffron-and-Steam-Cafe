"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/shared/ImageReveal";

export default function Story() {
  return (
    <section className="py-[--spacing-section] bg-ivory">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image — 7 cols */}
          <Reveal direction="left" className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] rounded-brand overflow-hidden">
              <ImageReveal direction="up">
                <Image
                  src="/images/home/home-interior-wide.webp"
                  alt="Warm interior of Saffron & Steam with wooden furniture and natural light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </ImageReveal>
            </div>
            {/* Overlapping detail image */}
            <Reveal delay={0.3} className="absolute -bottom-4 -right-2 sm:right-[-1.5rem] w-28 h-28 sm:w-36 sm:h-36 rounded-brand overflow-hidden shadow-xl border-[3px] border-ivory z-10">
              <Image
                src="/images/home/home-story-detail.webp"
                alt="Coffee detail"
                fill
                className="object-cover"
                sizes="144px"
              />
            </Reveal>
          </Reveal>

          {/* Text — 5 cols */}
          <Reveal direction="right" delay={0.1} className="lg:col-span-5 space-y-5">
            <span className="inline-block text-overline font-semibold uppercase tracking-[0.18em] text-tangerine">
              Est. 2023
            </span>
            <h2 className="font-serif text-heading text-espresso">
              Built around the pleasure of staying.
            </h2>
            <p className="text-body-lg text-olive leading-relaxed">
              Saffron &amp; Steam began with a simple idea: a café should work at
              more than one speed. Some mornings call for a quick espresso. Others
              turn into lunch. Some evenings need a plate in the middle of the
              table and nowhere else to be. We opened on Lodhi Market Lane in
              2022&nbsp;&mdash; not as a concept, but as a room we wanted to
              spend time in ourselves.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-tangerine font-medium text-[0.9375rem] link-underline"
            >
              Read our story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}