export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  featured: boolean
  inStock: boolean
  rating?: number
  specs?: string[]
  badge?: string
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  productCount: number
  icon: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  message: string
  rating: number
  avatar?: string
  date: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface StoreConfig {
  name: string
  tagline: string
  description: string
  whatsappNumber: string
  email: string
  phone: string
  logo: string | null
  heroImage: string
  primaryColor: string
  secondaryColor: string
  socialLinks: {
    instagram?: string | null
    facebook?: string | null
    tiktok?: string | null
  }
}
