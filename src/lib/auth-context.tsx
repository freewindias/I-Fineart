"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Order status types
export type OrderStatus = "Requested" | "Pending Payment" | "Confirmed"
export type DispatchStatus = "Pending" | "Preparing" | "In Transit" | "Delivered"

export type Order = {
  id: string
  date: string
  items: {
    id: string
    name: string
    price: number
    image: string
    color: string
    size: string
    quantity: number
  }[]
  total: number
  orderStatus: OrderStatus
  dispatchStatus: DispatchStatus
  hasInvoice: boolean
  transactionId?: string
  paymentScreenshot?: string
}

type User = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  orders: Order[]
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
  addOrder: (order: Omit<Order, "id" | "date" | "orderStatus" | "dispatchStatus" | "hasInvoice">) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  updateDispatchStatus: (orderId: string, status: DispatchStatus) => void
  updateOrderPayment: (orderId: string, transactionId: string, paymentScreenshot: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user with sample data
const demoUser: User = {
  id: "user123",
  name: "Demo User",
  email: "user@example.com",
  phone: "+1 234 567 8900",
  address: "123 Demo Street, Example City, 12345",
  orders: [
    {
      id: "ord-001",
      date: "2023-12-15",
      items: [
        {
          id: "round-neck-tshirt",
          name: "Round Neck Tshirt",
          price: 400,
          image: "/placeholder.svg?height=300&width=300",
          color: "Black",
          size: "M",
          quantity: 2,
        },
      ],
      total: 800,
      orderStatus: "Confirmed",
      dispatchStatus: "Delivered",
      hasInvoice: true,
    },
    {
      id: "ord-002",
      date: "2024-03-20",
      items: [
        {
          id: "premium-tshirt",
          name: "Premium Tshirt",
          price: 500,
          image: "/placeholder.svg?height=300&width=300",
          color: "Green",
          size: "L",
          quantity: 1,
        },
      ],
      total: 500,
      orderStatus: "Pending Payment",
      dispatchStatus: "Pending",
      hasInvoice: false,
    },
    {
      id: "ord-003",
      date: "2024-03-25",
      items: [
        {
          id: "hoodie-classic",
          name: "Hoodie Classic",
          price: 800,
          image: "/placeholder.svg?height=300&width=300",
          color: "Black",
          size: "XL",
          quantity: 1,
        },
      ],
      total: 800,
      orderStatus: "Requested",
      dispatchStatus: "Pending",
      hasInvoice: false,
    },
  ],
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Check for existing user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (username: string, password: string) => {
    // Simple authentication - in a real app, this would be an API call
    if (username === "user" && password === "user") {
      setUser(demoUser)
      localStorage.setItem("user", JSON.stringify(demoUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const addOrder = (order: Omit<Order, "id" | "date" | "orderStatus" | "dispatchStatus" | "hasInvoice">) => {
    if (!user) return

    const newOrder: Order = {
      ...order,
      id: `ord-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      orderStatus: "Requested",
      dispatchStatus: "Pending",
      hasInvoice: false,
    }

    const updatedUser = {
      ...user,
      orders: [newOrder, ...user.orders],
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    if (!user) return

    const updatedOrders = user.orders.map((order) => {
      if (order.id === orderId) {
        // If status is confirmed, automatically set hasInvoice to true
        const hasInvoice = status === "Confirmed" ? true : order.hasInvoice
        return { ...order, orderStatus: status, hasInvoice }
      }
      return order
    })

    const updatedUser = { ...user, orders: updatedOrders }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const updateDispatchStatus = (orderId: string, status: DispatchStatus) => {
    if (!user) return

    const updatedOrders = user.orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, dispatchStatus: status }
      }
      return order
    })

    const updatedUser = { ...user, orders: updatedOrders }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const updateOrderPayment = (orderId: string, transactionId: string, paymentScreenshot: string) => {
    if (!user) return

    const updatedOrders = user.orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          orderStatus: "Confirmed" as OrderStatus,
          transactionId,
          paymentScreenshot,
          hasInvoice: true,
        }
      }
      return order
    })

    const updatedUser = { ...user, orders: updatedOrders }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        addOrder,
        updateOrderStatus,
        updateDispatchStatus,
        updateOrderPayment,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

