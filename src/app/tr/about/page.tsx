import { StructuredData } from "@/components/StructuredData";
import { AboutPageView } from "@/components/pages/AboutPageView";
import { getPageLabel } from "@/lib/i18n";
import {
  buildAllFoundersPersonJsonLd,
  buildBaseStructuredData,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
  schemaOrganizationId,
} from "@/lib/seo";

const locale = "tr" as const;

export const metadata = buildPageMetadata(locale, "about");

export default function TurkishAboutPage() {
  const homeLabel = getPageLabel(locale, "home");
  const currentLabel = getPageLabel(locale, "about");

  return (
    <>
      <StructuredData
        data={[
          ...buildBaseStructuredData(locale),
          buildWebPageJsonLd(locale, "about", {
            mainEntityId: schemaOrganizationId(),
          }),
          ...buildAllFoundersPersonJsonLd(locale),
          buildBreadcrumbJsonLd(locale, [
            { name: homeLabel, path: "/" },
            { name: currentLabel, path: "/about" },
          ]),
        ]}
      />
      <AboutPageView locale={locale} />
    </>
  );
}
