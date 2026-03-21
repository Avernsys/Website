import type { Metadata } from "next";

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
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/icon"),
    ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
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
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
}

export function buildWebPageJsonLd(page: PageSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: resolvePageTitle(page),
    description: page.description,
    url: absoluteUrl(page.path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
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

export function buildSoftwareApplicationJsonLd(page: PageSeo) {
  const category =
    page.path === "/chaptersys"
      ? "BusinessApplication"
      : "LogisticsApplication";

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.path === "/chaptersys" ? "ChapterSys" : "PrimeRoute",
    applicationCategory: category,
    operatingSystem: "Web",
    description: page.description,
    url: absoluteUrl(page.path),
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
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
