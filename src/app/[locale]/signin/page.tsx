"use client"

import { SignInForm } from "@/components/auth/SignInForm"
import { Navigation } from "@/components/Navigation"

export default function SignInPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto py-12">
        <SignInForm />
      </div>
    </main>
  )
} 