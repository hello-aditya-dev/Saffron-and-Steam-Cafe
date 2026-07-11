export const cafe = {
  name: "Saffron & Steam",
  descriptor: "Coffee · Brunch · Evenings",
  tagline: "Slow mornings. Bright plates. Good company.",
  description:
    "A warm neighbourhood café for thoughtful coffee, generous brunch plates and relaxed evenings in New Delhi.",
  address: {
    street: "12 Lodhi Market Lane",
    city: "New Delhi",
    state: "Delhi",
    pin: "110003",
    full: "12 Lodhi Market Lane, New Delhi, Delhi 110003",
  },
  phone: "+91-98765-43210",
  email: "hello@saffronandsteam.example",
  website: "https://saffronandsteam.example.com",
  instagram: "https://instagram.com/saffronandsteam",
  instagramHandle: "@saffronandsteam",
  reservationUrl: "/contact?reason=reservation",
  orderingUrl: "/menu",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=12+Lodhi+Market+Lane+New+Delhi+Delhi+110003",
  hours: [
    { days: "Monday – Thursday", time: "8:00 AM – 10:00 PM" },
    { days: "Friday – Sunday", time: "8:00 AM – 10:30 PM" },
  ],
  kitchenNote: "Kitchen closes 30 minutes before closing",
  transportNote:
    "Nearest metro: Lodhi Road (Violet Line). Street parking available on Kapurthala Lane.",
  url: "https://saffronandsteam.example.com",
  priceRange: "₹₹",
  cuisineTypes: ["Coffee", "Brunch", "Evening Dining"],
} as const;

export type CafeData = typeof cafe;