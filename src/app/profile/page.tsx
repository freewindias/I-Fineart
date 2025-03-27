"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { User, Mail, Phone, MapPin } from "lucide-react"
import HeaderActions from "@/components/StoreCompo/header-actions"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <main className="min-h-screen bg-black text-white p-4 md:p-6 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900 rounded-lg p-8 text-center">
            <p>Please login to view your profile</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-6 pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">My Profile</h1>
          <HeaderActions />
        </div>

        <div className="bg-zinc-900 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-medium">Personal Information</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <User className="mt-1 mr-3 text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="mt-1 mr-3 text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="mt-1 mr-3 text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Phone Number</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="mt-1 mr-3 text-gray-400" size={20} />
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="font-medium">{user.address}</p>
                </div>
              </div>
            </div>

            <button className="mt-8 bg-white text-black px-6 py-2 rounded-lg font-medium">Edit Profile</button>
          </div>
        </div>
      </div>
    </main>
  )
}

