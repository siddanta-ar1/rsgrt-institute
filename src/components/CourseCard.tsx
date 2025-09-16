// src/components/CourseCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { BookOpen } from 'lucide-react'

type Props = {
  id: string
  title: string
  image_url: string
  syllabus_slug: string
}

export default function CourseCard({ title, image_url, syllabus_slug }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden bg-white hover:shadow-lg transition-shadow"
    >
      <Link
        href={`/courses/${syllabus_slug}`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
        aria-label={`View course: ${title}`}
      >
        {/* Image */}
        <div className="relative h-48 w-full bg-gradient-to-br from-slate-100 to-slate-200">
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-slate-200" aria-hidden />
          )}
          <Image
            src={image_url || '/placeholder.jpg'}
            alt={title}
            fill
            className={`object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoadingComplete={() => setImgLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 ring-1 ring-indigo-100">
            <BookOpen className="w-5 h-5 text-indigo-600" aria-hidden />
          </div>
          <h2 className="text-base font-semibold text-slate-900 leading-snug line-clamp-2">
            {title}
          </h2>
        </div>
      </Link>
    </motion.article>
  )
}
