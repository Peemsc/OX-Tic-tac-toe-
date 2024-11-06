'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Button disabled>Loading...</Button>
  }

  if (session) {
    return (
      <Button
        onClick={() => signOut({ callbackUrl: '/login' })}
        variant="outline"
      >
        Sign Out
      </Button>
    )
  }

  return (
    <Button
      onClick={() => signIn('google', {
        callbackUrl: '/game',
        redirect: true
      })}
    >
      Sign in with Google
    </Button>
  )
}