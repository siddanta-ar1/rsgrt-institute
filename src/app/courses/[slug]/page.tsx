import { syllabi } from '@/data/syllabi'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import type { CourseMaterial } from '@/lib/types'
import { ExternalLink, Link2 } from 'lucide-react'
import FaviconImg from '@/components/FaviconImg'

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

function getDomain(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url }
}

export const revalidate = 60

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

  // Fetch course materials from DB (match by syllabus_slug)
  const { data: courseRow } = await supabase
    .from('courses')
    .select('id')
    .eq('syllabus_slug', slug)
    .single()

  let materials: CourseMaterial[] = []
  if (courseRow?.id) {
    const { data } = await supabase
      .from('course_materials')
      .select('*')
      .eq('course_id', courseRow.id)
      .order('created_at', { ascending: true })
    materials = (data as CourseMaterial[]) || []
  }

  return (
    <div className="px-4 sm:px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className={`text-2xl sm:text-3xl font-bold mb-8 text-center ${colors.title}`}>
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

      {/* Course Materials */}
      {materials.length > 0 && (
        <section className="mt-14 border-t pt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-700 mb-5">
            <Link2 size={20} className="text-indigo-500" />
            Course Materials &amp; Resources
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {materials.map((m) => {
              const domain = getDomain(m.url)
              return (
                <a
                  key={m.id}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group bg-white"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-50 border flex items-center justify-center shrink-0 overflow-hidden">
                    <FaviconImg domain={domain} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
                      {m.title || domain}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{domain}</p>
                  </div>
                  <ExternalLink size={14} className="text-slate-300 group-hover:text-indigo-400 shrink-0 transition-colors" />
                </a>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
