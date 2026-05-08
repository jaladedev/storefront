import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products } from '@/data'
import { ProductDetailsPage } from '@/components/products/ProductDetailsPage'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = products.find(p => p.id === id)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0], width: 800, height: 800 }],
    },
  }
}

export function generateStaticParams() {
  return products.map(p => ({ id: p.id }))
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = products.find(p => p.id === id)
  if (!product) notFound()

  return (
    <>
      <Navbar />
      <ProductDetailsPage product={product} />
      <Footer />
    </>
  )
}