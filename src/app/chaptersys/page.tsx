import { StructuredData } from "@/components/StructuredData";
import { ChapterSysPageView } from "@/components/pages/ChapterSysPageView";
import { getPageLabel, getPagePath } from "@/lib/i18n";
import {
  buildBaseStructuredData,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  schemaSoftwareApplicationId,
} from "@/lib/seo";

const locale = "en" as const;

export const metadata = buildPageMetadata(locale, "chaptersys");

export default function ChapterSysPage() {
  const homeLabel = getPageLabel(locale, "home");
  const currentLabel = getPageLabel(locale, "chaptersys");
  const applicationId = schemaSoftwareApplicationId(getPagePath(locale, "chaptersys"));

  return (
    <>
      <StructuredData
        data={[
          ...buildBaseStructuredData(locale),
          buildWebPageJsonLd(locale, "chaptersys", {
            mainEntityId: applicationId,
          }),
          buildSoftwareApplicationJsonLd(locale, "chaptersys"),
          buildBreadcrumbJsonLd(locale, [
            { name: homeLabel, path: "/" },
            { name: currentLabel, path: "/chaptersys" },
          ]),
        ]}
      />
      <ChapterSysPageView locale={locale} />
    </>
  );
}
