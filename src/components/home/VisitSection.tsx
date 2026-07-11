"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink } from "lucide-react";
import { cafe } from "@/data/cafe";
import Container from "@/components/shared/Container";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/shared/ImageReveal";

export default function VisitSection() {
  return (
    <section className="py-[--spacing-section] bg-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Info — 5 cols */}
          <Reveal direction="left" className="lg:col-span-5 space-y-8">
            <h2 className="font-serif text-heading text-espresso">Come find us.</h2>

            <div className="space-y-5 text-[0.9375rem] text-olive">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
                <div>
                  <p className="text-espresso">{cafe.address.full}</p>
                  <p className="text-caption text-olive/60 mt-0.5">
                    {cafe.transportNote}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
                <div>
                  {cafe.hours.map((h) => (
                    <p key={h.days} className="text-espresso">
                      <span className="font-medium">{h.days}</span> &mdash;{" "}
                      {h.time}
                    </p>
                  ))}
                  <p className="text-caption text-rose mt-1">
                    {cafe.kitchenNote}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
                <a
                  href={`tel:${cafe.phone.replace(/[^+\d]/g, "")}`}
                  className="text-espresso link-underline hover:text-tangerine"
                >
                  {cafe.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
                <a
                  href={`mailto:${cafe.email}`}
                  className="text-espresso link-underline hover:text-tangerine"
                >
                  {cafe.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/contact?reason=reservation"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-tangerine text-ivory text-[0.875rem] font-medium rounded-sm hover:bg-tangerine-hover transition-colors duration-300"
              >
                Book a Table
              </Link>
              <a
                href={cafe.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-espresso text-espresso text-[0.875rem] font-medium rounded-sm hover:bg-espresso hover:text-ivory transition-colors duration-300"
              >
                Get Directions <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-olive text-[0.875rem] font-medium rounded-sm hover:border-espresso hover:text-espresso transition-colors duration-300"
              >
                View Menu
              </Link>
            </div>
          </Reveal>

          {/* Image — 7 cols */}
          <Reveal direction="right" delay={0.15} className="lg:col-span-7 relative rounded-brand overflow-hidden min-h-[360px]">
            <ImageReveal direction="up">
              <Image
                src="/images/contact/cafe-exterior-hero.webp"
                alt="Café exterior with plants and a warm-lit entrance on a quiet street"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </ImageReveal>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}