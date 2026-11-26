"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import AvailabilitySection from "@/features/home/components/availability-section";
import BookingPolicyModal from "@/features/home/components/booking-policy-modal";
import BookingSection from "@/features/home/components/booking-section";
import HeroSection from "@/features/home/components/hero-section";
import IntroScreen from "@/features/home/components/intro-screen";
import OffersSection from "@/features/home/components/offers-section";
import VideoShowcaseSection from "@/features/home/components/video-showcase-section";

export default function HomePage() {
  const [intro, setIntro] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 5200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (intro) return;
    const timer = window.setTimeout(() => setPolicyOpen(true), 8000);
    return () => window.clearTimeout(timer);
  }, [intro]);

  return (
    <>
      <BookingPolicyModal
        open={policyOpen}
        onClose={() => setPolicyOpen(false)}
      />
      <AnimatePresence onExitComplete={() => setHeroReady(true)}>
        {intro && <IntroScreen />}
      </AnimatePresence>
      <SiteHeader />
      <main>
        <HeroSection ready={heroReady} />
        <VideoShowcaseSection />
        <OffersSection />
        <BookingSection />
        <AvailabilitySection />
      </main>
      <SiteFooter />
    </>
  );
}
