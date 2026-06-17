# Phase 1 — Foundation

| Field | Value |
|-------|-------|
| **Scope** | Next.js scaffold, Tailwind v4, shadcn/ui init, brand tokens, sticky nav, project structure |
| **Detail level** | Detailed |
| **Status** | Complete |

---

## Goal

Stand up a working Next.js 16 project that renders in the browser, has the brand design system wired up, and displays the sticky navigation bar. Every later phase builds on top of this foundation — it must be solid before content sections are added.

At the end of this phase: `pnpm dev` serves a page with the correct fonts, colour palette, and a fully functional sticky nav (desktop + mobile drawer). No content sections yet.

---

## Steps

### 1. Scaffold the project
- Run `pnpm create next-app@latest rorich-group --typescript --tailwind --app --src-dir --import-alias "@/*"` (or equivalent flags for Next.js 16)
- Accept defaults; do **not** add Prisma, auth, or other extras at this stage
- Initialise a git repo; add `.gitignore`

### 2. Configure pnpm workspace
Add `pnpm-workspace.yaml` per the scaffolding reference:
```yaml
packages:
  - "."
ignoredBuiltDependencies:
  - sharp
  - unrs-resolver
onlyBuiltDependencies:
  - esbuild
```
*(No Prisma engines needed — exclude those from the reference template)*

### 3. Initialise shadcn/ui
- Run `pnpm dlx shadcn@latest init` — choose **new-york** style, CSS variables on, neutral base colour
- This generates `components.json` and writes the initial `src/app/globals.css` with CSS variable stubs
- Add the initial shadcn components needed for the nav: `pnpm dlx shadcn@latest add sheet button`

### 4. Design tokens — brand colour palette & typography
- Edit `src/app/globals.css`: replace the default neutral palette inside `@theme inline` with a custom brand palette (to be defined — reference Yucca's warm neutrals, clean whites, and strong accent)
- Suggested starting point:
  - **Primary:** deep navy or charcoal (headings, nav background)
  - **Accent:** a warm gold or orange (CTA buttons, highlights)
  - **Background:** off-white / light warm grey
  - **Surface:** white cards
- Load Google Fonts via `next/font/google` in `src/app/layout.tsx`:
  - Display face for headings (e.g. **Playfair Display** or **Fraunces**)
  - Sans-serif for body (e.g. **Inter** or **DM Sans**)
- Apply font CSS variables to `--font-heading` and `--font-body` inside `@theme inline`

### 5. Clean up boilerplate
- Replace `src/app/page.tsx` with a minimal shell (`<main>` with a placeholder `<p>`)
- Remove Next.js demo content from `globals.css`
- Set `<html lang="en">` in `layout.tsx`

### 6. Sticky navigation component
File: `src/components/layout/NavBar.tsx`

Behaviour:
- Fixed to top, full width, z-index above all sections
- Left: logo (text wordmark until a real logo asset is available)
- Right (desktop): anchor links — Home · About · Services · Portfolio · Contact — smooth-scroll to `#home`, `#about`, `#services`, `#portfolio`, `#contact`
- Right (mobile ≤ `md`): hamburger icon opens a shadcn `Sheet` drawer with the same links; drawer closes on link click
- Active link highlight: `IntersectionObserver` on each section, updates active state in React state

Implementation notes:
- `"use client"` — the nav needs `useState` for the drawer and `IntersectionObserver` for active tracking
- Use `lucide-react` `Menu` icon for the hamburger
- Never hardcode colours — use CSS variable classes (`bg-background`, `text-primary`, etc.)

### 7. Root layout wiring
`src/app/layout.tsx`:
- Mount `<NavBar />` above `{children}`
- Apply font variables to `<html>`
- Set `<meta name="description">` and `<title>` for SEO

### 8. Pre-commit hooks (optional but recommended)
Follow the pre-commit reference:
- Create `.githooks/pre-commit` running `pnpm lint` + `npx tsc --noEmit`
- Add `"prepare": "git config core.hooksPath .githooks"` to `package.json`
- `chmod +x .githooks/pre-commit`

---

## Key Files Created

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout — fonts, nav mount, meta |
| `src/app/globals.css` | Brand tokens via `@theme inline`, smooth scroll |
| `src/app/page.tsx` | Shell page (populated in Phase 2) |
| `src/components/layout/NavBar.tsx` | Sticky nav — desktop links + mobile drawer |
| `components.json` | shadcn configuration |
| `pnpm-workspace.yaml` | pnpm build optimisations |
| `.githooks/pre-commit` | Pre-commit quality gate |

---

## Implementation Notes (decisions made)

- **Project location:** `rorich-group/` subdirectory within `TheRorichGroup/` repo — Next.js requires a lowercase package name; the parent dir name "TheRorichGroup" uses capitals.
- **pnpm v11:** Uses `allowBuilds` (not `ignoredBuiltDependencies` alone) to silence build-script warnings for `sharp` and `unrs-resolver`. Both set to `false`.
- **shadcn/ui uses Base UI**, not Radix UI — `asChild` prop is not supported. Use `render` prop on `SheetClose`/`SheetTrigger` for custom element rendering.
- **Brand palette (oklch):**
  - Background: `oklch(0.974 0.008 74)` — warm off-white `#F8F6F2`
  - Primary: `oklch(0.165 0.002 264)` — deep charcoal `#1C1C1E` (nav, headings)
  - Accent: `oklch(0.665 0.133 58)` — warm gold `#C9923A` (CTAs, highlights)
  - Card: `oklch(1 0 0)` — white
  - Muted-foreground: `oklch(0.556 0.013 264)` — secondary text
- **Fonts:** Playfair Display (heading) + DM Sans (body) via `next/font/google`. CSS vars: `--font-heading`, `--font-body`.
- **Turbopack root:** Set in `next.config.ts` (`turbopack.root: __dirname`) to silence workspace detection warning.
- **Pre-commit hook:** `.githooks/pre-commit` runs `pnpm lint && npx tsc --noEmit`. Add `"prepare"` script to activate.

## Verification

- `pnpm dev` starts without errors ✓
- Browser shows the nav bar with correct fonts and brand colours ✓
- Desktop: all five nav links visible; clicking each smooth-scrolls ✓
- Mobile (≤768px): hamburger icon opens `Sheet` drawer; links present; closes on click ✓
- `npx tsc --noEmit` passes ✓
- `pnpm lint` passes ✓
