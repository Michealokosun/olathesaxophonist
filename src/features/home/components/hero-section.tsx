"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { heroWords } from "@/features/home/data";
import { fadeUp } from "@/features/home/scroll-reveal";

export default function HeroSection({ ready }: { ready: boolean }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");

  useEffect(() => {
    const word = heroWords[wordIndex];
    if (typedWord.length < word.length) {
      const timer = window.setTimeout(
        () => setTypedWord(word.slice(0, typedWord.length + 1)),
        85,
      );
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => {
      setTypedWord("");
      setWordIndex((index) => (index + 1) % heroWords.length);
    }, 1900);
    return () => window.clearTimeout(timer);
  }, [typedWord, wordIndex]);

  return (
    <motion.section
      className="hero"
      id="home"
      initial={{ opacity: 0, y: 24 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <div className="hero-photo" />
      <div className="hero-grain" />
      <motion.div
        className="hero-content"
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.18,
              delayChildren: 0.2,
            },
          },
        }}
      >
        <motion.p className="eyebrow" variants={fadeUp}>
          <span /> MICHAEL OLA · OLA THE SAXOPHONIST
        </motion.p>
        <motion.h1 variants={fadeUp}>
          Make Every
          <br />
          Celebration
          <br />
          <em className="typewriter">
            {typedWord}
            <i aria-hidden="true" />
          </em>
        </motion.h1>
        <motion.p className="hero-copy" variants={fadeUp}>
          Creating unforgettable moments through the power of music.
        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp}>
          <a
            className="button button-gold"
            href="#availability"
            rel="noreferrer"
          >
            Check Availability <ArrowDown size={16} />
          </a>
          <a className="text-link" href="#offers">
            VIEW PACKAGES <ArrowDown size={15} />
          </a>
        </motion.div>
      </motion.div>
      <div className="hero-caption">
        <span>BENIN CITY · NIGERIA</span>
        <span>PROFESSIONAL. SOULFUL. UNFORGETTABLE.</span>
      </div>
      <div className="hero-note">♫</div>
    </motion.section>
  );
}
