import Link from "next/link";
import { clsx } from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-sans font-semibold uppercase tracking-wider transition-all duration-300 rounded-sm";

  const variants = {
    primary: "bg-tangerine text-ivory hover:bg-tangerine-hover",
    secondary: "border-2 border-espresso text-espresso hover:bg-espresso hover:text-ivory",
    ghost: "text-espresso underline underline-offset-4 decoration-espresso/30 hover:decoration-espresso",
  };

  const sizes = {
    sm: "px-4 py-2 text-[0.75rem] gap-1.5",
    md: "px-6 py-3 text-[0.8125rem] gap-2",
    lg: "px-8 py-3.5 text-[0.875rem] gap-2.5",
  };

  const classes = clsx(base, variants[variant], sizes[size], disabled && "opacity-50 pointer-events-none", className);

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}