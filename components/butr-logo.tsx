export function ButrLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <ButrMark className="h-9 w-9" />
      <span className="font-serif text-2xl tracking-tight">Butr</span>
    </div>
  )
}

export function ButrMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Butr"
    >
      {/* Butter pat - clean, dimensional, iconic */}
      {/* Base shadow for depth */}
      <rect
        x="4"
        y="15"
        width="32"
        height="18"
        rx="4"
        fill="#C99B15"
      />
      
      {/* Main butter block */}
      <rect
        x="4"
        y="12"
        width="32"
        height="16"
        rx="4"
        fill="#E8B923"
      />
      
      {/* Top face - lighter for 3D effect */}
      <rect
        x="4"
        y="12"
        width="32"
        height="8"
        rx="4"
        fill="#F5D54A"
      />
      
      {/* Subtle top highlight line */}
      <rect
        x="8"
        y="14"
        width="24"
        height="2"
        rx="1"
        fill="#FFF8DC"
        opacity="0.5"
      />
      
      {/* Side cut/slice detail - makes it look like a butter pat */}
      <path
        d="M30 16 L32 14 L32 22 L30 24 Z"
        fill="#D4A017"
        opacity="0.6"
      />
    </svg>
  )
}

export function ButrWordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Butr"
    >
      <text
        x="0"
        y="24"
        fontFamily="var(--font-serif), Georgia, serif"
        fontSize="28"
        fontWeight="400"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        Butr
      </text>
    </svg>
  )
}
