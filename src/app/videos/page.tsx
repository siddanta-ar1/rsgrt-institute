import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import type { CourseVideo } from '@/lib/types'
import { parseVideoUrl } from '@/lib/videoUtils'
import { Youtube, Video, PlayCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Course Videos | RSGRT Institute',
  description: 'Watch free geospatial and environmental science course videos by RSGRT Institute.',
}

export const revalidate = 3600

function VideoCard({ video }: { video: CourseVideo }) {
  const meta = parseVideoUrl(video.url)
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow block"
    >
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        {meta.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={meta.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <Video size={36} className="text-slate-300" />
          </div>
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-0 h-0 border-t-[9px] border-t-transparent border-l-[16px] border-l-slate-800 border-b-[9px] border-b-transparent ml-1.5" />
          </div>
        </div>
        {/* Platform badge */}
        {meta.platform === 'youtube' && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
            <Youtube size={11} /> YouTube
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug mb-1 group-hover:text-blue-700 transition-colors">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-xs text-slate-500 line-clamp-2 mt-1">{video.description}</p>
        )}
        <p className="text-xs text-slate-400 mt-2">{new Date(video.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
      </div>
    </a>
  )
}

export default async function VideosPage() {
  const { data: videos, error } = await supabase
    .from('course_videos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full mb-4">
          <PlayCircle size={13} /> Free Learning Resources
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Course Videos</h1>
        <p className="text-slate-500 max-w-xl mx-auto text-sm">
          Watch our curated geospatial and environmental science tutorials — free on YouTube and other platforms.
        </p>
      </div>

      {error || !videos || videos.length === 0 ? (
        <div className="text-center py-20">
          <Video size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 text-sm">No videos available yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {(videos as CourseVideo[]).map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </section>
  )
}
