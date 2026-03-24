import { ImageResponse } from "next/og";
import { ShareImage, type ShareTone } from "../../_seo/share-image";
import { getDictionary } from "@/lib/i18n";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const dictionary = getDictionary("tr");
const copy = dictionary.shareImages.chaptersys;

export const alt = dictionary.seo.chaptersys.socialImageAlt;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <ShareImage
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        tone={copy.tone as ShareTone}
        highlights={copy.highlights}
        footer={dictionary.site.tagline}
      />
    ),
    size
  );
}
