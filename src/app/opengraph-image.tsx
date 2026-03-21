import { ImageResponse } from "next/og";
import { ShareImage } from "./_seo/share-image";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Avernsys homepage preview";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <ShareImage
        eyebrow="Technology that connects people and operations"
        title="Avernsys"
        description="Two products, one vision. ChapterSys connects organizations. PrimeRoute solves last-mile delivery."
        tone="neutral"
        highlights={[
          {
            label: "ChapterSys",
            title: "Connected communities",
            description: "Private social networking for organizations and alumni.",
          },
          {
            label: "PrimeRoute",
            title: "Smarter delivery routes",
            description: "Optimize last-mile logistics in seconds.",
          },
          {
            label: "Avernsys",
            title: "Built for what's next",
            description: "Modern product design for practical operations.",
          },
        ]}
      />
    ),
    size
  );
}
