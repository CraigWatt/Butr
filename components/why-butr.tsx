import { ShieldIcon, CpuIcon, ZapIcon, ClipboardListIcon } from "lucide-react"

const features = [
  {
    icon: ShieldIcon,
    title: "Keep credentials safe",
    description: "Never hand your broker API keys directly to a chat model. Butr acts as the secure intermediary.",
  },
  {
    icon: CpuIcon,
    title: "Deterministic logic",
    description: "Portfolio calculations stay predictable. AI handles intent, Butr handles precision.",
  },
  {
    icon: ZapIcon,
    title: "Use any AI client",
    description: "ChatGPT, Claude, your own tools. Butr works with any AI that can make HTTP calls.",
  },
  {
    icon: ClipboardListIcon,
    title: "Full audit trail",
    description: "Every preview, approval, and action is logged. Know exactly what happened and when.",
  },
]

export function WhyButr() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
            Why Butr
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight tracking-tight">
            The control layer your ISA deserves
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-5">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
