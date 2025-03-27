"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react"
import RelatedProducts from "@/components/StoreCompo/related-products"
import { getProductById, getRelatedProducts, type ProductColor, type ProductSize } from "@/lib/product-data"
import { notFound } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import HeaderActions from "@/components/StoreCompo/header-actions"
import { toast } from "react-hot-toast"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const { addItem } = useCart()
  const { isAuthenticated, addOrder } = useAuth()
  const router = useRouter()

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(params.id)

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null)
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [stockAvailable, setStockAvailable] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on the client side before using window
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Update stock availability when color or size changes
  useEffect(() => {
    if (selectedSize && selectedColor && product.stock) {
      const key = `${selectedSize}-${selectedColor}` as keyof typeof product.stock
      setStockAvailable(product.stock[key] || 0)
    } else {
      setStockAvailable(0)
    }
  }, [selectedColor, selectedSize, product.stock])

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (stockAvailable === 0) return
    setQuantity(quantity + 1)
  }

  // Handle image navigation
  const nextImage = () => {
    if (product.images) {
      setCurrentImageIndex((prev) => (prev === product.images!.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (product.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images!.length - 1 : prev - 1))
    }
  }

  const selectThumbnail = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Toggle color selection
  const toggleColorSelection = (color: ProductColor) => {
    if (selectedColor === color) {
      setSelectedColor(null)
    } else {
      setSelectedColor(color)
    }
  }

  // Toggle size selection
  const toggleSizeSelection = (size: ProductSize) => {
    if (selectedSize === size) {
      setSelectedSize(null)
    } else {
      setSelectedSize(size)
    }
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select both color and size")
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    })

    toast.success(`Added ${product.name} to cart!`)
  }

  // Handle buy now
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error("Please login to buy products")
      router.push("/login")
      return
    }

    if (!selectedColor || !selectedSize) {
      toast.error("Please select both color and size")
      return
    }

    // Create a new order
    addOrder({
      items: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity,
        },
      ],
      total: product.price * quantity,
    })

    toast.success("Order placed successfully!")
    router.push("/orders")
  }

  // Default images if product doesn't have specific images
  const productImages = product.images || [product.image, product.image, product.image]

  // Default colors if product doesn't have specific colors
  const productColors = product.colors || [
    { name: "Green" as ProductColor, hex: "#22c55e" },
    { name: "Black" as ProductColor, hex: "#000000" },
  ]

  // Default sizes if product doesn't have specific sizes
  const productSizes = product.sizes || (["S", "M", "L"] as ProductSize[])

  return (
    <main className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header with actions */}
        <div className="flex justify-end p-4">
          <HeaderActions />
        </div>

        {/* Product section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product images */}
          <div className="p-4">
            {/* Main image */}
            <div className="bg-gray-200 rounded-lg overflow-hidden mb-4 aspect-square relative">
              <Image
                src={productImages[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={prevImage}
                className="bg-gray-200 text-black rounded-lg p-2 flex-shrink-0"
                aria-label="Previous image"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="flex space-x-2 overflow-x-auto py-2 flex-grow justify-center">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectThumbnail(index)}
                    className={`bg-gray-200 rounded-lg overflow-hidden w-16 h-16 flex-shrink-0 ${
                      currentImageIndex === index ? "ring-2 ring-white" : ""
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={nextImage}
                className="bg-gray-200 text-black rounded-lg p-2 flex-shrink-0"
                aria-label="Next image"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Product details */}
          <div className="p-4">
            <h1 className="text-4xl font-bold mb-1">{product.name}</h1>
            <p className="text-gray-400 mb-6">{product.category}</p>

            {/* Color selection */}
            <div className="mb-6">
              <h2 className="text-lg mb-2">Color</h2>
              <div className={`flex ${isMobile ? "flex-wrap gap-2" : "space-x-2"}`}>
                {productColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => toggleColorSelection(color.name)}
                    className={`flex items-center space-x-2 bg-gray-200 text-black rounded-full px-4 py-2 ${
                      selectedColor === color.name ? "border-2 border-green-500" : "border-2 border-transparent"
                    }`}
                  >
                    <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }}></span>
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-4">
              <h2 className="text-lg mb-2">Size</h2>
              <div className="flex flex-wrap gap-2">
                {productSizes.map((size) => {
                  const inStock =
                    !product.stock ||
                    (selectedColor &&
                      (product.stock[`${size}-${selectedColor}` as keyof typeof product.stock] || 0) > 0)

                  return (
                    <button
                      key={size}
                      onClick={() => inStock && toggleSizeSelection(size)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        selectedSize === size
                          ? "bg-white text-black border-2 border-green-500"
                          : inStock
                            ? "bg-gray-200 text-black border-2 border-transparent"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed border-2 border-transparent"
                      }`}
                      disabled={!inStock}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Size chart */}
            <button className="text-gray-400 underline mb-6">Size Chart</button>

            {/* Quantity */}
            <div className="mb-6">
              <h2 className="text-lg mb-2">Quantity</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-full bg-gray-200 text-black flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <div className="w-10 h-10 rounded-full bg-gray-200 text-black flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= stockAvailable && stockAvailable > 0}
                  className="w-10 h-10 rounded-full bg-gray-200 text-black flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Buy and Cart buttons */}
            <div className="flex space-x-3 mb-4">
              <button
                className="bg-gray-200 text-black rounded-lg px-6 py-3 font-medium"
                disabled={
                  !selectedSize || !selectedColor || (product.stock && stockAvailable === 0) || !isAuthenticated
                }
                onClick={handleBuyNow}
              >
                Buy Now!
              </button>
              <button
                className="bg-gray-800 text-white rounded-lg px-6 py-3 font-medium border border-white"
                disabled={!selectedSize || !selectedColor || (product.stock && stockAvailable === 0)}
                onClick={handleAddToCart}
              >
                Add to Cart!
              </button>
            </div>

            {/* Availability and login messages */}
            {!isAuthenticated && <p className="text-yellow-500 mb-1">Please login to buy products</p>}
            {selectedSize && selectedColor && product.stock && stockAvailable === 0 && (
              <p className="text-red-500 mb-1">Size Not Available! Out of Stock! 2 Products Remaining..! 😢</p>
            )}
            {selectedSize && selectedColor && (!product.stock || stockAvailable > 0) && (
              <p className="text-green-500 mb-1">Available..! 😊</p>
            )}
            {(!selectedSize || !selectedColor) && <p className="text-gray-400 mb-1">Please select color and size</p>}
          </div>
        </div>

        {/* Related products section */}
        <div className="p-4 border-t border-gray-800 mt-8">
          <h2 className="text-2xl font-bold text-center mb-8">See Something Else ?</h2>
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </main>
  )
}

