import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SeoIntegrations } from "@/components/SeoIntegrations";
import { StructuredData } from "@/components/StructuredData";
import {
  buildOrganizationJsonLd,
  buildPageMetadata,
  buildVerificationMetadata,
  buildWebSiteJsonLd,
  pageSeo,
  siteConfig,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  ...buildPageMetadata(pageSeo.home),
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  verification: buildVerificationMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <StructuredData
          data={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]}
        />
        <SeoIntegrations />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
