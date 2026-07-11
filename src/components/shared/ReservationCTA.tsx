import Link from "next/link";
import { clsx } from "clsx";

interface ReservationCTAProps {
  variant?: "primary" | "secondary";
  className?: string;
}

export default function ReservationCTA({
  variant = "primary",
  className,
}: ReservationCTAProps) {
  if (variant === "secondary") {
    return (
      <Link
        href="/contact?reason=reservation"
        className={clsx(
          "inline-flex items-center justify-center w-full border-2 border-espresso text-espresso py-3 px-6 font-sans font-semibold text-sm uppercase tracking-wider rounded-full transition-transform duration-200 hover:scale-[1.02]",
          className
        )}
      >
        Book a Table
      </Link>
    );
  }

  return (
    <Link
      href="/contact?reason=reservation"
      className={clsx(
        "inline-flex items-center justify-center w-full bg-tangerine text-ivory py-3 px-6 font-sans font-semibold text-sm uppercase tracking-wider rounded-full transition-transform duration-200 hover:scale-[1.02]",
        className
      )}
    >
      Book a Table
    </Link>
  );
}