import { renderLocalizedChapterSysPage } from "@/app/_localized/renderPage";
import { buildPageMetadata } from "@/lib/seo";

const locale = "nl" as const;

export const metadata = buildPageMetadata(locale, "chaptersys");

export default function DutchChapterSysPage() {
  return renderLocalizedChapterSysPage(locale);
}
