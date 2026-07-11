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
  AlertCircle,
  Sparkles,
} from 'lucide-react';

import { cafe } from '@/data/cafe';
import { menuCategories, dietaryLabels } from '@/data/menu';
import { galleryImages } from '@/data/gallery';
import { testimonials } from '@/data/testimonials';

import Container from '@/components/shared/Container';
import SectionHeading from '@/components/shared/SectionHeading';
import Marquee from '@/components/shared/Marquee';
import ImageReveal from '@/components/shared/ImageReveal';
import ReservationCTA from '@/components/shared/ReservationCTA';
import { LogoWordmark } from '@/components/shared/Logo';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const prefersReduced = () =>
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

const fadeUp = (delay = 0) => {
  if (prefersReduced()) {
    return {
      initial: undefined,
      whileInView: undefined,
      viewport: undefined,
      transition: undefined,
    };
  }
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  };
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const staggerItem = (delay = 0) => {
  if (prefersReduced()) {
    return {
      initial: undefined,
      whileInView: undefined,
      viewport: undefined,
      transition: undefined,
    };
  }
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  };
};

/* ------------------------------------------------------------------ */
/*  Data selectors                                                     */
/* ------------------------------------------------------------------ */

const popularItems = menuCategories
  .flatMap((c) => c.items)
  .filter((i) => i.popular)
  .slice(0, 8);

