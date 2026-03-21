import { ImageResponse } from "next/og";
import { ShareImage } from "../_seo/share-image";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "PrimeRoute social preview";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <ShareImage
        eyebrow="PrimeRoute"
        title="Last-mile delivery, solved."
        description="Turn orders into optimized routes in seconds with an API-first engine built for operational speed."
        tone="blue"
        highlights={[
          {
            label: "Optimization",
            title: "Fewer miles",
            description: "Reduce route waste and deliver more efficiently.",
          },
          {
            label: "Speed",
            title: "Results in seconds",
            description: "Move from manual planning to instant routing.",
          },
          {
            label: "Integration",
            title: "Fits your stack",
            description: "Connect order systems, WMS, or e-commerce flows.",
          },
        ]}
      />
    ),
    size
  );
}
