'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Leaf,
  MilkOff,
  Info,
} from 'lucide-react';

import { cafe } from '@/data/cafe';
import { menuCategories, dietaryLabels, type MenuItem } from '@/data/menu';
import { galleryImages } from '@/data/gallery';
import { testimonials } from '@/data/testimonials';

import Container from '@/components/shared/Container';
import SectionHeading from '@/components/shared/SectionHeading';
import Marquee from '@/components/shared/Marquee';
import ImageReveal from '@/components/shared/ImageReveal';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const prefersReduced = () =>
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

const fadeUp = (delay = 0) => {
  if (prefersReduced()) {
    return { initial: undefined, whileInView: undefined, viewport: undefined, transition: undefined };
  }
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  };
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const popularItems = menuCategories
  .flatMap((c) => c.items)
  .filter((i) => i.popular)
  .slice(0, 8);

const faqs = [
  { q: 'Do I need a reservation?', a: 'Walk-ins are always welcome, but a reservation guarantees your table, especially on weekends. Book through our contact page or call us directly.' },
  { q: 'Do you have vegetarian and vegan options?', a: 'Our menu is largely vegetarian, and many dishes can be made vegan on request. We also offer oat, almond and soy milk for all coffee drinks.' },
  { q: 'Is there a gluten-free menu?', a: 'Several items are naturally gluten-free or can be adapted. Look for the GF label on the menu, and always confirm with the team before ordering.' },
  { q: 'Are you hiring?', a: 'We are always keen to hear from passionate baristas, cooks and hospitality people. Send a short note to hello@saffronandsteam.example with "Careers" in the subject line.' },
  { q: 'Can I host a private gathering?', a: 'We can accommodate small groups and semi-private events. Reach out via the contact page with the date, group size and what you have in mind.' },
  { q: 'Is parking available?', a: 'Street parking is available on Kapurthala Lane. The nearest metro station is Lodhi Road (Violet Line), about a five-minute walk.' },
  { q: 'Are dogs allowed?', a: 'Well-behaved dogs are welcome in our outdoor seating area. Water bowls are available on request.' },
  { q: 'What about allergens?', a: 'Some dishes can be adapted, but our kitchen handles gluten, dairy, nuts and other allergens. Please speak with the team before ordering.' },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <IntroductionSection />
      <ThreePartsSection />
      <FavouritesSection />
      <AtmosphereSection />
      <ApproachSection />
      <TestimonialSection />
      <GalleryPreviewSection />
      <VisitSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}

/* ================================================================== */
/*  1. HERO                                                           */
/* ================================================================== */

