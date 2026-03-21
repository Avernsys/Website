import test from "node:test";
import assert from "node:assert/strict";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildVerificationMetadata,
  getIndexablePages,
  pageSeo,
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
