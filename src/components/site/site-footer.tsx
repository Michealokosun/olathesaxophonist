"use client";

import { motion } from "framer-motion";
import { instagram } from "@/features/home/data";
import { scrollReveal } from "@/features/home/scroll-reveal";

export default function SiteFooter() {
  return (
    <motion.footer {...scrollReveal}>
      <a href="#home" className="wordmark brand-lockup">
        <span className="brand-icon">♬</span>
        <span>
          <b>MICHAEL OLA</b>
          <small>OLA THE SAXOPHONIST</small>
        </span>
      </a>
      <span>PROFESSIONAL. SOULFUL. UNFORGETTABLE.</span>
      <div>
        <a href={instagram} target="_blank" rel="noreferrer">
          INSTAGRAM @OLATHESAXOPHONIST
        </a>
        <a href="#booking">BOOKING POLICY</a>
      </div>
      <small>© 2026 MICHAEL OLA</small>
    </motion.footer>
  );
}
