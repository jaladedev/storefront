import Link from 'next/link'
import { MessageCircle, Instagram, Facebook, Mail, Phone, ShoppingBag } from 'lucide-react'
import { storeConfig } from '@/config/store'
import { generateGeneralInquiryLink } from '@/lib/utils'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--color-primary)' }}
              >
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span
                className="font-bold text-xl text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {storeConfig.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              {storeConfig.description}
            </p>
            <a
              href={generateGeneralInquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: 'var(--color-primary)' }}
            >
              <MessageCircle className="w-4 h-4" />
              Order on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '#categories', label: 'Categories' },
                { href: '#products', label: 'Products' },
                { href: '#how-it-works', label: 'How It Works' },
                { href: '#testimonials', label: 'Reviews' },
                { href: '#faq', label: 'FAQ' },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={generateGeneralInquiryLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                  {storeConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${storeConfig.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {storeConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${storeConfig.phone}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {storeConfig.phone}
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-5 flex gap-3">
              {storeConfig.socialLinks.instagram && (
                <a href={storeConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {storeConfig.socialLinks.facebook && (
                <a href={storeConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {storeConfig.socialLinks.tiktok && (
                <a href={storeConfig.socialLinks.tiktok} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-sm">
                  🎵
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {year} {storeConfig.name}. All rights reserved.</p>
          <p>Built with ❤️ for WhatsApp commerce</p>
        </div>
      </div>
    </footer>
  )
}
