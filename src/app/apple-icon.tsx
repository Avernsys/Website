import { ImageResponse } from "next/og";
import { BrandMark } from "./_seo/share-image";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 30%, rgba(245,180,100,0.18) 0%, #050505 55%)",
        }}
      >
        <BrandMark tone="amber" size={156} />
      </div>
    ),
    size
  );
}
