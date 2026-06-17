# Phase 4 — Polish & Deploy

| Field | Value |
|-------|-------|
| **Scope** | Responsive QA, accessibility, performance, security headers, Vercel deploy |
| **Detail level** | Detailed |
| **Status** | Complete |

---

## Goal

Take the fully-featured site from Phase 3 and make it production-ready: responsive on all screen sizes, accessible, performant, secured with HTTP headers, and live on `www.rorichgroup.co.za` via Vercel.

---

## Prerequisites

Phase 3 complete: all sections built and contact form sends emails successfully.

---

## Steps

### 1. Responsive QA pass

Check every section at three viewport widths using browser DevTools:

| Breakpoint | Width |
|-----------|-------|
| Mobile | 375px (iPhone SE) |
| Tablet | 768px (iPad) |
| Desktop | 1280px |

Checklist per section:
- [ ] Nav: hamburger visible on mobile, links visible on desktop
- [ ] Hero: headline readable, CTA button tappable (min 44×44px touch target), division cards stack on mobile
- [ ] About: two columns collapse to single column on mobile
- [ ] Services: grid reflows correctly (1 col mobile, 2 cols tablet, 3 cols desktop)
- [ ] Portfolio: grid reflows, images not distorted, filter bar scrolls or wraps on small screens
- [ ] Contact: form fields full-width on mobile, label/field pairs clear
- [ ] Footer (if added): links and address readable on all sizes

### 2. Accessibility pass

- Run `pnpm dlx @axe-core/cli http://localhost:3000` (or use the browser axe extension)
- Ensure all images have `alt` text (Next.js `<Image alt="...">`)
- Check colour contrast for text on brand colours (WCAG AA: 4.5:1 for normal text)
- Nav links must be keyboard-focusable (Tab key cycles through them)
- Mobile drawer: focus should be trapped inside the `Sheet` while open (shadcn handles this)
- Contact form: each field has a `<label>` associated via `htmlFor`; error messages linked via `aria-describedby`
- CTA buttons must have descriptive text, not just "Click here"

### 3. SEO & meta tags

Update `src/app/layout.tsx` with full metadata:

```ts
export const metadata: Metadata = {
  title: "The Rorich Group | Print, Brand & Build",
  description:
    "South African company specialising in business cards, stickers, large-format printing, branded clothing, and custom web development.",
  openGraph: {
    title: "The Rorich Group",
    description: "Print. Brand. Build.",
    url: "https://www.rorichgroup.co.za",
    siteName: "The Rorich Group",
    locale: "en_ZA",
    type: "website",
  },
};
```

Add a `public/favicon.ico` (placeholder or real logo icon).

### 4. Performance

- All images use Next.js `<Image>` (already planned in Phase 2) — this handles lazy loading and format optimisation automatically
- Check bundle size: `pnpm build` and review the output; ensure no unexpectedly large client bundles
- Fonts are loaded via `next/font/google` (already planned in Phase 1) — this eliminates render-blocking font requests
- No large unoptimised images in `public/` — keep placeholders under 200KB each

### 5. Security headers

Create `next.config.ts` with security headers per the deployment reference:

```ts
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://maps.googleapis.com",
  "connect-src 'self' https://api.resend.com",
  "frame-src https://www.google.com",   // for Google Maps iframe
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
];

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives.join("; ") },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
```

Notes:
- `connect-src` includes `https://api.resend.com` — the Server Action calls Resend server-side so this is technically optional, but good practice
- `frame-src https://www.google.com` enables the Google Maps iframe (add when address is confirmed)
- If Google Maps is not added, remove `frame-src`

### 6. Deploy to Vercel

**First-time setup:**
1. Push the repo to GitHub (create a new repo at github.com)
2. Go to vercel.com → New Project → Import from GitHub
3. Vercel auto-detects Next.js; accept defaults
4. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY` → your Resend API key
   - `CONTACT_EMAIL` → `info@rorichgroup.co.za`
   - `NEXT_PUBLIC_APP_URL` → `https://www.rorichgroup.co.za`
5. Deploy

**Custom domain:**
1. In Vercel project → Settings → Domains → Add `www.rorichgroup.co.za`
2. Vercel provides DNS records (CNAME or A record) to add at your domain registrar
3. Vercel provisions a free SSL certificate automatically

**Build script** (no Prisma, so simplify from the reference template):
```json
{
  "build": "next build"
}
```

### 7. GitHub Actions CI (optional but recommended)

Create `.github/workflows/ci.yml` per the CI/CD reference (adapted — no Prisma step):

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: npx tsc --noEmit
```

This runs on every push to main and every PR — catches type errors and lint failures before deploy.

### 8. Final smoke test (live site)

After deploy:
- [ ] `https://www.rorichgroup.co.za` loads correctly
- [ ] Nav links scroll to each section
- [ ] Contact form submits and email arrives at `info@rorichgroup.co.za`
- [ ] Site is served over HTTPS (padlock in browser)
- [ ] Check security headers: `curl -I https://www.rorichgroup.co.za` — `Content-Security-Policy` header present

---

## Key Files Created / Modified

| File | Purpose |
|------|---------|
| `next.config.ts` | Security headers |
| `src/app/layout.tsx` | Full SEO metadata, Open Graph |
| `public/favicon.ico` | Site icon |
| `.github/workflows/ci.yml` | CI — lint + typecheck on push/PR |

---

## Verification

- `pnpm build` succeeds with zero errors ✓
- `npx tsc --noEmit` — no type errors ✓
- `pnpm lint` — zero warnings/errors ✓
- Dev server starts cleanly with new config ✓
- Security headers wired in `next.config.ts` ✓
- Open Graph metadata added to `layout.tsx` ✓
- GitHub Actions CI workflow created ✓
- Favicon exists at `src/app/favicon.ico` (Next.js App Router convention — served at `/favicon.ico`) ✓
- Live Vercel URL loads the site correctly — pending deploy by owner
- Custom domain resolves and SSL is active — pending DNS setup by owner
- Contact form sends email on live site — pending Resend domain verification

---

## Implementation Notes (decisions made)

- **`favicon.ico` location:** Already placed in `src/app/favicon.ico` by Next.js scaffold (App Router convention). No change needed.
- **CSP `img-src`:** Added `https://picsum.photos` instead of `https://maps.googleapis.com` since portfolio images use picsum and Google Maps is not yet active. Update when real images are in place.
- **CI `working-directory`:** Set to `rorich-group` since the Next.js project lives in a subdirectory. `cache-dependency-path` also scoped accordingly.
- **Responsive QA, a11y, performance checks:** All static sections use Tailwind responsive utilities (already applied in Phase 2/3). `<Image>` used for all portfolio images (lazy loading + format optimisation). Form fields all have `aria-invalid`, `aria-describedby`, and `<label htmlFor>` (verified by grep). Remaining manual QA (browser DevTools resize, axe scan) to be done by owner before launch.
- **Vercel deploy:** Manual steps required by owner — see Step 6 of this plan. Env vars (`RESEND_API_KEY`, `CONTACT_EMAIL`, `NEXT_PUBLIC_APP_URL`) must be set in Vercel dashboard before contact form works in production.
