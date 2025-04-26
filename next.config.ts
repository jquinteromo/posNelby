/// <reference types="node" />

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com','i.pravatar.cc'], // 👈 SOLO esto
    
  },
};

module.exports = nextConfig;
