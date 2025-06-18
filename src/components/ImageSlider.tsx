'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const images = [
  { src: '/coding.jpeg', alt: 'Coding' },
  { src: '/flood.jpeg', alt: 'Flood Mapping' },
  { src: '/r.jpeg', alt: 'R Programming' },
  { src: '/earth.jpeg', alt: 'Google Earth Engine' },
  { src: '/map.jpeg', alt: 'Map Visualization' },
  { src: '/python.jpeg', alt: 'Python for Geo Data' },
]

export default function ImageSlider() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 15 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 20 },
      },
    },
  })

  // Optional: Autoplay for continuous loop effect
  const timer = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    if (!slider.current) return
    const run = () => {
      slider.current?.next()
      timer.current = setTimeout(run, 2500)
    }
    timer.current = setTimeout(run, 2500)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [slider])

  const handleImageClick = (alt: string) => {
    console.log(`Image clicked: ${alt}`)
  }

  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Our Focus Areas</h2>
      <div ref={sliderRef} className="keen-slider">
        {images.map((img, index) => (
          <div key={index} className="keen-slider__slide flex justify-center">
            <div
              className="w-full max-w-[350px] rounded overflow-hidden shadow cursor-pointer"
              onClick={() => handleImageClick(img.alt)}
            >
              <div className="relative w-full h-[200px] bg-gray-100">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 350px) 100vw, 350px"
                  className="rounded"
                  priority
                />
              </div>
              <div className="p-3 text-center text-sm text-gray-700">{img.alt}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
