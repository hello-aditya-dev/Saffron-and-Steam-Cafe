import { cafe } from "@/data/cafe";

export function getRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: cafe.name,
    description: cafe.description,
    url: cafe.url,
    logo: `${cafe.url}/favicon.svg`,
    image: `${cafe.url}/og-image.png`,
    telephone: cafe.phone,
    email: cafe.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: cafe.address.street,
      addressLocality: cafe.address.city,
      addressRegion: cafe.address.state,
      postalCode: cafe.address.pin,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5895,
      longitude: 77.2274,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "22:30",
      },
    ],
    servesCuisine: cafe.cuisineTypes,
    priceRange: cafe.priceRange,
    hasMenu: `${cafe.url}/menu`,
    sameAs: [cafe.instagram],
    acceptsReservations: true,
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}