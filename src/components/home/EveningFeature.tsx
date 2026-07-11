"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/shared/Container";
import Reveal from "@/components/ui/Reveal";

export default function EveningFeature() {
  return (
    <section className="relative h-[60vh] md:h-[75vh] flex items-end overflow-hidden isolation-isolate">
      <Image
        src="/images/gallery/evening-cafe-atmosphere.webp"
        alt="Café interior in evening light with soft warm glow"
        fill
        className="object-cover"
        sizes="100vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/45 to-espresso/15" />

      <Container className="relative z-10 pb-12 md:pb-16">
        <Reveal>
          <h2 className="font-serif text-display-sm text-ivory max-w-2xl">
            Plan an evening.
          </h2>
          <p className="text-ivory/85 text-body-lg mt-4 max-w-lg leading-relaxed">
            Smaller plates, desserts and drinks for the part of the day that
            should not be rushed. The room changes when the lights do.
          </p>
          <Link
            href="/contact?reason=reservation"
            className="mt-6 inline-flex items-center gap-2 px-7 py-3.5 bg-tangerine text-ivory text-[0.875rem] font-medium rounded-sm hover:bg-tangerine-hover transition-colors duration-300"
          >
            Reserve a table
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}