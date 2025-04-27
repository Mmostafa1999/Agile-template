"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { 
  User, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth"
import { FirebaseError } from "firebase/app"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"

interface AuthUser extends User {
  displayName: string | null
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const t = useTranslations("Auth")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // User is signed in
        const userDocRef = doc(db, "users", authUser.uid)
        const userDoc = await getDoc(userDocRef)
        
        if (userDoc.exists()) {
          // Set user from Firestore data
          setUser(authUser as AuthUser)
        } else {
          // Create a new user document if it doesn't exist
          const userData = {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            createdAt: new Date().toISOString()
          }
          await setDoc(userDocRef, userData)
          setUser(authUser as AuthUser)
        }
      } else {
        // User is signed out
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Create user document in Firestore
      const userDocRef = doc(db, "users", user.uid)
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName,
        createdAt: new Date().toISOString()
      })

      toast({
        title: t("signUpSuccess"),
        description: t("welcomeMessage"),
      })
    } catch (error: unknown) {
      let errorMessage = t("unknownError")
      
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = t("emailAlreadyInUse")
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = t("invalidEmail")
        } else if (error.code === 'auth/weak-password') {
          errorMessage = t("weakPassword")
        }
      }
      
      toast({
        title: t("signUpError"),
        description: errorMessage,
        variant: "destructive"
      })
      
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      toast({
        title: t("signInSuccess"),
        description: t("welcomeBack"),
      })
    } catch (error: unknown) {
      let errorMessage = t("unknownError")
      
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          errorMessage = t("invalidCredentials")
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = t("invalidEmail")
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = t("tooManyRequests")
        }
      }
      
      toast({
        title: t("signInError"),
        description: errorMessage,
        variant: "destructive"
      })
      
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user

      // Check if the user document exists in Firestore
      const userDocRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        // Create user document in Firestore for new Google sign-ins
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          createdAt: new Date().toISOString()
        })
      }

      toast({
        title: t("signInSuccess"),
        description: t("welcomeBack"),
      })
    } catch (error: unknown) {
      let errorMessage = t("unknownError")
      
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          errorMessage = t("popupClosed")
        } else if (error.code === 'auth/popup-blocked') {
          errorMessage = t("popupBlocked")
        }
      }
      
      toast({
        title: t("signInError"),
        description: errorMessage,
        variant: "destructive"
      })
      
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await firebaseSignOut(auth)
      toast({
        title: t("signOutSuccess"),
        description: t("comeBackSoon"),
      })
    } catch (error: unknown) {
      toast({
        title: t("signOutError"),
        description: t("unknownError"),
        variant: "destructive"
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setLoading(true)
      await sendPasswordResetEmail(auth, email)
      toast({
        title: t("resetPasswordSuccess"),
        description: t("resetPasswordEmailSent"),
      })
    } catch (error: unknown) {
      let errorMessage = t("unknownError")
      
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/user-not-found') {
          errorMessage = t("userNotFound")
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = t("invalidEmail")
        }
      }
      
      toast({
        title: t("resetPasswordError"),
        description: errorMessage,
        variant: "destructive"
      })
      
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 