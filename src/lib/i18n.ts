import en from "@/dictionaries/en.json";
import tr from "@/dictionaries/tr.json";

export const locales = ["en", "tr"] as const;

export type Locale = (typeof locales)[number];
export type Dictionary = typeof en;

export const defaultLocale: Locale = "en";

const dictionaries = {
  en,
  tr,
} as const satisfies Record<Locale, Dictionary>;

export const pageKeys = [
  "home",
  "about",
  "contact",
  "chaptersys",
  "primeroute",
] as const;

export type PageKey = (typeof pageKeys)[number];
export type PageLinkKey = PageKey;

export const pageBasePaths: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  chaptersys: "/chaptersys",
  primeroute: "/primeroute",
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizePath(locale: Locale, path: string): string {
  const normalized = path === "/" ? "/" : path.replace(/\/+$/, "");
  if (locale === defaultLocale) {
    return normalized;
  }
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function getPagePath(locale: Locale, pageKey: PageKey): string {
  return localizePath(locale, pageBasePaths[pageKey]);
}

export function getPageLabel(locale: Locale, pageKey: PageKey): string {
  const dictionary = getDictionary(locale);

  if (pageKey === "home") {
    return dictionary.pages.notFound.links.find((item) => item.key === "home")
      ?.label || dictionary.site.name;
  }

  if (pageKey === "chaptersys") {
    return dictionary.pages.home.products.items[0]?.name || "ChapterSys";
  }

  if (pageKey === "primeroute") {
    return dictionary.pages.home.products.items[1]?.name || "PrimeRoute";
  }

  return (
    dictionary.navigation.links.find((item) => item.key === pageKey)?.label ||
    pageKey
  );
}

export function getPathnameLocale(pathname: string): Locale {
  return pathname === "/tr" || pathname.startsWith("/tr/") ? "tr" : "en";
}

export function stripLocaleFromPathname(pathname: string): string {
  if (pathname === "/tr") {
    return "/";
  }
  if (pathname.startsWith("/tr/")) {
    return pathname.slice(3) || "/";
  }
  return pathname || "/";
}

export function switchLocalePathname(
  pathname: string,
  targetLocale: Locale,
): string {
  return localizePath(targetLocale, stripLocaleFromPathname(pathname));
}

export function getAlternateLanguageLinks(path: string) {
  return {
    en: localizePath("en", path),
    tr: localizePath("tr", path),
    "x-default": localizePath(defaultLocale, path),
  };
}
