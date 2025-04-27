"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/context/auth-context"
import { ModeToggle } from "@/components/ModeToggle"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function Navigation() {
  const t = useTranslations("Auth")
  const { user, signOut } = useAuth()
  const router = useRouter()

  const links = [
    { href: "/", label: "Home" },
  ]

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/signin")
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    <nav className="flex items-center justify-between py-4 px-6 border-b">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-lg font-bold">
          Next.js i18n App
        </Link>
        <ul className="flex gap-4">
          {links.map((link, i) => (
            <motion.li 
              key={link.href}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              data-aos="fade-down"
              data-aos-delay={i * 100}
            >
       
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <LanguageSwitcher />
        
        {user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                {t("profile")}
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut size={16} />
              {t("signOut")}
            </Button>
          </motion.div>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/signin">{t("signIn")}</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">{t("signUp")}</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
} 