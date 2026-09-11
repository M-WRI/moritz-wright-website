import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/",
        permanent: false,
      },
      {
        source: "/blog/:slug",
        destination: "/",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "accelerometer=(self), gyroscope=(self), magnetometer=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
