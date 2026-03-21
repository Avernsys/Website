import { ImageResponse } from "next/og";
import { ShareImage } from "./_seo/share-image";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Avernsys homepage preview";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <ShareImage
        eyebrow="Avernsys"
        title="Built for what's next."
        description="A product company focused on connected organizations and route optimization."
        tone="amber"
        highlights={[
          {
            label: "Product 01",
            title: "ChapterSys",
            description: "Community software for alumni and member networks.",
          },
          {
            label: "Product 02",
            title: "PrimeRoute",
            description: "Route optimization for last-mile operations.",
          },
        ]}
      />
    ),
    size
  );
}
