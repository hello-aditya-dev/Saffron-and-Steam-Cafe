"use client";

import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from "react";
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
  Car,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
  requests: string;
  consent: boolean;
}

interface GeneralFormData {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  consent: boolean;
}

type FormErrors<T> = Partial<Record<keyof T, string>>;

/* ------------------------------------------------------------------ */
/*  Contact Page (server layout wraps client form)                      */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const isReservation = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("reason") === "reservation"
    : false;

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="relative h-56 sm:h-72 lg:h-80 overflow-hidden isolation-isolate">
        <Image
          src="/images/contact/cafe-exterior-hero.webp"
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
            <p className="mt-2 text-body-lg text-ivory/80">{cafe.address.full}</p>
          </Container>
        </div>
      </section>

      {/* Two-column content */}
      <section className="py-section">
        <Container>
          {isReservation ? (
            <ReservationForm />
          ) : (
            <div className="grid gap-12 lg:gap-20">
              <InfoColumn />
              <GeneralForm />
            </div>
          )}

          {/* FAQ */}
          <section className="bg-cream py-section mt-8 px-5">
            <Container className="max-w-2xl">
              <SectionHeading eyebrow="Frequently asked" title="Common questions" align="left" className="mb-8" />
              <Accordion type="single" collapsible className="w-full">
                {[
                  { question: "Do I need a reservation?", answer: "Walk-ins are always welcome, but for groups of 6 or more, or for evening dining on weekends, we recommend booking ahead via our form or by calling us directly." },
                  { question: "Is there parking nearby?", answer: "Street parking is available on Kapurthala Lane. The nearest metro is Lodhi Road (Violet Line), about a five-minute walk." },
                  { question: "Do you accommodate dietary requirements?", answer: "Yes — our menu marks vegetarian, vegan, gluten-free and nut-containing items. If you have specific allergies, please let your server know and we'll do our best." },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-espresso/10">
                    <AccordionTrigger className="font-serif text-base text-espresso hover:text-tangerine hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-olive leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Container>
          </section>
        </Container>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getFAQSchema([
              { question: "Do I need a reservation?", answer: "Walk-ins are always welcome. For groups of 6+, or for evening dining on weekends, we recommend booking ahead." },
              { question: "Is there parking nearby?", answer: "Street parking on Kapurthala Lane. Nearest metro: Lodhi Road (Violet Line)." },
            ]),
          ),
        }}
      />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Info Column                                                       */
/* ------------------------------------------------------------------ */

