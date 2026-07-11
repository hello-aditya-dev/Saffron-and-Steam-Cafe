import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Gallery",
  path: "/gallery",
  description: "Browse moments from Saffron & Steam — coffee, food, interiors and the warmth of everyday life at our New Delhi café.",
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}