import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import {
  buildAllFoundersPersonJsonLd,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
  pageSeo,
  schemaOrganizationId,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.about);

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData
        data={[
          buildWebPageJsonLd(pageSeo.about, {
            mainEntityId: schemaOrganizationId(),
          }),
          ...buildAllFoundersPersonJsonLd(),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
