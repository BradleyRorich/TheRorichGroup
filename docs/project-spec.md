# The Rorich Group Website — V2 Spec

> **Status:** V2 — final. Phases appended below. Run `/spec-plan` to flesh out each phase.

---

## Product Summary

A public-facing marketing (brochure) website for **The Rorich Group**, a South African company with two divisions:

- **Rorich Paper Printers** — business cards, stickers, large-format printing, clothing supply, and branded clothing.
- **Rorich Web Dev** — custom web-hosted applications and website design/build for clients.

The site introduces the company, explains what each division does, showcases past work via a portfolio, and gives potential clients an easy way to make contact. There is no login, no online ordering, and no client portal.

**Visual inspiration:** [Yucca](https://yucca.co.za) — clean, modern, South African agency aesthetic.  
**Brand identity:** Created from scratch (logo, colour palette, fonts).  
**Domain:** `www.rorichgroup.co.za`  
**Hosting:** Vercel (free tier)  
**Layout:** Single long-scroll page — all sections on one URL, sticky nav scrolls to each anchor.

---

## Tech Stack

| Layer | Tool | Rationale |
|-------|------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript strict | Industry standard, excellent Vercel integration, static-first rendering is perfect for a brochure site |
| Styling | Tailwind CSS v4 | Co-ships with Next.js; utility-first CSS matches the Yucca-style custom design approach |
| UI Components | shadcn/ui (new-york style) | Accessible, fully customisable components owned in-project; suits a custom brand theme |
| Form validation | Zod v4 | Validates contact form inputs before sending; single consistent validation approach |
| Email delivery | Resend | Simple REST API, generous free tier (100 emails/day), excellent Next.js Server Action support |
| Deployment | Vercel | Zero-config deploys, CDN edge, free SSL, preview URLs per commit |
| Package manager | pnpm | Matches vibe-spec reference; faster installs |

**Deliberately excluded:**

| Tool | Reason |
|------|--------|
| Prisma / PostgreSQL | No structured data; all content is static (in code/files) |
| Auth.js | No login required |
| dbt / analytics pipeline | No data processing requirement |
| S3 | No user-uploaded files; portfolio images are bundled or hosted via public URLs |
| Docker | No database or local service to containerise |
| CMS (Contentful, Sanity, etc.) | Content changes are infrequent; direct file edits are acceptable for V1 |

---

## User Types

| Type | Description |
|------|-------------|
| **Visitor / Prospect** | Anyone browsing the site — potential clients exploring services |
| **Site Owner** | Bradley / The Rorich Group team — updates content via direct file edits (no admin UI in V1) |

---

## Pages & Sections (Single-Page Scroll)

All sections live on `/` with anchor IDs (`#home`, `#about`, `#services`, `#portfolio`, `#contact`).

### Sticky Navigation Bar
- Logo (left) + nav links (right): Home · About · Services · Portfolio · Contact
- Mobile: hamburger menu toggling a drawer (shadcn `Sheet` component)
- Scrolls the user to the relevant section anchor on click

### 1. Home / Hero (`#home`)
- Full-width hero with bold headline ("The Rorich Group") and tagline covering both divisions
- Primary CTA button → scrolls to `#contact`
- Two division cards below the hero (Rorich Paper Printers, Rorich Web Dev) with a short description and an "Explore" link → scrolls to the relevant sub-section in `#services`
- **Tool:** Static JSX + Tailwind; no data fetching required

### 2. About Us (`#about`)
- Company story and founding mission (static copy)
- Brief intro paragraph for each division
- Optional team member grid (placeholder cards with name + role in V1)
- **Tool:** Static JSX + Tailwind

### 3. Services (`#services`)
Two visually distinct sub-sections:

**Rorich Paper Printers:**
- Business cards, stickers, large-format printing, clothing supply, branded clothing
- Each service: icon + heading + 2-line description
- **Tool:** Static JSX; icons from `lucide-react`

**Rorich Web Dev:**
- Custom web-hosted applications, website design and build
- Same card pattern as above
- **Tool:** Static JSX; icons from `lucide-react`

No pricing listed in V1.

### 4. Portfolio / Gallery (`#portfolio`)
- Masonry or grid layout of past work cards
- Each card: image (placeholder in V1), project title, division tag (Paper Printers / Web Dev)
- V1: uses placeholder images (`/public/portfolio/placeholder-*.jpg`)
- Optional filter by division (client-side state with `useState` — no server call needed)
- **Tool:** Static JSX + Tailwind; Next.js `<Image>` for optimised placeholders

### 5. Contact (`#contact`)
- **Contact form** (fields: Name, Email, Phone, Division of interest, Message)
  - Validated client-side with Zod + React Hook Form
  - On submit: calls a Next.js Server Action → Resend API → email delivered to `info@rorichgroup.co.za`
  - Success/error state shown inline (no page reload)
- **Email address** displayed as `mailto:info@rorichgroup.co.za`
- **Physical address** displayed as static text (TBD — address to be supplied by owner)
- Optional Google Maps iframe embed (added once address is confirmed)
- **Tool:** shadcn `Form`, `Input`, `Textarea`, `Select`, `Button`; Zod schema for validation; Resend for delivery

---

## Navigation

- Sticky top bar, z-index above all sections
- Active section highlighted in nav via `IntersectionObserver`
- Smooth scroll (`scroll-behavior: smooth` in CSS globals)
- Mobile: shadcn `Sheet` drawer, closes on link click

---

## External Integrations

| Integration | Tool | Purpose |
|-------------|------|---------|
| Email delivery | Resend (free tier) | Delivers contact form submissions to `info@rorichgroup.co.za` |
| Google Maps (optional) | iframe embed | Shows the physical address — added once address is confirmed |

---

## Design System

- **Inspired by:** Yucca site — clean layout, strong typography, generous white space
- **Colour palette:** Created from scratch; stored as CSS variables in `src/app/globals.css` using Tailwind v4 `@theme inline`
- **Typography:** Google Fonts (2 fonts max — a display face for headings, a sans for body); loaded via `next/font/google`
- **Dark mode:** Not required for V1
- **Responsive breakpoints:** Mobile-first; `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)

---

## Key Environment Variables

```env
# Resend (email delivery)
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://www.rorichgroup.co.za
CONTACT_EMAIL=info@rorichgroup.co.za
```

---

## Open Questions (Carry-Forward)

1. **Physical address** — what is the office/shop address to display on the Contact section?
2. **Google Maps** — once address is confirmed, include an iframe embed?
3. **Analytics** — should the site track visitor statistics (e.g. Vercel Analytics, Google Analytics)?
4. **Logo** — will a logo be designed as part of this project, or supplied later?
5. **Portfolio images** — when real photos/screenshots are available, they replace `/public/portfolio/` placeholders.

---

## Phase Plan

| # | File | Scope |
|---|------|-------|
| 1 | `docs/plans/phase-1-foundation.md` | Next.js scaffold, Tailwind v4, shadcn/ui init, brand tokens (colours, fonts), sticky nav, project structure |
| 2 | `docs/plans/phase-2-content-sections.md` | Hero, About, Services, and Portfolio sections — static content and layout |
| 3 | `docs/plans/phase-3-contact.md` | Contact section, Zod-validated form, Resend Server Action, success/error states |
| 4 | `docs/plans/phase-4-polish-deploy.md` | Responsive QA, accessibility, performance, security headers, Vercel deploy |
