// src/components/CourseCard.tsx
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  id: string
  title: string
  image_url: string
  syllabus_slug: string
}

export default function CourseCard({ title, image_url, syllabus_slug }: Props) {
  return (
    <Link
      href={`/courses/${syllabus_slug}`}
      className="block border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="relative h-48 w-full">
        <Image
          src={image_url || '/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
    </Link>
  )
}
