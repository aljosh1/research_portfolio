# Academic Portfolio & Research Website

Dynamic portfolio for a university lecturer. Everything (profile, publications, projects, news, career timeline, files) is edited from a password-protected admin dashboard - no code needed.

Stack: Next.js 16 (App Router, TypeScript), PostgreSQL + Prisma 7, signed-cookie auth (bcrypt + JWT), Vercel Blob or local file storage, Resend for contact email.

## Run locally (Windows)

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned   # once, so npm works in PowerShell
npm install
copy .env.example .env      # then edit: AUTH_SECRET (32+ chars), ADMIN_EMAIL, ADMIN_PASSWORD (12+ chars)
npm run db:dev              # terminal 1: local PostgreSQL on port 5433 (no Docker needed)
npm run db:deploy           # terminal 2: create tables
npm run db:seed             # creates your admin account + empty placeholder profile
npm run dev                 # http://localhost:3000
```

`npm run db:seed:sample` additionally adds clearly labelled "[Sample]" content. Delete it from the admin when you add your own.

The local `.env` uses `DATABASE_URL=postgresql://postgres:postgres@localhost:5433/research_portfolio`.

## Admin dashboard

Go to `/admin` (link in the site footer) and sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Change the password under **My password**.

| Section | What you can do |
|---|---|
| Profile | Name, title, affiliation, biography, research interests, contact, scholarly links, portrait, CV (PDF) |
| Publications | Add/edit/delete, authors, DOI, abstract, PDF upload, show/hide, feature, allow-download switch |
| Research projects | Cards + detail pages with image, funder, outcomes |
| Education & career | Qualifications, appointments, awards, memberships, service |
| News | Short announcements |
| Messages | Contact-form inbox (mark read, delete) |
| Users | Admin only: add editors/admins |

Roles: **ADMIN** (everything, user management) and **EDITOR** (content only).

## Publications

Public search (title, author, keyword, venue, DOI, subject), filters (year, type, status, subject), sorting and pagination; citation copy buttons for APA, IEEE, Harvard and Vancouver (missing metadata is omitted, never invented). A PDF is downloadable by visitors **only** when the publication is public, "allow download" is ticked and a PDF exists.

## Security notes

- Passwords hashed with bcrypt (cost 12); session is an httpOnly, SameSite=Lax JWT cookie, re-validated against the database; `/admin` is also gated in `src/proxy.ts`.
- Zod validation on every form; uploads checked by file signature (PDF/JPG/PNG/WebP), size-limited, renamed randomly.
- Login, contact and upload endpoints are rate limited **in memory** (per server instance). On Vercel, also enable the Vercel Firewall rate limiting.
- Contact form has a honeypot field and stores messages in the database.
- Private PDFs are stored under `uploads/private` locally. With Vercel Blob the file URL is public but unguessable; do not upload a PDF you are not allowed to share.

## Deploy to Vercel

1. Create a managed Postgres database (Neon, Supabase or Vercel Postgres) and copy its connection string.
2. Push to GitHub and import the repo in Vercel.
3. Set environment variables: `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`; add a Vercel Blob store (sets `BLOB_READ_WRITE_TOKEN`) because Vercel's filesystem is read-only; optionally `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
4. Run once from your machine against the production database: `npm run db:deploy` then `npm run db:seed`.
5. Deploy. `postinstall` generates the Prisma client automatically.

## Scripts

`dev`, `build`, `start`, `lint`, `test` (vitest), `db:dev`, `db:deploy`, `db:migrate`, `db:seed`, `db:seed:sample`.

## Testing

`npm test` covers citation formatting, validation schemas and upload file-type detection.