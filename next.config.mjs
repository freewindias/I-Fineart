/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets.aceternity.com"], // Add the hostname here
    unoptimized: true, // Disable the Image Optimization API
  },
  output: "export",
};

export default nextConfig;
