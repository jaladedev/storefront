'use client'

import { motion } from 'framer-motion'
import { Search, MessageCircle, Package } from 'lucide-react'
import { generateGeneralInquiryLink } from '@/lib/utils'

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Browse Products',
    description: 'Explore our curated collection of premium products across multiple categories.',
    color: 'from-blue-500 to-purple-600',
  },
  {
    step: '02',
    icon: MessageCircle,
    title: 'Chat on WhatsApp',
    description: 'Click "Order on WhatsApp" and our team responds within minutes to confirm your order.',
    color: 'from-green-400 to-emerald-600',
  },
  {
    step: '03',
    icon: Package,
    title: 'Get Delivered',
    description: 'We process your order and deliver straight to your doorstep, anywhere in Nigeria.',
    color: 'from-orange-400 to-pink-600',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10"
        style={{ background: 'var(--color-primary)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: 'var(--color-primary)' }}
          >
            Simple Process
          </span>
          <h2
            className="mt-2 text-4xl font-bold text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            How It Works
          </h2>
          <p className="mt-3 text-gray-400 max-w-md mx-auto">
            Shop with confidence in just 3 simple steps. No complicated checkout — just WhatsApp!
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Icon container */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg relative z-10`}>
                <step.icon className="w-9 h-9 text-white" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gray-950 border border-gray-700 flex items-center justify-center text-xs font-bold text-gray-300">
                  {i + 1}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <a
            href={generateGeneralInquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-base transition-all hover:scale-105 active:scale-95 wa-pulse"
            style={{ background: 'var(--color-primary)' }}
          >
            <MessageCircle className="w-5 h-5" />
            Start Shopping on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
