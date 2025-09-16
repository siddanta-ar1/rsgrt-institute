'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export type NewsItem = {
  id?: string
  title: string
  description?: string
  image_url?: string
  external_link: string
  published_at?: string // optional ISO date
  source?: string
}

export default function NewsCard({
  title,
  description,
  image_url,
  external_link,
  published_at,
  source,
}: NewsItem) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const reduceMotion = useReducedMotion()

  // Small formatted date (if provided)
  const formattedDate = published_at ? new Date(published_at).toLocaleDateString() : null

  return (
    <motion.article
      layout
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.995 }}
      className="group rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-lg"
    >
      <Link
        href={external_link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read full article: ${title}`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
      >
        {/* Image area */}
        <div className="relative w-full h-44 sm:h-52 md:h-44 lg:h-48 bg-gradient-to-br from-sky-50 to-indigo-50">
          {/* skeleton / shimmer while image loads */}
          {!imgLoaded && (
            <div
              className="absolute inset-0 animate-pulse"
              aria-hidden
            >
              <div className="w-full h-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
            </div>
          )}

          <Image
            src={image_url || '/placeholder.jpg'}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className={`transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoadingComplete={() => setImgLoaded(true)}
            priority={false}
          />

          {/* subtle gradient overlay for legibility of potential captions */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm md:text-base font-semibold text-slate-900 line-clamp-2">
              {title}
            </h3>

            {/* small meta (date / source) */}
            <div className="text-xs text-slate-500 text-right whitespace-nowrap">
              {source && <div className="mb-1">{source}</div>}
              {formattedDate && <div>{formattedDate}</div>}
            </div>
          </div>

          {description ? (
            <p className="mt-2 text-sm text-slate-700 line-clamp-3">{description}</p>
          ) : (
            <p className="mt-2 text-sm text-slate-700 opacity-80">Read the full story on the source site.</p>
          )}

          <div className="mt-4 flex items-center justify-between gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium px-2 py-1"
              aria-hidden
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-90" aria-hidden>
                <path d="M3 12h18" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3v18" stroke="#6366f1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Focus
            </span>

            <span className="ml-auto inline-flex items-center gap-1 text-xs text-slate-600">
              <span className="sr-only">Opens in new tab</span>
              <ExternalLink className="w-4 h-4 text-slate-600" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
