import { StructuredData } from "@/components/StructuredData";
import { PrimeRoutePageView } from "@/components/pages/PrimeRoutePageView";
import { getPageLabel, getPagePath } from "@/lib/i18n";
import {
  buildBaseStructuredData,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  schemaSoftwareApplicationId,
} from "@/lib/seo";

const locale = "tr" as const;

export const metadata = buildPageMetadata(locale, "primeroute");

export default function TurkishPrimeRoutePage() {
  const homeLabel = getPageLabel(locale, "home");
  const currentLabel = getPageLabel(locale, "primeroute");
  const applicationId = schemaSoftwareApplicationId(getPagePath(locale, "primeroute"));

  return (
    <>
      <StructuredData
        data={[
          ...buildBaseStructuredData(locale),
          buildWebPageJsonLd(locale, "primeroute", {
            mainEntityId: applicationId,
          }),
          buildSoftwareApplicationJsonLd(locale, "primeroute"),
          buildBreadcrumbJsonLd(locale, [
            { name: homeLabel, path: "/" },
            { name: currentLabel, path: "/primeroute" },
          ]),
        ]}
      />
      <PrimeRoutePageView locale={locale} />
    </>
  );
}
