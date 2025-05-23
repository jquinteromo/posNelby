/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "http://localhost:3000", 
    "http://192.168.56.1:3000" // Permite también la IP de tu red local
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(otf|ttf|woff|woff2|eot)$/,
      type: "asset/resource",
      generator: {
        filename: "fonts/[name][ext]",
      },
    });
    return config;
  },
};

module.exports = nextConfig;
