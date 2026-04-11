import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { WhyButr } from "@/components/why-butr"
import { WaitlistForm } from "@/components/waitlist-form"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
      <WhyButr />
      <WaitlistForm />
      <Footer />
    </main>
  )
}
