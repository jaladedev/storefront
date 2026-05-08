export const storeConfig = {
  name: process.env.STORE_NAME || 'LuxeStore',
  tagline: process.env.STORE_TAGLINE || 'Premium Products, Delivered Fast',
  description: process.env.STORE_DESCRIPTION || 'Discover our curated collection of premium products.',
  whatsappNumber: process.env.STORE_WHATSAPP || '2348012345678',
  email: process.env.STORE_EMAIL || 'hello@store.com',
  phone: process.env.STORE_PHONE || '+234 801 234 5678',
  logo: process.env.STORE_LOGO || null,
  heroImage: process.env.STORE_HERO_IMAGE || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
  primaryColor: process.env.STORE_PRIMARY_COLOR || '#25D366',
  secondaryColor: process.env.STORE_SECONDARY_COLOR || '#128C7E',
  socialLinks: {
    instagram: process.env.STORE_INSTAGRAM || null,
    facebook: process.env.STORE_FACEBOOK || null,
    tiktok: process.env.STORE_TIKTOK || null,
  },
}
