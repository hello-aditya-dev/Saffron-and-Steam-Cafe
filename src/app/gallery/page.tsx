"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { galleryImages, type GalleryImage } from "@/data/gallery";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type CategoryFilter = "all" | GalleryImage["category"];

const filterTabs: { label: string; value: CategoryFilter }[] = [
  { label: "All", value: "all" },
  { label: "Coffee", value: "coffee" },
  { label: "Food", value: "food" },
  { label: "Interiors", value: "interiors" },
  { label: "People", value: "people" },
  { label: "Details", value: "details" },
  { label: "Evening", value: "evening" },
];

function GalleryItem({
  image,
  onClick,
}: {
  image: GalleryImage;
  onClick: () => void;
}) {
  const aspectRatio = image.width / image.height;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="group relative mb-4 cursor-pointer break-inside-avoid overflow-hidden rounded-brand"
      style={{ aspectRatio: String(aspectRatio) }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View: ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-espresso/0 transition-colors duration-300 group-hover:bg-espresso/40" />
      <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
        <p className="text-sm font-medium text-ivory leading-snug">{image.alt}</p>
      </div>
    </motion.div>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = images[currentIndex];

  // Body scroll lock
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard nav
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/90 p-4 sm:p-8"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute right-4 top-4 z-10 rounded-full bg-ivory/10 p-2 text-ivory transition-colors hover:bg-ivory/20"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ivory/10 p-2 text-ivory transition-colors hover:bg-ivory/20 sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative h-[70vh] w-full max-w-4xl overflow-hidden rounded-brand sm:h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Caption */}
        <p className="absolute bottom-4 left-1/2 z-10 max-w-lg -translate-x-1/2 text-center text-sm text-ivory/80">
          {current.alt}
        </p>

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ivory/10 p-2 text-ivory transition-colors hover:bg-ivory/20 sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (filter === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === filter);
  }, [filter]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i - 1 + filteredImages.length) % filteredImages.length;
    });
  }, [filteredImages.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + 1) % filteredImages.length;
    });
  }, [filteredImages.length]);

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Gallery"
            title="A few frames from the café"
          />
          <p className="mt-4 max-w-2xl text-body-lg text-olive">
            Coffee being made, food being shared, rooms settling into the time of day. Nothing staged — just the place as it is.
          </p>
        </Container>
      </section>

      {/* Filter tabs */}
      <div className="sticky top-0 z-30 border-b border-espresso/10 bg-ivory/95 backdrop-blur-sm">
        <Container className="py-0">
          <nav aria-label="Gallery filters">
            <ul className="flex gap-1 overflow-x-auto pb-px scrollbar-hide">
              {filterTabs.map((tab) => (
                <li key={tab.value} className="flex-shrink-0">
                  <button
                    onClick={() => setFilter(tab.value)}
                    aria-current={filter === tab.value ? "true" : undefined}
                    className={`relative whitespace-nowrap px-3 py-3.5 text-sm font-medium transition-colors sm:px-4 ${
                      filter === tab.value
                        ? "text-espresso"
                        : "text-olive hover:text-espresso"
                    }`}
                  >
                    {tab.label}
                    {filter === tab.value && (
                      <motion.span
                        layoutId="gallery-tab-indicator"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-tangerine"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      {/* Masonry grid */}
      <section className="py-12 sm:py-16">
        <Container>
          <motion.div
            layout
            className="columns-1 gap-4 sm:columns-2 lg:columns-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <GalleryItem
                  key={image.id}
                  image={image}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <p className="py-20 text-center text-olive">No images in this category yet.</p>
          )}
        </Container>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}