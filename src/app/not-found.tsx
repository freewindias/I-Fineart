import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-200 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-black mb-4">Not Found</h2>
        <p className="text-gray-700 mb-6">The artwork series you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium">
          Return Home
        </Link>
      </div>
    </div>
  )
}

