"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { instagram, months, whatsapp } from "@/features/home/data";
import { scrollReveal } from "@/features/home/scroll-reveal";

type AvailabilityResponse = {
  bookedDates: string[];
};

function isAvailabilityResponse(value: unknown): value is AvailabilityResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "bookedDates" in value &&
    Array.isArray(value.bookedDates) &&
    value.bookedDates.every((date) => typeof date === "string")
  );
}

export default function AvailabilitySection() {
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [availabilityStatus, setAvailabilityStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const key = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const todayKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const whatsappMessage = selected
    ? `Hello Ola, I’d like to make reservation  about booking you for ${months[month.getMonth()]} ${selected}, ${month.getFullYear()} and what the next steps are. Thank you!`
    : "";
  const whatsappLink = `${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    let activeController: AbortController | undefined;
    let initialLoad = true;

    const loadAvailability = async () => {
      activeController?.abort();
      const controller = new AbortController();
      activeController = controller;

      if (initialLoad) {
        setAvailabilityStatus("loading");
        initialLoad = false;
      }

      try {
        const response = await fetch(`/api/availability?month=${key}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Availability request failed (${response.status}).`);
        }

        const result: unknown = await response.json();
        if (!isAvailabilityResponse(result)) {
          throw new Error("Availability response had an invalid format.");
        }

        setBookedDates(new Set(result.bookedDates));
        setAvailabilityStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Could not load Google Calendar availability.", error);
        setAvailabilityStatus("error");
      }
    };

    void loadAvailability();
    const refreshInterval = window.setInterval(() => {
      void loadAvailability();
    }, 300_000);
    window.addEventListener("focus", loadAvailability);

    return () => {
      activeController?.abort();
      window.clearInterval(refreshInterval);
      window.removeEventListener("focus", loadAvailability);
    };
  }, [key]);

  const shiftMonth = (by: number) => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + by, 1));
    setSelected(null);
  };

  return (
    <section className="availability-section section" id="availability">
      <motion.div className="section-kicker" {...scrollReveal}>
        03 — CHECK YOUR DATE
      </motion.div>
      <div className="availability-grid">
        <motion.div className="availability-copy" {...scrollReveal}>
          <h2>
            Let’s find
            <br />
            <em>your date.</em>
          </h2>
          <p>
            Bookings are subject to availability. Select a highlighted date,
            then message Ola on WhatsApp to confirm your event and package.
          </p>
          <div className="legend">
            <span>
              <i className="legend-open" /> Available
            </span>
            <span>
              <i className="legend-booked" /> Booked
            </span>
          </div>
          <small className="availability-note">
            Calendar dates are a preview, not reservations. Confirm availability
            directly before paying a deposit.
          </small>
          <a
            className="availability-instagram"
            href={instagram}
            target="_blank"
            rel="noreferrer"
          >
            @olathesaxophonist <ArrowUpRight size={14} />
          </a>
        </motion.div>
        <motion.div className="calendar-card" {...scrollReveal}>
          <div className="calendar-head">
            <div>
              <small>LIVE GOOGLE CALENDAR</small>
              <h3>
                {months[month.getMonth()]} <span>{month.getFullYear()}</span>
              </h3>
            </div>
            <div className="calendar-arrows">
              <button
                onClick={() => shiftMonth(-1)}
                aria-label="Previous month"
              >
                <ChevronLeft />
              </button>
              <button onClick={() => shiftMonth(1)} aria-label="Next month">
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="calendar-grid weekdays">
            {"SMTWTFS".split("").map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
            ))}
          </div>
          <div className="calendar-grid dates">
            {Array.from({ length: firstDay }, (_, index) => (
              <span key={`blank-${index}`} />
            ))}
            {Array.from({ length: days }, (_, index) => {
              const day = index + 1;
              const dateKey = `${key}-${String(day).padStart(2, "0")}`;
              const isBooked = bookedDates.has(dateKey);
              const isAvailable =
                availabilityStatus === "ready" &&
                !isBooked &&
                dateKey >= todayKey;
              const dateStatus =
                availabilityStatus !== "ready"
                  ? "availability not loaded"
                  : isBooked
                    ? "booked"
                    : isAvailable
                      ? "available"
                      : "unavailable";
              return (
                <button
                  key={day}
                  disabled={!isAvailable}
                  className={`${isAvailable ? "open-date" : "booked-date"} ${selected === day ? "selected-date" : ""}`}
                  onClick={() => setSelected(day)}
                  aria-label={`${months[month.getMonth()]} ${day}, ${month.getFullYear()}, ${dateStatus}`}
                >
                  {day}
                  {isAvailable && <i />}
                </button>
              );
            })}
          </div>
          <div className="calendar-result">
            {availabilityStatus === "loading" ? (
              <p role="status">Checking Google Calendar availability…</p>
            ) : availabilityStatus === "error" ? (
              <p role="alert">
                Live availability could not be loaded. Please try again shortly
                or message Ola directly.
              </p>
            ) : selected ? (
              <>
                <span className="result-check">
                  <Check size={15} />
                </span>
                <p>
                  <strong>
                    {months[month.getMonth()]} {selected}
                  </strong>{" "}
                  is listed as available. Message Ola to confirm.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Message Ola on WhatsApp about ${months[month.getMonth()]} ${selected}, ${month.getFullYear()}`}
                >
                  MESSAGE OLA <ArrowUpRight size={14} />
                </a>
              </>
            ) : (
              <>
                <p>Select an available date to ask about it.</p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
