'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'

const courses = [
  { title: 'Python for Geospatial Data', meta: '8 weeks • Intermediate' },
  { title: 'ArcGIS & QGIS Hands-on', meta: '6 weeks • Beginner → Intermediate' },
  { title: 'Remote Sensing & Satellite Imagery', meta: '10 weeks • Intermediate' },
  { title: 'Flood and Landslide Mapping', meta: '4 weeks • Applied' },
  { title: 'Google Earth Engine for Researchers', meta: '6 weeks • Intermediate' },
  { title: 'Machine Learning for Environmental Data', meta: '8 weeks • Advanced' },
  { title: 'Web Designing Basics', meta: '4 weeks • Beginner' },
  { title: 'Data Analysis using R and SPSS', meta: '6 weeks • Beginner → Intermediate' },
]

export default function CourseList() {
  const reduceMotion = useReducedMotion()

  const container = reduceMotion
    ? {}
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
      }

  const item = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }

  return (
    <section
      id="courses"
      className="py-16 px-4 bg-gradient-to-b from-slate-50 to-sky-50"
      aria-labelledby="courses-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center max-w-3xl mx-auto mb-10">
          <h2 id="courses-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Our Popular Courses
          </h2>
          <p className="mt-3 text-slate-600">
            Learn cutting-edge geospatial technologies and tools from industry experts — hands-on,
            project-focused, and designed for real-world impact.
          </p>
        </header>

        <motion.ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {courses.map((c, i) => (
            <motion.li
              key={c.title}
              variants={item}
              viewport={{ once: true, amount: 0.12 }}
              className="relative"
            >
              <article
                tabIndex={0}
                className="group block h-full bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg transition-transform transform will-change-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
                aria-labelledby={`course-${i}`}
                // subtle lift on hover (disabled when reduced motion)
                style={{
                  transition: reduceMotion ? 'none' : undefined,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-lg bg-indigo-50 flex items-center justify-center ring-1 ring-indigo-100"
                    aria-hidden
                  >
                    <Check className="w-5 h-5 text-indigo-600" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 id={`course-${i}`} className="text-base font-semibold text-slate-900 truncate">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{c.meta}</p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M3 12h18" stroke="#4f46e5" strokeWidth="1.4" strokeLinecap="round" />
                          <path d="M12 3v18" stroke="#4f46e5" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                        Enroll
                      </span>

                      <a
                        href="/courses"
                        className="text-xs text-slate-700 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 rounded px-2 py-1"
                        aria-label={`Learn more about ${c.title}`}
                      >
                        Details →
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-10 text-center">
          <a
            href="/courses"
            className="inline-flex items-center gap-3 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            View all courses
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
