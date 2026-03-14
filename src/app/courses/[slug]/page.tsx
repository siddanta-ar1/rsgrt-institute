import { syllabi } from '@/data/syllabi'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Tailwind color map — full class names so they survive purge
const colorMap: Record<string, { title: string; heading: string; subtitle: string }> = {
  blue: { title: 'text-blue-700', heading: 'text-blue-600', subtitle: 'text-blue-500' },
  emerald: { title: 'text-emerald-700', heading: 'text-emerald-600', subtitle: 'text-emerald-500' },
  yellow: { title: 'text-yellow-700', heading: 'text-yellow-600', subtitle: 'text-yellow-500' },
  green: { title: 'text-green-700', heading: 'text-green-600', subtitle: 'text-green-500' },
  rose: { title: 'text-rose-700', heading: 'text-rose-600', subtitle: 'text-rose-500' },
  teal: { title: 'text-teal-700', heading: 'text-teal-600', subtitle: 'text-teal-500' },
  indigo: { title: 'text-indigo-700', heading: 'text-indigo-600', subtitle: 'text-indigo-500' },
}

export function generateStaticParams() {
  return Object.keys(syllabi).map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const syllabus = syllabi[slug]
  return {
    title: syllabus ? `${syllabus.pageTitle} | RSGRT Institute` : 'Course Not Found',
  }
}

export default async function CourseSyllabusPage({ params }: Props) {
  const { slug } = await params
  const syllabus = syllabi[slug]

  if (!syllabus) return notFound()

  const colors = colorMap[syllabus.accentColor] || colorMap.blue

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className={`text-3xl font-bold mb-8 text-center ${colors.title}`}>
        {syllabus.pageTitle}
      </h1>

      {syllabus.groups.map((group, gi) => (
        <div key={gi} className={gi > 0 ? 'mt-12' : ''}>
          {group.groupTitle && (
            <div className="mb-6">
              <h2 className={`text-2xl font-semibold ${colors.heading}`}>
                {group.groupTitle}
              </h2>
              {group.groupSubtitle && (
                <p className="text-sm italic text-gray-600 mt-1">{group.groupSubtitle}</p>
              )}
            </div>
          )}

          {group.modules.map((mod, mi) => (
            <section key={mi} className="mb-8">
              <h3 className={`text-xl font-semibold ${colors.heading} mb-2`}>
                {mod.title}
              </h3>
              {mod.subtitle && (
                <p className={`text-sm italic ${colors.subtitle} mb-1`}>{mod.subtitle}</p>
              )}
              <ul className="list-disc pl-6 space-y-1">
                {mod.topics.map((topic, ti) => (
                  <li key={ti}>{topic}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ))}
    </div>
  )
}
