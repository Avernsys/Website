import type { NextConfig } from "next";

const noIndexAssetHeaders = [
  { key: "X-Robots-Tag", value: "noindex, noarchive" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/founders/doruk.jpg",
        destination: "/founders/doruk-yalcin-avernsys-co-founder.jpg",
        permanent: true,
      },
      {
        source: "/founders/murat.jpeg",
        destination: "/founders/murat-baki-avernsys-co-founder.jpeg",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      { source: "/manifest.webmanifest", headers: noIndexAssetHeaders },
      { source: "/icon", headers: noIndexAssetHeaders },
      { source: "/apple-icon", headers: noIndexAssetHeaders },
      { source: "/opengraph-image", headers: noIndexAssetHeaders },
      { source: "/twitter-image", headers: noIndexAssetHeaders },
      { source: "/flowsys/opengraph-image", headers: noIndexAssetHeaders },
      { source: "/flowsys/twitter-image", headers: noIndexAssetHeaders },
      { source: "/:locale/opengraph-image", headers: noIndexAssetHeaders },
      { source: "/:locale/twitter-image", headers: noIndexAssetHeaders },
      {
        source: "/:locale/flowsys/opengraph-image",
        headers: noIndexAssetHeaders,
      },
      {
        source: "/:locale/flowsys/twitter-image",
        headers: noIndexAssetHeaders,
      },
      { source: "/:locale/primeroute/opengraph-image", headers: noIndexAssetHeaders },
      { source: "/:locale/primeroute/twitter-image", headers: noIndexAssetHeaders },
      { source: "/primeroute/opengraph-image", headers: noIndexAssetHeaders },
      { source: "/primeroute/twitter-image", headers: noIndexAssetHeaders },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
