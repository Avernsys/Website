import test from "node:test";
import assert from "node:assert/strict";
import { founders } from "./founders";
import { getDictionary } from "./i18n";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildFounderPersonJsonLd,
  buildHomeItemListJsonLd,
  buildOrganizationJsonLd,
  buildPageMetadata,
  buildSoftwareApplicationJsonLd,
  buildVerificationMetadata,
  buildWebPageJsonLd,
  buildWebSiteJsonLd,
  getIndexablePages,
  getPageSeo,
  resolvePageTitle,
  schemaOrganizationId,
  schemaSoftwareApplicationId,
  schemaWebSiteId,
  siteConfig,
} from "./seo";

function createEnv(values: Record<string, string>): NodeJS.ProcessEnv {
  return values as unknown as NodeJS.ProcessEnv;
}

function getOpenGraphImageUrl(pageMetadata: ReturnType<typeof buildPageMetadata>) {
  const images = pageMetadata.openGraph?.images;

  if (!images) {
    return undefined;
  }

  const imageList = Array.isArray(images) ? images : [images];
  const image = imageList[0];

  if (typeof image === "string") {
    return image;
  }

  if (image instanceof URL) {
    return image.toString();
  }

  return image?.url?.toString();
}

function getMetadataAbsoluteTitle(
  pageMetadata: ReturnType<typeof buildPageMetadata>,
) {
  const title = pageMetadata.title;

  if (title && typeof title === "object" && "absolute" in title) {
    return (title as { absolute?: string }).absolute;
  }

  return undefined;
}

function getTwitterImageUrl(pageMetadata: ReturnType<typeof buildPageMetadata>) {
  const images = pageMetadata.twitter?.images;

  if (!images) {
    return undefined;
  }

  const imageList = Array.isArray(images) ? images : [images];
  const image = imageList[0];

  if (typeof image === "string") {
    return image;
  }

  if (image instanceof URL) {
    return image.toString();
  }

  return image?.url?.toString();
}

test("builds absolute URLs from relative paths", () => {
  assert.equal(absoluteUrl("/chaptersys"), "https://avernsys.com/chaptersys");
  assert.equal(absoluteUrl("contact"), "https://avernsys.com/contact");
});

test("resolvePageTitle appends brand only when not already in title", () => {
  assert.equal(
    resolvePageTitle(getPageSeo("en", "home")),
    getPageSeo("en", "home").title,
  );
  assert.equal(resolvePageTitle(getPageSeo("en", "about")), "About Avernsys");
  assert.equal(
    resolvePageTitle(getPageSeo("en", "chaptersys")),
    "ChapterSys | Alumni and Member Community Platform | Avernsys",
  );
});

test("builds English route metadata with localized alternates", () => {
  const metadata = buildPageMetadata("en", "chaptersys");

  assert.equal(
    getMetadataAbsoluteTitle(metadata),
    "ChapterSys | Alumni and Member Community Platform | Avernsys",
  );
  assert.equal(
    metadata.alternates?.canonical,
    "https://avernsys.com/chaptersys",
  );
  assert.equal(
    metadata.alternates?.languages?.tr,
    "https://avernsys.com/tr/chaptersys",
  );
  assert.equal(
    metadata.alternates?.languages?.de,
    "https://avernsys.com/de/chaptersys",
  );
  assert.equal(
    metadata.alternates?.languages?.nl,
    "https://avernsys.com/nl/chaptersys",
  );
  assert.equal(
    getOpenGraphImageUrl(metadata),
    "https://avernsys.com/chaptersys/opengraph-image",
  );
  assert.equal(
    getTwitterImageUrl(metadata),
    "https://avernsys.com/chaptersys/twitter-image",
  );
});

test("builds German route metadata with German locale and assets", () => {
  const metadata = buildPageMetadata("de", "primeroute");

  assert.equal(
    getMetadataAbsoluteTitle(metadata),
    "FlowSys | Software zur Last-Mile-Routenoptimierung | Avernsys",
  );
  assert.equal(
    metadata.alternates?.canonical,
    "https://avernsys.com/de/flowsys",
  );
  assert.equal(metadata.openGraph?.locale, "de_DE");
  assert.equal(
    getOpenGraphImageUrl(metadata),
    "https://avernsys.com/de/flowsys/opengraph-image",
  );
  assert.equal(
    getTwitterImageUrl(metadata),
    "https://avernsys.com/de/flowsys/twitter-image",
  );
});

test("builds Turkish route metadata with Turkish locale and assets", () => {
  const metadata = buildPageMetadata("tr", "primeroute");

  assert.equal(
    getMetadataAbsoluteTitle(metadata),
    "FlowSys | Son Kilometre Rota Optimizasyon Yazılımı | Avernsys",
  );
  assert.equal(
    metadata.alternates?.canonical,
    "https://avernsys.com/tr/flowsys",
  );
  assert.equal(metadata.openGraph?.locale, "tr_TR");
  assert.equal(
    getOpenGraphImageUrl(metadata),
    "https://avernsys.com/tr/flowsys/opengraph-image",
  );
  assert.equal(
    getTwitterImageUrl(metadata),
    "https://avernsys.com/tr/flowsys/twitter-image",
  );
});

