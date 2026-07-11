export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "The sort of place where breakfast quietly becomes lunch.",
    author: "Rhea M.",
  },
  {
    id: "t2",
    quote:
      "Finally, a café that takes coffee seriously without taking itself too seriously.",
    author: "Arjun K.",
  },
  {
    id: "t3",
    quote:
      "We came for the pancakes, stayed for the evening menu. The room just works.",
    author: "Meera & Siddharth",
  },
  {
    id: "t4",
    quote:
      "Their cardamom cold brew is the only reason I survive Delhi summers.",
    author: "Nikhil S.",
  },
  {
    id: "t5",
    quote:
      "Brought my laptop planning to work. Ended up reading a book for three hours.",
    author: "Tanya D.",
  },
];