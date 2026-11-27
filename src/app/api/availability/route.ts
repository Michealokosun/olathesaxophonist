import { JWT } from "google-auth-library";
import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const timeZone = "Africa/Lagos";
const calendarScope = "https://www.googleapis.com/auth/calendar.freebusy";
const cacheDurationSeconds = 300;

type BusyPeriod = {
  start: string;
  end: string;
};

type FreeBusyResponse = {
  calendars?: Record<
    string,
    {
      busy?: BusyPeriod[];
      errors?: Array<{ reason: string }>;
    }
  >;
};

function isValidMonth(month: string | null): month is string {
  return month !== null && /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
}

function nextMonthKey(year: number, month: number): string {
  return new Date(Date.UTC(year, month, 1)).toISOString().slice(0, 7);
}

function nextDateKey(year: number, month: number, day: number): string {
  return new Date(Date.UTC(year, month - 1, day + 1))
    .toISOString()
    .slice(0, 10);
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const month = request.nextUrl.searchParams.get("month");
  if (!isValidMonth(month)) {
    return NextResponse.json(
      { error: "A month in YYYY-MM format is required." },
      { status: 400 },
    );
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!calendarId || !serviceAccountEmail || !privateKey) {
    return NextResponse.json(
      { error: "Google Calendar availability is not configured." },
      { status: 503 },
    );
  }

  const getBookedDates = unstable_cache(
    async (requestedMonth: string) => {
      const [requestedYear, requestedMonthNumber] = requestedMonth
        .split("-")
        .map(Number);
      const nextMonth = nextMonthKey(requestedYear, requestedMonthNumber);
      const timeMin = new Date(
        `${requestedMonth}-01T00:00:00+01:00`,
      ).toISOString();
      const timeMax = new Date(
        `${nextMonth}-01T00:00:00+01:00`,
      ).toISOString();
      const auth = new JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: [calendarScope],
      });
      const { data } = await auth.request<FreeBusyResponse>({
        url: "https://www.googleapis.com/calendar/v3/freeBusy",
        method: "POST",
        data: {
          timeMin,
          timeMax,
          timeZone,
          items: [{ id: calendarId }],
        },
      });

      const calendar = data.calendars?.[calendarId];
      const busyPeriods = calendar?.busy;
      if (!calendar || calendar.errors?.length || !busyPeriods) {
        throw new Error(
          "Google Calendar FreeBusy did not return availability for the configured calendar.",
        );
      }

      const daysInMonth = new Date(
        Date.UTC(requestedYear, requestedMonthNumber, 0),
      ).getUTCDate();

      return Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;
        const dateKey = `${requestedMonth}-${String(day).padStart(2, "0")}`;
        const nextDayKey = nextDateKey(
          requestedYear,
          requestedMonthNumber,
          day,
        );
        const dayStart = new Date(`${dateKey}T00:00:00+01:00`).getTime();
        const dayEnd = new Date(`${nextDayKey}T00:00:00+01:00`).getTime();
        const hasBooking = busyPeriods.some((period) => {
          const busyStart = new Date(period.start).getTime();
          const busyEnd = new Date(period.end).getTime();
          return busyStart < dayEnd && busyEnd > dayStart;
        });

        return hasBooking ? dateKey : null;
      }).filter((date): date is string => date !== null);
    },
    ["google-calendar-booked-dates-v1", calendarId],
    { revalidate: cacheDurationSeconds },
  );

  try {
    const bookedDates = await getBookedDates(month);
    return NextResponse.json(
      { bookedDates },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : "UNKNOWN";
    console.error("Google Calendar FreeBusy request failed.", { code });
    return NextResponse.json(
      { error: "Could not read availability from Google Calendar." },
      { status: 502 },
    );
  }
}
