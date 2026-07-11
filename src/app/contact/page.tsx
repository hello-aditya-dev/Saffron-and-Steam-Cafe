"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cafe } from "@/data/cafe";
import { getFAQSchema } from "@/lib/schema";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
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
  Loader2,
  CheckCircle2,
} from "lucide-react";

/* ================================================================== */
/*  Zod Schemas                                                        */
/* ================================================================== */

const reservationSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(
      /^(\+91[-\s]?\d{5}[-\s]?\d{5}|\d{10})$/,
      "Enter a valid Indian phone number (e.g. +91-98765-43210)",
    ),
  date: z
    .string()
    .min(1, "Please select a date")
    .refine((val) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(val + "T00:00:00");
      return selected >= today;
    }, "Date must be today or in the future"),
  time: z.string().min(1, "Please select a preferred time"),
  guests: z.string().min(1, "Please select the number of guests"),
  seating: z.string().optional(),
  requests: z.string().optional(),
  consent: z.boolean().refine(
    (val) => val === true,
    { message: "You must agree to be contacted regarding your reservation" },
  ),
});

const generalSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .refine(
      (val) =>
        val.trim() === "" ||
        /^(\+91[-\s]?\d{5}[-\s]?\d{5}|\d{10})$/.test(val),
      "Enter a valid Indian phone number (e.g. +91-98765-43210)",
    ),
  reason: z.string().min(1, "Please select a reason for your enquiry"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine(
    (val) => val === true,
    { message: "You must agree to continue" },
  ),
});

type ReservationFormData = z.infer<typeof reservationSchema>;
type GeneralFormData = z.infer<typeof generalSchema>;

