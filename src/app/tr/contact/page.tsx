import { StructuredData } from "@/components/StructuredData";
import { ContactPageView } from "@/components/pages/ContactPageView";
import { getPageLabel } from "@/lib/i18n";
import {
  buildBaseStructuredData,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
} from "@/lib/seo";

const locale = "tr" as const;

export const metadata = buildPageMetadata(locale, "contact");

export default function TurkishContactPage() {
  const homeLabel = getPageLabel(locale, "home");
  const currentLabel = getPageLabel(locale, "contact");

  return (
    <>
      <StructuredData
        data={[
          ...buildBaseStructuredData(locale),
          buildWebPageJsonLd(locale, "contact"),
          buildBreadcrumbJsonLd(locale, [
            { name: homeLabel, path: "/" },
            { name: currentLabel, path: "/contact" },
          ]),
        ]}
      />
      <ContactPageView locale={locale} />
    </>
  );
}
