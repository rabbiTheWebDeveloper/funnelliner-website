/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "https://staging.funnelliner.com/api/v1",
  },

};

module.exports = nextConfig;
