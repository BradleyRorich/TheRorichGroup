# Phase 2 — Content Sections

| Field | Value |
|-------|-------|
| **Scope** | Hero, About, Services, and Portfolio sections — static content and layout |
| **Detail level** | Detailed |
| **Status** | Complete |

---

## Goal

Build the four static content sections of the single-scroll page: Hero, About, Services, and Portfolio. No server calls or form handling — everything is static JSX and Tailwind. At the end of this phase the site looks complete and readable in a browser (minus the contact section, which is Phase 3).

---

## Prerequisites

Phase 1 complete: Nav bar working, brand tokens defined, fonts loaded.

---

## Steps

### 1. Page structure
Update `src/app/page.tsx` to be a vertical stack of section components:

```tsx
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
    </main>
  );
}
```

Each section component lives in `src/components/sections/`.

### 2. Hero section (`#home`)
File: `src/components/sections/HeroSection.tsx`

Layout:
- Full viewport height (`min-h-screen`) with a strong background (brand primary colour or a subtle textured/gradient background)
- Bold display-font headline: **"The Rorich Group"**
- Subheading tagline: *"Print. Brand. Build."* (or similar — covers both divisions)
- Primary CTA button (shadcn `Button`, accent colour) → `href="#contact"` with smooth scroll
- Below the fold: two division cards side-by-side (or stacked on mobile)
  - Card 1: Rorich Paper Printers — icon, name, one-line description, "Explore" link → `#services-print`
  - Card 2: Rorich Web Dev — icon, name, one-line description, "Explore" link → `#services-web`
- Icons: `lucide-react` (`Printer` for Paper Printers, `Code2` for Web Dev)

### 3. About section (`#about`)
File: `src/components/sections/AboutSection.tsx`

Layout:
- Section heading: "About The Rorich Group"
- Two-column layout on desktop (stacked on mobile):
  - Left: company story paragraph — founding, mission, why both divisions exist together
  - Right: brief division introductions (Rorich Paper Printers + Rorich Web Dev, one paragraph each)
- Optional: 3-column team grid below — placeholder cards (`Name`, `Role`, grey avatar circle)
- All copy is hardcoded in the component for now; update in place when real copy is ready

### 4. Services section (`#services`)
File: `src/components/sections/ServicesSection.tsx`

Layout:
- Section heading: "Our Services"
- Two visually distinct sub-sections with anchor IDs `#services-print` and `#services-web`:

**Rorich Paper Printers sub-section:**
- Sub-heading + short paragraph
- Service cards in a responsive grid (2 cols on tablet, 3 on desktop):
  - Business Cards (`CreditCard` icon)
  - Stickers (`Tag` icon)
  - Large Format Printing (`Maximize2` icon)
  - Clothing Supply (`Shirt` icon)
  - Branded Clothing (`Star` icon)
- Each card: icon (accent colour) + heading + 2-line description

**Rorich Web Dev sub-section:**
- Sub-heading + short paragraph
- Service cards:
  - Custom Web Apps (`AppWindow` icon)
  - Website Design & Build (`Layout` icon)
- Same card pattern as above

No pricing. All icons from `lucide-react`.

### 5. Portfolio / Gallery section (`#portfolio`)
File: `src/components/sections/PortfolioSection.tsx`

Layout:
- Section heading: "Our Work"
- Optional filter bar: "All · Paper & Print · Web Dev" — client-side `useState`, filters the card list
  - Mark this component `"use client"` if filter is included; otherwise it can be a Server Component
- Responsive grid of project cards (2 cols on tablet, 3 on desktop)
- Each card:
  - Image: Next.js `<Image>` pointing to `/public/portfolio/placeholder-N.jpg` (generate a set of grey placeholder images or use `picsum.photos` URLs)
  - Project title (placeholder: "Project Name")
  - Division tag badge (shadcn `Badge` component)
- Placeholder data defined as a typed array in `src/lib/portfolio-data.ts`:
  ```ts
  export type PortfolioItem = {
    id: number;
    title: string;
    division: "print" | "web";
    image: string; // path or URL
  };
  ```

### 6. Section spacing & scroll offset
- Each section needs enough top padding to account for the sticky nav height (approx `pt-24` or use a CSS variable `--nav-height`)
- Smooth scroll already configured in `globals.css` from Phase 1

---

## Key Files Created / Modified

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Updated: mounts all section components |
| `src/components/sections/HeroSection.tsx` | Hero + division cards |
| `src/components/sections/AboutSection.tsx` | Company story + optional team grid |
| `src/components/sections/ServicesSection.tsx` | Services cards for both divisions |
| `src/components/sections/PortfolioSection.tsx` | Portfolio grid with optional filter |
| `src/lib/portfolio-data.ts` | Typed portfolio data array (placeholder) |
| `public/portfolio/` | Placeholder images |

---

## Implementation Notes (decisions made)

- **`asChild` not supported:** shadcn/ui uses Base UI — `Button asChild` doesn't exist. CTA link in HeroSection uses `buttonVariants()` applied directly to an `<a>` tag with `cn()`.
- **Portfolio images:** Using `picsum.photos` seed URLs rather than local `/public/portfolio/` files — no placeholder files to manage, and Next.js `<Image>` remote patterns set to allow `picsum.photos` in `next.config.ts`.
- **Portfolio filter:** Implemented with client-side `useState` — `PortfolioSection` is `"use client"`. All server components (Hero, About, Services) remain RSC.
- **Nav active highlight:** `IntersectionObserver` in `NavBar.tsx` (Phase 1) correctly tracks all five anchor IDs including the new sections — no changes needed.
- **`scroll-mt-20`** added to `#about`, `#services`, `#portfolio` sections to offset the sticky nav (~80px).
- **`#services-print` / `#services-web` sub-anchors** use `scroll-mt-24` on the sub-section `div` inside ServicesSection.

## Verification

- `pnpm dev` — full page rendered with all four sections ✓
- Hero: dark charcoal background, Playfair Display heading, gold CTA, division cards ✓
- About: two-column story layout, team grid ✓
- Services: 3-col grid for print (5 cards), 2-col for web (2 cards), gold icons ✓
- Portfolio: image grid with lazy-load photos, filter buttons (All / Paper & Print / Web Dev) working ✓
- Nav active state updates as user scrolls through sections ✓
- `npx tsc --noEmit` passes ✓
