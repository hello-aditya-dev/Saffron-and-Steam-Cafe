"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { cafe } from "@/data/cafe";
import { getFAQSchema } from "@/lib/schema";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Train,
  Car,
} from "lucide-react";

const reasonOptions = [
  { value: "", label: "Select a reason" },
  { value: "general", label: "General question" },
  { value: "gathering", label: "Private gathering" },
  { value: "press", label: "Press / collaboration" },
  { value: "careers", label: "Careers" },
  { value: "feedback", label: "Feedback" },
] as const;

const faqs = [
  {
    question: "Do I need a reservation?",
    answer:
      "Walk-ins are always welcome. For groups of 6 or more, or for evening dining on weekends, we recommend booking ahead via our form or by calling us.",
  },
  {
    question: "Is there parking nearby?",
    answer:
      "Street parking is available on Kapurthala Lane, a short walk from the café. The nearest metro is Lodhi Road on the Violet Line.",
  },
  {
    question: "Do you accommodate dietary requirements?",
    answer:
      "Yes — our menu marks vegetarian, vegan, gluten-free and nut-containing items. If you have specific allergies, please let your server know and we'll do our best.",
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  consent?: string;
}

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const isReservation = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("reason") === "reservation"
    : false;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    reason: isReservation ? "gathering" : "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Scroll to form if ?reason=reservation
  useEffect(() => {
    if (isReservation) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [isReservation]);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Please enter a valid email.";
    }
    if (!formData.message.trim()) e.message = "Message is required.";
    if (!formData.consent) e.consent = "Please consent to continue.";
    return e;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero image */}
      <section className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
        <Image
          src="/images/gallery/cafe-exterior-street.webp"
          alt="Saffron & Steam café exterior on a tree-lined street"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-espresso/40" />
        <div className="absolute inset-0 flex items-end">
          <Container className="pb-8 sm:pb-12">
            <h1 className="font-serif text-heading text-ivory">Visit us</h1>
            <p className="mt-2 text-body-lg text-ivory/80">
              {cafe.address.full}
            </p>
          </Container>
        </div>
      </section>

      {/* Two-column content */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Contact info */}
            <div className="space-y-10">
              <div>
                <h2 className="font-serif text-subheading text-espresso mb-6">Find us</h2>

                <dl className="space-y-5">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-tangerine" />
                    <div>
                      <dt className="sr-only">Address</dt>
                      <dd className="text-sm font-medium text-espresso">Address</dd>
                      <p className="text-sm text-olive mt-0.5">{cafe.address.full}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-tangerine" />
                    <div>
                      <dt className="sr-only">Hours</dt>
                      <dd className="text-sm font-medium text-espresso">Hours</dd>
                      {cafe.hours.map((h) => (
                        <p key={h.days} className="text-sm text-olive mt-0.5">
                          <span className="font-medium text-espresso/80">{h.days}</span>
                          {" — "}
                          {h.time}
                        </p>
                      ))}
                      <p className="text-xs text-rose mt-1">{cafe.kitchenNote}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-tangerine" />
                    <div>
                      <dt className="sr-only">Phone</dt>
                      <dd className="text-sm font-medium text-espresso">Phone</dd>
                      <p className="text-sm text-olive mt-0.5">
                        <Link href={`tel:${cafe.phone.replace(/[^+\d]/g, "")}`} className="hover:text-tangerine transition-colors">
                          {cafe.phone}
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-tangerine" />
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd className="text-sm font-medium text-espresso">Email</dd>
                      <p className="text-sm text-olive mt-0.5">
                        <Link href={`mailto:${cafe.email}`} className="hover:text-tangerine transition-colors">
                          {cafe.email}
                        </Link>
                      </p>
                    </div>
                  </div>
                </dl>
              </div>

              {/* Map placeholder */}
              <div className="rounded-brand border border-espresso/10 bg-cream p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-olive" />
                  <div>
                    <p className="font-serif text-lg text-espresso">12 Lodhi Market Lane, New Delhi</p>
                    <Link
                      href={cafe.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-tangerine transition-colors hover:text-saffron"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      Open in Google Maps
                    </Link>
                  </div>
                </div>
              </div>

              {/* Transport note */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium uppercase tracking-widest text-rose">Getting here</h3>
                <div className="flex gap-3 text-sm text-olive">
                  <Train className="mt-0.5 h-4 w-4 flex-shrink-0 text-olive" />
                  <p>Nearest metro: Lodhi Road (Violet Line).</p>
                </div>
                <div className="flex gap-3 text-sm text-olive">
                  <Car className="mt-0.5 h-4 w-4 flex-shrink-0 text-olive" />
                  <p>Street parking available on Kapurthala Lane.</p>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="rounded-brand bg-espresso p-6">
                <h3 className="font-serif text-lg text-ivory">Book a table</h3>
                <p className="mt-2 text-sm text-ivory/70">
                  Use the form or call us directly. For groups of 6+, please give us at least a day&apos;s notice.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div ref={formRef}>
              {submitted ? (
                <div className="rounded-brand border border-saffron/30 bg-cream p-8 text-center">
                  <p className="font-serif text-xl text-espresso">Thank you for reaching out</p>
                  <p className="mt-3 text-sm text-olive">
                    The demo form is not connected yet. Please email{" "}
                    <Link href={`mailto:${cafe.email}`} className="font-medium text-tangerine hover:underline">
                      {cafe.email}
                    </Link>{" "}
                    and we&apos;ll get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", reason: "", message: "", consent: false });
                    }}
                    className="mt-6 text-sm font-medium text-tangerine hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h2 className="font-serif text-subheading text-espresso mb-6">Get in touch</h2>

                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-espresso mb-1.5">
                      Name <span className="text-rose">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-espresso mb-1.5">
                      Email <span className="text-rose">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-espresso mb-1.5">
                      Phone <span className="text-olive/60">(optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors"
                      placeholder="+91-00000-00000"
                    />
                  </div>

                  {/* Reason */}
                  <div>
                    <label htmlFor="contact-reason" className="block text-sm font-medium text-espresso mb-1.5">
                      Reason
                    </label>
                    <select
                      id="contact-reason"
                      value={formData.reason}
                      onChange={(e) => setFormData((p) => ({ ...p, reason: e.target.value }))}
                      className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors appearance-none"
                    >
                      {reasonOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-espresso mb-1.5">
                      Message <span className="text-rose">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors resize-y min-h-[120px]"
                      placeholder="How can we help?"
                    />
                    {errors.message && <p className="mt-1 text-xs text-rose">{errors.message}</p>}
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      id="contact-consent"
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData((p) => ({ ...p, consent: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 rounded border-espresso/30 text-tangerine focus:ring-tangerine accent-tangerine"
                    />
                    <label htmlFor="contact-consent" className="text-sm text-olive leading-snug">
                      I agree to my data being used to respond to this enquiry, in line with the{" "}
                      <Link href="/privacy" className="text-tangerine hover:underline">privacy policy</Link>.
                    </label>
                  </div>
                  {errors.consent && <p className="text-xs text-rose -mt-3">{errors.consent}</p>}

                  <button
                    type="submit"
                    className="w-full rounded-brand bg-tangerine px-8 py-3 font-semibold text-ivory transition-colors hover:bg-saffron hover:text-espresso sm:w-auto"
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ teaser */}
      <section className="bg-cream py-16 sm:py-20">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Need help?" title="Frequently asked" align="left" className="mb-8" />
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-espresso/10">
                <AccordionTrigger className="font-serif text-base text-espresso hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-olive leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-6 text-sm text-olive">
            View all FAQ on our{" "}
            <Link href="/" className="font-medium text-tangerine hover:underline">
              homepage
            </Link>.
          </p>
        </Container>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(faqs)),
        }}
      />
    </main>
  );
}