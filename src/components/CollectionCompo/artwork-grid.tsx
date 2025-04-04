import Image from "next/image"
import Link from "next/link"
import { getAllArtworkSeries } from "@/lib/artwork-data"

export default function ArtworkGrid() {
  const artworkSeries = getAllArtworkSeries()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworkSeries.map((series) => (
        <Link key={series.id} href={`/collection/${series.slug}`} className="block">
          <div className="bg-gray-200 rounded-md p-4 transition-transform hover:scale-[1.02]">
            <h3 className="text-black font-medium mb-3">Series: {series.title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {series.artworks.slice(0, 4).map((artwork, index) => (
                <div key={index} className="bg-white rounded-md overflow-hidden aspect-square">
                  <Image
                    src={artwork.src || "/placeholder.svg"}
                    alt={`Artwork from ${series.title} series`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

