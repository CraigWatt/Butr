import { LinkIcon, MessageSquareIcon, CheckCircleIcon, PlayIcon } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Connect Trading 212",
    description: "Link your Stocks & Shares ISA with a secure API key. Your credentials are encrypted at rest.",
    icon: LinkIcon,
  },
  {
    number: "02",
    title: "Ask your AI",
    description: "Use any AI chat client you prefer. Describe what you want to do in plain language.",
    icon: MessageSquareIcon,
  },
  {
    number: "03",
    title: "Review and approve",
    description: "Butr shows you a clear preview of the proposed trade. Nothing happens without your explicit approval.",
    icon: CheckCircleIcon,
  },
  {
    number: "04",
    title: "Execute with confidence",
    description: "Once approved, Butr returns an execution-ready ticket. You decide when and if to act.",
    icon: PlayIcon,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
            How it works
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight tracking-tight">
            From prompt to preview in four steps
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group bg-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-muted-foreground tracking-wider">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-1 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