function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-ivory isolation-isolate">
      <Container className="py-28 lg:py-0 lg:min-h-[100svh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Text — 7 cols */}
          <div className="lg:col-span-7 space-y-7 z-10">
            <motion.p {...fadeUp(0.1)} className="text-overline font-semibold uppercase tracking-[0.2em] text-tangerine">
              {cafe.descriptor}
            </motion.p>

            <div>
              <motion.h1 {...fadeUp(0.2)} className="font-serif text-display text-espresso">
                Slow mornings.
              </motion.h1>
              <motion.h1 {...fadeUp(0.35)} className="font-serif text-display text-espresso">
                Bright plates.
              </motion.h1>
              <motion.h1 {...fadeUp(0.5)} className="font-serif text-display text-espresso">
                Good company.
              </motion.h1>
            </div>

            <motion.p {...fadeUp(0.65)} className="text-body-lg text-olive max-w-lg leading-relaxed">
              A neighbourhood café serving thoughtful coffee, generous brunch
              and the kind of evenings that stretch a little longer.
            </motion.p>

            <motion.div {...fadeUp(0.8)} className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 border border-espresso text-espresso text-[0.875rem] font-medium rounded-sm hover:bg-espresso hover:text-ivory transition-colors duration-300"
              >
                Explore the menu
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact?reason=reservation"
                className="inline-flex items-center px-6 py-3 bg-tangerine text-ivory text-[0.875rem] font-medium rounded-sm hover:bg-tangerine/90 transition-colors duration-300"
              >
                Book a table
              </Link>
            </motion.div>

            <motion.p {...fadeUp(0.95)} className="text-caption text-olive/70 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              {cafe.hours[0].days} {cafe.hours[0].time} &middot; {cafe.hours[1].days} {cafe.hours[1].time}
            </motion.p>
          </div>

          {/* Image collage — 5 cols */}
          <div className="lg:col-span-5 relative h-[340px] sm:h-[420px] lg:h-[80vh] lg:min-h-[520px]">
            <motion.div
              {...fadeUp(0.3)}
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
            </motion.div>

            <motion.div
              {...fadeUp(0.5)}
              className="absolute bottom-3 left-0 w-[48%] h-[42%] rounded-brand overflow-hidden z-20 shadow-xl -rotate-1"
            >
              <Image
                src="/images/hero/hero-coffee-cup-detail.webp"
                alt="Coffee cup detail with latte art"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 35vw, 15vw"
              />
            </motion.div>

            <motion.div
              {...fadeUp(0.65)}
              className="absolute top-[52%] left-[38%] w-[40%] h-[38%] rounded-brand overflow-hidden z-30 shadow-xl rotate-[1.5deg]"
            >
              <Image
                src="/images/hero/hero-pastry-close.webp"
                alt="Fresh pastry close-up"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 30vw, 12vw"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  2. MARQUEE                                                         */
/* ================================================================== */

function MarqueeSection() {
  return (
    <section className="py-3.5 bg-espresso overflow-hidden" aria-hidden="true">
      <Marquee text="COFFEE · BRUNCH · PASTRIES · LATE LUNCH · EVENING PLATES · GOOD CONVERSATION ·" />
    </section>
  );
}

/* ================================================================== */
/*  3. INTRODUCTION                                                  */
/* ================================================================== */

