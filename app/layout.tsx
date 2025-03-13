import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "High Five Charity - Care. Connect. Impact.",
  description:
    "High Five is a community platform dedicated to creating meaningful social impact through various campaigns and programs across Africa.",
  keywords: ["charity", "nonprofit", "social impact", "community", "education", "africa", "donation"],
  openGraph: {
    title: "High Five Charity - Care. Connect. Impact.",
    description: "Join us in making a difference through care, connection, and impact.",
    images: "images/logo2.png"
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}