'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSupabase } from '@/lib/supabaseProvider'
import { Plus, Trash2, ExternalLink, Youtube, Video, Loader2, X } from 'lucide-react'
import type { CourseVideo } from '@/lib/types'
import { parseVideoUrl } from '@/lib/videoUtils'

const empty = { title: '', description: '', url: '' }

function PlatformBadge({ url }: { url: string }) {
  const { platform } = parseVideoUrl(url)
  if (platform === 'youtube')
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full"><Youtube size={11} />YouTube</span>
  if (platform === 'vimeo')
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full"><Video size={11} />Vimeo</span>
  return <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"><Video size={11} />Other</span>
}

export default function AdminVideosPage() {
  const { supabase } = useSupabase()
  const [videos, setVideos] = useState<CourseVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const getToken = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token || ''
  }, [supabase])

  const fetchVideos = useCallback(async () => {
    const token = await getToken()
    const res = await fetch('/api/admin/videos', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    setVideos(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [getToken])

  useEffect(() => { fetchVideos() }, [fetchVideos])

  async function handleSave() {
    if (!form.title.trim() || !form.url.trim()) { setError('Title and URL are required'); return }
    try { new URL(form.url) } catch { setError('Enter a valid URL'); return }
    setSaving(true); setError('')
    try {
      const token = await getToken()
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setShowForm(false); setForm(empty)
      await fetchVideos()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally { setSaving(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this video?')) return
    const token = await getToken()
    await fetch(`/api/admin/videos?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    setVideos(v => v.filter(x => x.id !== id))
  }

  const preview = form.url ? parseVideoUrl(form.url) : null

  if (loading)
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Course Videos</h1>
        {!showForm && (
          <button
            onClick={() => { setForm(empty); setShowForm(true) }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm font-medium shadow-sm"
          >
            <Plus size={16} /> Add Video
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-slate-800">New Video</h2>
            <button onClick={() => { setShowForm(false); setError('') }} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
          </div>
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Video URL (YouTube, Vimeo, or direct)</label>
              <input
                type="url"
                value={form.url}
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none focus:border-transparent"
              />
              {preview?.thumbnailUrl && (
                <div className="mt-3 relative rounded-xl overflow-hidden aspect-video max-w-xs bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview.thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                  <PlatformBadge url={form.url} />
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Introduction to QGIS"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Description (optional)</label>
              <input
                type="text"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Short description..."
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <button onClick={() => { setShowForm(false); setError('') }} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition">Cancel</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50 shadow-sm"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : null}
              Save Video
            </button>
          </div>
        </div>
      )}

      {videos.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <Youtube size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 text-sm">No videos yet. Add your first course video.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map(video => {
            const meta = parseVideoUrl(video.url)
            return (
              <div key={video.id} className="bg-white rounded-2xl shadow-sm overflow-hidden group">
                <div className="relative aspect-video bg-slate-100">
                  {meta.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={meta.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video size={32} className="text-slate-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <PlatformBadge url={video.url} />
                    <span className="text-xs text-slate-400">{new Date(video.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 mb-1">{video.title}</h3>
                  {video.description && <p className="text-xs text-slate-500 line-clamp-2">{video.description}</p>}
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:text-blue-800">
                    <ExternalLink size={11} /> View original
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
