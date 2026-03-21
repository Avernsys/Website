import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
  pageSeo,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.contact);

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData
        data={[
          buildWebPageJsonLd(pageSeo.contact),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
