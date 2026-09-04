# Tong An Photography — production-ready marketplace foundation

This project keeps the supplied dark / cinematic Tong An Photography visual direction and turns the screens into a real Next.js marketplace.

## Stack
- Next.js App Router + TypeScript
- Neon PostgreSQL + Prisma
- Backblaze B2 through its S3-compatible API
- Admin session cookie using `jose`
- Password hashing with `bcryptjs`
- Vercel-ready

## Features implemented
- Gallery and photo details with prices
- Client cart
- Checkout and order creation
- KHQR payment step + receipt upload
- Admin login
- Admin photo upload (preview + original) to B2
- Admin receipt review / approve / reject
- Private original-file keys
- Signed original downloads only after approved payment
- Responsive UI based on the supplied design direction

## Setup
1. Create a Neon Postgres database.
2. Create a private Backblaze B2 bucket and an application key with read/write access to that bucket.
3. Copy `.env.example` to `.env.local` and fill the values.
4. Run:
   `npm install`
   `npm run db:push`
   `npm run db:seed`
   `npm run dev`
5. Deploy to Vercel with the same environment variables, then run Prisma migration/push during deployment as appropriate.

### Important production hardening
- Replace the seed admin password immediately.
- Set a long random `AUTH_SECRET`.
- Keep B2 bucket private. Do not expose `B2_APPLICATION_KEY` to the browser.
- Replace the placeholder QR block in `app/payment-status/[id]/PaymentClient.tsx` with your real KHQR image/data.
- For customer download history, add email magic-link authentication before exposing `/account` as a private dashboard.
- Configure a real email provider for order/payment notifications.
- Consider a background upload path for very large originals; Vercel serverless request limits can make 100MB multipart uploads impractical. The current route is correct for smaller files but a production implementation should use direct-to-B2 presigned uploads for large originals.

## Vercel
Build command: `npm run build`
The build runs `prisma generate && next build`.
Use Neon `DATABASE_URL` and the B2/Auth variables in Vercel Project Settings.
