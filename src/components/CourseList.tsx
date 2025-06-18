'use client'

import { motion } from 'framer-motion'

const courses = [
  'Python for Geospatial Data',
  'ArcGIS & QGIS Hands-on',
  'Remote Sensing & Satellite Imagery',
  'Flood and Landslide Mapping',
  'Google Earth Engine for Researchers',
  'Machine Learning for Environmental Data',
  'Web Designing Basics',
  'Data Analysis using R and SPSS',
]

export default function CourseList() {
  return (
    <section id="courses" className="py-16 px-4 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Our Popular Courses
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
          Learn cutting-edge geospatial technologies and tools from industry experts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 hover:scale-[1.02] border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 text-center">{course}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
