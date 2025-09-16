'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Globe2, Users } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-sky-600 text-white">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400/20 rounded-full blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
        >
          Welcome to <span className="text-sky-300">RSGRT Institute</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-lg md:text-xl text-sky-100 max-w-2xl mx-auto"
        >
          Empowering researchers, students, and professionals in{' '}
          <span className="font-semibold text-white">
            Geospatial & Environmental Sciences
          </span>{' '}
          through innovative education, training, and applied research.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#courses"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-blue-900 font-semibold shadow hover:bg-gray-100 transition"
          >
            Explore Our Courses <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-sky-500/20 ring-1 ring-white/20 font-medium hover:bg-sky-500/30 transition"
          >
            Learn More
          </a>
        </motion.div>

        {/* Trust / highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-sky-100"
        >
          <div className="flex flex-col items-center gap-2">
            <BookOpen className="w-8 h-8 text-sky-300" />
            <p className="font-semibold">Expert-Led Programs</p>
            <p className="text-sm opacity-80">
              Learn from leading professionals and researchers in the field.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Globe2 className="w-8 h-8 text-sky-300" />
            <p className="font-semibold">Global Relevance</p>
            <p className="text-sm opacity-80">
              Courses designed for local impact with international standards.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Users className="w-8 h-8 text-sky-300" />
            <p className="font-semibold">Community & Collaboration</p>
            <p className="text-sm opacity-80">
              Join a growing network of learners and innovators.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
