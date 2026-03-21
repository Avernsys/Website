import { ImageResponse } from "next/og";
import { ShareImage } from "../_seo/share-image";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "PrimeRoute social preview";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <ShareImage
        eyebrow="PrimeRoute"
        title="Stop wasting miles."
        description="Route optimization for delivery teams that want speed without guesswork."
        tone="blue"
        highlights={[
          {
            label: "Routing",
            title: "Smarter plans",
            description: "Automatically find better delivery sequences.",
          },
          {
            label: "Ops",
            title: "Lower costs",
            description: "Cut fuel, time, and operational overhead.",
          },
        ]}
      />
    ),
    size
  );
}
