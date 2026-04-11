import type { Metadata, Viewport } from "next"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Butr - Smooth investing, sharper decisions",
  description:
    "Butr is the AI-native control layer between your AI prompts and your Trading 212 Stocks & Shares ISA. Preview, approve, and execute trades with confidence.",
  openGraph: {
    title: "Butr - Smooth investing, sharper decisions",
    description:
      "The calm control layer between AI and your Trading 212 ISA. Preview trades before they happen.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#FDF6E3",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
