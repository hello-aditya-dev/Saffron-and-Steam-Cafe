# Saffron & Steam

A premium editorial-style website for **Saffron & Steam** — a neighbourhood café specialising in thoughtful coffee, generous brunch plates, and relaxed evening dining in New Delhi.

Built with Next.js 16, TypeScript, Tailwind CSS 4, and Framer Motion. Designed for performance, accessibility, and effortless content updates.

---

## Features

- **Editorial design system** — DM Serif Display + DM Sans typography with warm, food-forward colour palette
- **Framer Motion animations** — scroll-triggered reveals, parallax hero, marquee ticker, image transitions
- **SEO-optimised** — dynamic Open Graph metadata, JSON-LD structured data (Restaurant + FAQ schemas), auto-generated `sitemap.xml` and `robots.txt`
- **Accessible (WCAG 2.2 AA)** — skip links, semantic HTML, ARIA attributes, keyboard navigation, `prefers-reduced-motion` support
- **Fully responsive** — 320 px mobile to 1920 px+ widescreen with deliberate breakpoint tuning
- **Centralised content** — all café details, menu items, gallery images, and testimonials live in `src/data/` for zero-code editing
- **28+ curated images** — sourced from Unsplash, optimised as WebP, with full attribution in `IMAGE_CREDITS.md`
- **Contact form** — demo mode out of the box; designed for easy backend integration
- **Booking & ordering links** — configurable via a single data file

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (New York style) |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Fonts | DM Serif Display, DM Sans (Google Fonts via `next/font`) |
| Images | Next.js `<Image>` with WebP, lazy loading, and responsive `sizes` |

---

## Pages Overview

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Home — hero, featured menu, gallery preview, testimonials, reservation CTA |
| `/menu` | `src/app/menu/page.tsx` | Full menu with category tabs, dietary labels, and popular badges |
| `/about` | `src/app/about/page.tsx` | Café story, team section, values |
| `/gallery` | `src/app/gallery/page.tsx` | Masonry-style image grid with lightbox |
| `/contact` | `src/app/contact/page.tsx` | Contact form, FAQ accordion, map link, opening hours |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy policy |
| `/terms` | `src/app/terms/page.tsx` | Terms of service |
| `404` | `src/app/not-found.tsx` | Custom not-found page |

---

## Local Setup

### Prerequisites

- Node.js 18.18 or later
- npm 9+ (or pnpm / yarn / bun)

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Generate production build

```bash
npm run build
```

### Start production server

```bash
npm start
```

---

## PowerShell 5.1 Commands

These commands are compatible with Windows PowerShell 5.1 (no `&&` chaining).

### Install dependencies

```powershell
npm install
```

### Start the development server

```powershell
npm run dev
```

### Run linting

```powershell
npm run lint
```

### Run type checking

```powershell
npm run typecheck
```

### Build for production

```powershell
npm run build
```

---

## Environment Variables

Create a `.env.local` file in the project root. Refer to `.env.example` for the full list of available variables.

```env
# Site URL (used in sitemap, Open Graph, canonical URLs)
NEXT_PUBLIC_SITE_URL=https://saffronandsteam.example.com

# Contact form endpoint (leave empty for demo mode)
NEXT_PUBLIC_CONTACT_FORM_API=

# Optional: analytics, map keys, etc.
```

When `NEXT_PUBLIC_CONTACT_FORM_API` is not set, the contact form operates in **demo mode** — submissions are logged to the browser console and a success message is displayed.

---

## Content-Editing Guide

All user-facing content is stored as plain TypeScript objects in `src/data/`. You can edit these files directly without touching any component code.

### How to Change Café Details

Edit **`src/data/cafe.ts`**.

```ts
export const cafe = {
  name: "Saffron & Steam",
  descriptor: "Coffee · Brunch · Evenings",
  tagline: "Slow mornings. Bright plates. Good company.",
  description: "A warm neighbourhood café…",
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
  // ...
};
```

Key fields:

- **`name`**, **`descriptor`**, **`tagline`**, **`description`** — used across the site and in SEO metadata.
- **`address`** — displayed on the Contact page and in JSON-LD structured data.
- **`phone`**, **`email`** — shown in the header, footer, and contact section.
- **`instagram`**, **`instagramHandle`** — social link in the footer.
- **`reservationUrl`** — where the "Reserve a Table" button navigates to.
- **`orderingUrl`** — where the "Order Now" button navigates to.
- **`hours`** — opening hours displayed on the Contact page.
- **`directionsUrl`** — Google Maps link for directions.

