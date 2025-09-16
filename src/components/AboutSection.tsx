'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Animated, accessible About section built with Tailwind + Framer Motion.
// Drop this file in your components folder and import it where needed.
// Make sure `framer-motion` is installed: `npm i framer-motion` or `yarn add framer-motion`.

export default function AboutSection() {
  const reduce = useReducedMotion()

  const container = reduce
    ? {}
    : {
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.10,
          },
        },
      }

  const item = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }

  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-20 px-6 bg-gradient-to-b from-slate-50 to-sky-50"
    >
      {/* Decorative colorful blobs — purely visual */}
      <div
        className="pointer-events-none absolute -left-32 -top-20 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-600 via-cyan-400 to-sky-300 opacity-20 filter blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -bottom-24 w-96 h-96 rounded-full bg-gradient-to-br from-amber-400 via-pink-400 to-violet-400 opacity-10 filter blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text column */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="space-y-6"
        >
          <motion.h2
            id="about-heading"
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900"
          >
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-500">RS GRT Institute</span>
          </motion.h2>

          <motion.p variants={item} className="text-lg text-slate-700 leading-relaxed">
            RSGRT Institute is a centre for geospatial, environmental and disaster research
            and training. We deliver hands-on courses in GIS, remote sensing, Python, R and
            applied research methods — upskilling students, researchers and professionals
            across the region.
          </motion.p>

          <motion.ul variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-indigo-600 shadow-sm" aria-hidden="true" />
              Hands-on GIS & Remote Sensing
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-cyan-500 shadow-sm" aria-hidden="true" />
              Practical Python & R for geoscience
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-amber-500 shadow-sm" aria-hidden="true" />
              Short courses & certificated training
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-pink-500 shadow-sm" aria-hidden="true" />
              Applied research & consultancy
            </li>
          </motion.ul>

          <motion.div variants={item}>
            <a
              href="/courses"
              className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 text-white px-5 py-3 rounded-lg shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              Explore Courses
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Visual column */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-xl ring-1 ring-slate-900/5 hover:shadow-2xl transition-shadow duration-300">
            {/* Decorative map-style SVG (lightweight) */}
            <div className="h-56 w-full rounded-lg overflow-hidden bg-gradient-to-br from-sky-50 to-indigo-50 flex items-center justify-center">
              <svg
                width="240"
                height="140"
                viewBox="0 0 240 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="0" y="0" width="240" height="140" rx="12" fill="url(#g)" />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#eef2ff" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <g opacity="0.9">
                  <path d="M20 100 C40 60, 80 60, 100 100" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" fill="none" strokeOpacity="0.9" />
                  <path d="M40 80 C70 40, 120 40, 150 80" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.85" />
                  <circle cx="130" cy="55" r="6" fill="#ef4444" />
                  <circle cx="70" cy="85" r="5" fill="#7c3aed" />
                </g>
              </svg>
            </div>

            <div className="mt-4 text-sm text-slate-600">
              Field-based training, hands-on labs, and project mentoring — tailored to real-world
              geospatial challenges.
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href="/research"
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                Learn about our research
              </a>

              <a
                href="/contact"
                className="ml-auto inline-flex items-center gap-2 text-sm font-medium bg-white border border-slate-200 px-3 py-2 rounded-md shadow-sm hover:bg-slate-50"
              >
                Contact us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
