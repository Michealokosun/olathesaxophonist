import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scrollReveal = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.15 },
  variants: fadeUp,
} as const;
