import Image from "next/image"

// Sample data for artwork series
const artworkSeries = [
  {
    id: 1,
    title: "Enigma of Beauty",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: 2,
    title: "Something Else",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: 3,
    title: "Something Else",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: 4,
    title: "Something Else",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: 5,
    title: "Something Else",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
  {
    id: 6,
    title: "Something Else",
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
  },
]

export default function ArtworkGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworkSeries.map((series) => (
        <div key={series.id} className="bg-gray-200 rounded-md p-4">
          <h3 className="text-black font-medium mb-3">Series: {series.title}</h3>
          <div className="grid grid-cols-2 gap-2">
            {series.images.map((image, index) => (
              <div key={index} className="bg-white rounded-md overflow-hidden aspect-square">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Artwork from ${series.title} series`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

