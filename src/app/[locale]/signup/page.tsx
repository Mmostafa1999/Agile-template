"use client"

import { SignUpForm } from "@/components/auth/SignUpForm"
import { Navigation } from "@/components/Navigation"

export default function SignUpPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto py-12">
        <SignUpForm />
      </div>
    </main>
  )
} 