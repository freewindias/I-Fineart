"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { toast } from "react-hot-toast"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = login(username, password)

    if (success) {
      toast.success("Login successful!")
      router.push("/store")
    } else {
      toast.error("Invalid credentials. Try username: user, password: user")
      setIsLoading(false)
    }
  }

  return (
    <main className="mt-20 min-h-screen bg-black text-white p-4 md:p-6 pt-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Login / Signup</h1>
        <div className="bg-zinc-900 rounded-lg p-8">
          <p className="text-center mb-8">Login or create an account to continue</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your username (use: user)"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your password (use: user)"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-medium py-2 rounded-lg disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Demo credentials: username: <strong>user</strong>, password: <strong>user</strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

