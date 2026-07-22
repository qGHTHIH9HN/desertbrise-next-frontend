import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingConversion } from "@/components/FloatingConversion";
import { StructuredData } from "@/components/StructuredData";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://desertbrise-travel.com"),
  title: {
    default: "DesertBrise Travel | Private Morocco Tours",
    template: "%s | DesertBrise Travel",
  },
  description:
    "Private Morocco tours, Sahara desert journeys, cultural travel, trekking, and tailor-made experiences.",
  openGraph: {
    type: "website",
    siteName: "DesertBrise Travel",
    url: "https://desertbrise-travel.com",
    title: "DesertBrise Travel | Private Morocco Tours",
    description:
      "Private Morocco tours, Sahara desert journeys, cultural travel, trekking, and tailor-made experiences.",
  },
  alternates: {
    canonical: "https://desertbrise-travel.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <StructuredData data={[buildOrganizationSchema(), buildWebsiteSchema()]} />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingConversion />
      </body>
    </html>
  );
}
