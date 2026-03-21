import { ImageResponse } from "next/og";
import { ShareImage } from "../_seo/share-image";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "ChapterSys social preview";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <ShareImage
        eyebrow="ChapterSys"
        title="Your organization, connected."
        description="Private community software for alumni networks, member discovery, and verified business listings."
        tone="amber"
        highlights={[
          {
            label: "Private spaces",
            title: "Members only",
            description: "Keep your chapter or organization focused and verified.",
          },
          {
            label: "Discovery",
            title: "Find alumni businesses",
            description: "Support trusted people and services inside your network.",
          },
          {
            label: "Community",
            title: "Stay connected",
            description: "Groups, events, and messaging in one place.",
          },
        ]}
      />
    ),
    size
  );
}
