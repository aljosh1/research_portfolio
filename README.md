# Your Name — Developer Portfolio

A responsive, accessible portfolio starter built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons. The visual system uses warm paper neutrals, ink, and a restrained terracotta accent. Project artwork is drawn in CSS, so the starter ships without large stock-photo downloads or third-party trackers.

> **Starter content:** “Your Name,” contact details, employment history, qualifications, certifications, project write-ups, and outcomes are examples. Replace them with accurate details before publishing. Project concepts and results are not claims about your work.

## Run locally

1. Install Node.js 20.9 or later.
2. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit your portfolio

- **Profile, projects, skills, experience, education, certifications:** edit [`src/data/portfolio.ts`](./src/data/portfolio.ts). This is the single source for the profile details and case-study copy.
- **Page sections and copy structure:** edit [`src/app/page.tsx`](./src/app/page.tsx).
- **Theme and responsive layout:** edit [`src/app/globals.css`](./src/app/globals.css). The CSS custom properties at the top define the light/dark palettes and type families.
- **Project artwork:** edit [`src/components/project-artwork.tsx`](./src/components/project-artwork.tsx), or replace it with optimized images using `next/image` and descriptive alt text.
- **CV:** replace [`public/cv.txt`](./public/cv.txt) with a designed PDF and update the download link in `src/app/page.tsx`.
- **Site URL and contact:** set `NEXT_PUBLIC_SITE_URL` to your canonical HTTPS origin and update the email/social URLs in `src/data/portfolio.ts`.

The sample projects have individual pages at `/projects/atlas`, `/projects/fieldnotes`, and `/projects/goodkind`. Add project records to `projects` to generate their static detail pages and sitemap entries.

## Contact form

The form validates input in the browser and on the server, includes a hidden honeypot field, and sends email through the Resend API. It requires a Resend account and a verified sender domain:

1. Copy `.env.example` to `.env.local`.
2. Set `RESEND_API_KEY`, `CONTACT_TO`, and `CONTACT_FROM` to your Resend API key, receiving address, and verified sender.
3. Set `NEXT_PUBLIC_SITE_URL` to the final site URL.

Without those contact variables, the endpoint returns a clear configuration error and the page still offers a direct email link. For high-traffic deployments, add provider-side or edge rate limiting/CAPTCHA as appropriate; the honeypot is a lightweight baseline, not a complete abuse-control system.

## Quality checks

```bash
npm run lint
npm run format:check
npm run build
```

Test the responsive layout at 360px, 768px, 1024px, and 1440px in browser dev tools. Confirm keyboard-only navigation, visible focus, system/light/dark themes, reduced-motion settings, contact delivery, and all real external links before launch.

## Deploy to Vercel

Import the repository into Vercel and keep the detected Next.js defaults. Add `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO`, and `CONTACT_FROM` in the project’s environment-variable settings, then deploy. The site includes a sitemap, robots policy, canonical metadata, Person JSON-LD, and baseline security headers.

## Before launch

1. Replace the profile, sample work history, and credentials with accurate information.
2. Add a custom domain and point `NEXT_PUBLIC_SITE_URL` at its HTTPS origin.
3. Add real project screenshots or photography, using optimized responsive images and accurate alt text.
4. Verify the sender domain and test the contact form end to end; add rate limiting if needed.
5. Optionally add privacy-friendly analytics (such as Plausible or Umami) only if useful.

## Project structure

```text
src/
  app/
    api/contact/route.ts     # Validated Resend contact endpoint
    projects/[slug]/page.tsx # Static case-study detail pages
    globals.css              # Design tokens, components, responsive styles
    layout.tsx               # Fonts, theme provider, SEO metadata
    page.tsx                 # Portfolio sections
    robots.ts
    sitemap.ts
  components/                # Navigation, theme, artwork, motion, contact form
  data/portfolio.ts          # Editable portfolio content
public/
  cv.txt                     # Replace with your own downloadable CV
```
# research_portfolio
