import ArtworkCarousel from '@/components/CollectionCompo/artwork-carousel'
import ArtworkGrid from '@/components/CollectionCompo/artwork-grid'
import React from 'react'

export default function Collection() {
  return (
    <main className="mt-20 min-h-screen bg-black text-white p-4 md:p-6">
      <section className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Latest Art Works:</h2>
        <ArtworkCarousel />
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Artworks</h2>
        <ArtworkGrid />
      </section>
    </main>
  )
}
