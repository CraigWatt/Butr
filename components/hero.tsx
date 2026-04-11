"use client"

import { ButrLogo } from "@/components/butr-logo"

export function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-6 md:px-12">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <ButrLogo className="h-10 w-auto text-foreground" />
          <button
            onClick={scrollToWaitlist}
            className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full text-sm hover:bg-accent transition-colors"
          >
            Join waitlist
          </button>
        </nav>
      </header>

      {/* Hero content */}
      <div className="flex-1 flex items-center px-6 md:px-12 pb-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-6">
              AI-first broker control
            </p>

            {/* Headline */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight text-balance mb-8">
              Smooth investing, sharper decisions.
            </h1>

            {/* Supporting copy */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Butr sits between your AI prompts and your Trading 212 ISA. It turns natural language into portfolio-aware previews, approvals, and execution-ready actions. You stay in control.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToWaitlist}
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full text-base hover:bg-accent transition-colors shadow-lg shadow-primary/20"
              >
                Join the waitlist
              </button>
              <button
                onClick={scrollToHowItWorks}
                className="px-8 py-4 bg-card text-foreground font-semibold rounded-full text-base border border-border hover:bg-secondary transition-colors"
              >
                See how it works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative butter accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl pointer-events-none hidden lg:block" />
    </section>
  )
}
