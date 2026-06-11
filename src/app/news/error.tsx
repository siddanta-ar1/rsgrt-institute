'use client'

export default function NewsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 text-center">
      <p className="text-red-500 mb-4">Failed to load news.</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
      >
        Try again
      </button>
    </section>
  )
}
