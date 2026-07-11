"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Clock, ArrowRight } from "lucide-react";
import { cafe } from "@/data/cafe";
import Container from "@/components/shared/Container";
import Eyebrow from "@/components/ui/Eyebrow";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLParagraphElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);
  const secImgRef = useRef<HTMLDivElement>(null);
  const terImgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Check for reduced motion preference
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Headline lines clip-reveal
      const lines = headlineRef.current?.querySelectorAll(".hero-line");
      if (lines) {
        tl.fromTo(
          lines,
          { clipPath: "inset(0 0 100% 0)", y: 30 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          0,
        );
      }

      // CTA fade upward
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.55,
        );
      }

      // Hours fade
      if (hoursRef.current) {
        tl.fromTo(
          hoursRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          0.75,
        );
      }

      // Images scale + mask reveal
      const imgReveal = (ref: React.RefObject<HTMLDivElement | null>, delay: number, scale = 1.15) => {
        if (!ref.current) return;
        tl.fromTo(
          ref.current,
          { clipPath: "inset(100% 0 0 0)", scale },
          { clipPath: "inset(0 0 0 0)", scale: 1, duration: 0.9, ease: "power2.inOut" },
          delay,
        );
      };

      imgReveal(mainImgRef, 0.2, 1.1);
      imgReveal(secImgRef, 0.45, 1.15);
      imgReveal(terImgRef, 0.6, 1.2);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85svh] lg:min-h-[90svh] flex items-center overflow-hidden bg-ivory isolation-isolate"
    >
      <Container className="py-24 lg:py-0 lg:min-h-[85svh] lg:min-h-[90svh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Text — 7 cols */}
          <div className="lg:col-span-7 space-y-7 z-10">
            <Eyebrow className="block">COFFEE &middot; BRUNCH &middot; EVENINGS</Eyebrow>

            <div ref={headlineRef} className="overflow-hidden">
              <h1 className="hero-line font-serif text-display text-espresso leading-[1.1]">
                A neighbourhood caf&eacute; for slow mornings and longer evenings.
              </h1>
            </div>

            <p className="text-body-lg text-olive max-w-lg leading-relaxed">
              A neighbourhood café serving thoughtful coffee, generous brunch and the kind of evenings that stretch a little longer.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 border border-espresso text-espresso text-[0.875rem] font-medium rounded-sm hover:bg-espresso hover:text-ivory transition-colors duration-300"
              >
                Explore the menu
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?reason=reservation"
                className="inline-flex items-center px-6 py-3 bg-tangerine text-ivory text-[0.875rem] font-medium rounded-sm hover:bg-tangerine-hover transition-colors duration-300"
              >
                Book a table
              </Link>
            </div>

            <p ref={hoursRef} className="text-caption text-olive/70 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              {cafe.hours[0].days} {cafe.hours[0].time} &middot; {cafe.hours[1].days} {cafe.hours[1].time}
            </p>
          </div>

          {/* Image composition — 5 cols */}
          <div className="lg:col-span-5 relative h-[340px] sm:h-[420px] lg:h-[80vh] lg:min-h-[520px]">
            <div
              ref={mainImgRef}
              className="absolute top-0 right-0 w-[88%] h-[78%] rounded-brand overflow-hidden z-10 shadow-2xl"
            >
              <Image
                src="/images/hero/cafe-hero-brunch-table.webp"
                alt="Brunch table with warm plates and coffee at Saffron & Steam"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 70vw, 30vw"
                priority
              />
            </div>

            <div
              ref={secImgRef}
              className="absolute bottom-3 left-0 w-[48%] h-[42%] rounded-brand overflow-hidden z-20 shadow-xl -rotate-1"
            >
              <Image
                src="/images/hero/hero-coffee-cup-detail.webp"
                alt="Coffee cup detail with latte art"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 35vw, 15vw"
              />
            </div>

            <div
              ref={terImgRef}
              className="absolute top-[52%] left-[38%] w-[40%] h-[38%] rounded-brand overflow-hidden z-30 shadow-xl rotate-[1.5deg]"
            >
              <Image
                src="/images/hero/hero-pastry-close.webp"
                alt="Fresh pastry close-up"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 30vw, 12vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}