'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import { BookOpen, ArrowUpRight } from 'lucide-react'

type Props = {
  id: string
  title: string
  image_url: string | null
  syllabus_slug: string
}

export default function CourseCard({ title, image_url, syllabus_slug }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const reduceMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5   // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    cardRef.current.style.transform =
      `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(4px) scale(1.02)`
    cardRef.current.style.transition = 'transform 0.08s ease-out'
    // Move shine highlight
    const shine = cardRef.current.querySelector<HTMLDivElement>('.card-shine')
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.14) 0%, transparent 65%)`
      shine.style.opacity = '1'
    }
  }, [reduceMotion])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)'
    cardRef.current.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1)'
    const shine = cardRef.current.querySelector<HTMLDivElement>('.card-shine')
    if (shine) shine.style.opacity = '0'
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      className="rounded-2xl overflow-hidden cursor-pointer"
    >
      <Link
        href={`/courses/${syllabus_slug}`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 rounded-2xl"
        aria-label={`View course: ${title}`}
      >
        {/* Image */}
        <div className="relative h-48 w-full bg-linear-to-br from-slate-100 to-slate-200">
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-slate-200" aria-hidden />
          )}
          <Image
            src={image_url || '/placeholder.jpg'}
            alt={title}
            fill
            className={`object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />

          {/* Arrow badge */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>

        {/* Card body */}
        <div className="relative p-4 flex items-start gap-3 bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-xl transition-shadow">
          {/* Shine overlay — moves with cursor */}
          <div
            className="card-shine pointer-events-none absolute inset-0 rounded-b-2xl opacity-0 transition-opacity duration-150"
            aria-hidden
          />

          <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
            <BookOpen className="w-5 h-5 text-indigo-600" aria-hidden />
          </div>
          <h2 className="text-base font-semibold text-slate-900 leading-snug line-clamp-2 mt-0.5">
            {title}
          </h2>
        </div>
      </Link>
    </div>
  )
}
