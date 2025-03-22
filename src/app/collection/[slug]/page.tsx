import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

// Import the artwork data
import { getArtworkSeriesBySlug, getAllArtworkSeries } from "@/lib/artwork-data"

// Generate static params for all artwork series
export async function generateStaticParams() {
  const series = getAllArtworkSeries()
  return series.map((item) => ({
    slug: item.slug,
  }))
}

export default function SeriesDetailPage({ params }: { params: { slug: string } }) {
  const series = getArtworkSeriesBySlug(params.slug)

  // If series not found, show 404
  if (!series) {
    notFound()
  }

  return (
    <main className="mt-20 min-h-screen bg-black p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-200 rounded-lg p-6 md:p-8">
          <div className="flex items-center mb-8">
            <Link
              href="/collection"
              className="bg-white rounded-full p-3 mr-4 inline-flex items-center justify-center"
              aria-label="Back to collection"
            >
              <ArrowLeft size={24} className="text-black" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-black">{series.title}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {series.artworks.map((artwork) => (
              <Link key={artwork.id} href={`/artwork/${series.slug}/${artwork.id}`} className="block">
                <div className="bg-white rounded-md overflow-hidden aspect-square transition-transform hover:scale-[1.02]">
                  <Image
                    src={artwork.src || "/placeholder.svg"}
                    alt={artwork.alt}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

