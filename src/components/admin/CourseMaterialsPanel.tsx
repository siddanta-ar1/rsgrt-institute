'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSupabase } from '@/lib/supabaseProvider'
import { Trash2, Plus, Link2, ExternalLink, Loader2 } from 'lucide-react'
import type { CourseMaterial } from '@/lib/types'

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function MaterialCard({
  material,
  onDelete,
}: {
  material: CourseMaterial
  onDelete: (id: string) => void
}) {
  const domain = getDomain(material.url)
  const faviconSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`

  return (
    <div className="flex items-center gap-3 p-3 bg-white border rounded-lg group hover:border-blue-200 transition-colors">
      {/* Favicon */}
      <div className="w-8 h-8 rounded bg-slate-50 border flex items-center justify-center shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={faviconSrc}
          alt=""
          width={16}
          height={16}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <a
          href={material.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-blue-600 transition-colors group/link"
        >
          <span className="text-sm font-medium text-slate-800 truncate group-hover/link:text-blue-600">
            {material.title || domain}
          </span>
          <ExternalLink size={12} className="text-slate-400 shrink-0" />
        </a>
        <p className="text-xs text-slate-400 truncate">{domain}</p>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(material.id)}
        className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 shrink-0"
        title="Remove link"
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}

export default function CourseMaterialsPanel({ courseId }: { courseId: string }) {
  const { supabase } = useSupabase()
  const [materials, setMaterials] = useState<CourseMaterial[]>([])
  const [loading, setLoading] = useState(true)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  const getToken = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token || ''
  }, [supabase])

  const fetchMaterials = useCallback(async () => {
    const res = await fetch(`/api/admin/course-materials?course_id=${courseId}`)
    if (res.ok) {
      const data = await res.json()
      setMaterials(data)
    }
    setLoading(false)
  }, [courseId])

  useEffect(() => {
    fetchMaterials()
  }, [fetchMaterials])

  async function handleAdd() {
    if (!url.trim()) return
    setAdding(true)
    setError('')
    try {
      const token = await getToken()
      const res = await fetch('/api/admin/course-materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ course_id: courseId, url: url.trim(), title: title.trim() || null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to add')
      setMaterials((prev) => [...prev, data])
      setUrl('')
      setTitle('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add')
    } finally {
      setAdding(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this link?')) return
    try {
      const token = await getToken()
      const res = await fetch(`/api/admin/course-materials?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Failed to delete')
      setMaterials((prev) => prev.filter((m) => m.id !== id))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  return (
    <div className="bg-slate-50 border-t border-slate-100 px-4 py-4">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Link2 size={13} />
          Course Materials
        </p>

        {/* Add form */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="flex flex-col sm:flex-row flex-1 gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="https://..."
              className="flex-1 border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Label (optional)"
              className="w-full sm:w-36 border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={adding || !url.trim()}
            className="inline-flex items-center justify-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50 self-start sm:self-auto shrink-0"
          >
            {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            Add
          </button>
        </div>

        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

        {/* Materials list */}
        {loading ? (
          <div className="flex items-center gap-2 text-slate-400 text-sm py-2">
            <Loader2 size={14} className="animate-spin" /> Loading…
          </div>
        ) : materials.length === 0 ? (
          <p className="text-slate-400 text-sm py-2">No materials yet. Add a URL above.</p>
        ) : (
          <div className="space-y-2">
            {materials.map((m) => (
              <MaterialCard key={m.id} material={m} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
