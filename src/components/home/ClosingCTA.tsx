import Link from "next/link";
import Container from "@/components/shared/Container";

export default function ClosingCTA() {
  return (
    <section className="py-[--spacing-section-lg] bg-espresso relative overflow-hidden">
      {/* Subtle bg texture */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-[url('/images/gallery/warm-cafe-interior.webp')] bg-cover bg-center"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="max-w-xl mx-auto text-center space-y-6 py-4">
          <span className="text-overline font-semibold uppercase tracking-[0.18em] text-saffron">
            Reserve a table
          </span>
          <h2 className="font-serif text-display-sm text-ivory">
            Ready to visit?
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
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-ivory/30 text-ivory text-[0.875rem] font-medium rounded-sm hover:border-ivory hover:bg-ivory hover:text-espresso transition-colors duration-300"
            >
              Explore the Menu
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}