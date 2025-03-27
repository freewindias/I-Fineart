"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, User, LogOut, UserCircle, Package } from "lucide-react"

export default function HeaderActions() {
  const { isAuthenticated, user, logout } = useAuth()
  const { itemCount } = useCart()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
    router.push("/")
  }

  return (
    <div className="flex items-center space-x-4">
      <Link href="/cart" className="relative p-2 bg-gray-800 rounded-full">
        <ShoppingCart className="text-white" size={20} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {itemCount}
          </span>
        )}
      </Link>

      {isAuthenticated ? (
        <div className="relative">
          <button
            className="bg-transparent border border-white text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <User size={16} />
            <span>{user?.name}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-10">
              <Link
                href="/profile"
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-zinc-800"
                onClick={() => setIsDropdownOpen(false)}
              >
                <UserCircle size={16} className="mr-2" />
                Profile
              </Link>
              <Link
                href="/orders"
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-zinc-800"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Package size={16} className="mr-2" />
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-zinc-800 text-red-400"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className="bg-transparent border border-white text-white px-4 py-2 rounded-lg text-sm">
          Login/Signup
        </Link>
      )}
    </div>
  )
}

