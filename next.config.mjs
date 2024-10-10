/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1kk659jf5ewui.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
