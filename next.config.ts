
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'source.unsplash.com',
      'unsplash.com', // optional fallback
       'media.istockphoto.com',
    ],
  },
}

module.exports = nextConfig

