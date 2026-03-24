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

export const metadata: Metadata = buildPageMetadata(pageSeo.primeroute);

export default function PrimeRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData
        data={[
          buildWebPageJsonLd(pageSeo.primeroute, {
            mainEntityId: schemaSoftwareApplicationId(pageSeo.primeroute.path),
          }),
          buildSoftwareApplicationJsonLd(pageSeo.primeroute),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "PrimeRoute", path: "/primeroute" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
