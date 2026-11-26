"use client";

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <a href="#home" className="wordmark brand-lockup">
        <span className="brand-icon">♬</span>
        <span>
          <b>MICHAEL OLA</b>
          <small>OLA THE SAXOPHONIST</small>
        </span>
      </a>
      <button
        className="menu-toggle"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <a href="#offers" onClick={() => setMenuOpen(false)}>
          What we offer
        </a>
        <a href="#booking" onClick={() => setMenuOpen(false)}>
          Booking details
        </a>
        <a href="#availability" onClick={() => setMenuOpen(false)}>
          Availability
        </a>
        <a
          className="nav-cta"
          href="#availability"
          target="_blank"
          rel="noreferrer"
        >
          View Availability <ArrowRight size={14} />
        </a>
      </nav>
    </header>
  );
}
