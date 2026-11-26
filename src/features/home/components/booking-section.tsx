import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Music2,
  Speaker,
  type LucideIcon,
} from "lucide-react";
import { instagram } from "@/features/home/data";
import { scrollReveal } from "@/features/home/scroll-reveal";

export default function BookingSection() {
  return (
    <section className="booking-section section" id="booking">
      <motion.div className="section-kicker" {...scrollReveal}>
        02 — THE DETAILS
      </motion.div>
      <div className="booking-grid">
        <motion.div className="additional-card" {...scrollReveal}>
          <h2>Additional services</h2>
          <p className="booking-lead">Make the performance fit your event.</p>
          <div className="service-list">
            <ServiceRow
              icon={Clock3}
              title="Extended performance"
              text="Longer performance time is negotiable."
            />
            <ServiceRow
              icon={MapPin}
              title="Travel outside Benin City"
              text="Transportation and accommodation fees apply where necessary."
            />
            <ServiceRow
              icon={Music2}
              title="Special song requests"
              text="Available upon prior arrangement."
            />
            <ServiceRow
              icon={Speaker}
              title="Sound equipment"
              text="Subject to event requirements."
            />
          </div>
        </motion.div>
        <motion.div className="policy-card" {...scrollReveal}>
          <h2>Booking policy</h2>
          <p className="booking-lead">A few things to know before you book.</p>
          <ul>
            <li>A 70% deposit is required to secure your booking.</li>
            <li>The balance must be paid before the performance.</li>
            <li>Bookings are subject to availability.</li>
            <li>
              Prices may vary by location, event duration, and specific
              requirements.
            </li>
          </ul>
          <a
            className="button button-gold"
            href={instagram}
            target="_blank"
            rel="noreferrer"
          >
            DISCUSS YOUR EVENT <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceRow({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <motion.div className="service-row" {...scrollReveal}>
      <span className="service-icon">
        <Icon size={18} />
      </span>
      <p>
        <b>{title}</b>
        <small>{text}</small>
      </p>
    </motion.div>
  );
}
