"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { cafe } from "@/data/cafe";
import Container from "@/components/shared/Container";
import Reveal from "@/components/ui/Reveal";
import StaggerGroup, { StaggerItem } from "@/components/ui/StaggerGroup";

const previewImages = galleryImages.slice(0, 10);

const gridClasses: string[] = [
  "col-span-2 row-span-2", // g1 - tall + wide
  "col-span-1 row-span-1", // g2
  "col-span-1 row-span-2", // g3 - tall
  "col-span-1 row-span-1", // g4
  "col-span-2 row-span-1", // g5 - wide
  "col-span-1 row-span-1", // g6
  "col-span-1 row-span-1", // g7
  "col-span-1 row-span-2", // g8 - tall
  "col-span-1 row-span-1", // g9
  "col-span-1 row-span-1", // g10
];

export default function GalleryPreview() {
  return (
    <section className="py-[--spacing-section] bg-ivory">
      <Container>
        <Reveal className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-heading text-espresso">A glimpse inside</h2>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-tangerine font-medium text-[0.875rem] link-underline"
          >
            See more
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>

        <StaggerGroup
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 auto-rows-[180px] md:auto-rows-[200px]"
          staggerDelay={0.06}
        >
          {previewImages.map((img, i) => (
            <StaggerItem key={img.id} className={gridClasses[i] || "col-span-1 row-span-1"}>
              <div className="relative w-full h-full rounded-brand overflow-hidden group cursor-pointer">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15} className="mt-8 text-center">
          <Link
            href={cafe.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-caption text-olive/60 hover:text-tangerine transition-colors duration-300"
          >
            {cafe.instagramHandle} on Instagram
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}