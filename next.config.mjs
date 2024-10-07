/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bartergram-static-bucket.s3.ap-south-1.amazonaws.com",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
