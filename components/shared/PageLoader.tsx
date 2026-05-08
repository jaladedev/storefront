'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { storeConfig } from '@/config/store'

interface PageLoaderProps {
  minDuration?: number // ms to show loader (default 1800)
}

export function PageLoader({ minDuration = 1800 }: PageLoaderProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), minDuration)
    return () => clearTimeout(timer)
  }, [minDuration])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          {/* Pulsing logo */}
          <div className="relative mb-8">
            {/* Pulse rings */}
            {[0, 0.6, 1.2].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute rounded-2xl border-2"
                style={{
                  borderColor: storeConfig.primaryColor,
                  inset: '-6px',
                }}
                initial={{ opacity: 0.7, inset: '-2px', borderRadius: '20px' }}
                animate={{ opacity: 0, inset: '-20px', borderRadius: '30px' }}
                transition={{
                  duration: 1.8,
                  delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Logo mark */}
            <motion.div
              className="relative w-16 h-16 rounded-[18px] flex items-center justify-center shadow-lg"
              style={{ background: storeConfig.primaryColor }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ShoppingBag className="w-7 h-7 text-white" />
            </motion.div>
          </div>

          {/* Store name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1
              className="text-xl font-bold text-gray-900 mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {storeConfig.name}
            </h1>
            <p className="text-sm text-gray-400">{storeConfig.tagline}</p>
          </motion.div>

          {/* Mini skeleton cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex gap-3 mb-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-[70px] rounded-xl border border-gray-100 overflow-hidden bg-white"
                style={{ height: i === 1 ? '92px' : '84px', marginTop: i === 1 ? '-4px' : '0' }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 1.6, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="h-12 bg-gray-100" />
                <div className="p-1.5 space-y-1">
                  <div className="h-1.5 bg-gray-100 rounded-full" />
                  <div className="h-1.5 bg-gray-100 rounded-full w-1/2" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-48 h-0.5 bg-gray-100 rounded-full overflow-hidden mb-4"
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: storeConfig.primaryColor }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: minDuration / 1000, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>

          {/* WhatsApp badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-gray-50"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: storeConfig.primaryColor }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-xs text-gray-500">WhatsApp orders ready</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
