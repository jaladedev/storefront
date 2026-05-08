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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustBadges />
      <CategorySection />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
