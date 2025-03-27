"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { toast } from "react-hot-toast"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { isAuthenticated, addOrder } = useAuth()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const router = useRouter()

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout")
      router.push("/login")
      return
    }

    setIsCheckingOut(true)

    // Create a new order from cart items
    addOrder({
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      })),
      total: total,
    })

    // Clear the cart
    clearCart()

    // Redirect to orders page
    setTimeout(() => {
      toast.success("Order placed successfully!")
      setIsCheckingOut(false)
      router.push("/orders")
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white p-4 md:p-6 pt-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
          <div className="bg-zinc-900 rounded-lg p-8 text-center">
            <p className="text-xl">Your cart is empty</p>
            <p className="text-gray-400 mt-2">Add some products to your cart to see them here</p>
            <Link href="/store" className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-zinc-800">
                <h2 className="text-xl font-medium">Cart Items ({items.length})</h2>
              </div>

              <div className="divide-y divide-zinc-800">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.color}-${item.size}`}
                    className="p-6 flex flex-col md:flex-row items-start md:items-center"
                  >
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden mb-4 md:mb-0 md:mr-6">
                      <div className="relative w-full h-full">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-400">Color: {item.color}</p>
                      <p className="text-sm text-gray-400">Size: {item.size}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.size, Math.max(1, item.quantity - 1))
                            }
                            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="mx-3">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-4">Rs {item.price * item.quantity}</p>
                          <button onClick={() => removeItem(item.id, item.color, item.size)} className="text-red-500">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-900 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs {total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-zinc-800 pt-4 flex justify-between font-medium">
                  <span>Total</span>
                  <span>Rs {total}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || !isAuthenticated}
                className="w-full bg-white text-black font-medium py-3 rounded-lg mt-6 disabled:opacity-70"
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </button>

              {!isAuthenticated && (
                <p className="text-yellow-500 text-sm mt-2 text-center">
                  Please{" "}
                  <Link href="/login" className="underline">
                    login
                  </Link>{" "}
                  to checkout
                </p>
              )}

              <Link href="/store">
                <p className="text-center text-sm text-gray-400 mt-4 underline">Continue Shopping</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

