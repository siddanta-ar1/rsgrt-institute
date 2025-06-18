// src/app/courses/[slug]/page.tsx
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

type Props = {
  params: {
    slug: string
  }
}

export default async function CourseDetailsPage({ params }: Props) {
  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('syllabus_slug', params.slug)
    .single()

  if (error || !course) {
    return <p className="p-6 text-red-500">Course not found.</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <Image src={course.image_url} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <p className="text-gray-700">This is the syllabus page for <strong>{course.title}</strong>.</p>
      {/* You can render more syllabus data here if added to your DB */}
    </div>
  )
}
