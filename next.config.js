/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "https://web.funnelliner.com/api/",
  },
};

module.exports = nextConfig;
