"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { ProductColor, ProductSize } from "./product-data"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  color: ProductColor
  size: ProductSize
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, color: ProductColor, size: ProductSize) => void
  updateQuantity: (id: string, color: ProductColor, size: ProductSize, quantity: number) => void
  clearCart: () => void
  itemCount: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Check if item with same id, color and size already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, newItem]
      }
    })
  }

  const removeItem = (id: string, color: ProductColor, size: ProductSize) => {
    setItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.color === color && item.size === size)))
  }

  const updateQuantity = (id: string, color: ProductColor, size: ProductSize, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.color === color && item.size === size ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const total = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

