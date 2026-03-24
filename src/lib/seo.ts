import type { Metadata } from "next";
import {
  defaultLocale,
  getAlternateLanguageLinks,
  getDictionary,
  getPagePath,
  localizePath,
  locales,
  pageBasePaths,
  pageKeys,
  type Locale,
  type PageKey,
} from "@/lib/i18n";
import { founders } from "@/lib/founders";

function parseSameAsUrls(raw: string | undefined): string[] {
  if (!raw?.trim()) {
    return [];
  }

  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export const siteConfig = {
  name: "Avernsys",
  legalName: "Avernsys",
  domain: "avernsys.com",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://avernsys.com",
  description: getDictionary(defaultLocale).site.description,
  sameAs: parseSameAsUrls(process.env.NEXT_PUBLIC_ORGANIZATION_SAME_AS),
};

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  lastModified?: string;
  socialImageAlt: string;
};

function buildAlternateLanguageMetadata(path: string) {
  return Object.fromEntries(
    Object.entries(getAlternateLanguageLinks(path)).map(([language, url]) => [
      language,
      absoluteUrl(url),
    ]),
  );
}

const lastModifiedByPage: Record<PageKey, string> = {
  home: "2025-03-21",
  about: "2025-03-21",
  contact: "2025-03-21",
  chaptersys: "2025-03-21",
  primeroute: "2025-03-21",
};

export type Breadcrumb = {
  name: string;
  path: string;
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${siteConfig.url}/`).toString();
}

export function schemaOrganizationId() {
  return `${siteConfig.url}/#organization`;
}

export function schemaWebSiteId(locale: Locale = defaultLocale) {
  return `${absoluteUrl(getPagePath(locale, "home"))}#website`;
}

export function schemaWebPageId(path: string) {
  return `${absoluteUrl(path)}#webpage`;
}

export function schemaSoftwareApplicationId(path: string) {
  return `${absoluteUrl(path)}#softwareapplication`;
}

function founderPersonId(name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return `${absoluteUrl("/about")}#${slug}`;
}

function getOpenGraphImage(locale: Locale, pageKey: PageKey) {
  switch (pageKey) {
    case "chaptersys":
      return absoluteUrl(localizePath(locale, "/chaptersys/opengraph-image"));
    case "primeroute":
      return absoluteUrl(localizePath(locale, "/primeroute/opengraph-image"));
    default:
      return absoluteUrl(localizePath(locale, "/opengraph-image"));
  }
}

function getTwitterImage(locale: Locale, pageKey: PageKey) {
  switch (pageKey) {
    case "chaptersys":
      return absoluteUrl(localizePath(locale, "/chaptersys/twitter-image"));
    case "primeroute":
      return absoluteUrl(localizePath(locale, "/primeroute/twitter-image"));
    default:
      return absoluteUrl(localizePath(locale, "/twitter-image"));
  }
}

export function getPageSeo(locale: Locale, pageKey: PageKey): PageSeo {
  const dictionary = getDictionary(locale);
  const page = dictionary.seo[pageKey];

  return {
    title: page.title,
    description: page.description,
    path: getPagePath(locale, pageKey),
    keywords: [...page.keywords],
    lastModified: lastModifiedByPage[pageKey],
    socialImageAlt: page.socialImageAlt,
  };
}

export function resolvePageTitle(page: PageSeo): string {
  if (page.path === "/") {
    return page.title;
  }

  if (page.title.includes(siteConfig.name)) {
    return page.title;
  }

  return `${page.title} | ${siteConfig.name}`;
}

