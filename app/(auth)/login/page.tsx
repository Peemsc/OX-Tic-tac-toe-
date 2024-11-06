import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AuthButton } from "@/components/auth/auth-button";
import { authOptions } from "@/lib/auth/auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/game");
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[#0a192f]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-10 -left-10 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-10 -right-10 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-6 text-center">
        {/* Game Logo/Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-2xl transform -rotate-12 transition-transform hover:rotate-0">
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
              XO
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Tic-tac-toe
        </h1>

        <p className="text-gray-400 text-lg mb-8 max-w-sm mx-auto">
          Challenge the AI in the ultimate game of strategy. Sign in to start
          your journey!
        </p>

        {/* Features List */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-gray-400">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-blue-500">✓</span> Multiple Difficulties
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-blue-500">✓</span> Track Your Progress
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-blue-500">✓</span> Achievement System
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-blue-500">✓</span> Smart AI Opponent
          </div>
        </div>

        {/* Login Button with enhanced styling */}
        <div className="transform hover:scale-105 transition-transform">
          <AuthButton />
        </div>

        {/* Footer */}
        <div className="mt-8 space-y-2 text-sm">
          <p className="text-gray-400">Built with Next.js & Tailwind CSS</p>
          <p className="text-gray-500">
            Created by{" "}
            <a
              href="https://github.com/Peemsc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              SAHACHAT CHILLANONDA
            </a>
          </p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-blue-500/20"></div>
      <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-purple-500/20"></div>
    </div>
  );
}
