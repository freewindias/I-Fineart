import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import {
  getArtworkById,
  getArtworkSeriesBySlug,
  getOtherArtworksInSeries,
  artworkSeries,
} from "@/lib/artwork-data";
import RelatedArtworksCarousel from "@/components/CollectionCompo/related-artworks-carousel";
import OtherSeriesGrid from "@/components/CollectionCompo/other-series-grid";

// Generate static params for all possible artwork paths
export function generateStaticParams() {
  const params: { seriesSlug: string; artworkId: string }[] = [];

  // Loop through all series
  artworkSeries.forEach((series) => {
    // Loop through all artworks in each series
    series.artworks.forEach((artwork) => {
      params.push({
        seriesSlug: series.slug,
        artworkId: artwork.id.toString(),
      });
    });
  });

  return params;
}

export default function ArtworkDetailPage({
  params,
}: {
  params: { seriesSlug: string; artworkId: string };
}) {
  const { seriesSlug, artworkId } = params;
  const series = getArtworkSeriesBySlug(seriesSlug);

  if (!series) {
    notFound();
  }

  const artwork = getArtworkById(series.id, Number.parseInt(artworkId));

  if (!artwork) {
    notFound();
  }

  const otherArtworks = getOtherArtworksInSeries(
    series.id,
    Number.parseInt(artworkId)
  );

  return (
    <main className="mt-20 min-h-screen bg-black p-4 md:p-6">
      <div className="max-w-[1550px] mx-auto">
        <div className="bg-gray-200 rounded-lg p-4 md:pt-4 ">
          {/* Back button */}
          <div className="mb-2">
            <Link
              href={`/collection/${seriesSlug}`}
              className="bg-white rounded-full p-3 inline-flex items-center justify-center"
              aria-label="Back to series"
            >
              <ArrowLeft size={24} className="text-black" />
            </Link>
          </div>

          {/* Main artwork image */}
          <div className="bg-white rounded-md overflow-hidden mb-6">
            <Image
              src={artwork.src || "/placeholder.svg"}
              alt={artwork.alt}
              width={1200}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Artwork details */}
          <div className="mb-10 space-y-1">
            <p className="text-black text-xl font-medium">
              Series: {series.title}
            </p>
            <p className="text-black">Size: {artwork.size || "30 x 40 cm"}</p>
            <p className="text-black">Finish: {artwork.finish || "Matte"}</p>
            <p className="text-black">
              Medium: {artwork.medium || "Acrylic on canvas"}
            </p>
            <div className="flex items-center mt-4">
              <p className="text-black">Want for yourself message here!</p>
              <Link
                href={`https://wa.me/?text=I'm interested in the artwork "${artwork.alt}" from the "${series.title}" series.`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                <MessageCircle className="text-black" />
              </Link>
            </div>
          </div>

          {/* Related artworks carousel */}
          <div className="mb-10">
            <h2 className="text-black text-xl font-medium text-center mb-6">
              View more from the current series
            </h2>
            <RelatedArtworksCarousel
              artworks={otherArtworks}
              seriesSlug={seriesSlug}
            />
          </div>

          {/* Other series */}
          <div>
            <h2 className="text-black text-xl font-medium text-center mb-6">
              View other series
            </h2>
            <OtherSeriesGrid currentSeriesId={series.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
