# Noir Notes — saxophone events website

A responsive Next.js landing page concept for a live saxophone events brand.

The visual theme uses charcoal black (`#1C1C1C`) as its main color, golden yellow (`#F5B700`) for accents, and cream white (`#FFF8E6`) for contrast.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Before launch

- Replace the concept brand name, stock photography, testimonial, social link, and `hello@noirnotes.example` contact address.
- Update the `openDates` map in `src/app/page.tsx`. The calendar currently uses sample availability for November 2026 through January 2027; it is not connected to a booking system and does not reserve dates.
- Add your real booking workflow or calendar integration before treating displayed dates as confirmed.

Motion uses Framer Motion and honors the reduced-motion preference. The intro can be skipped and does not autoplay audio.