### How to Edit Menu Items

Edit **`src/data/menu.ts`**.

Each category follows this structure:

```ts
{
  id: "brunch",
  slug: "brunch",
  name: "Brunch",
  description: "Optional category description",
  items: [
    {
      id: "br1",
      name: "Saffron Honey Pancakes",
      description: "Fluffy pancakes with saffron-infused honey…",
      price: 420,
      dietary: ["V"],
      popular: true,
      image: "/images/menu/saffron-pancakes.webp",
    },
  ],
}
```

Dietary keys: `V` (Vegetarian), `VG` (Vegan), `GF` (GF option), `N` (Contains nuts).

To add a new item, append it to the `items` array of the appropriate category. To remove an item, delete its object. To reorder, move objects within the array.

### How to Replace Images

1. Place your new image in the appropriate folder under `public/images/` (e.g., `public/images/menu/`, `public/images/gallery/`, `public/images/hero/`).
2. Use WebP format for optimal performance. If using JPEG or PNG, Next.js will still serve them, but file sizes will be larger.
3. Update the filename in the corresponding data file:
   - **Menu images** — `image` field in `src/data/menu.ts`
   - **Gallery images** — `src/data/gallery.ts`
   - **Hero / about / interior images** — `src/data/cafe.ts` (if referenced there) or the component that imports them

### Image Credits

All photographs are sourced from [Unsplash](https://unsplash.com) and are used under the [Unsplash License](https://unsplash.com/license). See **`IMAGE_CREDITS.md`** for the complete table of attributions (photographer, original URL, date accessed).

> **Important:** These images are NOT covered by the MIT License of this repository. If you replace images with your own, update or remove `IMAGE_CREDITS.md` accordingly.

---

## Form Integration

The contact form on `/contact` runs in **demo mode** by default — it captures input, logs it to the browser console, and shows a success toast.

### Connecting a Real Backend

1. Set `NEXT_PUBLIC_CONTACT_FORM_API` in your `.env.local` to your endpoint URL.
2. Edit the `handleSubmit` function in `src/app/contact/page.tsx` to `fetch()` that endpoint with the form data.
3. Handle the response — show success or error feedback using the existing toast system.

The form already collects: name, email, reason (dropdown), subject, and message.

---

## Booking and Ordering Links

- **Reservation link** — Edit `reservationUrl` in `src/data/cafe.ts`. Defaults to `/contact?reason=reservation`.
- **Ordering link** — Edit `orderingUrl` in `src/data/cafe.ts`. Defaults to `/menu`.

Set these to external URLs (e.g., Resy, Google Reservations, or a third-party ordering platform) to redirect users directly.

---

## SEO Configuration

### Metadata

All page metadata is generated through the `makeMetadata()` helper in **`src/lib/metadata.ts`**.

```ts
const SITE_URL = "https://saffronandsteam.example.com";
const SITE_NAME = "Saffron & Steam";
const DEFAULT_DESCRIPTION = "A warm neighbourhood café…";
```

Each page calls `makeMetadata()` with overrides (title, description, path). Update these constants when changing the café name or domain.

### Sitemap

Auto-generated by **`src/app/sitemap.ts`**. Update the `baseUrl` constant when deploying to a new domain.

### Structured Data (JSON-LD)

Two schemas are injected in the root layout:

- **Restaurant** schema (`getRestaurantSchema()` in `src/lib/schema.ts`) — name, address, cuisine, price range, opening hours.
- **FAQ** schema (`getFAQSchema()`) — rendered on the Contact page for the FAQ accordion.

### Robots

Defined in **`src/app/robots.ts`**. Allows all crawlers by default.

---

## Deployment

### Vercel (Recommended)

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set environment variables in the Vercel dashboard.
4. Deploy. Vercel handles Next.js optimisation (ISR, image optimisation, edge functions) automatically.

### Any Node.js Host

```bash
npm run build
npm start
```

Ensure the host supports:

- Node.js 18.18+
- The `output: 'standalone'` export mode (configured in `next.config.ts`)
- Environment variables are set in the hosting dashboard

---

## Testing Commands

```bash
npm run lint
```

Runs ESLint across all files.

```bash
npm run typecheck
```

Runs the TypeScript compiler in check-only mode (`--noEmit`). Reports type errors without producing output files.

```bash
npm run build
```

Production build. Catches type errors, import issues, and other build-time problems.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, header, footer, JSON-LD)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles and Tailwind config
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # robots.txt config
│   ├── not-found.tsx           # Custom 404 page
│   ├── about/
│   │   ├── page.tsx            # About page (server component)
│   │   └── AboutPageClient.tsx # About page (client component)
│   ├── contact/
│   │   ├── layout.tsx          # Contact layout
│   │   └── page.tsx            # Contact page with form and FAQ
│   ├── gallery/
│   │   ├── layout.tsx          # Gallery layout
│   │   └── page.tsx            # Gallery grid page
│   ├── menu/
│   │   ├── layout.tsx          # Menu layout
│   │   └── page.tsx            # Menu page with category tabs
│   ├── privacy/
│   │   └── page.tsx            # Privacy policy
│   ├── terms/
│   │   └── page.tsx            # Terms of service
│   └── api/
│       └── route.ts            # API route placeholder
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header with navigation
│   │   ├── MobileNavigation.tsx # Slide-out mobile nav
│   │   └── Footer.tsx          # Site footer
│   ├── shared/
│   │   ├── Container.tsx       # Max-width content wrapper
│   │   ├── Logo.tsx            # SVG logo component
│   │   ├── SectionHeading.tsx  # Reusable section title
│   │   ├── ImageReveal.tsx     # Scroll-triggered image animation
│   │   ├── Marquee.tsx         # Infinite scrolling ticker
│   │   └── ReservationCTA.tsx  # "Reserve a Table" call-to-action
│   └── ui/                     # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── accordion.tsx
│       └── ...                 # (35+ UI primitives)
├── data/
│   ├── cafe.ts                 # Café name, address, hours, links
│   ├── menu.ts                 # Menu categories and items
│   ├── gallery.ts              # Gallery image data
│   ├── testimonials.ts         # Customer testimonials
│   └── navigation.ts           # Nav link configuration
├── hooks/
│   ├── use-mobile.ts           # Mobile breakpoint detection
│   └── use-toast.ts            # Toast notification hook
└── lib/
    ├── db.ts                   # Prisma database client
    ├── metadata.ts             # SEO metadata helper
    ├── schema.ts               # JSON-LD structured data generators
    └── utils.ts                # Utility functions (cn, etc.)