function IntroductionSection() {
  return (
    <section className="py-section bg-ivory">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image — 7 cols */}
          <motion.div {...fadeUp(0)} className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] rounded-brand overflow-hidden">
              <ImageReveal>
                <Image
                  src="/images/home/home-interior-wide.webp"
                  alt="Warm interior of Saffron & Steam with wooden furniture and natural light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </ImageReveal>
            </div>
            {/* Overlapping coffee detail */}
            <motion.div
              {...fadeUp(0.25)}
              className="absolute -bottom-4 -right-2 sm:right-[-1.5rem] w-28 h-28 sm:w-36 sm:h-36 rounded-brand overflow-hidden shadow-xl border-[3px] border-ivory z-10"
            >
              <Image
                src="/images/home/home-story-detail.webp"
                alt=""
                fill
                className="object-cover"
                sizes="144px"
              />
            </motion.div>
          </motion.div>

          {/* Text — 5 cols */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-5 space-y-5">
            <span className="inline-block text-overline font-semibold uppercase tracking-[0.18em] text-tangerine">
              Est. 2023
            </span>
            <h2 className="font-serif text-heading text-espresso">
              A café made for taking your time.
            </h2>
            <p className="text-body-lg text-olive leading-relaxed">
              Come in for the first coffee of the day, stay for something warm
              from the kitchen, or meet us again when the lights soften in the
              evening. The menu follows the rhythm of the day, but the table is
              always yours for a little longer.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-tangerine font-medium text-[0.9375rem] link-underline"
            >
              Our story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  4. THREE PARTS OF THE DAY                                          */
/* ================================================================== */

function ThreePartsSection() {
  const parts = [
    {
      label: 'Morning',
      image: '/images/home/morning-barista.webp',
      alt: 'Barista preparing espresso in the morning',
      text: 'Balanced espresso, slow pours and seasonal drinks made without unnecessary fuss.',
      link: '/menu#coffee',
      tone: 'bg-ivory',
    },
    {
      label: 'Midday',
      image: '/images/home/midday-brunch.webp',
      alt: 'Colourful brunch spread with toast, eggs and pancakes',
      text: 'Bright bowls, crisp-edged toast, soft eggs, pancakes and plates designed for sharing.',
      link: '/menu#brunch',
      tone: 'bg-cream',
      reverse: true,
    },
    {
      label: 'Evening',
      image: '/images/home/evening-table.webp',
      alt: 'Candlelit café table with small plates in the evening',
      text: 'Smaller plates, desserts and drinks for the part of the day that should not be rushed.',
      link: '/menu#small-plates',
      tone: 'bg-espresso text-ivory',
    },
  ];

  return (
    <section className="py-section-lg bg-cream">
      <Container>
        <motion.div {...fadeUp()} className="text-center mb-14">
          <SectionHeading eyebrow="Three parts of the day" title="Coffee. Brunch. Evenings." />
        </motion.div>

        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {parts.map((part, i) => (
            <motion.div
              key={part.label}
              {...fadeUp(i * 0.1)}
              className={`relative rounded-brand overflow-hidden group ${
                part.tone === 'bg-espresso'
                  ? 'aspect-[4/5] lg:aspect-auto lg:h-full min-h-[420px] lg:min-h-0'
                  : 'aspect-[4/3]'
              } ${part.tone}`}
            >
              <Image
                src={part.image}
                alt={part.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
              <div className={`absolute inset-0 flex flex-col justify-end p-6 ${
                part.tone === 'bg-espresso'
                  ? 'bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent'
                  : 'bg-gradient-to-t from-espresso/50 via-espresso/10 to-transparent'
              }`}>
                <span className="text-overline font-semibold uppercase tracking-[0.18em] text-saffron">
                  {part.label}
                </span>
                <p className={`mt-2 max-w-sm leading-relaxed ${
                  part.tone === 'bg-espresso' ? 'text-ivory/90' : 'text-ivory'
                }`}>
                  {part.text}
                </p>
                <Link
                  href={part.link}
                  className={`mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-medium transition-colors duration-300 ${
                    part.tone === 'bg-espresso'
                      ? 'text-saffron hover:text-saffron/70'
                      : 'text-ivory hover:text-saffron'
                  }`}
                >
                  See menu
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  5. MENU FAVOURITES                                               */
/* ================================================================== */

function FavouritesSection() {
  return (
    <section className="py-section bg-ivory">
      <Container>
        <motion.div {...fadeUp()} className="mb-10">
          <SectionHeading eyebrow="From the kitchen" title="A few favourites" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {popularItems.map((item, i) => (
            <MenuFavItem key={item.id} item={item} index={i} />
          ))}
        </div>

        <motion.div {...fadeUp(0.2)} className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-tangerine font-medium text-body-lg link-underline"
          >
            View full menu
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

function MenuFavItem({ item, index }: { item: MenuItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const hasImage = !!item.image;

  return (
    <motion.article
      {...fadeUp(index * 0.04)}
      className={`group relative flex items-start gap-4 py-5 border-b border-border last:border-b-0 cursor-default`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Thumbnail on hover (desktop) */}
      {hasImage && (
        <div className="absolute right-0 top-2 w-24 h-24 md:w-32 md:h-32 rounded-brand overflow-hidden shadow-xl z-20 pointer-events-none transition-all duration-300 hidden md:block opacity-0 scale-95 translate-x-2"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0) scale(1)' : 'translateX(8px) scale(0.95)' }}
        >
          <Image src={item.image!} alt={item.name} fill className="object-cover" sizes="128px" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-[1.0625rem] md:text-lg text-espresso group-hover:text-tangerine transition-colors duration-300">
            {item.name}
          </h3>
          <span className="text-olive font-medium text-[0.875rem] whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>
        <p className="text-[0.8125rem] text-olive/80 mt-1 leading-relaxed max-w-md">
          {item.description}
        </p>
        {item.dietary && item.dietary.length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {item.dietary.map((d) => (
              <span
                key={d}
                className="inline-flex items-center justify-center min-w-[28px] h-[22px] px-1.5 text-[10px] font-bold rounded-full bg-cream text-olive border border-border"
                title={dietaryLabels[d]}
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ================================================================== */
/*  6. ATMOSPHERE — full-bleed cinematic                             */
/* ================================================================== */

function AtmosphereSection() {
  return (
    <section className="relative h-[65vh] md:h-[80vh] flex items-end overflow-hidden isolation-isolate">
      <Image
        src="/images/home/home-room-wide.webp"
        alt="Café interior with warm wooden tables and ambient lighting"
        fill
        className="object-cover"
        sizes="100vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/40 to-espresso/20" />
      <Container className="relative z-10 pb-12 md:pb-16">
        <motion.div {...fadeUp()}>
          <h2 className="font-serif text-display-sm text-ivory max-w-2xl">
            Come for the coffee.
            <br />
            Stay for the room.
          </h2>
          <p className="text-ivory/80 text-body-lg mt-5 max-w-lg leading-relaxed">
            Wooden tables, warm light, no rush. The kind of space that makes you
            put your phone away.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  7. APPROACH — philosophy/ingredient                               */
/* ================================================================== */

function ApproachSection() {
  const points = [
    { icon: Leaf, label: 'Made fresh daily' },
    { icon: Leaf, label: 'Vegetarian choices' },
    { icon: MilkOff, label: 'Dairy alternatives' },
    { icon: Info, label: 'Ask about allergens' },
  ];

  return (
    <section className="py-section bg-cream">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <SectionHeading eyebrow="Our approach" title="Simple things, handled well." />
          </motion.div>
          <motion.p
            {...fadeUp(0.15)}
            className="text-body-lg text-olive mt-7 leading-relaxed"
          >
            We build the menu around ingredients that taste good in their
            season, prepare what we can in-house, and keep enough variety on
            the table for different appetites.
          </motion.p>

          <motion.div
            {...fadeUp(0.25)}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12"
          >
            {points.map((point) => (
              <div
                key={point.label}
                className="flex flex-col items-center gap-2.5 py-5 px-3"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full border border-tangerine/30 text-tangerine">
                  <point.icon className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-medium text-espresso">
                  {point.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  8. TESTIMONIAL — editorial quote                                    */
/* ================================================================== */

function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const goTo = (i: number) => { setCurrent(i); resetTimer(); };
  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  return (
    <section className="py-section bg-sand">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp()} className="mb-10">
            <span className="font-serif text-[5rem] leading-none text-espresso/10 select-none">
              &ldquo;
            </span>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={testimonials[current].id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              >
                <p className="font-serif text-subheading text-espresso italic leading-snug">
                  {testimonials[current].quote}
                </p>
              </motion.blockquote>
            </AnimatePresence>
            <p className="mt-5 text-caption font-medium text-olive tracking-wide uppercase">
              &mdash; {testimonials[current].author}
            </p>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
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
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-tangerine w-5' : 'bg-espresso/15 hover:bg-espresso/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
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

/* ================================================================== */
/*  9. GALLERY PREVIEW                                               */
/* ================================================================== */

function GalleryPreviewSection() {
  const previewImages = galleryImages.slice(0, 9);
  return (
    <section className="py-section bg-ivory">
      <Container>
        <motion.div {...fadeUp()} className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-heading text-espresso">A glimpse inside</h2>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-tangerine font-medium text-[0.875rem] link-underline"
          >
            View gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-3 md:grid-cols-4 gap-2.5 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {previewImages.map((img, i) => {
            const tall = [0, 4].includes(i);
            const wide = [0, 5].includes(i);
            return (
              <div
                key={img.id}
                className={`relative rounded-brand overflow-hidden group cursor-pointer ${
                  tall ? 'row-span-2' : ''
                } ${wide ? 'col-span-2' : ''}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 33vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-espresso/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute inset-x-4 bottom-3 text-[0.75rem] font-medium text-ivory opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {img.alt}
                </p>
              </div>
            );
          })}
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="mt-8 text-center">
          <Link
            href={cafe.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-caption text-olive/60 hover:text-tangerine transition-colors duration-300"
          >
            {cafe.instagramHandle} on Instagram
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  10. VISIT — split info + exterior                                */
/* ================================================================== */

function VisitSection() {
  return (
    <section className="py-section bg-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Info — 5 cols */}
          <motion.div {...fadeUp(0)} className="lg:col-span-5 space-y-8">
            <h2 className="font-serif text-heading text-espresso">Come find us.</h2>

            <div className="space-y-5 text-[0.9375rem] text-olive">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
                <div>
                  <p className="text-espresso">{cafe.address.full}</p>
                  <p className="text-caption text-olive/60 mt-0.5">{cafe.transportNote}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
                <div>
                  {cafe.hours.map((h) => (
                    <p key={h.days} className="text-espresso">
                      <span className="font-medium">{h.days}</span> &mdash; {h.time}
                    </p>
                  ))}
                  <p className="text-caption text-rose mt-1">{cafe.kitchenNote}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
                <a href={`tel:${cafe.phone.replace(/[^+\d]/g, '')}`} className="text-espresso link-underline hover:text-tangerine">
                  {cafe.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
                <a href={`mailto:${cafe.email}`} className="text-espresso link-underline hover:text-tangerine">
                  {cafe.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/contact?reason=reservation"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-tangerine text-ivory text-[0.875rem] font-medium rounded-sm hover:bg-tangerine/90 transition-colors duration-300"
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
          </motion.div>

          {/* Image — 7 cols */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-7 relative rounded-brand overflow-hidden min-h-[360px]">
            <ImageReveal>
              <Image
                src="/images/contact/cafe-exterior-hero.webp"
                alt="Café exterior with plants and a warm-lit entrance on a quiet street"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </ImageReveal>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  11. FAQ                                                          */
/* ================================================================== */

function FAQSection() {
  return (
    <section className="py-section bg-ivory">
      <Container>
        <motion.div {...fadeUp()} className="text-center mb-10">
          <h2 className="font-serif text-heading text-espresso">Common questions</h2>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="max-w-2xl mx-auto divide-y divide-border">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="py-4">
      <button
        id={buttonId}
        className="w-full flex items-center justify-between text-left gap-4 group py-1"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-[0.9375rem] text-espresso group-hover:text-tangerine transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-olive"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-[0.875rem] text-olive leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  12. FINAL CTA                                                    */
/* ================================================================== */

function FinalCTASection() {
  return (
    <section className="py-section bg-espresso relative overflow-hidden">
      {/* Subtle bg texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('/images/gallery/warm-cafe-interior.webp')] bg-cover bg-center" aria-hidden="true" />

      <Container className="relative z-10">
        <motion.div {...fadeUp()} className="max-w-xl mx-auto text-center space-y-6">
          <span className="text-overline font-semibold uppercase tracking-[0.18em] text-saffron">
            Reserve a table
          </span>
          <h2 className="font-serif text-display-sm text-ivory">
            Your table is closer than you think.
          </h2>
          <p className="text-ivory/70 text-body-lg leading-relaxed">
            Walk in for a coffee, or book ahead for evenings and weekends.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/contact?reason=reservation"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-tangerine text-ivory text-[0.875rem] font-medium rounded-sm hover:bg-saffron hover:text-espresso transition-colors duration-300"
            >
              Book a Table
            </Link>
            <a
              href={cafe.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-ivory/30 text-ivory text-[0.875rem] font-medium rounded-sm hover:border-ivory hover:bg-ivory hover:text-espresso transition-colors duration-300"
            >
              Get Directions <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}