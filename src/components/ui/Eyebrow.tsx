import { clsx } from "clsx";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={clsx(
        "text-overline font-semibold uppercase tracking-[0.18em] text-tangerine",
        className,
      )}
    >
      {children}
    </span>
  );
}