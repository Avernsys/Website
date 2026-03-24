import type { Metadata } from "next";
import { founders } from "./founders";

function parseSameAsUrls(raw: string | undefined): string[] {
  if (!raw?.trim()) {
    return [];
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const siteConfig = {
  name: "Avernsys",
  legalName: "Avernsys",
  domain: "avernsys.com",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://avernsys.com",
  locale: "en_US",
  description:
    "Avernsys builds B2B software for connected organizations and last-mile delivery optimization.",
  /** Public profile URLs for Organization JSON-LD (comma-separated in env). */
  sameAs: parseSameAsUrls(process.env.NEXT_PUBLIC_ORGANIZATION_SAME_AS),
};

export type PageKey =
  | "home"
  | "about"
  | "contact"
  | "chaptersys"
  | "primeroute";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  /** ISO 8601 date (YYYY-MM-DD) for sitemap lastmod; omit when unknown. */
  lastModified?: string;
  socialTitle?: string;
  socialDescription?: string;
};

export const pageSeo: Record<PageKey, PageSeo> = {
  home: {
    title: "Avernsys | Software for Connected Organizations and Route Optimization",
    description:
      "Avernsys builds B2B software that connects organizations and optimizes last-mile operations with ChapterSys and PrimeRoute.",
    path: "/",
    lastModified: "2025-03-21",
    keywords: [
      "Avernsys",
      "B2B software company",
      "alumni platform software",
      "member community platform",
      "last-mile delivery software",
      "route optimization software",
    ],
  },
  about: {
    title: "About Avernsys",
    description:
      "Meet the Avernsys founders and learn how we build thoughtful software for member communities and delivery operations.",
    path: "/about",
    lastModified: "2025-03-21",
    keywords: [
      "about Avernsys",
      "Avernsys founders",
      "B2B software company",
      "logistics software founders",
    ],
  },
  contact: {
    title: "Contact Avernsys",
    description:
      "Contact Avernsys to request a demo, ask questions about ChapterSys and PrimeRoute, or discuss a partnership.",
    path: "/contact",
    lastModified: "2025-03-21",
    keywords: [
      "contact Avernsys",
      "Avernsys demo",
      "ChapterSys demo",
      "PrimeRoute demo",
    ],
  },
  chaptersys: {
    title: "ChapterSys | Alumni and Member Community Platform",
    description:
      "ChapterSys is a private community platform for alumni associations and member organizations to discover businesses, build communities, and stay connected.",
    path: "/chaptersys",
    lastModified: "2025-03-21",
    keywords: [
      "ChapterSys",
      "alumni platform",
      "member community platform",
      "association software",
      "private social platform",
      "organization community software",
    ],
  },
  primeroute: {
    title: "PrimeRoute | Last-Mile Route Optimization Software",
    description:
      "PrimeRoute helps delivery teams optimize last-mile routes in seconds with smarter routing, lower costs, and faster deliveries.",
    path: "/primeroute",
    lastModified: "2025-03-21",
    keywords: [
      "PrimeRoute",
      "route optimization software",
      "last-mile delivery software",
      "delivery routing software",
      "fleet route planning",
      "logistics optimization software",
    ],
  },
};

export type Breadcrumb = {
  name: string;
  path: string;
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${siteConfig.url}/`).toString();
}

/** Stable JSON-LD `@id` values for cross-references on the same page / site. */
export function schemaOrganizationId() {
  return `${siteConfig.url}/#organization`;
}

export function schemaWebSiteId() {
  return `${siteConfig.url}/#website`;
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

function defaultSocialImage() {
  return absoluteUrl("/opengraph-image");
}

function getOpenGraphImage(path: string) {
  switch (path) {
    case "/chaptersys":
      return absoluteUrl("/chaptersys/opengraph-image");
    case "/primeroute":
      return absoluteUrl("/primeroute/opengraph-image");
    default:
      return defaultSocialImage();
  }
}

function getTwitterImage(path: string) {
  switch (path) {
    case "/chaptersys":
      return absoluteUrl("/chaptersys/twitter-image");
    case "/primeroute":
      return absoluteUrl("/primeroute/twitter-image");
    default:
      return absoluteUrl("/twitter-image");
  }
}

/** Full `<title>` / social title: home as-is; otherwise append brand unless already present. */
export function resolvePageTitle(page: PageSeo): string {
  if (page.path === "/") {
    return page.title;
  }
  if (page.title.includes(siteConfig.name)) {
    return page.title;
  }
  return `${page.title} | ${siteConfig.name}`;
}

export function buildPageMetadata(page: PageSeo): Metadata {
  const canonical = absoluteUrl(page.path);
  const resolvedTitle = resolvePageTitle(page);
  const description = page.socialDescription ?? page.description;
  const socialTitle = page.socialTitle ?? resolvedTitle;

  return {
    title: { absolute: resolvedTitle },
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: socialTitle,
      description,
      images: [
        {
          url: getOpenGraphImage(page.path),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} social preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [getTwitterImage(page.path)],
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

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": schemaOrganizationId(),
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon"),
    },
    ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
    founder: founders.map((founder) => ({
      "@id": founderPersonId(founder.name),
    })),
    knowsAbout: [
      "B2B software",
      "Member community platforms",
      "Alumni association software",
      "Last-mile delivery optimization",
      "Route optimization software",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        url: absoluteUrl("/contact"),
        availableLanguage: ["English"],
      },
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": schemaWebSiteId(),
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": schemaOrganizationId() },
  };
}

export function buildWebPageJsonLd(
  page: PageSeo,
  options?: { mainEntityId?: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": schemaWebPageId(page.path),
    name: resolvePageTitle(page),
    description: page.description,
    url: absoluteUrl(page.path),
    isPartOf: { "@id": schemaWebSiteId() },
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

/** Product cards on the home page — aligns with visible ChapterSys / PrimeRoute links. */
export function buildHomeItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl("/")}#product-list`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ChapterSys",
        item: absoluteUrl("/chaptersys"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Avernsys PrimeRoute",
        item: absoluteUrl("/primeroute"),
      },
    ],
  };
}

