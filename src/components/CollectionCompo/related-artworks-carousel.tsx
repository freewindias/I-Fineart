"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

type RelatedArtwork = {
  id: number
  src: string
  alt: string
}

type RelatedArtworksCarouselProps = {
  artworks: RelatedArtwork[]
  seriesSlug: string
}

export default function RelatedArtworksCarousel({ artworks, seriesSlug }: RelatedArtworksCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const visibleArtworks = isMobile ? 1 : 2

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return Math.max(0, artworks.length - visibleArtworks)
      }
      return prev - 1
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev + visibleArtworks >= artworks.length) {
        return 0
      }
      return prev + 1
    })
  }

  // Get visible artworks with infinite scroll logic
  const getVisibleArtworks = () => {
    const result = []
    for (let i = 0; i < visibleArtworks; i++) {
      // Use modulo to wrap around the array
      const index = (currentIndex + i) % artworks.length
      result.push(artworks[index])
    }
    return result
  }

  if (artworks.length === 0) {
    return <p className="text-black text-center">No other artworks in this series.</p>
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getVisibleArtworks().map((artwork) => (
          <Link key={artwork.id} href={`/artwork/${seriesSlug}/${artwork.id}`} className="block">
            <div className="bg-white rounded-md overflow-hidden aspect-[4/3] transition-transform hover:scale-[1.02]">
              <Image
                src={artwork.src || "/placeholder.svg"}
                alt={artwork.alt}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={handlePrevious}
          className="bg-white text-black rounded-full p-2 hover:bg-gray-800"
          aria-label="Previous artwork"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="bg-white text-black rounded-full p-2 hover:bg-gray-800"
          aria-label="Next artwork"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}

