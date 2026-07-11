import { clsx } from "clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-overline font-semibold uppercase tracking-[0.18em] text-tangerine">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-heading text-espresso">{title}</h2>
      {description && (
        <p className="text-body-lg text-olive/70 max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}