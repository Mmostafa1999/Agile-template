"use client"

import { Navigation } from "@/components/Navigation"
import HomeIndex from "@/components/pages/HomeIndex"

export function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto py-8">
        <HomeIndex />
      </div>
    </main>
  )
} 