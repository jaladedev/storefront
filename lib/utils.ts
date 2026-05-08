import { storeConfig } from '@/config/store'

export function generateWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

export function generateOrderLink(productName: string, price?: number): string {
  const message = price
    ? `Hello! I'd like to order *${productName}* (₦${formatPrice(price)}). Please let me know availability and how to proceed.`
    : `Hello! I'd like to order *${productName}*. Please let me know availability and how to proceed.`
  return generateWhatsAppLink(storeConfig.whatsappNumber, message)
}

export function generateGeneralInquiryLink(): string {
  const message = `Hello! I'd like to browse your products and learn more about what you offer.`
  return generateWhatsAppLink(storeConfig.whatsappNumber, message)
}

export function generateContactLink(subject?: string): string {
  const message = subject
    ? `Hello! I have a question about: ${subject}`
    : `Hello! I'd like to get in touch.`
  return generateWhatsAppLink(storeConfig.whatsappNumber, message)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'

export function getImageSrc(src: string | undefined | null): string {
  if (!src || src === '') return FALLBACK_IMAGE
  return src
}
