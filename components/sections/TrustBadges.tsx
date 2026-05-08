'use client'

import { motion } from 'framer-motion'
import { Truck, Shield, Zap, Award } from 'lucide-react'

const badges = [
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    desc: 'We deliver to all 36 states',
  },
  {
    icon: Shield,
    title: 'Secure Communication',
    desc: 'Private & encrypted WhatsApp',
  },
  {
    icon: Zap,
    title: 'Fast WhatsApp Support',
    desc: 'Response within minutes',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    desc: '100% authentic products',
  },
]

export function TrustBadges() {
  return (
    <section className="py-10 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left"
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(37, 211, 102, 0.1)' }}
              >
                <badge.icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{badge.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
