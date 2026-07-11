import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Menu",
  path: "/menu",
  description: "Explore our menu — thoughtful coffee, generous brunch plates, signature drinks and relaxed evening fare at Saffron & Steam, New Delhi.",
});

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}