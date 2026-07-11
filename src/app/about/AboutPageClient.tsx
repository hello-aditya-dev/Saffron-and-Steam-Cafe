"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ImageReveal from "@/components/shared/ImageReveal";
import ReservationCTA from "@/components/shared/ReservationCTA";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { initial: undefined, whileInView: undefined, viewport: undefined, transition: undefined };
  }
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  };
};

const team = [
  {
    role: "Café Lead",
    name: "Aditi Sharma",
    note: "Aditi runs the floor with the kind of calm that makes busy weekends feel like a slow Tuesday.",
  },
  {
    role: "Head of Coffee",
    name: "Karan Mehta",
    note: "Karan sources our beans, trains the baristas, and still pulls the best shots on the bar.",
  },
  {
    role: "Kitchen Lead",
    name: "Priya Nair",
    note: "Priya's menu is rooted in Indian flavours, honest technique, and whatever looked good at the market this morning.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream isolation-isolate">
        <div className="grid lg:grid-cols-2 min-h-[60vh] lg:min-h-[70vh]">
          <div className="flex items-end pb-12 lg:pb-16 lg:pl-10">
            <Container>
              <motion.p {...fadeUp(0.1)} className="text-overline font-semibold uppercase tracking-[0.18em] text-tangerine mb-4">
                Our Story
              </motion.p>
              <motion.h1
                {...fadeUp(0.2)}
                className="font-serif text-display-sm text-espresso max-w-lg"
              >
                Built around the pleasure of staying.
              </motion.h1>
            </Container>
          </div>
          <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[480px]">
            <ImageReveal className="h-full w-full">
              <Image
                src="/images/about/about-cafe-story.webp"
                alt="Warm interior of Saffron & Steam café with natural light"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/5] rounded-brand overflow-hidden">
                <ImageReveal>
                  <Image
                    src="/images/home/home-interior-wide.webp"
                    alt="Inside view of the café with wooden tables and warm lighting"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </ImageReveal>
              </div>
            </div>
            <motion.div {...fadeUp(0.15)} className="lg:col-span-5 space-y-5">
              <h2 className="font-serif text-subheading text-espresso">
                A café at more than one speed.
              </h2>
              <p className="text-body-lg text-olive leading-relaxed editorial-text">
                Saffron &amp; Steam began with a simple idea: a café should work at
                more than one speed. Some mornings call for a quick espresso. Others turn
                into lunch. Some evenings need a plate in the middle of the table and
                nowhere else to be. We opened our doors on Lodhi Market Lane in 2022
                with that idea — not a concept, not a brand exercise, just a room we wanted to
                spend time in ourselves. The kind of place where the morning shift hands
                off to the evening one and the room shifts with it.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Day narrative — Morning / Afternoon / Evening */}
      <section className="py-section-lg bg-cream">
        <Container>
          <div className="max-w-4xl mx-auto space-y-20 lg:space-y-28">
            {/* Morning */}
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0}
              className="grid gap-8 sm:grid-cols-[120px_1fr] sm:items-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-brand sm:aspect-[3/4]">
                <Image
                  src="/images/about/morning-espresso.webp"
                  alt="Barista preparing espresso in the morning"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-overline font-semibold uppercase tracking-[0.18em] text-tangerine">
                  Morning
                </span>
                <h3 className="font-serif text-subheading text-espresso mt-1">
                  The espresso machine is the first thing on. Regulars arrive with their
                  own rhythms — some want silence and a newspaper, others bring laptops and
                  stay through lunch. The kitchen starts sending out toast, eggs,
                  granola. Nothing rushed, nothing fussy.
                </h3>
              </div>
            </motion.article>

            {/* Afternoon */}
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={1}
              className="grid gap-8 sm:grid-cols-[120px_1fr] sm:items-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-brand sm:aspect-[3/4] sm:order-1">
                <Image
                  src="/images/about/afternoon-brunch.webp"
                  alt="Friends sharing brunch at a café table in the afternoon"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
              <div className="sm:order-2">
                <span className="text-overline font-semibold uppercase tracking-[0.18em] text-tangerine">
                  Afternoon
                </span>
                <h3 className="font-serif text-subheading text-espresso mt-1">
                  The pace changes. Brunch tables give way to working lunches and long
                  conversations. The light through the windows shifts. Cold brew replaces
                  flat whites. The kitchen starts prepping for the evening — small
                  plates, something warm from the oven, a dessert that needs time.
                </h3>
              </div>
            </motion.article>

            {/* Evening */}
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={2}
              className="grid gap-8 sm:grid-cols-[120px_1fr] sm:items-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-brand sm:aspect-[3/4]">
                <Image
                  src="/images/about/evening-candle-table.webp"
                  alt="Candlelit table in the evening at Saffron & Steam"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-overline font-semibold uppercase tracking-[0.18em] text-tangerine">
                  Evening
                </span>
                <h3 className="font-serif text-subheading text-espresso mt-1">
                  The lights go low. Candles come out. The music gets a little
                  warmer. People share plates and order one more round. This is the
                  Saffron &amp; Steam we built the second half of the day around — not a bar,
                  not a restaurant, just a good room when the sun goes down.
                </h3>
              </div>
            </motion.article>
          </div>
        </Container>
      </section>

      {/* Coffee & Food */}
      <section className="py-section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-serif text-subheading text-espresso">Our coffee</h2>
              <div className="mt-4 space-y-4 text-body-lg text-olive leading-relaxed editorial-text">
                <p>
                  We work with a small roster of Indian and international roasters. Our
                  house blend changes with the season. Every barista is trained to pull
                  shots the same way — consistently, without over-explaining it. If you
                  want to know more, just ask.
                </p>
                <p>
                  We also serve a South Indian filter coffee that we&apos;re quietly
                  very proud of, and a rotating single-origin espresso for anyone who
                  wants to taste what a specific farm tastes like.
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-subheading text-espresso">Our food</h2>
              <div className="mt-4 space-y-4 text-body-lg text-olive leading-relaxed editorial-text">
                <p>
                  The menu is rooted in Indian flavours but doesn&apos;t limit itself to
                  them. We make everything in-house — bread, granola, sauces, desserts.
                  Seasonal produce from local suppliers drives what changes and what stays.
                </p>
                <p>
                  The brunch menu runs through the afternoon. Evenings lean into shared
                  plates and things that pair well with conversation. Nothing is
                  overworked. If it doesn&apos;t need to be on the plate, it isn&apos;t.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-section bg-cream">
        <Container>
          <SectionHeading eyebrow="The team" title="The people behind the counter" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl">
            {team.map((person, i) => (
              <motion.div
                key={person.role}
                {...fadeUp(i * 0.1)}
                className="space-y-2 py-6 px-6 border border-border rounded-brand"
              >
                <p className="text-overline font-semibold uppercase tracking-[0.18em] text-tangerine">
                  {person.role}
                </p>
                <h3 className="font-serif text-xl text-espresso">{person.name}</h3>
                <p className="text-[0.875rem] leading-relaxed text-olive mt-1">
                  {person.note}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-section">
        <Container className="text-center">
          <h2 className="font-serif text-heading text-espresso">
            Come see for yourself
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-body-lg text-olive">
            We&apos;re open seven days a week. Walk in, or book ahead if
            you&apos;re coming with a group.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-block bg-tangerine px-8 py-3 font-semibold text-ivory rounded-sm hover:bg-saffron hover:text-espresso transition-colors duration-300"
            >
              Find us
            </Link>
            <Link
              href="/menu"
              className="inline-block border-2 border-espresso px-8 py-3 font-semibold text-espresso transition-colors hover:bg-espresso hover:text-ivory transition-colors duration-300"
            >
              View the menu
            </Link>
          </div>
        </Container>
      </section>

      <ReservationCTA />
    </main>
  );
}