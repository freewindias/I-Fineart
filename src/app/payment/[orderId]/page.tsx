"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { toast } from "react-hot-toast"

export default function PaymentPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params
  const { user, isAuthenticated, updateOrderPayment } = useAuth()
  const router = useRouter()

  const [transactionId, setTransactionId] = useState("")
  const [paymentScreenshot, setPaymentScreenshot] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Find the order
  const order = user?.orders.find((o) => o.id === orderId)

  // Redirect if not authenticated or order not found
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (!order) {
      router.push("/orders")
      return
    }

    // If order status is not "Pending Payment", redirect to orders page
    if (order.orderStatus !== "Pending Payment") {
      router.push("/orders")
    }
  }, [isAuthenticated, order, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!transactionId) {
      toast.error("Please enter a transaction ID")
      return
    }

    if (!paymentScreenshot) {
      toast.error("Please upload a payment screenshot")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      updateOrderPayment(orderId, transactionId, paymentScreenshot)
      toast.success("Payment verified successfully!")
      router.push("/orders")
    }, 1500)
  }

  // Mock function for file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to a server
      // Here we just simulate it by setting a placeholder URL
      setPaymentScreenshot("/placeholder.svg?height=400&width=400")
      toast.success("Screenshot uploaded")
    }
  }

  if (!isAuthenticated || !order || order.orderStatus !== "Pending Payment") {
    return (
      <main className="min-h-screen bg-black text-white p-4 md:p-6 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900 rounded-lg p-8 text-center">
            <p>Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-6 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Payment Processing...</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Order ID: {order.id}</h2>

            <div className="space-y-4">
              <p className="font-medium">Order Details:</p>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                      <div className="relative w-full h-full">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                    </div>

                    <div className="ml-4 flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex text-sm text-gray-400">
                        <p>Size: {item.size}</p>
                        <span className="mx-2">•</span>
                        <p>Color: {item.color}</p>
                        <span className="mx-2">•</span>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>

                    <p className="font-medium">Rs {item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total Amount:</span>
                  <span>Rs {order.total}</span>
                </div>
              </div>

              <div className="bg-zinc-800 p-4 rounded-lg">
                <p className="text-yellow-400 font-medium mb-2">Payment Instructions:</p>
                <p className="text-sm">1. Make payment to our UPI ID: payment@example.com</p>
                <p className="text-sm">2. Take a screenshot of the successful payment</p>
                <p className="text-sm">3. Enter the transaction ID and upload the screenshot</p>
                <p className="text-sm">4. Click submit to complete your payment</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-xl font-medium mb-6">Payment Verification</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {paymentScreenshot && (
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Payment Screenshot:</p>
                  <div className="bg-zinc-800 rounded-lg overflow-hidden aspect-square relative">
                    <Image
                      src={paymentScreenshot || "/placeholder.svg"}
                      alt="Payment Screenshot"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="transactionId" className="block text-sm font-medium mb-2">
                  Enter your transaction ID
                </label>
                <input
                  type="text"
                  id="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="e.g. UPI123456789"
                />
              </div>

              <div>
                <label htmlFor="screenshot" className="block text-sm font-medium mb-2">
                  Upload Payment success screenshot
                </label>
                <input type="file" id="screenshot" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <label
                  htmlFor="screenshot"
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-zinc-700"
                >
                  {paymentScreenshot ? "Change Screenshot" : "Select File"}
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !transactionId || !paymentScreenshot}
                className="w-full bg-white text-black font-medium py-3 rounded-lg disabled:opacity-70"
              >
                {isSubmitting ? "Processing..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

