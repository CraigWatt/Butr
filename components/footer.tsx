import { ButrMark } from "@/components/butr-logo"

export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and tagline */}
          <div className="flex items-center gap-4">
            <ButrMark className="w-10 h-10" />
            <div>
              <p className="font-semibold text-foreground">Butr</p>
              <p className="text-sm text-muted-foreground">Smooth investing, sharper decisions.</p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="mailto:hello@butr.app"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Butr is not affiliated with Trading 212. Trading involves risk. 
            Only use Butr with your own Stocks & Shares ISA account.
          </p>
        </div>
      </div>
    </footer>
  )
}