const faqs = [
  {
    q: 'Do I need a reservation?',
    a: 'Walk-ins are always welcome, but a reservation guarantees your table, especially on weekends. You can book through our contact page or call us directly.',
  },
  {
    q: 'Do you have vegetarian and vegan options?',
    a: 'Our menu is largely vegetarian, and many dishes can be made vegan on request — just ask your server. We also offer oat, almond and soy milk for all coffee drinks.',
  },
  {
    q: 'Is there a gluten-free menu?',
    a: 'Several items are naturally gluten-free or can be adapted. Look for the GF label on the menu, and always confirm with the team before ordering.',
  },
  {
    q: 'Are you hiring?',
    a: 'We are always keen to hear from passionate baristas, cooks and hospitality people. Send a short note to hello@saffronandsteam.example with "Careers" in the subject line.',
  },
  {
    q: 'Can I host a private gathering?',
    a: 'We can accommodate small groups and semi-private events. Reach out via the contact page with the date, group size and what you have in mind.',
  },
  {
    q: 'Is parking available?',
    a: 'Street parking is available on Kapurthala Lane. The nearest metro station is Lodhi Road (Violet Line), about a five-minute walk.',
  },
  {
    q: 'Are dogs allowed?',
    a: 'Well-behaved dogs are welcome in our outdoor seating area. Water bowls are available on request.',
  },
  {
    q: 'What about allergens?',
    a: 'Some dishes can be adapted, but our kitchen handles gluten, dairy, nuts and other allergens. Please speak with the team before ordering.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <IntroductionSection />
      <SignatureExperienceSection />
      <FeaturedMenuSection />
      <AtmosphereSection />
      <PhilosophySection />
      <TestimonialsSection />
      <GalleryTeaserSection />
      <VisitSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}

/* ================================================================== */
/*  SECTION 1 — Hero                                                   */
/* ================================================================== */

function HeroSection() {
  const heroLines = ['Slow mornings.', 'Bright plates.', 'Good company.'];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ivory">
      <div className="w-full">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center py-24 lg:py-0 lg:min-h-screen">
            {/* Text column — 60% */}
            <div className="lg:col-span-3 space-y-8 z-10">
              <motion.p
                {...staggerItem(0.1)}
                className="text-sm font-semibold uppercase tracking-[0.2em] text-tangerine"
              >
                Coffee · Brunch · Evenings
              </motion.p>

              <div>
                {heroLines.map((line, i) => (
                  <motion.h1
                    key={line}
                    {...staggerItem(0.2 + i * 0.15)}
                    className="font-serif text-display text-espresso leading-[0.95]"
                  >
                    {line}
                  </motion.h1>
                ))}
              </div>

              <motion.p
                {...staggerItem(0.65)}
                className="text-body-lg text-olive max-w-xl"
              >
                A neighbourhood café serving thoughtful coffee, generous brunch
                and the kind of evenings that stretch a little longer.
              </motion.p>

              <motion.div
                {...staggerItem(0.8)}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-espresso text-espresso font-medium rounded-sm hover:bg-espresso hover:text-ivory transition-colors duration-300"
                >
                  Explore the menu
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact?reason=reservation"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-tangerine text-ivory font-medium rounded-sm hover:bg-tangerine/90 transition-colors duration-300"
                >
                  Book a table
                </Link>
              </motion.div>

              <motion.p
                {...staggerItem(0.95)}
                className="text-sm text-olive/70 flex items-center gap-2"
              >
                <Clock className="w-3.5 h-3.5" />
                Open daily · 8:00 AM – 10:30 PM
              </motion.p>
            </div>

            {/* Image collage — 40% */}
            <div className="lg:col-span-2 relative h-[420px] sm:h-[500px] lg:h-[70vh] lg:min-h-[480px]">
              {/* Primary image */}
              <motion.div
                {...fadeUp(0.3)}
                className="absolute top-0 right-0 w-[85%] h-[80%] rounded-lg overflow-hidden z-10 shadow-2xl"
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

              {/* Secondary image — coffee cup */}
              <motion.div
                {...fadeUp(0.55)}
                className="absolute bottom-4 left-0 w-[45%] h-[40%] rounded-lg overflow-hidden z-20 shadow-xl -rotate-2"
              >
                <Image
                  src="/images/hero/hero-coffee-cup-detail.webp"
                  alt="Coffee cup detail with latte art"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 35vw, 15vw"
                />
              </motion.div>

              {/* Tertiary image — pastry */}
              <motion.div
                {...fadeUp(0.7)}
                className="absolute top-[55%] left-[35%] w-[38%] h-[35%] rounded-lg overflow-hidden z-30 shadow-xl rotate-1"
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
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 2 — Marquee Band                                           */
/* ================================================================== */

function MarqueeSection() {
  return (
    <section className="py-5 bg-espresso overflow-hidden" aria-hidden="true">
      <Marquee text="COFFEE · BRUNCH · PASTRIES · LATE LUNCH · EVENING PLATES · GOOD CONVERSATION ·" />
    </section>
  );
}

/* ================================================================== */
/*  SECTION 3 — Café Introduction                                      */
/* ================================================================== */

function IntroductionSection() {
  return (
    <section className="py-24 md:py-32 bg-ivory">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div {...fadeUp(0)} className="relative">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <ImageReveal>
                <Image
                  src="/images/interiors/warm-cafe-interior.webp"
                  alt="Warm interior of Saffron & Steam with wooden furniture and natural light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </ImageReveal>
            </div>
            {/* Small overlapping detail */}
            <motion.div
              {...fadeUp(0.3)}
              className="absolute -bottom-6 -right-4 sm:right-[-2rem] w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden shadow-xl border-4 border-ivory z-10"
            >
              <Image
                src="/images/gallery/coffee-beans-detail.webp"
                alt="Roasted coffee beans in a ceramic bowl"
                fill
                className="object-cover"
                sizes="160px"
              />
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div {...fadeUp(0.15)} className="space-y-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-tangerine mb-2">
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
              className="inline-flex items-center gap-2 text-tangerine font-medium hover:gap-3 transition-all duration-300"
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
/*  SECTION 4 — Signature Experience Trio                              */
/* ================================================================== */

function SignatureExperienceSection() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <Container>
        <motion.div {...fadeUp()} className="text-center mb-16 md:mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tangerine">
            Three parts of the day
          </span>
          <h2 className="font-serif text-heading text-espresso mt-3">
            Coffee. Brunch. Evenings.
          </h2>
        </motion.div>

        {/* Block 1 — Image left, text right */}
        <div className="mb-20 md:mb-28">
          <motion.div
            {...fadeUp(0)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <ImageReveal>
                <Image
                  src="/images/gallery/barista-pouring-espresso.webp"
                  alt="Barista carefully pouring espresso into a ceramic cup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </ImageReveal>
            </div>
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tangerine">
                Morning
              </span>
              <h3 className="font-serif text-subheading text-espresso">
                Balanced espresso, slow pours and seasonal drinks made without
                unnecessary fuss.
              </h3>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-espresso font-medium border-b border-espresso/30 pb-0.5 hover:border-tangerine hover:text-tangerine transition-colors duration-300"
              >
                See coffee menu <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Block 2 — Text left, image right */}
        <div className="mb-20 md:mb-28">
          <motion.div
            {...fadeUp(0)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            <div className="space-y-4 order-2 lg:order-1">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tangerine">
                Midday
              </span>
              <h3 className="font-serif text-subheading text-espresso">
                Bright bowls, crisp-edged toast, soft eggs, pancakes and plates
                designed for sharing.
              </h3>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-espresso font-medium border-b border-espresso/30 pb-0.5 hover:border-tangerine hover:text-tangerine transition-colors duration-300"
              >
                See brunch menu <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-1 lg:order-2">
              <ImageReveal>
                <Image
                  src="/images/gallery/brunch-spread-table.webp"
                  alt="Colourful brunch spread on a wooden café table"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </ImageReveal>
            </div>
          </motion.div>
        </div>

        {/* Block 3 — Full-width image with text overlay */}
        <motion.div {...fadeUp(0)} className="relative">
          <div className="relative aspect-[21/9] sm:aspect-[3/1] rounded-lg overflow-hidden">
            <Image
              src="/images/gallery/evening-candle-table.webp"
              alt="Candlelit café table in the evening with warm ambient light"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-espresso/50" />
            <div className="absolute inset-0 flex items-end p-8 md:p-12 lg:p-16">
              <div className="max-w-lg">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">
                  Evening
                </span>
                <h3 className="font-serif text-subheading text-ivory mt-2">
                  Smaller plates, desserts and drinks for the part of the day
                  that should not be rushed.
                </h3>
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 text-ivory font-medium mt-4 hover:text-saffron transition-colors duration-300"
                >
                  See evening menu <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 5 — Featured Menu                                          */
/* ================================================================== */

function FeaturedMenuSection() {
  return (
    <section className="py-24 md:py-32 bg-ivory">
      <Container>
        <motion.div {...fadeUp()} className="mb-14">
          <SectionHeading eyebrow="From the kitchen" title="A few favourites" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {popularItems.map((item, i) => (
            <MenuListItem key={item.id} item={item} index={i} />
          ))}
        </div>

        <motion.div {...fadeUp(0.2)} className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-tangerine font-medium hover:gap-3 transition-all duration-300 text-body-lg"
          >
            View full menu <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

function MenuListItem({
  item,
  index,
}: {
  item: (typeof popularItems)[number];
  index: number;
}) {
  const [showImage, setShowImage] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.article
      {...staggerItem(index * 0.06)}
      className={`group relative flex items-start gap-4 py-6 ${
        isEven ? '' : 'md:pl-8'
      } border-b border-border ${index === popularItems.length - 1 ? 'border-b-0' : ''}`}
      onMouseEnter={() => setShowImage(true)}
      onMouseLeave={() => setShowImage(false)}
      onFocus={() => setShowImage(true)}
      onBlur={() => setShowImage(false)}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-lg md:text-xl text-espresso group-hover:text-tangerine transition-colors duration-300">
            {item.name}
          </h3>
          <span className="text-olive font-medium whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>
        <p className="text-sm text-olive/80 mt-1 leading-relaxed">
          {item.description}
        </p>
        {item.dietary && item.dietary.length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {item.dietary.map((d) => (
              <span
                key={d}
                className="inline-flex items-center justify-center w-7 h-7 text-[10px] font-bold rounded-full bg-cream text-olive border border-border"
                title={dietaryLabels[d]}
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover image */}
      <AnimatePresence>
        {showImage && item.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-0 w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden shadow-xl z-20 pointer-events-none hidden md:block"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="144px"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* ================================================================== */
/*  SECTION 6 — Full-Bleed Atmosphere                                  */
/* ================================================================== */

function AtmosphereSection() {
  return (
    <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/interiors/cafe-wooden-tables.webp"
        alt="Café interior with warm wooden tables and ambient lighting"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-espresso/60" />
      <motion.div
        {...fadeUp(0)}
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        <h2 className="font-serif text-display-sm text-ivory">
          Come for the coffee.
          <br />
          Stay for the room.
        </h2>
        <p className="text-ivory/80 text-body-lg mt-6 max-w-lg mx-auto">
          Wooden tables, warm light, no rush. The kind of space that makes you
          put your phone away.
        </p>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 7 — Philosophy / Ingredient Story                          */
/* ================================================================== */

function PhilosophySection() {
  const notes = [
    { icon: Sparkles, text: 'Made fresh daily' },
    { icon: Leaf, text: 'Vegetarian choices' },
    { icon: MilkOff, text: 'Dairy alternatives' },
    { icon: AlertCircle, text: 'Ask about allergens' },
  ];

  return (
    <section className="py-24 md:py-32 bg-cream">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <SectionHeading eyebrow="Our approach" title="Simple things, handled well." />
          </motion.div>
          <motion.p
            {...fadeUp(0.15)}
            className="text-body-lg text-olive mt-8 leading-relaxed"
          >
            We build the menu around ingredients that taste good in their
            season, prepare what we can in-house, and keep enough variety on
            the table for different appetites.
          </motion.p>

          <motion.div
            {...fadeUp(0.3)}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14"
          >
            {notes.map((note) => (
              <div
                key={note.text}
                className="flex flex-col items-center gap-3 p-5 rounded-lg bg-ivory/60"
              >
                <note.icon
                  className="w-5 h-5 text-tangerine"
                  strokeWidth={1.5}
                />
                <span className="text-sm font-medium text-espresso">
                  {note.text}
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
/*  SECTION 8 — Testimonials                                           */
/* ================================================================== */

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = (i: number) => {
    setCurrent(i);
    resetTimer();
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  return (
    <section className="py-24 md:py-32 bg-ivory">
      <Container>
        <motion.div {...fadeUp()} className="text-center mb-14">
          <h2 className="font-serif text-heading text-espresso">
            Notes from the table
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => {
            setPaused(true);
            if (timerRef.current) clearInterval(timerRef.current);
          }}
          onMouseLeave={() => {
            setPaused(false);
            resetTimer();
          }}
        >
          <div className="min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={testimonials[current].id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="text-center"
              >
                <p className="font-serif text-subheading md:text-heading text-espresso italic leading-snug">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <footer className="mt-6 text-sm font-medium text-olive">
                  — {testimonials[current].author}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-espresso hover:text-ivory hover:border-espresso transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2" role="tablist">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'bg-tangerine w-6'
                      : 'bg-espresso/20 hover:bg-espresso/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-espresso hover:text-ivory hover:border-espresso transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 9 — Gallery Teaser                                         */
/* ================================================================== */

function GalleryTeaserSection() {
  const images = galleryImages.slice(0, 8);

  /* Mosaic grid spans:
     g1: 2 cols, 2 rows
     g2: 1 col, 1 row
     g3: 1 col, 1 row
     g4: 1 col, 1 row
     g5: 1 col, 2 rows
     g6: 2 cols, 1 row
     g7: 1 col, 1 row
     g8: 1 col, 1 row
  */
  const gridSpans: Record<string, string> = {
    g1: 'md:col-span-2 md:row-span-2',
    g2: 'md:col-span-1 md:row-span-1',
    g3: 'md:col-span-1 md:row-span-1',
    g4: 'md:col-span-1 md:row-span-1',
    g5: 'md:col-span-1 md:row-span-2',
    g6: 'md:col-span-2 md:row-span-1',
    g7: 'md:col-span-1 md:row-span-1',
    g8: 'md:col-span-1 md:row-span-1',
  };

  return (
    <section className="py-24 md:py-32 bg-cream">
      <Container>
        <motion.div {...fadeUp()} className="text-center mb-14">
          <h2 className="font-serif text-heading text-espresso">
            A glimpse inside
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-3"
        >
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative rounded-lg overflow-hidden group ${gridSpans[img.id] || ''}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp(0.2)}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-tangerine font-medium hover:gap-3 transition-all duration-300 text-body-lg"
          >
            See the café <ArrowRight className="w-5 h-5" />
          </Link>
          <span className="text-sm text-olive/60">
            <Link
              href={cafe.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tangerine transition-colors duration-300"
            >
              {cafe.instagramHandle}
            </Link>
          </span>
        </motion.div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 10 — Visit                                                 */
/* ================================================================== */

function VisitSection() {
  return (
    <section className="py-24 md:py-32 bg-ivory">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Info */}
          <motion.div {...fadeUp(0)} className="space-y-8">
            <h2 className="font-serif text-heading text-espresso">
              Come find us.
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-tangerine mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-espresso">{cafe.address.full}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-tangerine mt-0.5 shrink-0" />
                <div>
                  {cafe.hours.map((h) => (
                    <p key={h.days} className="text-olive">
                      <span className="font-medium text-espresso">{h.days}</span>{' '}
                      — {h.time}
                    </p>
                  ))}
                  <p className="text-xs text-olive/60 mt-1">{cafe.kitchenNote}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-tangerine mt-0.5 shrink-0" />
                <p className="text-olive">{cafe.phone}</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-tangerine mt-0.5 shrink-0" />
                <p className="text-olive">{cafe.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact?reason=reservation"
                className="inline-flex items-center gap-2 px-6 py-3 bg-tangerine text-ivory font-medium rounded-sm hover:bg-tangerine/90 transition-colors duration-300"
              >
                Book a Table
              </Link>
              <a
                href={cafe.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-espresso text-espresso font-medium rounded-sm hover:bg-espresso hover:text-ivory transition-colors duration-300"
              >
                Get Directions <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-olive font-medium rounded-sm hover:border-espresso hover:text-espresso transition-colors duration-300"
              >
                View Menu
              </Link>
            </div>

            <p className="text-xs text-olive/60">{cafe.transportNote}</p>
          </motion.div>

          {/* Image */}
          <motion.div {...fadeUp(0.15)} className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <ImageReveal>
              <Image
                src="/images/gallery/cafe-exterior-street.webp"
                alt="Café exterior with plants and a warm-lit entrance on a quiet street"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </ImageReveal>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 11 — FAQ Accordion                                         */
/* ================================================================== */

function FAQSection() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <Container>
        <motion.div {...fadeUp()} className="text-center mb-14">
          <h2 className="font-serif text-heading text-espresso">
            Common questions
          </h2>
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

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="py-5">
      <button
        id={buttonId}
        className="w-full flex items-center justify-between text-left gap-4 group"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-espresso group-hover:text-tangerine transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-olive" />
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-olive leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  SECTION 12 — Final CTA                                             */
/* ================================================================== */

function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <Container>
        <motion.div
          {...fadeUp(0)}
          className="max-w-xl mx-auto text-center space-y-8"
        >
          <h2 className="font-serif text-heading text-espresso">
            Your table is closer than you think.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?reason=reservation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-tangerine text-ivory font-medium rounded-sm hover:bg-tangerine/90 transition-colors duration-300"
            >
              Book a Table
            </Link>
            <a
              href={cafe.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-espresso text-espresso font-medium rounded-sm hover:bg-espresso hover:text-ivory transition-colors duration-300"
            >
              Get Directions <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}