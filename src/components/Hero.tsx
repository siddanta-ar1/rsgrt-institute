'use client'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-sky-600 text-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">RS GRT Institute</h1>
      <p className="text-lg md:text-xl mb-6">
        Empowering Research & Learning in Geospatial and Environmental Sciences
      </p>
      <a
        href="#courses"
        className="inline-block bg-white text-blue-800 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100 transition"
      >
        Explore Our Courses
      </a>
    </section>
  )
}
