export type DietaryKey = "V" | "VG" | "GF" | "N";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  dietary?: DietaryKey[];
  popular?: boolean;
  image?: string;
}

export interface MenuCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export const dietaryLabels: Record<DietaryKey, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "GF option",
  N: "Contains nuts",
};

export const menuCategories: MenuCategory[] = [
  {
    id: "coffee",
    slug: "coffee",
    name: "Coffee",
    items: [
      {
        id: "c1",
        name: "Espresso",
        description: "Balanced double shot pulled from our house blend.",
        price: 180,
        dietary: ["V", "VG"],
      },
      {
        id: "c2",
        name: "Flat White",
        description:
          "Velvety whole milk over a double ristretto. Our most-ordered coffee.",
        price: 220,
        dietary: ["V"],
        popular: true,
      },
      {
        id: "c3",
        name: "Filter Coffee",
        description: "Slow-brewed South Indian style, served in a brass tumbler.",
        price: 150,
        dietary: ["V", "VG"],
      },
      {
        id: "c4",
        name: "Cold Brew",
        description: "Steeped overnight, served over ice with a citrus peel.",
        price: 220,
        dietary: ["V", "VG"],
      },
      {
        id: "c5",
        name: "Cortado",
        description: "Equal parts espresso and steamed milk for a quick, rich sip.",
        price: 190,
        dietary: ["V"],
      },
      {
        id: "c6",
        name: "Cappuccino",
        description: "Classic foam-top with our house blend and your choice of milk.",
        price: 210,
        dietary: ["V", "VG"],
      },
    ],
  },
  {
    id: "signature-drinks",
    slug: "signature-drinks",
    name: "Signature Drinks",
    items: [
      {
        id: "sd1",
        name: "Sea Salt Mocha",
        description:
          "Dark chocolate, espresso and a pinch of Himalayan pink salt.",
        price: 280,
        dietary: ["V"],
        popular: true,
        image: "/images/menu/sea-salt-mocha.webp",
      },
      {
        id: "sd2",
        name: "Cardamom Cold Brew",
        description:
          "Cold brew infused with green cardamom and a touch of jaggery.",
        price: 260,
        dietary: ["V", "VG"],
        popular: true,
      },
      {
        id: "sd3",
        name: "Saffron Latte",
        description:
          "Espresso with steamed milk, a strand of saffron and honey.",
        price: 300,
        dietary: ["V"],
      },
      {
        id: "sd4",
        name: "Rose Pistachio Shake",
        description:
          "Blended pistachios, rose water, milk and a scoop of ice cream.",
        price: 320,
        dietary: ["V"],
      },
      {
        id: "sd5",
        name: "Matcha Oat Latte",
        description: "Ceremonial-grade matcha whisked with creamy oat milk.",
        price: 280,
        dietary: ["VG"],
      },
    ],
  },
  {
    id: "breakfast",
    slug: "breakfast",
    name: "Breakfast",
    items: [
      {
        id: "b1",
        name: "Classic Eggs on Toast",
        description:
          "Two free-range eggs any style on sourdough with chilli butter.",
        price: 320,
        dietary: ["V"],
        popular: true,
      },
      {
        id: "b2",
        name: "Avocado & Lime Toast",
        description:
          "Smashed avocado, charred lime, chilli flakes and a soft egg.",
        price: 380,
        dietary: ["V", "GF"],
      },
      {
        id: "b3",
        name: "Granola Bowl",
        description:
          "House-made granola with Greek yoghurt, seasonal fruit and honey.",
        price: 280,
        dietary: ["V"],
      },
      {
        id: "b4",
        name: "Masala Omelette",
        description:
          "Three-egg omelette with onion, tomato, green chilli and coriander.",
        price: 300,
        dietary: ["V", "GF"],
      },
      {
        id: "b5",
        name: "Poha Bowl",
        description:
          "Flattened rice tempered with mustard seeds, curry leaves and peanuts.",
        price: 220,
        dietary: ["V", "VG", "GF"],
      },
    ],
  },
  {
    id: "brunch",
    slug: "brunch",
    name: "Brunch",
    items: [
      {
        id: "br1",
        name: "Saffron Honey Pancakes",
        description:
          "Fluffy pancakes with saffron-infused honey, fresh berries and clotted cream.",
        price: 420,
        dietary: ["V"],
        popular: true,
        image: "/images/menu/saffron-pancakes.webp",
      },
      {
        id: "br2",
        name: "Chilli Butter Eggs",
        description:
          "Spiced butter-poached eggs on toast with pickled onion and herbs.",
        price: 380,
        dietary: ["V"],
      },
      {
        id: "br3",
        name: "Charred Corn Avocado Toast",
        description:
          "Sourdough loaded with charred corn, smashed avocado and feta crumble.",
        price: 400,
        dietary: ["V", "GF"],
        popular: true,
      },
      {
        id: "br4",
        name: "Mushroom Miso Benedict",
        description:
          "Poached eggs, miso-glazed mushrooms and hollandaise on an English muffin.",
        price: 450,
        dietary: ["V"],
      },
      {
        id: "br5",
        name: "Rose Pistachio French Toast",
        description:
          "Brioche soaked in rose-scented custard, pistachios and maple drizzle.",
        price: 420,
        dietary: ["V"],
        image: "/images/menu/french-toast.webp",
      },
      {
        id: "br6",
        name: "Citrus Ricotta Bowl",
        description:
          "Fresh ricotta with orange segments, pomegranate, mint and honey.",
        price: 360,
        dietary: ["V", "GF"],
      },
      {
        id: "br7",
        name: "South Indian Platter",
        description:
          "Dosa, sambar, coconut chutney and a small pot of filter coffee.",
        price: 380,
        dietary: ["V", "GF"],
      },
    ],
  },
  {
    id: "small-plates",
    slug: "small-plates",
    name: "Small Plates",
    items: [
      {
        id: "sp1",
        name: "Truffle Fries",
        description: "Hand-cut fries with truffle oil, parmesan and rosemary.",
        price: 320,
        dietary: ["V"],
        popular: true,
      },
      {
        id: "sp2",
        name: "Hummus Board",
        description:
          "Creamy hummus with pita, crudités, olives and za'atar oil.",
        price: 350,
        dietary: ["V", "VG"],
      },
      {
        id: "sp3",
        name: "Paneer Tikka Skewers",
        description:
          "Chargrilled paneer with peppers, onion and mint chutney.",
        price: 380,
        dietary: ["V"],
      },
      {
        id: "sp4",
        name: "Bruschetta Trio",
        description:
          "Three seasonal toppings on garlic-rubbed sourdough toasts.",
        price: 340,
        dietary: ["V"],
      },
      {
        id: "sp5",
        name: "Caesar Salad",
        description:
          "Crisp romaine, parmesan shavings, croutons and a classic dressing.",
        price: 320,
        dietary: ["V"],
      },
    ],
  },
  {
    id: "desserts",
    slug: "desserts",
    name: "Desserts",
    items: [
      {
        id: "d1",
        name: "Tiramisu",
        description:
          "Classic coffee-soaked ladyfingers with mascarpone and cocoa.",
        price: 360,
        dietary: ["V"],
        popular: true,
      },
      {
        id: "d2",
        name: "Gulab Jamun Cheesecake",
        description:
          "Creamy cheesecake with a gulab jamun compote and pistachio crumble.",
        price: 380,
        dietary: ["V"],
      },
      {
        id: "d3",
        name: "Chocolate Lava Cake",
        description:
          "Warm dark chocolate cake with a molten centre and vanilla ice cream.",
        price: 420,
        dietary: ["V"],
      },
      {
        id: "d4",
        name: "Mango Panna Cotta",
        description:
          "Silky panna cotta topped with Alphonso mango coulis when in season.",
        price: 340,
        dietary: ["V", "GF"],
      },
      {
        id: "d5",
        name: " affon & Cardamom Tart",
        description: "Buttery tart shell with a coffee-cardamom custard filling.",
        price: 300,
        dietary: ["V"],
      },
    ],
  },
  {
    id: "cold-drinks",
    slug: "cold-drinks",
    name: "Cold Drinks",
    items: [
      {
        id: "cd1",
        name: "Fresh Lime Soda",
        description: "Pressed lime with soda, salt or sugar — your call.",
        price: 120,
        dietary: ["V", "VG"],
      },
      {
        id: "cd2",
        name: "Mango Lassi",
        description: "Thick yoghurt smoothie blended with Alphonso mango pulp.",
        price: 180,
        dietary: ["V"],
      },
      {
        id: "cd3",
        name: "Iced Chai",
        description:
          "Spiced black chai poured over ice with a splash of milk.",
        price: 160,
        dietary: ["V", "VG"],
      },
      {
        id: "cd4",
        name: "Berry Fizz",
        description:
          "Mixed seasonal berries muddled with soda and a sprig of mint.",
        price: 200,
        dietary: ["V", "VG"],
      },
      {
        id: "cd5",
        name: "Coconut Water",
        description: "Chilled tender coconut water served straight up.",
        price: 140,
        dietary: ["V", "VG", "GF"],
      },
    ],
  },
];