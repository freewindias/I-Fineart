"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { getAllProducts } from "@/lib/product-data"
import HeaderActions from "@/components/header-actions"

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

export default function StorePage() {
  const products = getAllProducts()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [filteredProducts, setFilteredProducts] = useState(products)
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
      result.sort((a, b) => b.id.localeCompare(a.id))
    } else if (sortBy === "Oldest First") {
      result.sort((a, b) => a.id.localeCompare(b.id))
    }

    setFilteredProducts(result)
  }, [selectedCategory, sortBy, products])

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Explore My Exclusive Merchandise</h1>
          <HeaderActions />
        </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="block">
              <div className="bg-zinc-900 rounded-md overflow-hidden">
                <div className="bg-gray-200 aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-xs text-gray-400">{product.type}</p>
                  <p className="mt-2">Rs {product.price}</p>
                </div>
              </div>
            </Link>
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

