"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clsx } from "clsx";

type RevealDirection = "up" | "left" | "right";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
}

const clipPaths: Record<RevealDirection, { hidden: string; visible: string }> = {
  up: {
    hidden: "inset(100% 0 0 0)",
    visible: "inset(0 0 0 0)",
  },
  left: {
    hidden: "inset(0 100% 0 0)",
    visible: "inset(0 0 0 0)",
  },
  right: {
    hidden: "inset(0 0 0 100%)",
    visible: "inset(0 0 0 0)",
  },
};

export default function ImageReveal({
  children,
  className,
  direction = "up",
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { hidden, visible } = clipPaths[direction];

  return (
    <div ref={ref} className={clsx("overflow-hidden", className)}>
      <motion.div
        initial={{ clipPath: hidden }}
        animate={isInView ? { clipPath: visible } : { clipPath: hidden }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}