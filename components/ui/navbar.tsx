'use client'

import { useSession, signOut } from "next-auth/react"
import { Button } from "./button"
import Image from "next/image"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#0a192f] border-b border-gray-800/50">
      <div className="h-full max-w-7xl mx-auto px-4 flex justify-between items-center">
        <span className="text-white text-lg font-semibold">OX Game</span>
        
        {session?.user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {session.user.image && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    fill
                    sizes="32px"
                    className="object-cover"
                    referrerPolicy="no-referrer" 
                  />
                </div>
              )}
              <div className="hidden sm:block">
                <p className="text-white text-sm">{session.user.name}</p>
                <p className="text-gray-400 text-xs">{session.user.email}</p>
              </div>
            </div>
            <Button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}