import { renderLocalizedChapterSysPage } from "@/app/_localized/renderPage";
import { buildPageMetadata } from "@/lib/seo";

const locale = "en" as const;

export const metadata = buildPageMetadata(locale, "chaptersys");

export default function ChapterSysPage() {
  return renderLocalizedChapterSysPage(locale);
}
