# 🛍️ WhatsApp Storefront — Production-Ready Next.js Ecommerce

A premium, mobile-first ecommerce storefront where customers browse products and order directly via WhatsApp. No checkout page required — just seamless WhatsApp-driven commerce.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure environment variables
cp .env.example .env.local

# 3. Edit .env.local with YOUR store details
nano .env.local

# 4. Run development server
npm run dev

# 5. Build for production
npm run build && npm start
```

---

## ⚙️ Environment Variables

Configure your store by editing `.env.local`. **All store identity is env-driven — no hardcoding.**

```env
# Store Identity
STORE_NAME="Your Store Name"
STORE_TAGLINE="Your Tagline Here"
STORE_DESCRIPTION="A short description of your store."

# Contact (WhatsApp number must include country code, no + or spaces)
STORE_WHATSAPP="2348012345678"
STORE_EMAIL="hello@yourstore.com"
STORE_PHONE="+234 801 234 5678"

# Media
STORE_LOGO="/logo.png"                          # Place in /public
STORE_HERO_IMAGE="https://..."                  # Or a local path

# Brand Colors
STORE_PRIMARY_COLOR="#25D366"                   # Main accent color
STORE_SECONDARY_COLOR="#128C7E"                 # Secondary/gradient color

# Social Media (optional — leave blank to hide)
STORE_INSTAGRAM="https://instagram.com/handle"
STORE_TIKTOK="https://tiktok.com/@handle"
STORE_FACEBOOK="https://facebook.com/page"
```

---

## 📦 Adding Your Products

Edit `data/index.ts` and replace the sample products:

```ts
export const products: Product[] = [
  {
    id: 'unique-id-1',              // Unique string ID
    name: 'Product Name',
    description: 'Full description shown on product page',
    price: 25000,                   // Price in your currency (₦ by default)
    images: [
      'https://cdn.example.com/product-1-main.jpg',
      'https://cdn.example.com/product-1-alt.jpg',
    ],
    category: 'electronics',        // Must match a category ID
    featured: true,                  // Shows in featured grid
    inStock: true,
    rating: 4.8,                    // Optional: 1-5
    badge: 'Best Seller',           // Optional: "New", "Hot", "Sale", etc.
    specs: [                        // Optional feature highlights
      'Feature One',
      'Feature Two',
    ],
  },
]
```

### Image Sources
Products support **any image URL**:
- External CDNs (Unsplash, Cloudinary, ImgBB, etc.)
- Supplier product images
- Google Drive direct links
- Your own CDN/hosting
- Local `/public` folder paths

---

## 🗂️ Project Structure

```
storefront/
├── app/
│   ├── layout.tsx              # Root layout + metadata
│   ├── page.tsx                # Homepage
│   └── product/[id]/
│       └── page.tsx            # Product detail page
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── CategorySection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   └── ProductDetailsPage.tsx
│   └── shared/
│       ├── FloatingWhatsAppButton.tsx
│       └── StickyMobileCTA.tsx
├── config/
│   └── store.ts                # ENV-driven store config
├── data/
│   └── index.ts                # Products, categories, FAQs, testimonials
├── lib/
│   └── utils.ts                # WhatsApp link helpers, formatting
├── types/
│   └── index.ts                # TypeScript interfaces
└── styles/
    └── globals.css             # Global styles + CSS variables
```

---

## 📱 WhatsApp Integration

Every order CTA uses the centralized helper:

```ts
import { generateOrderLink, generateGeneralInquiryLink } from '@/lib/utils'

// Product-specific order link
const link = generateOrderLink('Product Name', 25000)
// → "https://wa.me/234XXXXXXXXXX?text=Hello! I'd like to order *Product Name* (₦25,000)..."

// General inquiry
const link = generateGeneralInquiryLink()
```

**To change your WhatsApp number:** Update `STORE_WHATSAPP` in `.env.local`.

---

## 🎨 Customizing the Design

### Colors
Change `STORE_PRIMARY_COLOR` and `STORE_SECONDARY_COLOR` in `.env.local`. These cascade through all CSS variables automatically.

### Currency Symbol
Find `₦` in `components/` files and replace with your currency symbol (e.g., `$`, `£`, `KSh`, `GHS`).

### Categories
Edit `data/index.ts` → `categories` array. Match `id` values with product `category` fields.

### Testimonials & FAQs
Edit `data/index.ts` → `testimonials` and `faqs` arrays.

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```
Add all env variables in the Vercel dashboard under Project Settings → Environment Variables.

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Self-hosted (Node.js)
```bash
npm run build
npm start
# Runs on port 3000
```

---

## 🔧 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 | React framework + App Router |
| TypeScript | Type safety |
| TailwindCSS | Utility-first styling |
| Framer Motion | Animations |
| Next/Image | Optimized images |
| Lucide React | Icons |

---

## 📊 Performance Features

- ✅ Mobile-first responsive design
- ✅ Next.js Image optimization (lazy loading, WebP conversion)
- ✅ Static page generation for product pages
- ✅ Smooth Framer Motion animations
- ✅ CSS variables for zero-JS theming
- ✅ Accessible markup (ARIA labels, semantic HTML)
- ✅ SEO metadata + Open Graph tags

---

## 💡 Tips for Nigerian/African Markets

1. **WhatsApp number format**: Use `234XXXXXXXXXX` (no `+`, no spaces)
2. **Prices**: Stored as integers (₦45000 not ₦45,000.00) — formatted with `formatPrice()`
3. **Images**: Use fast CDNs (Cloudinary free tier works great)
4. **Hero image**: Use a high-contrast image that works on slow connections
5. **Network**: All external resources use lazy loading for low-bandwidth users

---

Built for WhatsApp-first commerce in emerging markets 🌍
