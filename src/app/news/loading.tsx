export default function NewsLoading() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="h-10 w-56 bg-gray-200 rounded animate-pulse mx-auto mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
    </section>
  )
}