function InfoColumn() {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-subheading text-espresso">Find us</h2>

      <div className="space-y-4 text-[0.9375rem] text-olive">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-espresso">{cafe.address.full}</p>
            <p className="text-caption text-olive/60">{cafe.transportNote}</p>
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
          <a href={`tel:${cafe.phone.replace(/[^+\d]/g, "")}`} className="text-espresso link-underline hover:text-tangerine">
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
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reservation Form                                                    */
/* ------------------------------------------------------------------ */

function ReservationForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors<ReservationFormData>>({});
  const [formData, setFormData] = useState<ReservationFormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    seating: "",
    requests: "",
    consent: false,
  });

  useEffect(() => {
    if (submitted && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  const today = new Date().toISOString().split("T")[0];

  function validate(): FormErrors<ReservationFormData> {
    const e: FormErrors<ReservationFormData> = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Please enter a valid email.";
    if (!formData.phone.trim()) e.phone = "Phone is required.";
    if (!formData.date) e.date = "Please select a date.";
    else if (formData.date < today) e.date = "Date cannot be in the past.";
    if (!formData.time) e.time = "Please select a preferred time.";
    if (!formData.guests) e.guests = "Number of guests is required.";
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

  function handleChange(field: keyof ReservationFormData) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };
  }

  if (submitted) {
    return (
      <div ref={formRef} className="rounded-brand bg-sand/50 p-8 text-center">
        <p className="font-serif text-xl text-espresso">Thank you for your reservation request.</p>
        <p className="mt-3 text-sm text-olive">
          Please email{" "}
          <a href={`mailto:${cafe.email}`} className="font-medium text-tangerine hover:underline">
            {cafe.email}
          </a>{" "} to confirm. Groups of 6+ require at least a day&apos;s notice.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: "2", seating: "", requests: "", consent: false });
          }}
          className="mt-6 text-sm font-medium text-tangerine hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div ref={formRef}>
      <h2 className="font-serif text-subheading text-espresso mb-6">
        Book a table
      </h2>

      <p className="text-[0.875rem] text-olive mb-8">
        Groups of 6+ require at least a day&apos;s notice. We&apos;ll confirm
        your booking by email.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="res-name" className="block text-sm font-medium text-espresso mb-1.5">
            Full name <span className="text-rose">*</span>
          </label>
          <input
            id="res-name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange("name")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-rose">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="res-email" className="block text-sm font-medium text-espresso mb-1.5">
            Email <span className="text-rose">*</span>
          </label>
          <input
            id="res-email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange("email")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors"
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-rose">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="res-phone" className="block text-sm font-medium text-espresso mb-1.5">
            Phone <span className="text-rose">*</span>
          </label>
          <input
            id="res-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange("phone")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors"
            placeholder="+91-00000-00000"
          />
          {errors.phone && <p className="mt-1 text-xs text-rose">{errors.phone}</p>}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="res-date" className="block text-sm font-medium text-espresso mb-1.5">
            Date <span className="text-rose">*</span>
          </label>
          <input
            id="res-date"
            type="date"
            required
            min={today}
            value={formData.date}
            onChange={handleChange("date")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors"
          />
          {errors.date && <p className="mt-1 text-xs text-rose">{errors.date}</p>}
        </div>

        {/* Time */}
        <div>
          <label htmlFor="res-time" className="block text-sm font-medium text-espresso mb-1.5">
            Preferred time <span className="text-rose">*</span>
          </label>
          <select
            id="res-time"
            required
            value={formData.time}
            onChange={handleChange("time")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors appearance-none"
          >
            <option value="">Select a time</option>
            {/* Generate time options within operating hours */}
            {(() => {
              const times: string[] = [];
              const start = 8;
              const endEvening = 22;
              const endWeekend = 22.5;
              const endCurrent = endEvening;
              for (let h = start; h < endCurrent; h++) {
                times.push(`${h}:00`);
                times.push(`${h}:30`);
              }
              for (let h = start; h < endWeekend; h++) {
                times.push(`${h}:00`);
                times.push(`${h}:30`);
              }
              return times.map((t) => <option key={t}>{t}</option>);
            })()}
          </select>
          {errors.time && <p className="mt-1 text-xs text-rose">{errors.time}</p>}
        </div>

        {/* Number of guests */}
        <div>
          <label htmlFor="res-guests" className="block text-sm font-medium text-espresso mb-1.5">
            Number of guests <span className="text-rose">*</span>
          </label>
          <select
            id="res-guests"
            required
            value={formData.guests}
            onChange={handleChange("guests")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors appearance-none"
          >
            <option value="">How many?</option>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((n) => (
              <option key={n} value={n}>
                {n} {n === "1" ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Seating preference */}
        <div>
          <label htmlFor="res-seating" className="block text-sm font-medium text-espresso mb-1.5">
            Seating preference
          </label>
          <select
            id="res-seating"
            value={formData.seating}
            onChange={handleChange("seating")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors appearance-none"
          >
            <option value="">Any available</option>
            <option value="indoor">Indoor preferred</option>
            <option value="outdoor">Outdoor / terrace</option>
            <option value="window">Window seat</option>
          </select>
        </div>

        {/* Special requests */}
        <div>
          <label htmlFor="res-requests" className="block text-sm font-medium text-espresso mb-1.5">
            Special requests
          </label>
          <textarea
            id="res-requests"
            value={formData.requests}
            onChange={handleChange("requests")}
            rows={4}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors resize-y min-h-[100px]"
            placeholder="Allergies, dietary needs, etc."
          />
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            id="res-consent"
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => handleChange("consent")(e)}
            className="mt-0.5 h-4 w-4 rounded border-espresso/30 text-tangerine focus:ring-tangerine accent-tangerine"
          />
          <label htmlFor="res-consent" className="text-[0.8125rem] text-olive leading-snug">
            I agree to my data being used to process this reservation, in line with the{" "}
            <Link href="/privacy" className="text-tangerine hover:underline">privacy policy</Link>.
          </label>
          {errors.consent && <p className="text-xs text-rose -mt-3">{errors.consent}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-brand bg-tangerine px-8 py-3 font-semibold text-ivory hover:bg-saffron hover:text-espresso transition-colors duration-300"
        >
          Request a reservation
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  General Enquiry Form                                               */
/* ------------------------------------------------------------------ */

function GeneralForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors<GeneralFormData>>({});
  const [formData, setFormData] = useState<GeneralFormData>({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
    consent: false,
  });

  useEffect(() => {
    if (submitted && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  const reasonOptions = [
    { value: "", label: "Select a reason" },
    { value: "general", label: "General question" },
    { value: "gathering", label: "Private gathering" },
    { value: "press", label: "Press / collaboration" },
    { value: "careers", label: "Careers" },
    { value: "feedback", label: "Feedback" },
  ] as const;

  function validate(): FormErrors<GeneralFormData> {
    const e: FormErrors<GeneralFormData> = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Please enter a valid email.";
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

  function handleChange(field: keyof GeneralFormData) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };
  }

  if (submitted) {
    return (
      <div ref={formRef} className="rounded-brand bg-sand/50 p-8 text-center">
        <p className="font-serif text-xl text-espresso">Thank you for reaching out.</p>
        <p className="mt-3 text-sm text-olive">
          The demo form is not connected yet. Please email{" "}
          <a href={`mailto:${cafe.email}`} className="font-medium text-tangerine hover:underline">
            {cafe.email}
          </a>{" "} and we&apos;ll get back to you shortly.
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
    );
  }

  return (
    <div ref={formRef}>
      <h2 className="font-serif text-subheading text-espresso mb-6">Get in touch</h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="gen-name" className="block text-sm font-medium text-espresso mb-1.5">
            Name <span className="text-rose">*</span>
          </label>
          <input
            id="gen-name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange("name")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-rose">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="gen-email" className="block text-sm font-medium text-espresso mb-1.5">
            Email <span className="text-rose">*</span>
          </label>
          <input
            id="gen-email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange("email")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors"
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-rose">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="gen-phone" className="block text-sm font-medium text-espresso mb-1.5">
            Phone <span className="text-olive/60">(optional)</span>
          </label>
          <input
            id="gen-phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange("phone")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors"
            placeholder="+91-00000-00000"
          />
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="gen-reason" className="block text-sm font-medium text-espresso mb-1.5">
            Reason
          </label>
          <select
            id="gen-reason"
            value={formData.reason}
            onChange={handleChange("reason")}
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
          <label htmlFor="gen-message" className="block text-sm font-medium text-espresso mb-1.5">
            Message <span className="text-rose">*</span>
          </label>
          <textarea
            id="gen-message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange("message")}
            className="w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors resize-y min-h-[120px]"
            placeholder="How can we help?"
          />
          {errors.message && <p className="mt-1 text-xs text-rose">{errors.message}</p>}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            id="gen-consent"
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => handleChange("consent")(e)}
            className="mt-0.5 h-4 w-4 rounded border-espresso/30 text-tangerine focus:ring-tangerine accent-tangerine"
          />
          <label htmlFor="gen-consent" className="text-[0.8125rem] text-olive leading-snug">
            I agree to my data being used to respond to this enquiry, in line with the{" "}
            <Link href="/privacy" className="text-tangerine hover:underline">privacy policy</Link>.
          </label>
          {errors.consent && <p className="text-xs text-rose -mt-3">{errors.consent}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-brand bg-tangerine px-8 py-3 font-semibold text-ivory hover:bg-saffron hover:text-espresso transition-colors duration-300"
        >
          Send message
        </button>
      </form>
    </div>
  );
}