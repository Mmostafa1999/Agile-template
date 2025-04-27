"use client"

import React, { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LoadingScreen } from "@/components/LoadingScreen"

interface LayoutClientWrapperProps {
  children: React.ReactNode
}

export default function LayoutClientWrapper({ children }: LayoutClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
    }

    const handleComplete = () => {
      setIsLoading(false)
    }

    // Add event listeners for route changes
    window.addEventListener("beforeunload", handleStart)
    document.addEventListener("languageChange", handleStart)

    // Cleanup event listeners
    return () => {
      window.removeEventListener("beforeunload", handleStart)
      document.removeEventListener("languageChange", handleComplete)
    }
  }, [router])

  // Reset loading state when pathname changes (navigation complete)
  useEffect(() => {
    setIsLoading(false)
  }, [pathname])

  return (
    <>
      {isLoading && <LoadingScreen />}
      {children}
    </>
  )
} 