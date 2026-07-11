"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import StaggerGroup, { StaggerItem } from "@/components/ui/StaggerGroup";

const occasions = [
  {
    label: "Breakfast & slow mornings",
    image: "/images/home/morning-barista.webp",
    alt: "Barista preparing espresso in the morning",
    text: "Balanced espresso, slow pours and seasonal drinks made without unnecessary fuss.",
    link: "/menu#coffee",
    dark: false,
  },
  {
    label: "Brunch & shared plates",
    image: "/images/home/midday-brunch.webp",
    alt: "Colourful brunch spread with toast, eggs and pancakes",
    text: "Bright bowls, crisp-edged toast, soft eggs, pancakes and plates designed for sharing.",
    link: "/menu#brunch",
    dark: false,
  },
  {
    label: "Evenings & gatherings",
    image: "/images/home/evening-table.webp",
    alt: "Candlelit café table with small plates in the evening",
    text: "Smaller plates, desserts and drinks for the part of the day that should not be rushed.",
    link: "/menu#small-plates",
    dark: true,
  },
];

export default function OccasionCards() {
  return (
    <section className="py-[--spacing-section-lg] bg-cream">
      <Container>
        <div className="text-center mb-14">
          <SectionHeading
            eyebrow="Three parts of the day"
            title="Coffee. Brunch. Evenings."
          />
        </div>

        <StaggerGroup className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {occasions.map((occ) => (
            <StaggerItem key={occ.label}>
              <div
                className={`relative rounded-brand overflow-hidden group transition-transform duration-300 hover:-translate-y-[3px] ${
                  occ.dark
                    ? "aspect-[4/5] lg:aspect-auto lg:h-full min-h-[420px] lg:min-h-0"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={occ.image}
                  alt={occ.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 ${
                    occ.dark
                      ? "bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent"
                      : "bg-gradient-to-t from-espresso/50 via-espresso/10 to-transparent"
                  }`}
                >
                  <span className="text-overline font-semibold uppercase tracking-[0.18em] text-saffron">
                    {occ.label}
                  </span>
                  <p
                    className={`mt-2 max-w-sm leading-relaxed ${
                      occ.dark ? "text-ivory/90" : "text-ivory"
                    }`}
                  >
                    {occ.text}
                  </p>
                  <Link
                    href={occ.link}
                    className={`mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-medium transition-colors duration-300 ${
                      occ.dark
                        ? "text-saffron hover:text-saffron/70"
                        : "text-ivory hover:text-saffron"
                    }`}
                  >
                    Explore
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}