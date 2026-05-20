import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { CategorySection } from '@/components/home/category-section'
import { DealsSection } from '@/components/home/deals-section'
import { FeaturesSection } from '@/components/home/features-section'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <DealsSection />
      <FeaturesSection />
      <Footer />
    </main>
  )
}