export function buildPageMetadata(
  locale: Locale,
  pageKey: PageKey,
): Metadata {
  const dictionary = getDictionary(locale);
  const page = getPageSeo(locale, pageKey);
  const canonical = absoluteUrl(page.path);
  const resolvedTitle = resolvePageTitle(page);
  const basePath = pageBasePaths[pageKey];

  return {
    title: { absolute: resolvedTitle },
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical,
      languages: buildAlternateLanguageMetadata(basePath),
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      locale: dictionary.language.ogLocale,
      title: resolvedTitle,
      description: page.description,
      images: [
        {
          url: getOpenGraphImage(locale, pageKey),
          width: 1200,
          height: 630,
          alt: page.socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: page.description,
      images: [getTwitterImage(locale, pageKey)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function buildOrganizationJsonLd(locale: Locale) {
  const dictionary = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": schemaOrganizationId(),
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: dictionary.site.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon"),
    },
    ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
    founder: founders.map((founder) => ({
      "@id": founderPersonId(founder.name),
    })),
    knowsAbout: [...dictionary.structuredData.organizationKnowsAbout],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        url: absoluteUrl(getPagePath(locale, "contact")),
        availableLanguage: locales.map(
          (supportedLocale) => getDictionary(supportedLocale).language.htmlLang,
        ),
      },
    ],
  };
}

export function buildWebSiteJsonLd(locale: Locale) {
  const dictionary = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": schemaWebSiteId(locale),
    name: siteConfig.name,
    url: absoluteUrl(getPagePath(locale, "home")),
    description: dictionary.site.description,
    inLanguage: dictionary.language.htmlLang,
    publisher: { "@id": schemaOrganizationId() },
  };
}

export function buildWebPageJsonLd(
  locale: Locale,
  pageKey: PageKey,
  options?: { mainEntityId?: string },
) {
  const dictionary = getDictionary(locale);
  const page = getPageSeo(locale, pageKey);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": schemaWebPageId(page.path),
    name: resolvePageTitle(page),
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: dictionary.language.htmlLang,
    isPartOf: { "@id": schemaWebSiteId(locale) },
    about: { "@id": schemaOrganizationId() },
    ...(options?.mainEntityId
      ? {
          mainEntity: {
            "@id": options.mainEntityId,
          },
        }
      : {}),
  };
}

export function buildHomeItemListJsonLd(locale: Locale) {
  const dictionary = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(getPagePath(locale, "home"))}#product-list`,
    itemListElement: dictionary.pages.home.products.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(getPagePath(locale, item.key as PageKey)),
    })),
  };
}

export function buildBaseStructuredData(locale: Locale) {
  return [buildOrganizationJsonLd(locale), buildWebSiteJsonLd(locale)];
}

export function buildFounderPersonJsonLd(
  locale: Locale,
  founder: (typeof founders)[number],
) {
  const dictionary = getDictionary(locale);
  const profile = dictionary.pages.about.founders.people[founder.key];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderPersonId(founder.name),
    name: founder.name,
    jobTitle: profile.role,
    description: profile.bio,
    worksFor: { "@id": schemaOrganizationId() },
  };
}

export function buildAllFoundersPersonJsonLd(locale: Locale) {
  return founders.map((founder) => buildFounderPersonJsonLd(locale, founder));
}

export function buildBreadcrumbJsonLd(locale: Locale, items: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizePath(locale, item.path)),
    })),
  };
}

export function buildSoftwareApplicationJsonLd(
  locale: Locale,
  pageKey: Extract<PageKey, "chaptersys" | "primeroute">,
) {
  const dictionary = getDictionary(locale);
  const page = getPageSeo(locale, pageKey);
  const category =
    pageKey === "chaptersys" ? "BusinessApplication" : "LogisticsApplication";
  const structuredData = dictionary.structuredData.softwareApplications[pageKey];

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": schemaSoftwareApplicationId(page.path),
    name: pageKey === "chaptersys" ? "ChapterSys" : "PrimeRoute",
    applicationCategory: category,
    applicationSubCategory: structuredData.applicationSubCategory,
    operatingSystem: "Web",
    description: page.description,
    featureList: [...structuredData.featureList],
    url: absoluteUrl(page.path),
    publisher: { "@id": schemaOrganizationId() },
  };
}

export function buildVerificationMetadata(
  env: NodeJS.ProcessEnv = process.env,
): Metadata["verification"] {
  const google = env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  return {
    google,
    other: bing
      ? {
          "msvalidate.01": bing,
        }
      : undefined,
  };
}

export function getIndexablePages() {
  return locales.flatMap((locale) =>
    pageKeys.map((pageKey) => {
      const page = getPageSeo(locale, pageKey);
      return {
        ...page,
        locale,
        pageKey,
        url: absoluteUrl(page.path),
      };
    }),
  );
}
