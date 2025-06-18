'use client'

import Image from 'next/image'
import Link from 'next/link'

type NewsItem = {
  id: string
  title: string
  description: string
  image_url: string
  external_link: string
}

export default function NewsCard({ title, description, image_url, external_link }: NewsItem) {
  return (
    <Link
      href={external_link}
      target="_blank"
      rel="noopener noreferrer"
      className="group border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image_url || '/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover w-500 h-300 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
      </div>
    </Link>
  )
}
