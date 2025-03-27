"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function InvoicePage({ params }: { params: { orderId: string } }) {
  const { orderId } = params
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

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

    // If order doesn't have an invoice, redirect to orders page
    if (!order.hasInvoice) {
      router.push("/orders")
    }
  }, [isAuthenticated, order, router])

  if (!isAuthenticated || !order || !order.hasInvoice) {
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
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link href="/orders" className="mr-4">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">Invoice</h1>
          </div>

          <button
            className="flex items-center bg-white text-black px-4 py-2 rounded-lg"
            onClick={() => alert(`Downloading invoice for order ${order.id}`)}
          >
            <Download size={18} className="mr-2" />
            Download PDF
          </button>
        </div>

        <div className="bg-white text-black rounded-lg p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold">INVOICE</h2>
              <p className="text-gray-600">#{order.id}</p>
            </div>

            <div className="text-right">
              <p className="font-bold">I-Fineart Store</p>
              <p>123 Art Street</p>
              <p>Art City, AC 12345</p>
              <p>contact@ifineart.com</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-2">Bill To:</h3>
              <p>{user.name}</p>
              <p>{user.address}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>

            <div className="md:text-right">
              <h3 className="font-bold mb-2">Invoice Details:</h3>
              <p>Invoice Date: {order.date}</p>
              <p>Order Status: {order.orderStatus}</p>
              <p>Dispatch Status: {order.dispatchStatus}</p>
              {order.transactionId && <p>Transaction ID: {order.transactionId}</p>}
            </div>
          </div>

          <table className="w-full mb-8">
            <thead className="border-b-2 border-gray-300">
              <tr>
                <th className="text-left py-2">Item</th>
                <th className="text-center py-2">Quantity</th>
                <th className="text-center py-2">Unit Price</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                        <div className="relative w-full h-full">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Size: {item.size}, Color: {item.color}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-3">{item.quantity}</td>
                  <td className="text-center py-3">Rs {item.price}</td>
                  <td className="text-right py-3">Rs {item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300">
                <td colSpan={3} className="text-right py-3 font-bold">
                  Subtotal:
                </td>
                <td className="text-right py-3">Rs {order.total}</td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right py-3 font-bold">
                  Shipping:
                </td>
                <td className="text-right py-3">Free</td>
              </tr>
              <tr className="font-bold">
                <td colSpan={3} className="text-right py-3">
                  Total:
                </td>
                <td className="text-right py-3">Rs {order.total}</td>
              </tr>
            </tfoot>
          </table>

          <div className="border-t-2 border-gray-300 pt-6">
            <h3 className="font-bold mb-2">Notes:</h3>
            <p className="text-gray-600">
              Thank you for your purchase! If you have any questions about this invoice, please contact our customer
              support.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

