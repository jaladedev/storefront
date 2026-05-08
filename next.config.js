/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  env: {
    STORE_NAME: process.env.STORE_NAME,
    STORE_TAGLINE: process.env.STORE_TAGLINE,
    STORE_DESCRIPTION: process.env.STORE_DESCRIPTION,
    STORE_WHATSAPP: process.env.STORE_WHATSAPP,
    STORE_EMAIL: process.env.STORE_EMAIL,
    STORE_PHONE: process.env.STORE_PHONE,
    STORE_LOGO: process.env.STORE_LOGO,
    STORE_HERO_IMAGE: process.env.STORE_HERO_IMAGE,
    STORE_PRIMARY_COLOR: process.env.STORE_PRIMARY_COLOR,
    STORE_SECONDARY_COLOR: process.env.STORE_SECONDARY_COLOR,
    STORE_INSTAGRAM: process.env.STORE_INSTAGRAM,
    STORE_TIKTOK: process.env.STORE_TIKTOK,
    STORE_FACEBOOK: process.env.STORE_FACEBOOK,
  },
}

module.exports = nextConfig
