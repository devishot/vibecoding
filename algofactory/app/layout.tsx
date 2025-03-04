import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Algorithms Course",
  description: "Online algorithms course platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <nav className="flex items-center space-x-4 lg:space-x-6">
                <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
                  Home
                </a>
                <a
                  href="/course"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Course
                </a>
                <a
                  href="/profile"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Profile
                </a>
                <a
                  href="/leaderboard"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Leaderboard
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t">
            <div className="container flex h-14 items-center">
              <p className="text-sm text-muted-foreground">© 2024 Algorithms Course. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

