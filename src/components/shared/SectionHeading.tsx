import { clsx } from "clsx";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span className="text-xs font-sans font-semibold uppercase tracking-widest text-tangerine">
        {eyebrow}
      </span>
      <h2 className="font-serif text-heading text-espresso">{title}</h2>
      {description && (
        <p className="text-body-lg text-cocoa/70 max-w-2xl">{description}</p>
      )}
    </div>
  );
}