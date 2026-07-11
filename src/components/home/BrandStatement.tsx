"use client";

import Container from "@/components/shared/Container";
import Reveal from "@/components/ui/Reveal";

export default function BrandStatement() {
  return (
    <section className="py-[--spacing-section-lg] bg-cream">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <span className="text-overline font-semibold uppercase tracking-[0.18em] text-tangerine">
              OUR APPROACH
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif text-display-sm md:text-display text-espresso mt-6 leading-[1.2]">
              Simple ingredients, thoughtful cooking, and a room that invites
              you to stay.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}