"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Package, FileText, Download } from "lucide-react"
import HeaderActions from "@/components/StoreCompo/header-actions"
import type { OrderStatus, DispatchStatus } from "@/lib/auth-context"

export default function OrdersPage() {
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
        <div className="max-w-6xl mx-auto">
          <div className="bg-zinc-900 rounded-lg p-8 text-center">
            <p>Please login to view your orders</p>
          </div>
        </div>
      </main>
    )
  }

  // Status badge color mapping
  const orderStatusColors: Record<OrderStatus, string> = {
    Requested: "bg-blue-500",
    "Pending Payment": "bg-yellow-500",
    Confirmed: "bg-green-500",
  }

  const dispatchStatusColors: Record<DispatchStatus, string> = {
    Pending: "bg-gray-500",
    Preparing: "bg-blue-500",
    "In Transit": "bg-yellow-500",
    Delivered: "bg-green-500",
  }

  return (
    <main className="mt-20 min-h-screen bg-black text-white p-4 md:p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">View My Orders</h1>
          <HeaderActions />
        </div>

        {user.orders.length === 0 ? (
          <div className="bg-zinc-900 rounded-lg p-8 text-center">
            <Package size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-xl mb-2">No orders yet</p>
            <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
            <Link href="/store" className="inline-block bg-white text-black px-6 py-3 rounded-lg font-medium">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Order Details</th>
                  <th className="p-4 text-left">Order Status</th>
                  <th className="p-4 text-left">Dispatch Status</th>
                  <th className="p-4 text-left">View Invoice</th>
                </tr>
              </thead>
              <tbody>
                {user.orders.map((order) => (
                  <tr key={order.id} className="border-b border-zinc-800">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">
                      <div className="space-y-2">
                        <p className="font-medium">Date: {order.date}</p>
                        <p>Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                        <p>Total: Rs {order.total}</p>
                        <button
                          className="text-blue-400 text-sm underline"
                          onClick={() => {
                            const orderDetails = document.getElementById(`order-details-${order.id}`)
                            if (orderDetails) {
                              orderDetails.classList.toggle("hidden")
                            }
                          }}
                        >
                          View Details
                        </button>
                        <div id={`order-details-${order.id}`} className="hidden mt-2 pl-2 border-l-2 border-zinc-700">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm mb-2">
                              <p>
                                {item.name} x {item.quantity}
                              </p>
                              <p className="text-gray-400">
                                Size: {item.size}, Color: {item.color}
                              </p>
                              <p>Rs {item.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {order.orderStatus === "Pending Payment" ? (
                        <Link
                          href={`/payment/${order.id}`}
                          className={`px-3 py-1 rounded-full text-sm ${orderStatusColors[order.orderStatus]} cursor-pointer`}
                        >
                          {order.orderStatus}
                        </Link>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm ${orderStatusColors[order.orderStatus]}`}>
                          {order.orderStatus}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${dispatchStatusColors[order.dispatchStatus]}`}>
                        {order.dispatchStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      {order.hasInvoice ? (
                        <div className="flex space-x-2">
                          <Link
                            href={`/invoice/${order.id}`}
                            className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
                            title="View Invoice"
                          >
                            <FileText size={16} />
                          </Link>
                          <button
                            className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
                            title="Download Invoice"
                            onClick={() => alert(`Downloading invoice for order ${order.id}`)}
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">Not available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

