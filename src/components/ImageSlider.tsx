'use client'

import React, { useEffect,  useState } from 'react'
import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react'
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

// Autoplay plugin for Keen Slider
const AutoplayPlugin: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout>
  let mouseOver = false
  const interval = 2800 // Autoplay interval

  function clearNextTimeout() {
    clearTimeout(timeout)
  }

  function nextTimeout() {
    clearNextTimeout()
    if (mouseOver) return
    timeout = setTimeout(() => {
      slider.next()
    }, interval)
  }

  slider.on('created', () => {
    slider.container.addEventListener('mouseover', () => {
      mouseOver = true
      clearNextTimeout()
    })
    slider.container.addEventListener('mouseout', () => {
      mouseOver = false
      nextTimeout()
    })
    nextTimeout()
  })

  // Reset timer on any user interaction
  slider.on('dragStarted', clearNextTimeout)
  slider.on('animationEnded', nextTimeout)
  slider.on('updated', nextTimeout)
}

export default function ImageSlider() {
  const prefersReducedMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
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
        setCurrent(s.track.details.rel)
      },
      created(s) {
        setCurrent(s.track.details.rel)
      },
    },
    // Use the autoplay plugin if motion is not disabled
    prefersReducedMotion ? [] : [AutoplayPlugin]
  )

  const handleImageClick = (alt: string) => {
    console.log(`Image clicked: ${alt}`)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        instanceRef.current?.next()
      }
      if (e.key === 'ArrowLeft') {
        instanceRef.current?.prev()
      }
    }

    // Attach keydown listener to the window for accessibility
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [instanceRef])

  return (
    <section className="py-12 px-4" aria-label="Our focus areas carousel">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-900">
          Our Focus Areas
        </h2>

        <div
          ref={sliderRef}
          className="keen-slider"
          role="region"
          aria-roledescription="carousel"
          aria-label="Image carousel of focus areas"
        >
          {images.map((img, idx) => (
            <div key={img.src} className="keen-slider__slide flex justify-center">
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
                    priority={idx < 3} // Prioritize loading visible images
                  />
                </div>
                <div className="p-4 text-center bg-white">
                  <p className="text-sm font-medium text-slate-800">{img.alt}</p>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        {instanceRef.current && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white border border-slate-100 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 disabled:opacity-50"
              aria-label="Previous slide"
              disabled={!instanceRef.current?.options.loop && current === 0}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M12 15l-5-5 5-5" stroke="#334155" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`w-3 h-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 transition ${
                    current === idx ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-pressed={current === idx}
                />
              ))}
            </div>

            <button
              onClick={() => instanceRef.current?.next()}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white border border-slate-100 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 disabled:opacity-50"
              aria-label="Next slide"
              disabled={
                !instanceRef.current?.options.loop &&
                current === instanceRef.current.track.details.slides.length - 1
              }
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M8 5l5 5-5 5" stroke="#334155" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}