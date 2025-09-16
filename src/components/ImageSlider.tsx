'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'

const images = [
  { src: '/coding.jpeg', alt: 'Coding workshop — hands-on sessions' },
  { src: '/flood.jpeg', alt: 'Flood mapping and hazard assessment' },
  { src: '/r.jpeg', alt: 'R programming for geospatial analysis' },
  { src: '/earth.jpeg', alt: 'Google Earth Engine remote sensing' },
  { src: '/map.jpeg', alt: 'Interactive map visualization' },
  { src: '/python.jpeg', alt: 'Python for geospatial data' },
]

export default function ImageSlider() {
  const prefersReducedMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const autoplayRef = useRef<number | null>(null)
  const pauseRef = useRef(false)

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 16,
      },
      breakpoints: {
        '(min-width: 640px)': {
          slides: { perView: 2, spacing: 18 },
        },
        '(min-width: 1024px)': {
          slides: { perView: 3, spacing: 20 },
        },
      },
      slideChanged(s) {
        setCurrent(s.track.details.rel) // relative index
      },
      created(s) {
        setCurrent(s.track.details.rel)
      },
    },
    []
  )

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      window.clearTimeout(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [])

  const startAutoplay = useCallback(() => {
    if (prefersReducedMotion) return
    clearAutoplay()
    // use window.setTimeout so we can clear by id easily
    const run = () => {
      if (pauseRef.current) {
        // if paused (hover/focus) try again later
        autoplayRef.current = window.setTimeout(run, 1200)
        return
      }
      slider.current?.next()
      autoplayRef.current = window.setTimeout(run, 2800)
    }
    autoplayRef.current = window.setTimeout(run, 2800)
  }, [clearAutoplay, prefersReducedMotion, slider])

  useEffect(() => {
    startAutoplay()
    return () => clearAutoplay()
  }, [startAutoplay, clearAutoplay])

  // Pause on hover / focus
  const handleMouseEnter = () => {
    pauseRef.current = true
    clearAutoplay()
  }
  const handleMouseLeave = () => {
    pauseRef.current = false
    startAutoplay()
  }

  // Keyboard navigation (left/right) for the slider root
  useEffect(() => {
    const root = sliderRef.current
    if (!root) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') slider.current?.next()
      if (e.key === 'ArrowLeft') slider.current?.prev()
    }
    root.addEventListener('keydown', onKey)
    return () => root.removeEventListener('keydown', onKey)
  }, [sliderRef, slider])

  const goTo = (idx: number) => slider.current?.moveToIdx(idx)

  const handleImageClick = (alt: string) => {
    // replace with a modal or lightbox if desired
    console.log(`Image clicked: ${alt}`)
  }

  return (
    <section
      className="py-12 px-4"
      aria-label="Our focus areas carousel"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-900">Our Focus Areas</h2>

        <div
          ref={sliderRef}
          className="keen-slider"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter} // pause when any child gets focus
          onBlur={handleMouseLeave}
          tabIndex={0} // make container focusable for keyboard nav
          role="region"
          aria-roledescription="carousel"
          aria-label="Image carousel of focus areas"
        >
          {images.map((img, idx) => (
            <div
              key={img.src}
              className="keen-slider__slide flex justify-center"
            >
              <article
                className="w-full max-w-[360px] rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition hover:-translate-y-1 focus-within:-translate-y-1"
                onClick={() => handleImageClick(img.alt)}
              >
                <div className="relative w-full h-[220px] bg-slate-50">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-xl"
                    // only the first slide is priority to avoid loading penalty
                    priority={idx === 0}
                  />
                </div>

                <div className="p-4 text-center bg-white">
                  <p className="text-sm font-medium text-slate-800">{img.alt}</p>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-4 mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => slider.current?.prev()}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white border border-slate-100 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
            aria-label="Previous slide"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M12 15l-5-5 5-5" stroke="#334155" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-3 h-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 transition ${
                  current === idx ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-pressed={current === idx}
              />
            ))}
          </div>

          <button
            onClick={() => slider.current?.next()}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white border border-slate-100 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
            aria-label="Next slide"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M8 5l5 5-5 5" stroke="#334155" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
