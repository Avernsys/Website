import { ImageResponse } from "next/og";
import { ShareImage } from "../_seo/share-image";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "ChapterSys social preview";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <ShareImage
        eyebrow="ChapterSys"
        title="Your organization, connected."
        description="Built for alumni networks, member discovery, and stronger community relationships."
        tone="amber"
        highlights={[
          {
            label: "Network",
            title: "Verified members",
            description: "Keep the space trusted and exclusive.",
          },
          {
            label: "Tools",
            title: "Events and messaging",
            description: "Give your community one place to gather and act.",
          },
        ]}
      />
    ),
    size
  );
}
