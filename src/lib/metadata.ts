import type { Metadata } from "next";

const SITE_URL = "https://saffronandsteam.example.com";
const SITE_NAME = "Saffron & Steam";
const DEFAULT_DESCRIPTION =
  "A warm neighbourhood café for thoughtful coffee, generous brunch plates and relaxed evenings in New Delhi.";

export function makeMetadata(overrides: Partial<Metadata> & { path?: string } = {}): Metadata {
  const { path = "", ...rest } = overrides;
  const url = `${SITE_URL}${path}`;
  const title = rest.title
    ? `${rest.title} | ${SITE_NAME}`
    : `${SITE_NAME} | Coffee, Brunch & Evenings in New Delhi`;
  const description = (rest.description as string) || DEFAULT_DESCRIPTION;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${DEFAULT_DESCRIPTION}`,
        },
      ],
      ...(rest.openGraph as Record<string, unknown>),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(rest.twitter as Record<string, unknown>),
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/apple-touch-icon.png",
    },
    ...rest,
  };
}

export { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION };