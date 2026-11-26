"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { instagram, packages } from "@/features/home/data";
import { scrollReveal } from "@/features/home/scroll-reveal";
import { whatsapp } from "@/features/home/data";

export default function OffersSection() {
  useEffect(() => {
    if (!window.matchMedia("(max-width: 650px)").matches) return;
    const grid = document.querySelector<HTMLElement>(".package-grid");
    if (!grid) return;
    const cards = Array.from(grid.children) as HTMLElement[];
    const indicators = document.createElement("div");
    indicators.className = "package-carousel-indicators";
    const dots = cards.map(() => {
      const dot = document.createElement("i");
      indicators.appendChild(dot);
      return dot;
    });
    grid.after(indicators);
    const setActiveDot = () => {
      const active = cards.reduce(
        (closest, card, index) =>
          Math.abs(card.offsetLeft - grid.scrollLeft) <
          Math.abs(cards[closest].offsetLeft - grid.scrollLeft)
            ? index
            : closest,
        0,
      );
      dots.forEach((dot, index) =>
        dot.classList.toggle("active", index === active),
      );
      return active;
    };
    const onScroll = () => setActiveDot();
    const timer = window.setInterval(() => {
      const current = setActiveDot();
      const next = current === cards.length - 1 ? 0 : current + 1;
      grid.scrollTo({ left: cards[next].offsetLeft, behavior: "smooth" });
    }, 4800);
    setActiveDot();
    grid.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(timer);
      grid.removeEventListener("scroll", onScroll);
      indicators.remove();
    };
  }, []);


  // const whatsappMessage =  `Hello Ola, I’d like to make reservation   booking you for ${months[month.getMonth()]} ${selected}, ${month.getFullYear()} and what the next steps are. Thank you!`
  //     : "";
  
    // const shiftMonth = (by: number) => {
    //   setMonth(new Date(month.getFullYear(), month.getMonth() + by, 1));
    //   setSelected(null);
    // };

  return (
    <section className="offers-section section" id="offers">
      <motion.div className="section-kicker" {...scrollReveal}>
        01 — WHAT WE OFFER
      </motion.div>
      <motion.div className="offers-heading" {...scrollReveal}>
        <h2>
          Live saxophone.
          <br />
          <em>Made for your moment.</em>
        </h2>
        <p>
          Choose a performance package for your occasion. Every booking is
          subject to availability.
        </p>
      </motion.div>
      <motion.div className="offer-showcase" {...scrollReveal}>
        <span className="offer-chip offer-chip-one">
          <b>PRIVATE SERENADE</b>
          <small>Romantic · 15–20 min</small>
        </span>
        <span className="offer-chip offer-chip-two">
          <b>SOCIAL EVENTS</b>
          <small>Birthdays · Receptions · Parties</small>
        </span>
        <div className="offer-sax-wrap">
          <div className="offer-sax-glow" />
          <img src="/saxophone-neon.png" alt="Neon saxophone" />
        </div>
        <span className="offer-chip offer-chip-three">
          <b>WEDDINGS & PREMIUM</b>
          <small>Entrances · Ceremonies · Receptions</small>
        </span>
        <span className="offer-chip offer-chip-four">
          <b>CORPORATE & VIP</b>
          <small>Functions · Awards · Celebrations</small>
        </span>
        <span className="offer-chip offer-chip-five">
          <b>LIVE BAND</b>
          <small>Saxophone with musicians</small>
        </span>
      </motion.div>
      <div className="package-grid">
        {packages.map(([number, name, price, details]) => (
          <motion.article
            className="package-card"
            key={number}
            {...scrollReveal}
          >
            <div className="package-top">
              <span>{number}</span>
              <strong>{price}</strong>
            </div>
            <h3>{name}</h3>
            <ul>
              {details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <a href={`${whatsapp}?text=${encodeURIComponent(`Hello Ola, I’d like to make reservation for the ${name} package.`)}`} target="_blank" rel="noreferrer">
              ASK ABOUT THIS PACKAGE <ArrowUpRight size={14} />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
