import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = makeMetadata({
  title: "Our Story",
  path: "/about",
  description: "The story behind Saffron & Steam — a café built around the pleasure of staying, serving thoughtful coffee and generous plates from morning to evening in New Delhi.",
});

export default function AboutPage() {
  return <AboutPageClient />;
}