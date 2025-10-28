'use client'

import React from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

// --- Data Structure Update ---
// Added 'image', 'alt', and 'href' to create richer, more functional course cards.
const courses = [
  {
    title: 'Python for Geospatial Data',
    meta: '8 weeks • Intermediate',
    image: '/python.jpeg',
    alt: 'Python code on a screen for geospatial analysis',
    href: '/courses/python-geospatial',
  },
  {
    title: 'ArcGIS & QGIS Hands-on',
    meta: '6 weeks • Beginner → Intermediate',
    image: '/arcgis&qgis.jpeg',
    alt: 'ArcGIS and QGIS software logos',
    href: '/courses/arcgis',
  },
  {
    title: 'Remote Sensing & Satellite Imagery',
    meta: '10 weeks • Intermediate',
    image: '/remoteSensing.png',
    alt: 'Satellite image of a coastal area',
    href: '/courses/remote-sensing',
  },
  {
    title: 'Flood and Landslide Mapping',
    meta: '4 weeks • Applied',
    image: '/floodMapping.png',
    alt: 'Digital map showing flood risk zones',
    href: '/courses/hazard-mapping',
  },
  {
    title: 'Google Earth Engine for Researchers',
    meta: '6 weeks • Intermediate',
    image: '/search.png',
    alt: 'Magnifying glass over a map, symbolizing research',
    href: '/courses/gee',
  },
  {
    title: 'Machine Learning for Environmental Data',
    meta: '8 weeks • Advanced',
    image: '/ml.png',
    alt: 'Abstract neural network graphic',
    href: '/courses/machine-learning-environmental',
  },
  {
    title: 'Web Designing Basics',
    meta: '4 weeks • Beginner',
    image: '/webDesign.png',
    alt: 'Website layout and design components',
    href: '/courses/web-design',
  },
  {
    title: 'Data Analysis using R and SPSS',
    meta: '6 weeks • Beginner → Intermediate',
    image: '/r.jpeg',
    alt: 'The R programming language logo on a laptop screen',
    href: '/courses/data-analysis-r-spss',
  },
]

export default function CourseList() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section
      id="courses"
      className="py-16 px-4 bg-slate-50"
      aria-labelledby="courses-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="courses-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Our Popular Courses
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Learn cutting-edge geospatial technologies from industry experts—hands-on,
            project-focused, and designed for real-world impact.
          </p>
        </header>

        {/* Animated Course Grid */}
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {courses.map((course) => (
            <motion.li key={course.title} variants={item}>
              {/* --- Redesigned Course Card --- */}
              <article className="group flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-indigo-300 hover:-translate-y-1.5 overflow-hidden">
                {/* 1. Image Banner */}
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* 2. Card Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">
                    {course.meta}
                  </span>
                  <h3 className="text-md font-bold text-slate-900 flex-grow leading-snug">
                    <a href={course.href} className="focus:outline-none">
                      {/* Makes the entire card clickable */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {course.title}
                    </a>
                  </h3>
                  <div className="mt-4 text-sm font-semibold text-indigo-600 flex items-center gap-1.5 group-hover:text-indigo-800 transition-colors">
                    View Details
                    <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <a
            href="/courses"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 transform hover:scale-105"
          >
            Explore All Courses
          </a>
        </div>
      </div>
    </section>
  )
}