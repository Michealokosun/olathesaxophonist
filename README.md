# Noir Notes — saxophone events website

A responsive Next.js landing page concept for a live saxophone events brand.

The visual theme uses charcoal black (`#1C1C1C`) as its main color, golden yellow (`#F5B700`) for accents, and cream white (`#FFF8E6`) for contrast.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Google Calendar availability

The website reads booked time ranges from Google Calendar using the FreeBusy API.
Any date with a calendar event is marked booked; unbooked future dates are shown
as available. The browser refreshes every five minutes and when a tab regains
focus. The server caches Google FreeBusy results per calendar and month for five
minutes, so repeat visitors reuse the same result instead of making a new Google
Calendar API request.

1. In Google Cloud Console, enable the Google Calendar API and create a service
   account.
2. Share the calendar that receives Appointment Schedule bookings with the
   service account email. Grant it permission to see free/busy information.
3. Copy the calendar ID from Google Calendar settings under **Integrate calendar**.
4. Copy `.env.example` to `.env.local` and fill in the calendar ID, service
   account email, and private key. Store the same values as server-side
   environment variables in your hosting provider. Never use `NEXT_PUBLIC_` for
   these credentials or commit the private key. Set the private key to the
   `private_key` value from the downloaded JSON, preserving the PEM header and
   footer; in environment-variable forms, represent newlines as `\n`.
5. Make sure your Google Appointment Schedule adds bookings to this same
   calendar. Once Google creates an event, its date will appear as booked on the
   website.

The availability endpoint is `GET /api/availability?month=YYYY-MM`. Until the
Google credentials and calendar access are configured, it deliberately shows an
availability error instead of guessing that dates are free.
If the endpoint fails, check the server log for a safe error code and verify the
service account key is the complete, valid PEM value from its JSON file.

Motion uses Framer Motion and honors the reduced-motion preference. The intro can be skipped and does not autoplay audio.
