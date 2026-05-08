'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle, Star, ShoppingBag, CheckCircle, XCircle } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, generateOrderLink, getImageSrc } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)
  const orderLink = generateOrderLink(product.name, product.price)

  const imageSrc = imgError
    ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'
    : getImageSrc(product.images[0])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover flex flex-col"
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden product-image-container">
        <div className="relative h-56 sm:h-64">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full text-white shadow"
                style={{ background: 'var(--color-primary)' }}
              >
                {product.badge}
              </span>
            )}
            {!product.inStock && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white bg-red-500 shadow">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {product.category}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2 hover:underline decoration-dotted mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Stock status */}
        <div className="flex items-center gap-1.5 mb-3">
          {product.inStock ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs font-medium text-green-600">In Stock</span>
            </>
          ) : (
            <>
              <XCircle className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-medium text-red-500">Out of Stock</span>
            </>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <p className="text-xl font-bold text-gray-900">₦{formatPrice(product.price)}</p>
          </div>
          <a
            href={orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 whitespace-nowrap ${
              !product.inStock ? 'opacity-50 pointer-events-none' : ''
            }`}
            style={{ background: 'var(--color-primary)' }}
            onClick={e => !product.inStock && e.preventDefault()}
          >
            <MessageCircle className="w-4 h-4" />
            Order
          </a>
        </div>
      </div>
    </motion.div>
  )
}
