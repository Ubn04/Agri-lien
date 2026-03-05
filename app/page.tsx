import Link from 'next/link'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturesSection } from '@/components/home/features-section'
import { HowItWorks } from '@/components/home/how-it-works'
import { StatsSection } from '@/components/home/stats-section'
import { CTASection } from '@/components/home/cta-section'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen page-transition">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
