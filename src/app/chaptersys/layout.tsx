import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  pageSeo,
  schemaSoftwareApplicationId,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(pageSeo.chaptersys);

export default function ChapterSysLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData
        data={[
          buildWebPageJsonLd(pageSeo.chaptersys, {
            mainEntityId: schemaSoftwareApplicationId(pageSeo.chaptersys.path),
          }),
          buildSoftwareApplicationJsonLd(pageSeo.chaptersys),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "ChapterSys", path: "/chaptersys" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
