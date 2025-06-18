// src/app/courses/page.tsx
import { supabase } from '@/lib/supabaseClient'
import CourseCard from '@/components/CourseCard'

type Course = {
  id: string
  title: string
  image_url: string
  syllabus_slug: string
}

export default async function CoursesPage() {
  const { data: courses, error } = await supabase.from('courses').select('*')

  if (error) {
    return <p className="text-red-500 p-4">Error loading courses: {error.message}</p>
  }

  return (
    <section className="p-6 mt-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Available Courses</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course: Course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  )
}
