import type { Metadata } from "next";
import { makeMetadata } from "@/lib/metadata";

export const metadata: Metadata = makeMetadata({
  title: "Visit Us",
  path: "/contact",
  description: "Find Saffron & Steam at 12 Lodhi Market Lane, New Delhi. Opening hours, directions, and how to book a table or get in touch.",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}