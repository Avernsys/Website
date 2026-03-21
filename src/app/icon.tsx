import { ImageResponse } from "next/og";
import { BrandMark } from "./_seo/share-image";

export const runtime = "edge";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
        }}
      >
        <BrandMark tone="amber" size={56} />
      </div>
    ),
    size
  );
}
