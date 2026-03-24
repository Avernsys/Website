import { StructuredData } from "@/components/StructuredData";
import { HomePageView } from "@/components/pages/HomePageView";
import {
  buildBaseStructuredData,
  buildHomeItemListJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
  schemaOrganizationId,
} from "@/lib/seo";

const locale = "tr" as const;

export const metadata = buildPageMetadata(locale, "home");

export default function TurkishHomePage() {
  return (
    <>
      <StructuredData
        data={[
          ...buildBaseStructuredData(locale),
          buildWebPageJsonLd(locale, "home", {
            mainEntityId: schemaOrganizationId(),
          }),
          buildHomeItemListJsonLd(locale),
        ]}
      />
      <HomePageView locale={locale} />
    </>
  );
}
