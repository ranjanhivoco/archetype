/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['careerarchetypes.s3.ap-south-1.amazonaws.com','s3-alpha-sig.figma.com'],
  },

  reactStrictMode: true,
};

export default nextConfig;

