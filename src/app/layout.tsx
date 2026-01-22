import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import { AuthProvider } from "@/lib/auth/auth-context"
import { AuthModal } from "@/components/auth"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Graded Appliance Hub | Find Graded Appliances Near You",
    template: "%s | Graded Appliance Hub"
  },
  description: "Find graded appliances and appliance repair services across the UK. Compare retailers, read reviews, and save up to 60% on ex-display and B-grade appliances.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest"
}

export const viewport: Viewport = {
  themeColor: "#e85d4c"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  )
}
