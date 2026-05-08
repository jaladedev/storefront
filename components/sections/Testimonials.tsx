'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/data'

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: 'var(--color-primary)' }}
          >
            Customer Reviews
          </span>
          <h2
            className="mt-2 text-4xl font-bold text-gray-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What Our Customers Say
          </h2>
          {/* Average Rating */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xl font-bold text-gray-900">4.9</span>
            <span className="text-gray-500 text-sm">(1,200+ reviews)</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Quote icon */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-10"
                style={{ background: 'var(--color-primary)' }}
              >
                <Quote className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.message}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: 'var(--color-primary)' }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location} · {t.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
