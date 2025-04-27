"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, User } from "lucide-react"

export function UserProfile() {
  const { user, signOut, loading } = useAuth()
  const t = useTranslations("Auth")

  if (!user) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
      data-aos="fade-up"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">{t("profile")}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-primary/10">
            <User className="h-10 w-10 text-primary/80" />
          </div>
          
          <div className="text-center space-y-1">
            <h3 className="text-lg font-medium">{user.displayName || t("user")}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          
          <div className="w-full mt-6 space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{t("emailVerified")}</span>
              <span className="text-sm">
                {user.emailVerified 
                  ? <span className="text-green-500">{t("yes")}</span> 
                  : <span className="text-red-500">{t("no")}</span>}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">{t("accountCreated")}</span>
              <span className="text-sm">
                {user.metadata?.creationTime 
                  ? new Date(user.metadata.creationTime).toLocaleDateString() 
                  : t("unknown")}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            variant="destructive" 
            onClick={signOut}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("signOut")}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
} 