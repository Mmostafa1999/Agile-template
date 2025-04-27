"use client"

import { UserProfile } from "@/components/auth/UserProfile"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { Navigation } from "@/components/Navigation"

export default function ProfilePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto py-12">
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      </div>
    </main>
  )
} 