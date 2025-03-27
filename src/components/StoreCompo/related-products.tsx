"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { Product } from "@/lib/product-data"

type RelatedProductsProps = {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const visibleProducts = isMobile ? 1 : 4

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return Math.max(0, products.length - visibleProducts)
      }
      return prev - 1
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev + visibleProducts >= products.length) {
        return 0
      }
      return prev + 1
    })
  }

  // Get visible products with infinite scroll logic
  const getVisibleProducts = () => {
    const result = []
    for (let i = 0; i < visibleProducts; i++) {
      // Use modulo to wrap around the array
      const index = (currentIndex + i) % products.length
      result.push(products[index])
    }
    return result
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {getVisibleProducts().map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="block">
            <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square transition-transform hover:scale-[1.02]">
              <div className="relative w-full h-full">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={handlePrevious}
          className="bg-gray-200 text-black rounded-full p-2 hover:bg-gray-300"
          aria-label="Previous product"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-200 text-black rounded-full p-2 hover:bg-gray-300"
          aria-label="Next product"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}

