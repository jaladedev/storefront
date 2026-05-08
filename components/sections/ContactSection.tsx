'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import { storeConfig } from '@/config/store'
import { generateContactLink, generateGeneralInquiryLink } from '@/lib/utils'

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: 'var(--color-primary)' }}
            >
              Get In Touch
            </span>
            <h2
              className="mt-2 text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              We&apos;re Here to Help
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Have questions about a product? Need help with your order? Our team is available on WhatsApp to assist you instantly.
            </p>

            {/* Contact cards */}
            <div className="space-y-4">
              <a
                href={generateGeneralInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group card-hover"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(37, 211, 102, 0.1)' }}
                >
                  <MessageCircle className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">WhatsApp</p>
                  <p className="text-sm text-gray-500">{storeConfig.phone}</p>
                </div>
                <span
                  className="ml-auto text-sm font-medium"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Chat Now →
                </span>
              </a>

              <a
                href={`tel:${storeConfig.phone}`}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group card-hover"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone Call</p>
                  <p className="text-sm text-gray-500">{storeConfig.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${storeConfig.email}`}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group card-hover"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-50">
                  <Mail className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">{storeConfig.email}</p>
                </div>
              </a>
            </div>

            {/* Social Links */}
            {(storeConfig.socialLinks.instagram || storeConfig.socialLinks.facebook || storeConfig.socialLinks.tiktok) && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-600 mb-3">Follow us</p>
                <div className="flex gap-3">
                  {storeConfig.socialLinks.instagram && (
                    <a
                      href={storeConfig.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all hover:scale-110"
                    >
                      <Instagram className="w-5 h-5 text-pink-500" />
                    </a>
                  )}
                  {storeConfig.socialLinks.facebook && (
                    <a
                      href={storeConfig.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all hover:scale-110"
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                    </a>
                  )}
                  {storeConfig.socialLinks.tiktok && (
                    <a
                      href={storeConfig.socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all hover:scale-110"
                    >
                      <span className="text-lg">🎵</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: WhatsApp CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="rounded-3xl p-8 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' }}
            >
              {/* BG pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-48 h-48 rounded-full border-2 border-white" />
                <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full border-2 border-white" />
              </div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  Ready to Order?
                </h3>
                <p className="text-white/80 mb-6 text-sm leading-relaxed">
                  Start a WhatsApp conversation with us and get your order placed in minutes. We&apos;re online and ready to help!
                </p>

                <a
                  href={generateGeneralInquiryLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-lg"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>

                <p className="text-white/60 text-xs mt-4">
                  ⚡ Usually responds within 5 minutes
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
