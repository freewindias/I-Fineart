// Product type definitions
export type ProductColor = "Green" | "Black" | "Red" | "White" | "Blue"
export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL"

export type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  type: string
  colors?: { name: ProductColor; hex: string }[]
  sizes?: ProductSize[]
  images?: string[]
  stock?: Record<string, number>
}

// Sample products data
export const products: Product[] = [
  {
    id: "round-neck-tshirt",
    name: "Round Neck Tshirt",
    category: "Tshirt",
    price: 400,
    image: "/placeholder.svg?height=300&width=300",
    type: "UNISEX",
    colors: [
      { name: "Green", hex: "#22c55e" },
      { name: "Black", hex: "#000000" },
      { name: "Red", hex: "#ef4444" },
      { name: "White", hex: "#ffffff" },
      { name: "Blue", hex: "#3b82f6" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    stock: {
      "XS-Green": 0,
      "S-Green": 2,
      "M-Green": 5,
      "L-Green": 3,
      "XL-Green": 1,
      "XXL-Green": 0,
      "XS-Black": 2,
      "S-Black": 3,
      "M-Black": 0,
      "L-Black": 4,
      "XL-Black": 2,
      "XXL-Black": 1,
    },
  },
  {
    id: "premium-tshirt",
    name: "Premium Tshirt",
    category: "Tshirt",
    price: 500,
    image: "/placeholder.svg?height=300&width=300",
    type: "UNISEX",
  },
  {
    id: "graphic-tshirt",
    name: "Graphic Tshirt",
    category: "Tshirt",
    price: 450,
    image: "/placeholder.svg?height=300&width=300",
    type: "UNISEX",
  },
  {
    id: "classic-tshirt",
    name: "Classic Tshirt",
    category: "Tshirt",
    price: 400,
    image: "/placeholder.svg?height=300&width=300",
    type: "UNISEX",
  },
  {
    id: "hoodie-classic",
    name: "Hoodie Classic",
    category: "Hoodies",
    price: 800,
    image: "/placeholder.svg?height=300&width=300",
    type: "UNISEX",
  },
  {
    id: "winter-sweater",
    name: "Winter Sweater",
    category: "Sweathers",
    price: 600,
    image: "/placeholder.svg?height=300&width=300",
    type: "UNISEX",
  },
  {
    id: "art-keychain",
    name: "Art Keychain",
    category: "Keychain",
    price: 150,
    image: "/placeholder.svg?height=300&width=300",
    type: "ACCESSORY",
  },
  {
    id: "premium-hoodie",
    name: "Premium Hoodie",
    category: "Hoodies",
    price: 950,
    image: "/placeholder.svg?height=300&width=300",
    type: "UNISEX",
  },
]

// Get all products
export function getAllProducts() {
  return products
}

// Get a specific product by ID
export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

// Get related products (excluding the current one)
export function getRelatedProducts(id: string, limit = 4) {
  return products.filter((product) => product.id !== id).slice(0, limit)
}

