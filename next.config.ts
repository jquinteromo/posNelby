/// <reference types="node" />

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com','i.pravatar.cc','via.placeholder.com'],
   // 👈 SOLO esto
    
  },
};

module.exports = nextConfig;
