"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

// Product type definition
type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
  type: string
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Round Neck Tshirt",
    category: "Tshirt",
    price: 400,
    image: "/placeholder.svg?height=300&width=300",
    type: "Tshirt",
  },
  {
    id: 2,
    name: "Round Neck Tshirt",
    category: "Tshirt",
    price: 400,
    image: "/placeholder.svg?height=300&width=300",
    type: "Tshirt",
  },
  {
    id: 3,
    name: "Round Neck Tshirt",
    category: "Tshirt",
    price: 400,
    image: "/placeholder.svg?height=300&width=300",
    type: "Tshirt",
  },
  {
    id: 4,
    name: "Round Neck Tshirt",
    category: "Tshirt",
    price: 400,
    image: "/placeholder.svg?height=300&width=300",
    type: "Tshirt",
  },
  {
    id: 5,
    name: "Hoodie Classic",
    category: "Hoodies",
    price: 800,
    image: "/placeholder.svg?height=300&width=300",
    type: "Hoodies",
  },
  {
    id: 6,
    name: "Winter Sweather",
    category: "Sweathers",
    price: 600,
    image: "/placeholder.svg?height=300&width=300",
    type: "Hoodies",
  },
  {
    id: 7,
    name: "Art Keychain",
    category: "Keychain",
    price: 150,
    image: "/placeholder.svg?height=300&width=300",
    type: "Keychain",
  },
  {
    id: 8,
    name: "Premium Hoodie",
    category: "Hoodies",
    price: 950,
    image: "/placeholder.svg?height=300&width=300",
    type: "Hoodies",
  },
]

// Filter categories with their border colors
const filterCategories = [
  { name: "All", borderColor: "border-white", bgColor: "bg-white" },
  { name: "Tshirt", borderColor: "border-red-500", bgColor: "bg-red-500" },
  { name: "Hoodies", borderColor: "border-blue-500", bgColor: "bg-blue-500" },
  { name: "Sweathers", borderColor: "border-green-500", bgColor: "bg-green-500" },
  { name: "Keychain", borderColor: "border-purple-500", bgColor: "bg-purple-500" },
]

// Sort options
const sortOptions = ["Price Low to High", "Price High to Low", "Newest First", "Oldest First"]

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [showSortOptions, setShowSortOptions] = useState(false)

  // Filter and sort products when category or sort option changes
  useEffect(() => {
    let result = [...products]

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Apply sorting
    if (sortBy === "Price Low to High") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "Price High to Low") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "Newest First") {
      result.sort((a, b) => b.id - a.id)
    } else if (sortBy === "Oldest First") {
      result.sort((a, b) => a.id - b.id)
    }

    setFilteredProducts(result)
  }, [selectedCategory, sortBy])

  return (
    <main className="mt-20 min-h-screen bg-black text-white p-4 md:px-9 lg:px-16">
      <div className=" mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Explore My Exclusive Merchandise</h1>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            {filterCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full border ${category.borderColor} transition-colors duration-300 ${
                  selectedCategory === category.name ? category.bgColor + " text-black" : "bg-transparent text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              className="flex items-center space-x-2 text-sm"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              <span>Sort by: {sortBy}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${showSortOptions ? "rotate-180" : ""}`}
              />
            </button>

            {showSortOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-zinc-800 ${
                      sortBy === option ? "bg-zinc-800" : ""
                    }`}
                    onClick={() => {
                      setSortBy(option)
                      setShowSortOptions(false)
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-zinc-900 rounded-md overflow-hidden">
              <div className="bg-gray-200 aspect-square relative">
                <Image src={product.image || "/placeholder.svg"} alt={product.name}  className="object-cover" height={300} width={300}/>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-xs text-gray-400">{product.type}</p>
                <p className="mt-2">Rs {product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl">No products found in this category.</p>
          </div>
        )}
      </div>
    </main>
  )
}