```

---

## Accessibility Notes

- **Skip link** — A "Skip to content" link is the first focusable element on every page.
- **Semantic HTML** — `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>` are used throughout.
- **ARIA** — Interactive components include appropriate `aria-label`, `aria-expanded`, `aria-controls`, and `role` attributes.
- **Keyboard navigation** — All interactive elements (buttons, links, form fields, accordions) are reachable via Tab and operable via Enter/Space.
- **Reduced motion** — Framer Motion animations respect `prefers-reduced-motion: reduce`. Users who prefer reduced motion see instant transitions.
- **Focus management** — Mobile navigation traps focus when open and restores focus on close.
- **Colour contrast** — Text and background colour pairings meet WCAG 2.2 AA contrast ratios.
- **Image alt text** — All `<Image>` components include descriptive `alt` attributes. Decorative images use `alt=""`.
- **Font sizing** — Body text uses a minimum of 16 px; headings scale responsively.

---

## Performance Notes

- **Next.js Image** — All images use `next/image` with automatic WebP serving, lazy loading, and `sizes` attributes for responsive srcsets.
- **Font optimisation** — DM Serif Display and DM Sans are loaded via `next/font/google` with `display: swap` to prevent layout shift.
- **Static rendering** — Pages are server-rendered at build time where possible. Client components are scoped to interactive sections only.
- **Animation performance** — Framer Motion uses `transform` and `opacity` for GPU-accelerated animations. No layout-triggering properties are animated.
- **Bundle size** — shadcn/ui components are tree-shaken; only imported primitives are included in the bundle.
- **CSS** — Tailwind CSS 4 purges unused classes at build time, keeping the stylesheet minimal.

---

## License

This project is released under the **MIT License**. See [LICENSE](./LICENSE) for details.

**Image Licensing:** The photographs included in `public/images/` are sourced from [Unsplash](https://unsplash.com) and are governed by the [Unsplash License](https://unsplash.com/license), not the MIT License. You may use them freely (including commercially) but they are not subject to the same terms as the code. See [IMAGE_CREDITS.md](./IMAGE_CREDITS.md) for full attribution.