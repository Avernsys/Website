import { StructuredData } from "@/components/StructuredData";
import { AboutPageView } from "@/components/pages/AboutPageView";
import { ChapterSysPageView } from "@/components/pages/ChapterSysPageView";
import { ContactPageView } from "@/components/pages/ContactPageView";
import { HomePageView } from "@/components/pages/HomePageView";
import { PrimeRoutePageView } from "@/components/pages/PrimeRoutePageView";
import { getPageLabel, getPagePath, type Locale } from "@/lib/i18n";
import {
  buildAllFoundersPersonJsonLd,
  buildBaseStructuredData,
  buildBreadcrumbJsonLd,
  buildHomeItemListJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebPageJsonLd,
  schemaOrganizationId,
  schemaSoftwareApplicationId,
} from "@/lib/seo";

export function renderLocalizedHomePage(locale: Locale) {
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

export function renderLocalizedAboutPage(locale: Locale) {
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

export function renderLocalizedContactPage(locale: Locale) {
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

export function renderLocalizedChapterSysPage(locale: Locale) {
  const homeLabel = getPageLabel(locale, "home");
  const currentLabel = getPageLabel(locale, "chaptersys");
  const applicationId = schemaSoftwareApplicationId(
    getPagePath(locale, "chaptersys"),
  );

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

export function renderLocalizedPrimeRoutePage(locale: Locale) {
  const homeLabel = getPageLabel(locale, "home");
  const currentLabel = getPageLabel(locale, "primeroute");
  const applicationId = schemaSoftwareApplicationId(
    getPagePath(locale, "primeroute"),
  );

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
