"use client"

import { useState, type FormEvent } from "react"

export function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    terms: false,
    privacy: false,
    updates: false,
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // For now, open mailto with prefilled data
    const subject = encodeURIComponent("Butr Waitlist Request")
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nI would like to join the Butr waitlist.\n\nAgreed to terms: Yes\nAgreed to privacy: Yes\nProduct updates: ${formData.updates ? "Yes" : "No"}`
    )

    window.location.href = `mailto:hello@butr.app?subject=${subject}&body=${body}`
    setStatus("success")
  }

  const isValid = formData.name && formData.email && formData.terms && formData.privacy

  return (
    <section id="waitlist" className="px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
              Get early access
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight tracking-tight mb-4">
              Join the waitlist
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Be among the first to try Butr when we launch. No spam, just product updates.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3.5 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  className="mt-0.5 w-5 h-5 rounded border-border accent-primary cursor-pointer"
                />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the{" "}
                  <a href="/terms" className="text-foreground underline underline-offset-2 hover:text-accent">
                    Terms of use
                  </a>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="privacy"
                  required
                  checked={formData.privacy}
                  onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                  className="mt-0.5 w-5 h-5 rounded border-border accent-primary cursor-pointer"
                />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  I have read the{" "}
                  <a href="/privacy" className="text-foreground underline underline-offset-2 hover:text-accent">
                    Privacy notice
                  </a>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="updates"
                  checked={formData.updates}
                  onChange={(e) => setFormData({ ...formData, updates: e.target.checked })}
                  className="mt-0.5 w-5 h-5 rounded border-border accent-primary cursor-pointer"
                />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  Send me product updates (optional)
                </span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!isValid}
              className="w-full px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full text-base hover:bg-accent transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Request early access
            </button>

            {status === "success" && (
              <p className="text-center text-sm text-muted-foreground">
                Your email app should open with a prefilled request. Just hit send.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
