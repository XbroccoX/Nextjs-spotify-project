/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "links.papareact.com",
      "platform-lookaside.fbsbx.com",
      "i.scdn.co",
      "mosaic.scdn.co",
      "thisis-images.spotifycdn.com",
      "image-cdn-ak.spotifycdn.com",
    ],
  },
};

module.exports = nextConfig;
