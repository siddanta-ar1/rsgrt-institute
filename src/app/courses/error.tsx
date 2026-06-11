'use client'

export default function CoursesError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="p-6 mt-10 max-w-6xl mx-auto text-center">
      <p className="text-red-500 mb-4">Failed to load courses.</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
      >
        Try again
      </button>
    </section>
  )
}
