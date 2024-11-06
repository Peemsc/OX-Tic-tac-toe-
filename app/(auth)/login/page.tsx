import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { AuthButton } from "@/components/auth/auth-button"
import { authOptions } from "@/lib/auth/auth"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/game")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Tic-tac-toe</h1>
        <p className="text-xl">Please sign in to continue</p>
        <AuthButton />
      </div>
    </div>
  )
}