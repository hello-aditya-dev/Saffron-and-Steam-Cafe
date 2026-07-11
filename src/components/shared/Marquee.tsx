"use client";

import { clsx } from "clsx";

interface MarqueeProps {
  text: string;
  speed?: string;
  className?: string;
}

export default function Marquee({ text, speed = "30s", className }: MarqueeProps) {
  return (
    <div className={clsx("overflow-hidden", className)} aria-hidden="true">
      <div
        className="animate-marquee flex whitespace-nowrap"
        style={{ "--marquee-duration": speed } as React.CSSProperties}
      >
        <span className="font-serif text-4xl md:text-6xl text-espresso/10 uppercase tracking-wide px-4">
          {text}
        </span>
        <span className="font-serif text-4xl md:text-6xl text-espresso/10 uppercase tracking-wide px-4">
          {text}
        </span>
      </div>
    </div>
  );
}