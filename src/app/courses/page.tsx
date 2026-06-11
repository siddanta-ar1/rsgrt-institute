import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import CourseCard from '@/components/CourseCard'
import type { Course } from '@/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Courses | RSGRT Institute',
  description: 'Explore geospatial and environmental research training courses at RSGRT Institute.',
}

export default async function CoursesPage() {
  const { data: courses, error } = await supabase.from('courses').select('*')

  if (error) {
    return <p className="text-red-500 p-4">Error loading courses: {error.message}</p>
  }

  return (
    <section className="px-4 sm:px-6 py-10 mt-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Available Courses</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course: Course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  )
}