test("builds breadcrumb schema with locale-aware URLs", () => {
  const breadcrumb = buildBreadcrumbJsonLd("tr", [
    { name: "Ana sayfa", path: "/" },
    { name: "FlowSys", path: "/flowsys" },
  ]);

  assert.equal(breadcrumb.itemListElement.length, 2);
  assert.equal(breadcrumb.itemListElement[1].position, 2);
  assert.equal(
    breadcrumb.itemListElement[1].item,
    "https://avernsys.com/tr/flowsys",
  );
});

test("organization JSON-LD omits sameAs when empty", () => {
  const org = buildOrganizationJsonLd("en") as Record<string, unknown>;

  assert.equal("sameAs" in org, false);
});

test("organization JSON-LD lists all supported languages in the contact point", () => {
  const org = buildOrganizationJsonLd("en") as {
    contactPoint?: Array<{ availableLanguage?: string[] }>;
  };

  assert.deepEqual(org.contactPoint?.[0]?.availableLanguage, [
    "en",
    "tr",
    "de",
    "nl",
  ]);
});

test("organization and WebSite JSON-LD use stable ids and localized descriptions", () => {
  const englishOrg = buildOrganizationJsonLd("en") as Record<string, unknown>;
  const turkishSite = buildWebSiteJsonLd("tr") as Record<string, unknown>;

  assert.equal(englishOrg["@id"], schemaOrganizationId());
  assert.equal(englishOrg.description, siteConfig.description);
  assert.deepEqual(turkishSite.publisher, { "@id": schemaOrganizationId() });
  assert.equal(turkishSite["@id"], schemaWebSiteId("tr"));
  assert.equal(
    turkishSite.description,
    getDictionary("tr").site.description,
  );
});

test("WebPage JSON-LD references localized WebSite and main entity ids", () => {
  const page = buildWebPageJsonLd("tr", "chaptersys", {
    mainEntityId: schemaSoftwareApplicationId("/tr/chaptersys"),
  }) as Record<string, unknown>;

  assert.deepEqual(page.isPartOf, { "@id": schemaWebSiteId("tr") });
  assert.deepEqual(page.about, { "@id": schemaOrganizationId() });
  assert.deepEqual(page.mainEntity, {
    "@id": schemaSoftwareApplicationId("/tr/chaptersys"),
  });
});

test("SoftwareApplication JSON-LD includes localized featureList and publisher", () => {
  const app = buildSoftwareApplicationJsonLd("tr", "primeroute") as Record<
    string,
    unknown
  >;

  assert.ok(Array.isArray(app.featureList));
  assert.equal((app.featureList as string[]).length >= 3, true);
  assert.deepEqual(app.publisher, { "@id": schemaOrganizationId() });
  assert.equal(app.url, "https://avernsys.com/tr/flowsys");
});

test("home ItemList JSON-LD lists localized product URLs", () => {
  const list = buildHomeItemListJsonLd("tr") as {
    itemListElement: Array<{ item?: string }>;
  };

  assert.equal(
    list.itemListElement[0]?.item,
    absoluteUrl("/tr/chaptersys"),
  );
  assert.equal(
    list.itemListElement[1]?.item,
    absoluteUrl("/tr/flowsys"),
  );
});

test("founder Person JSON-LD uses localized bios", () => {
  const person = buildFounderPersonJsonLd("tr", founders[0]) as Record<
    string,
    unknown
  >;

  assert.equal(person["@id"], `${absoluteUrl("/about")}#doruk-yalcin`);
  assert.deepEqual(person.worksFor, { "@id": schemaOrganizationId() });
  assert.match(String(person.description), /Amazon/);
});

test("JSON-LD builders round-trip through JSON.stringify", () => {
  const nodes = [
    buildOrganizationJsonLd("en"),
    buildWebSiteJsonLd("en"),
    buildWebPageJsonLd("en", "contact"),
    buildHomeItemListJsonLd("tr"),
    buildSoftwareApplicationJsonLd("en", "chaptersys"),
    buildFounderPersonJsonLd("en", founders[1]),
    buildBreadcrumbJsonLd("en", [{ name: "Home", path: "/" }]),
  ];

  for (const node of nodes) {
    JSON.parse(JSON.stringify(node));
  }
});

test("builds verification metadata from env values", () => {
  const verification = buildVerificationMetadata(
    createEnv({
      NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "google-token",
      NEXT_PUBLIC_BING_SITE_VERIFICATION: "bing-token",
    }),
  );

  assert.equal(verification?.google, "google-token");
  assert.equal(verification?.other?.["msvalidate.01"], "bing-token");
});

test("returns all indexable pages across all locales", () => {
  const pages = getIndexablePages();

  assert.equal(pages.length, 20);
  assert.ok(
    pages.some((page) => page.locale === "en" && page.path === "/contact"),
  );
  assert.ok(
    pages.some((page) => page.locale === "tr" && page.path === "/tr/contact"),
  );
  assert.ok(
    pages.some((page) => page.locale === "de" && page.path === "/de/contact"),
  );
  assert.ok(
    pages.some((page) => page.locale === "nl" && page.path === "/nl/contact"),
  );
});
