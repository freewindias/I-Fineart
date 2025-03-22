import Image from "next/image"
import Link from "next/link"
import { getAllArtworkSeries } from "@/lib/artwork-data"

type OtherSeriesGridProps = {
  currentSeriesId: number
}

export default function OtherSeriesGrid({ currentSeriesId }: OtherSeriesGridProps) {
  // Get all series except the current one
  const otherSeries = getAllArtworkSeries().filter((series) => series.id !== currentSeriesId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {otherSeries.slice(0, 3).map((series) => (
        <Link key={series.id} href={`/collection/${series.slug}`} className="block">
          <div className="bg-red-200 rounded-md p-4 transition-transform hover:scale-[1.02]">
            <h3 className="text-black font-medium mb-3">Series: {series.title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {series.images.slice(0, 4).map((image, index) => (
                <div key={index} className="bg-white rounded-md overflow-hidden aspect-square">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Artwork from ${series.title} series`}
                    width={150}
                    height={150}
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

