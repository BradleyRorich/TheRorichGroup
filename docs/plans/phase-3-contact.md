# Phase 3 — Contact

| Field | Value |
|-------|-------|
| **Scope** | Contact section, Zod-validated form, Resend Server Action, success/error states |
| **Detail level** | Detailed |
| **Status** | Complete |

---

## Goal

Add the Contact section and wire up the contact form end-to-end: visitor fills in the form → Zod validates inputs → Next.js Server Action calls Resend → email arrives at `info@rorichgroup.co.za`. No page reload; inline success/error feedback.

---

## Prerequisites

Phase 2 complete: all static sections visible and page is responsive.

---

## External Dependencies

| Dependency | Notes |
|-----------|-------|
| `resend` npm package | `pnpm add resend` |
| Resend account | Free tier (100 emails/day). Sign up at resend.com, get an API key, verify the `rorichgroup.co.za` domain in the Resend dashboard |
| `react-hook-form` | `pnpm add react-hook-form @hookform/resolvers` — integrates with Zod for client-side validation |

---

## Steps

### 1. Install packages
```bash
pnpm add resend react-hook-form @hookform/resolvers
```

### 2. Add shadcn form components
```bash
pnpm dlx shadcn@latest add form input textarea select
```

### 3. Zod schema
File: `src/lib/schemas/contact.ts`

```ts
import { z } from "zod/v4";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  division: z.enum(["paper-printers", "web-dev", "general"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

Validate at the boundary (Server Action), not everywhere. Client-side validation is a convenience UX layer on top.

### 4. Server Action
File: `src/app/actions/contact.ts`

```ts
"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(formData: unknown) {
  const parsed = contactSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  const { name, email, phone, division, message } = parsed.data;

  await resend.emails.send({
    from: "Contact Form <noreply@rorichgroup.co.za>",
    to: process.env.CONTACT_EMAIL!,
    subject: `New enquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone ?? "Not provided"}`,
      `Division: ${division}`,
      `\nMessage:\n${message}`,
    ].join("\n"),
  });

  return { success: true };
}
```

Notes:
- Server Actions are called directly from client components — no API route needed
- Zod validates on the server too (never trust client-only validation)
- The `from` address must use a domain verified in Resend

### 5. Contact form component
File: `src/components/sections/ContactSection.tsx` — mark `"use client"`

- Use `react-hook-form` with `zodResolver(contactSchema)` for client-side validation
- On valid submit: call `submitContact(data)` (the Server Action)
- Show loading state on the button during submission (`isPending` from `useTransition`)
- On success: replace the form with a confirmation message ("Thanks! We'll be in touch soon.")
- On error: show an inline error banner

Form fields (shadcn components):
| Field | Component | Notes |
|-------|-----------|-------|
| Name | `Input` | Required |
| Email | `Input` type="email" | Required |
| Phone | `Input` type="tel" | Optional |
| Division of interest | `Select` | Options: Rorich Paper Printers / Rorich Web Dev / General |
| Message | `Textarea` | Required, min 10 chars |
| Submit | `Button` | Shows spinner while pending |

### 6. Contact section layout
File: `src/components/sections/ContactSection.tsx` (wraps the form)

Layout:
- Section heading: "Get In Touch"
- Two-column layout on desktop:
  - Left: contact info block
    - Email: `info@rorichgroup.co.za` (mailto link)
    - Address: placeholder text ("Address coming soon" until confirmed by owner)
    - Optional Google Maps iframe (add once address confirmed — leave a clearly-marked `TODO` comment)
  - Right: the contact form
- Single column on mobile

### 7. Wire into the page
Add `<ContactSection />` at the bottom of `src/app/page.tsx` after `<PortfolioSection />`.

### 8. Environment variables
Add to `.env.local`:
```env
RESEND_API_KEY=re_...
CONTACT_EMAIL=info@rorichgroup.co.za
```

Add `.env.local` to `.gitignore` (should already be there from Next.js scaffold).
Create `.env.example` with the same keys but empty values — commit this.

---

## Key Files Created / Modified

| File | Purpose |
|------|---------|
| `src/lib/schemas/contact.ts` | Zod schema for form validation |
| `src/app/actions/contact.ts` | Server Action — validates + sends email via Resend |
| `src/components/sections/ContactSection.tsx` | Contact info + form UI |
| `src/app/page.tsx` | Updated: mounts `<ContactSection />` |
| `.env.example` | Committed env var reference (no secrets) |
| `.env.local` | Local secrets (git-ignored) |

---

## Verification

- Fill in the form with valid data → submit → email arrives at `info@rorichgroup.co.za`
- Submit with invalid data (short message, bad email) → inline field errors appear, no submission
- Submit button shows loading state while the Server Action is in flight
- After success: form replaced with confirmation message
- Check `npx tsc --noEmit` — no type errors on the Server Action or schema ✓
- `pnpm lint` — zero errors/warnings ✓
- Dev server: Contact section visible at `#contact`, "Get In Touch" heading renders ✓
- Test on mobile: form is usable with on-screen keyboard

---

## Implementation Notes (decisions made)

- **shadcn `Form` component:** Not generated by `pnpm dlx shadcn@latest add form` in this Base UI-based shadcn version. Used `react-hook-form` directly with `Input`/`Textarea` components (which accept standard HTML props via `{...register(...)}`). No wrapper component needed.
- **Division select:** Used a styled native `<select>` instead of the Base UI `Select` component, which would require a `Controller` integration and is complex to style on dark backgrounds. Native select is simpler and fully accessible.
- **Zod import:** Used `import { z } from "zod"` (not `"zod/v4"`) since the package exposes the v4 API at the top level in zod@^4.x.
- **FieldGroup helper:** The `error` prop was removed from the `FieldGroup` helper component since error messages are rendered as siblings after the input, not inside the wrapper — matches shadcn conventions.
- **Contact section background:** Uses `bg-primary text-primary-foreground` (deep charcoal) to visually distinguish the contact section from the rest of the page and create a strong visual close.
- **Success state:** Replaces the form with a centered confirmation message inside a card — no page reload needed (React state).
- **Server Action error handling:** Wraps the Resend call in try/catch and returns `{ success: false, error: "..." }` on failure. The client shows an inline red banner above the form.
- **`RESEND_API_KEY` / `CONTACT_EMAIL`:** Must be set in `.env.local` before email delivery works. `.env.example` committed with empty values as reference.
- **Resend domain verification required:** The `from` address `noreply@rorichgroup.co.za` requires `rorichgroup.co.za` to be verified in the Resend dashboard before going live.