export function buildFounderPersonJsonLd(person: (typeof founders)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderPersonId(person.name),
    name: person.name,
    jobTitle: person.role,
    description: person.bio,
    worksFor: { "@id": schemaOrganizationId() },
  };
}

export function buildAllFoundersPersonJsonLd() {
  return founders.map((f) => buildFounderPersonJsonLd(f));
}

export function buildBreadcrumbJsonLd(items: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

const chapterSysFeatureList = [
  "Private community spaces for organizations and alumni",
  "Member business discovery on an interactive map",
  "Direct messaging, group chats, and community channels",
  "Events and member profiles in one place",
] as const;

const primeRouteFeatureList = [
  "Last-mile route optimization from your orders",
  "Faster deliveries and lower operational cost",
  "Web-based workflow for delivery teams",
] as const;

export function buildSoftwareApplicationJsonLd(page: PageSeo) {
  const category =
    page.path === "/chaptersys"
      ? "BusinessApplication"
      : "LogisticsApplication";

  const featureList =
    page.path === "/chaptersys"
      ? [...chapterSysFeatureList]
      : [...primeRouteFeatureList];

  const applicationSubCategory =
    page.path === "/chaptersys"
      ? "Member community software"
      : "Last-mile delivery software";

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": schemaSoftwareApplicationId(page.path),
    name: page.path === "/chaptersys" ? "ChapterSys" : "PrimeRoute",
    applicationCategory: category,
    applicationSubCategory,
    operatingSystem: "Web",
    description: page.description,
    featureList,
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
  return Object.values(pageSeo).map((page) => ({
    ...page,
    url: absoluteUrl(page.path),
  }));
}
