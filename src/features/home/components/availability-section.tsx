"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { instagram, months, openDates, whatsapp } from "@/features/home/data";
import { scrollReveal } from "@/features/home/scroll-reveal";

export default function AvailabilitySection() {
  const [month, setMonth] = useState(new Date(2026, 10, 1));
  const [selected, setSelected] = useState<number | null>(null);
  const key = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`;
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const whatsappMessage = selected
    ? `Hello Ola, I’d like to make reservation  about booking you for ${months[month.getMonth()]} ${selected}, ${month.getFullYear()} and what the next steps are. Thank you!`
    : "";
  const whatsappLink = `${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
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
              <small>AVAILABILITY PREVIEW</small>
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
              const isAvailable = (openDates[key] ?? []).includes(day);
              return (
                <button
                  key={day}
                  disabled={!isAvailable}
                  className={`${isAvailable ? "open-date" : "booked-date"} ${selected === day ? "selected-date" : ""}`}
                  onClick={() => setSelected(day)}
                >
                  {day}
                  {isAvailable && <i />}
                </button>
              );
            })}
          </div>
          <div className="calendar-result">
            {selected ? (
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
                <span className="result-spark">✳</span>
                <p>Select a highlighted date to ask about it.</p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
