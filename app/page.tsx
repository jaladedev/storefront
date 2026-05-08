import { getProducts, getCategories, getTestimonials, getFaqs } from '@/lib/db'
import { Navbar } from '@/components/sections/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBadges } from '@/components/sections/TrustBadges'
import { CategorySection } from '@/components/sections/CategorySection'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/sections/Footer'

export const revalidate = 60 // ISR: refresh every 60 seconds

export default async function Home() {
  const [products, categories, testimonials, faqs] = await Promise.all([
    getProducts(), getCategories(), getTestimonials(), getFaqs(),
  ])

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBadges />
      <CategorySection categories={categories} />
      <FeaturedProducts products={products} categories={categories} />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <ContactSection />
      <Footer />
    </main>
  )
}