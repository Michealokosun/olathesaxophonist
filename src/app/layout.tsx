import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Ola — Ola the Saxophonist",
  description: "Saxophone performance packages for private serenades, social events, weddings, premium occasions, and corporate events. Professional. Soulful. Unforgettable.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
