import type { MetadataRoute } from "next";
import { getDictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  const dictionary = getDictionary("en");

  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: dictionary.site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#050816",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}
