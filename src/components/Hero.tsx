'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Globe2, Users } from 'lucide-react'

const GlobeScene = dynamic(() => import('./GlobeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-2 border-sky-400/40 animate-pulse" />
    </div>
  ),
})

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-950 via-blue-900 to-sky-800 text-white min-h-[90vh] flex items-center">
      {/* Subtle radial glow behind globe */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-150 h-150 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-300 mb-6 bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 rounded-full"
            >
              <Globe2 size={13} />
              Geospatial &amp; Environmental Sciences
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight"
            >
              Welcome to{' '}
              <span className="bg-linear-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent">
                RSGRT Institute
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-5 text-base md:text-lg text-sky-100/80 leading-relaxed max-w-xl"
            >
              Empowering researchers, students, and professionals through
              innovative education, training, and applied research.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-blue-900 font-semibold shadow-lg hover:bg-sky-50 transition-all hover:scale-105"
              >
                Explore Courses <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-sky-500/15 ring-1 ring-white/20 font-medium hover:bg-sky-500/25 transition-all"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {[
                { icon: BookOpen, label: 'Expert-Led Programs' },
                { icon: Globe2, label: 'Global Relevance' },
                { icon: Users, label: 'Community-Driven' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                >
                  <Icon size={12} className="text-sky-300" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D Globe ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
            aria-hidden
          >
            <div className="w-full aspect-square max-w-130 mx-auto">
              <GlobeScene />
            </div>
            {/* Drag hint */}
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-sky-400/50 select-none whitespace-nowrap">
              drag to rotate
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
