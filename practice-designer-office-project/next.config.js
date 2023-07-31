/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["firebasestorage.googleapis.com"],
  },
  output: "export",
};

module.exports = nextConfig;
