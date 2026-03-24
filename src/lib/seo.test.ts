import test from "node:test";
import assert from "node:assert/strict";
import { founders } from "./founders";
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
  pageSeo,
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
  const t = pageMetadata.title;
  if (t && typeof t === "object" && "absolute" in t) {
    return (t as { absolute?: string }).absolute;
  }
  return undefined;
}

function getOpenGraphTitle(pageMetadata: ReturnType<typeof buildPageMetadata>) {
  return pageMetadata.openGraph?.title ?? undefined;
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
    resolvePageTitle(pageSeo.home),
    pageSeo.home.title,
  );
  assert.equal(resolvePageTitle(pageSeo.about), "About Avernsys");
  assert.equal(
    resolvePageTitle(pageSeo.chaptersys),
    "ChapterSys | Alumni and Member Community Platform | Avernsys",
  );
});

test("buildPageMetadata aligns document and social titles", () => {
  const metadata = buildPageMetadata(pageSeo.chaptersys);

  assert.equal(
    getMetadataAbsoluteTitle(metadata),
    "ChapterSys | Alumni and Member Community Platform | Avernsys",
  );
  assert.equal(getOpenGraphTitle(metadata), getMetadataAbsoluteTitle(metadata));
  assert.equal(
    metadata.twitter?.title,
    getMetadataAbsoluteTitle(metadata),
  );
});

test("builds route metadata with route-specific social images", () => {
  const metadata = buildPageMetadata(pageSeo.chaptersys);

  assert.equal(metadata.alternates?.canonical, "https://avernsys.com/chaptersys");
  assert.equal(
    getOpenGraphImageUrl(metadata),
    "https://avernsys.com/chaptersys/opengraph-image",
  );
  assert.equal(
    getTwitterImageUrl(metadata),
    "https://avernsys.com/chaptersys/twitter-image",
  );
});

test("uses shared social images for routes without custom image routes", () => {
  const metadata = buildPageMetadata(pageSeo.about);

  assert.equal(
    getOpenGraphImageUrl(metadata),
    "https://avernsys.com/opengraph-image",
  );
  assert.equal(
    getTwitterImageUrl(metadata),
    "https://avernsys.com/twitter-image",
  );
});

test("builds breadcrumb schema with ordered positions", () => {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "PrimeRoute", path: "/primeroute" },
  ]);

  assert.equal(breadcrumb.itemListElement.length, 2);
  assert.equal(breadcrumb.itemListElement[1].position, 2);
  assert.equal(
    breadcrumb.itemListElement[1].item,
    "https://avernsys.com/primeroute",
  );
});

test("organization JSON-LD omits sameAs when empty", () => {
  const org = buildOrganizationJsonLd() as Record<string, unknown>;
  assert.equal("sameAs" in org, false);
});

test("organization and WebSite JSON-LD use stable @id graph", () => {
  const org = buildOrganizationJsonLd() as Record<string, unknown>;
  const site = buildWebSiteJsonLd() as Record<string, unknown>;

  assert.equal(org["@id"], schemaOrganizationId());
  assert.equal(org.description, siteConfig.description);
  assert.equal(org.logo && typeof org.logo === "object" && (org.logo as { url?: string }).url, absoluteUrl("/icon"));
  assert.deepEqual(org.founder, founders.map((founder) => ({
    "@id": `${absoluteUrl("/about")}#${founder.name.toLowerCase().replace(/\s+/g, "-")}`,
  })));
  assert.ok(Array.isArray(org.knowsAbout));
  assert.deepEqual(site.publisher, { "@id": schemaOrganizationId() });
  assert.equal(site.description, siteConfig.description);
});

test("WebPage JSON-LD references WebSite and Organization by @id", () => {
  const page = buildWebPageJsonLd(pageSeo.chaptersys, {
    mainEntityId: schemaSoftwareApplicationId(pageSeo.chaptersys.path),
  }) as Record<string, unknown>;
  assert.deepEqual(page.isPartOf, { "@id": schemaWebSiteId() });
  assert.deepEqual(page.about, { "@id": schemaOrganizationId() });
  assert.deepEqual(page.mainEntity, {
    "@id": schemaSoftwareApplicationId(pageSeo.chaptersys.path),
  });
});

test("SoftwareApplication JSON-LD includes featureList and publisher @id", () => {
  const app = buildSoftwareApplicationJsonLd(pageSeo.primeroute) as Record<
    string,
    unknown
  >;
  assert.ok(Array.isArray(app.featureList));
  assert.equal((app.featureList as string[]).length >= 3, true);
  assert.deepEqual(app.publisher, { "@id": schemaOrganizationId() });
});

test("home ItemList JSON-LD lists product URLs", () => {
  const list = buildHomeItemListJsonLd() as {
    itemListElement: Array<{ item?: string }>;
  };
  assert.equal(list.itemListElement[0]?.item, absoluteUrl("/chaptersys"));
  assert.equal(list.itemListElement[1]?.item, absoluteUrl("/primeroute"));
});

test("founder Person JSON-LD links to Organization", () => {
  const person = buildFounderPersonJsonLd(founders[0]) as Record<string, unknown>;
  assert.equal(person["@id"], `${absoluteUrl("/about")}#doruk-yalcin`);
  assert.deepEqual(person.worksFor, { "@id": schemaOrganizationId() });
});

test("JSON-LD builders round-trip through JSON.stringify", () => {
  const nodes = [
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd(pageSeo.contact),
    buildHomeItemListJsonLd(),
    buildSoftwareApplicationJsonLd(pageSeo.chaptersys),
    buildFounderPersonJsonLd(founders[1]),
    buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]),
  ];
  for (const node of nodes) {
    JSON.parse(JSON.stringify(node));
  }
});

test("builds verification metadata from env values", () => {
  const verification = buildVerificationMetadata(createEnv({
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "google-token",
    NEXT_PUBLIC_BING_SITE_VERIFICATION: "bing-token",
  }));

  assert.equal(verification?.google, "google-token");
  assert.equal(verification?.other?.["msvalidate.01"], "bing-token");
});

test("returns all indexable pages", () => {
  const pages = getIndexablePages();

  assert.equal(pages.length, 5);
  assert.deepEqual(
    pages.map((page) => page.path),
    ["/", "/about", "/contact", "/chaptersys", "/primeroute"],
  );
});