/* ================================================================== */
/*  Constants                                                          */
/* ================================================================== */

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 8; h <= 21; h++) {
    for (const m of [0, 30]) {
      const h12 = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      slots.push(`${h12}:${m === 0 ? "00" : "30"} ${ampm}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

const GUEST_OPTIONS = [
  { value: "1-2", label: "1\u20132 guests" },
  { value: "3-4", label: "3\u20134 guests" },
  { value: "5-6", label: "5\u20136 guests" },
  { value: "7-8", label: "7\u20138 guests" },
  { value: "9+", label: "9+ guests" },
];

const SEATING_OPTIONS = [
  { value: "", label: "No preference" },
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor" },
];

const REASON_OPTIONS = [
  { value: "", label: "Select a reason" },
  { value: "general", label: "General inquiry" },
  { value: "reservation", label: "Reservation" },
  { value: "private-event", label: "Private event" },
  { value: "feedback", label: "Feedback" },
  { value: "careers", label: "Careers" },
  { value: "other", label: "Other" },
];

const FAQS = [
  {
    question: "Do I need a reservation?",
    answer:
      "Walk-ins are always welcome, but a reservation is recommended for weekends and evenings to guarantee your table.",
  },
  {
    question: "Do you have vegetarian and vegan options?",
    answer:
      "Our menu is largely vegetarian, and many dishes can be made vegan on request. We also offer oat, almond and soy milk for all coffee drinks.",
  },
  {
    question: "Is there a gluten-free menu?",
    answer:
      "Several items are naturally gluten-free or can be adapted. Look for the GF label on the menu, and always confirm with the team before ordering.",
  },
  {
    question: "Are you hiring?",
    answer:
      'We are always keen to hear from passionate baristas, cooks and hospitality people. Send a short note to hello@saffronandsteam.example with "Careers" in the subject line.',
  },
  {
    question: "Can I host a private gathering?",
    answer:
      "We can accommodate small groups and semi-private events. Reach out via the contact form with the date, group size and what you have in mind.",
  },
  {
    question: "Is parking available?",
    answer:
      "Street parking is available on Kapurthala Lane. The nearest metro station is Lodhi Road (Violet Line), about a five-minute walk.",
  },
  {
    question: "Are dogs allowed?",
    answer:
      "Well-behaved dogs are welcome in our outdoor seating area. Water bowls are available on request.",
  },
  {
    question: "What about allergens?",
    answer:
      "Our kitchen handles gluten, dairy, nuts and other allergens. Please speak with the team before ordering so we can guide you safely.",
  },
];

/* ================================================================== */
/*  Shared Styles                                                      */
/* ================================================================== */

const inputBase =
  "w-full rounded-brand border border-espresso/15 bg-ivory px-4 py-2.5 text-sm text-espresso placeholder:text-olive/50 focus:border-tangerine focus:outline-none focus:ring-1 focus:ring-tangerine transition-colors";

const labelBase = "block text-sm font-medium text-espresso mb-1.5";
const errorBase = "mt-1 text-xs text-rose";
const selectExtra = " appearance-none";
const textareaExtra = " resize-y min-h-[100px]";

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ================================================================== */
/*  Contact Content (needs Suspense for useSearchParams)               */
/* ================================================================== */

function ContactContent() {
  const searchParams = useSearchParams();
  const isReservation = searchParams.get("reason") === "reservation";

  return (
    <main className="min-h-screen bg-ivory">
      {/* ---- 1. Page Intro ---- */}
      <section className="bg-cream py-12 sm:py-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={isReservation ? "RESERVATIONS" : "VISIT US"}
              title={isReservation ? "Book a table" : "Find us"}
              description={
                isReservation
                  ? "Reserve your spot at Saffron & Steam. We\u2019ll confirm by email within a few hours."
                  : "We\u2019d love to hear from you. Drop by, call, or send us a message below."
              }
              align="left"
            />
          </Reveal>

          {/* Form-mode toggle */}
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm text-olive">
              {isReservation ? (
                <>
                  Have a general inquiry?{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-tangerine hover:underline"
                  >
                    Contact us
                  </Link>
                  .
                </>
              ) : (
                <>
                  Need to make a reservation?{" "}
                  <Link
                    href="/contact?reason=reservation"
                    className="font-medium text-tangerine hover:underline"
                  >
                    Switch to the reservation form
                  </Link>
                  .
                </>
              )}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---- 2. Contact Info + Form ---- */}
      <section className="py-[--spacing-section]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Visit info */}
            <Reveal direction="left">
              <InfoColumn />
            </Reveal>

            {/* Right — Form */}
            <Reveal direction="right" delay={0.1}>
              {isReservation ? <ReservationForm /> : <GeneralForm />}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---- 5. FAQ ---- */}
      <section className="bg-cream py-[--spacing-section]">
        <Container className="max-w-2xl">
          <Reveal>
            <SectionHeading
              eyebrow="Frequently asked"
              title="Common questions"
              align="left"
              className="mb-8"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion
              type="single"
              collapsible
              className="divide-y divide-border"
            >
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-[0.9375rem] text-espresso hover:text-tangerine transition-colors duration-300 py-5 text-left font-serif">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[0.875rem] text-olive leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Container>
      </section>

      {/* ---- Structured Data ---- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(FAQS)),
        }}
      />
    </main>
  );
}

/* ================================================================== */
/*  Info Column                                                        */
/* ================================================================== */

function InfoColumn() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-subheading text-espresso mb-6">
          Visit information
        </h2>

        <div className="space-y-5 text-[0.9375rem] text-olive">
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
            <div>
              <p className="text-espresso font-medium">{cafe.address.full}</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
            <div>
              {cafe.hours.map((h) => (
                <p key={h.days} className="text-espresso">
                  <span className="font-medium">{h.days}</span>
                  {" \u2014 "}
                  {h.time}
                </p>
              ))}
              <p className="text-caption text-rose mt-1">{cafe.kitchenNote}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
            <a
              href={`tel:${cafe.phone.replace(/[^+\d]/g, "")}`}
              className="text-espresso link-underline hover:text-tangerine"
            >
              {cafe.phone}
            </a>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
            <a
              href={`mailto:${cafe.email}`}
              className="text-espresso link-underline hover:text-tangerine"
            >
              {cafe.email}
            </a>
          </div>

          {/* Transport note */}
          <div className="flex items-start gap-3">
            <Navigation className="w-4 h-4 text-tangerine mt-0.5 shrink-0" />
            <p className="text-olive/70 text-[0.8125rem] leading-relaxed">
              {cafe.transportNote}
            </p>
          </div>
        </div>
      </div>

      {/* Get Directions */}
      <Button href={cafe.directionsUrl} variant="secondary" size="md">
        Get Directions
      </Button>
    </div>
  );
}

/* ================================================================== */
/*  Reservation Form                                                   */
/* ================================================================== */

type SubmitState = "idle" | "success" | "error";

function ReservationForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submittedData, setSubmittedData] = useState<ReservationFormData | null>(
    null,
  );
  const todayStr = getTodayStr();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      seating: "",
      requests: "",
      consent: false,
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: ReservationFormData) => {
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      setSubmittedData(data);
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  /* ---------- Success ---------- */
  if (submitState === "success" && submittedData) {
    return (
      <div className="rounded-brand bg-surface-warm p-8 sm:p-10 text-center">
        <CheckCircle2 className="w-10 h-10 text-olive-green mx-auto mb-4" />
        <h3 className="font-serif text-xl text-espresso mb-2">
          Reservation request received
        </h3>
        <p className="text-sm text-olive mb-1">
          Thank you, {submittedData.name}! We&apos;ll confirm your booking at{" "}
          <span className="font-medium text-espresso">
            {submittedData.email}
          </span>{" "}
          within a few hours.
        </p>
        <p className="text-sm text-olive">
          Groups of 6+ require at least a day&apos;s notice.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setSubmittedData(null);
            setSubmitState("idle");
          }}
          className="mt-6 text-sm font-medium text-tangerine hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  /* ---------- Form ---------- */
  return (
    <div>
      <h2 className="font-serif text-subheading text-espresso mb-2">
        Book a table
      </h2>
      <p className="text-[0.8125rem] text-olive mb-8">
        Fill in the details below and we&apos;ll confirm your reservation by
        email.
      </p>

      {/* Error banner */}
      {submitState === "error" && (
        <div
          className="mb-6 p-4 rounded-brand bg-rose/10 border border-rose/20"
          role="alert"
        >
          <p className="text-sm text-rose">
            Something went wrong. Please try again or call us at{" "}
            <a
              href={`tel:${cafe.phone.replace(/[^+\d]/g, "")}`}
              className="underline"
            >
              {cafe.phone}
            </a>
            .
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="res-name" className={labelBase}>
            Full name <span className="text-rose">*</span>
          </label>
          <input
            id="res-name"
            type="text"
            placeholder="Your name"
            {...register("name")}
            aria-describedby={errors.name ? "res-name-error" : undefined}
            aria-invalid={errors.name ? true : undefined}
            className={inputBase}
          />
          {errors.name && (
            <p id="res-name-error" role="alert" className={errorBase}>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="res-email" className={labelBase}>
            Email <span className="text-rose">*</span>
          </label>
          <input
            id="res-email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            aria-describedby={errors.email ? "res-email-error" : undefined}
            aria-invalid={errors.email ? true : undefined}
            className={inputBase}
          />
          {errors.email && (
            <p id="res-email-error" role="alert" className={errorBase}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="res-phone" className={labelBase}>
            Phone <span className="text-rose">*</span>
          </label>
          <input
            id="res-phone"
            type="tel"
            placeholder="+91-98765-43210"
            {...register("phone")}
            aria-describedby={errors.phone ? "res-phone-error" : undefined}
            aria-invalid={errors.phone ? true : undefined}
            className={inputBase}
          />
          {errors.phone && (
            <p id="res-phone-error" role="alert" className={errorBase}>
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="res-date" className={labelBase}>
            Date <span className="text-rose">*</span>
          </label>
          <input
            id="res-date"
            type="date"
            min={todayStr}
            {...register("date")}
            aria-describedby={errors.date ? "res-date-error" : undefined}
            aria-invalid={errors.date ? true : undefined}
            className={inputBase}
          />
          {errors.date && (
            <p id="res-date-error" role="alert" className={errorBase}>
              {errors.date.message}
            </p>
          )}
        </div>

        {/* Time */}
        <div>
          <label htmlFor="res-time" className={labelBase}>
            Preferred time <span className="text-rose">*</span>
          </label>
          <select
            id="res-time"
            {...register("time")}
            aria-describedby={errors.time ? "res-time-error" : undefined}
            aria-invalid={errors.time ? true : undefined}
            className={inputBase + selectExtra}
          >
            <option value="">Select a time</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.time && (
            <p id="res-time-error" role="alert" className={errorBase}>
              {errors.time.message}
            </p>
          )}
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="res-guests" className={labelBase}>
            Number of guests <span className="text-rose">*</span>
          </label>
          <select
            id="res-guests"
            {...register("guests")}
            aria-describedby={errors.guests ? "res-guests-error" : undefined}
            aria-invalid={errors.guests ? true : undefined}
            className={inputBase + selectExtra}
          >
            <option value="">How many?</option>
            {GUEST_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.guests && (
            <p id="res-guests-error" role="alert" className={errorBase}>
              {errors.guests.message}
            </p>
          )}
        </div>

        {/* Seating preference */}
        <div>
          <label htmlFor="res-seating" className={labelBase}>
            Seating preference
          </label>
          <select
            id="res-seating"
            {...register("seating")}
            className={inputBase + selectExtra}
          >
            {SEATING_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Special requests */}
        <div>
          <label htmlFor="res-requests" className={labelBase}>
            Special requests
          </label>
          <textarea
            id="res-requests"
            placeholder="Allergies, dietary needs, celebrations\u2026"
            rows={4}
            {...register("requests")}
            className={inputBase + textareaExtra}
          />
        </div>

        {/* Consent */}
        <div className="space-y-1">
          <div className="flex items-start gap-3">
            <input
              id="res-consent"
              type="checkbox"
              {...register("consent")}
              aria-describedby={
                errors.consent ? "res-consent-error" : undefined
              }
              aria-invalid={errors.consent ? true : undefined}
              className="mt-0.5 h-4 w-4 rounded border-espresso/30 text-tangerine focus:ring-tangerine accent-tangerine"
            />
            <label
              htmlFor="res-consent"
              className="text-[0.8125rem] text-olive leading-snug cursor-pointer"
            >
              I agree to be contacted regarding my reservation
            </label>
          </div>
          {errors.consent && (
            <p
              id="res-consent-error"
              role="alert"
              className={errorBase + " ml-7"}
            >
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting&hellip;
            </>
          ) : (
            "Submit reservation"
          )}
        </Button>
      </form>
    </div>
  );
}

/* ================================================================== */
/*  General Contact Form                                               */
/* ================================================================== */

function GeneralForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submittedData, setSubmittedData] = useState<GeneralFormData | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GeneralFormData>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      reason: "",
      message: "",
      consent: false,
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: GeneralFormData) => {
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      setSubmittedData(data);
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  /* ---------- Success ---------- */
  if (submitState === "success" && submittedData) {
    return (
      <div className="rounded-brand bg-surface-warm p-8 sm:p-10 text-center">
        <CheckCircle2 className="w-10 h-10 text-olive-green mx-auto mb-4" />
        <h3 className="font-serif text-xl text-espresso mb-2">
          Message sent
        </h3>
        <p className="text-sm text-olive mb-1">
          Thank you, {submittedData.name}! We&apos;ll get back to you at{" "}
          <span className="font-medium text-espresso">
            {submittedData.email}
          </span>{" "}
          shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setSubmittedData(null);
            setSubmitState("idle");
          }}
          className="mt-6 text-sm font-medium text-tangerine hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  /* ---------- Form ---------- */
  return (
    <div>
      <h2 className="font-serif text-subheading text-espresso mb-2">
        Get in touch
      </h2>
      <p className="text-[0.8125rem] text-olive mb-8">
        Have a question, feedback, or just want to say hello? We&apos;d love to
        hear from you.
      </p>

      {/* Error banner */}
      {submitState === "error" && (
        <div
          className="mb-6 p-4 rounded-brand bg-rose/10 border border-rose/20"
          role="alert"
        >
          <p className="text-sm text-rose">
            Something went wrong. Please try again or email us at{" "}
            <a href={`mailto:${cafe.email}`} className="underline">
              {cafe.email}
            </a>
            .
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="gen-name" className={labelBase}>
            Name <span className="text-rose">*</span>
          </label>
          <input
            id="gen-name"
            type="text"
            placeholder="Your name"
            {...register("name")}
            aria-describedby={errors.name ? "gen-name-error" : undefined}
            aria-invalid={errors.name ? true : undefined}
            className={inputBase}
          />
          {errors.name && (
            <p id="gen-name-error" role="alert" className={errorBase}>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="gen-email" className={labelBase}>
            Email <span className="text-rose">*</span>
          </label>
          <input
            id="gen-email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            aria-describedby={errors.email ? "gen-email-error" : undefined}
            aria-invalid={errors.email ? true : undefined}
            className={inputBase}
          />
          {errors.email && (
            <p id="gen-email-error" role="alert" className={errorBase}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone (optional) */}
        <div>
          <label htmlFor="gen-phone" className={labelBase}>
            Phone <span className="text-olive/50">(optional)</span>
          </label>
          <input
            id="gen-phone"
            type="tel"
            placeholder="+91-98765-43210"
            {...register("phone")}
            aria-describedby={errors.phone ? "gen-phone-error" : undefined}
            aria-invalid={errors.phone ? true : undefined}
            className={inputBase}
          />
          {errors.phone && (
            <p id="gen-phone-error" role="alert" className={errorBase}>
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="gen-reason" className={labelBase}>
            Reason <span className="text-rose">*</span>
          </label>
          <select
            id="gen-reason"
            {...register("reason")}
            aria-describedby={errors.reason ? "gen-reason-error" : undefined}
            aria-invalid={errors.reason ? true : undefined}
            className={inputBase + selectExtra}
          >
            {REASON_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.reason && (
            <p id="gen-reason-error" role="alert" className={errorBase}>
              {errors.reason.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="gen-message" className={labelBase}>
            Message <span className="text-rose">*</span>
          </label>
          <textarea
            id="gen-message"
            placeholder="How can we help?"
            rows={5}
            {...register("message")}
            aria-describedby={errors.message ? "gen-message-error" : undefined}
            aria-invalid={errors.message ? true : undefined}
            className={inputBase + textareaExtra}
          />
          {errors.message && (
            <p id="gen-message-error" role="alert" className={errorBase}>
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Consent */}
        <div className="space-y-1">
          <div className="flex items-start gap-3">
            <input
              id="gen-consent"
              type="checkbox"
              {...register("consent")}
              aria-describedby={
                errors.consent ? "gen-consent-error" : undefined
              }
              aria-invalid={errors.consent ? true : undefined}
              className="mt-0.5 h-4 w-4 rounded border-espresso/30 text-tangerine focus:ring-tangerine accent-tangerine"
            />
            <label
              htmlFor="gen-consent"
              className="text-[0.8125rem] text-olive leading-snug cursor-pointer"
            >
              I agree to my data being used to respond to this enquiry
            </label>
          </div>
          {errors.consent && (
            <p
              id="gen-consent-error"
              role="alert"
              className={errorBase + " ml-7"}
            >
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending&hellip;
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </form>
    </div>
  );
}

/* ================================================================== */
/*  Page Export (Suspense boundary for useSearchParams)                */
/* ================================================================== */

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen bg-ivory"
          aria-busy="true"
          aria-label="Loading contact page"
        >
          <div className="bg-cream h-[350px]" />
          <div className="py-[--spacing-section]">
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="h-64 animate-pulse bg-espresso/5 rounded-brand" />
                <div className="h-96 animate-pulse bg-espresso/5 rounded-brand" />
              </div>
            </Container>
          </div>
        </div>
      }
    >
      <ContactContent />
    </Suspense>
  );
}