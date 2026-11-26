import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function BookingPolicyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="policy-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            className="policy-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-title"
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="policy-modal-close"
              type="button"
              onClick={onClose}
              aria-label="Close booking policy"
            >
              <X size={18} />
            </button>
            <span className="section-kicker">BEFORE YOU BOOK</span>
            <h2 id="policy-title">
              Booking <em>policy</em>
            </h2>
            <p>Here is what you need to know before securing your date.</p>
            <ul>
              <li>A 70% deposit is required to secure your booking.</li>
              <li>The balance must be paid before the performance.</li>
              <li>Bookings are subject to availability.</li>
              <li>
                Prices may vary by location, event duration, and event
                requirements.
              </li>
            </ul>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
