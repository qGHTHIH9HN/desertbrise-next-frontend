import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingConversion } from "@/components/FloatingConversion";

export const metadata: Metadata = {
  title: "DesertBrise Travel | Private Morocco Tours",
  description:
    "Private Morocco tours, Sahara desert journeys, cultural travel, trekking, and tailor-made experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingConversion />
      </body>
    </html>
  );
}
