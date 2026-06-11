'use client'

import { useEffect, useState, useCallback, useRef, Fragment } from 'react'
import Image from 'next/image'
import { useSupabase } from '@/lib/supabaseProvider'
import type { Course } from '@/lib/types'
import { Plus, Pencil, Trash2, X, Save, Upload, ImageIcon, FolderOpen, ChevronDown, ChevronUp } from 'lucide-react'
import CourseMaterialsPanel from '@/components/admin/CourseMaterialsPanel'

const emptyForm = { title: '', image_url: '', syllabus_slug: '' }

export default function AdminCoursesPage() {
  const { supabase } = useSupabase()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getToken = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token || ''
  }, [supabase])

  const fetchCourses = useCallback(async () => {
    const { data } = await supabase.from('courses').select('*')
    setCourses(data || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
    setError('')
  }

  function startEdit(course: Course) {
    setForm({
      title: course.title,
      image_url: course.image_url || '',
      syllabus_slug: course.syllabus_slug,
    })
    setEditingId(course.id)
    setShowForm(true)
  }

  async function handleImageUpload(file: File) {
    setUploading(true)
    setError('')
    try {
      const token = await getToken()
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setForm((f) => ({ ...f, image_url: data.url }))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    if (!form.title.trim() || !form.syllabus_slug.trim()) {
      setError('Title and Syllabus Slug are required')
      return
    }
    setSaving(true)
    setError('')
    try {
      const token = await getToken()
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...form, id: editingId } : form

      const res = await fetch('/api/admin/courses', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }

      resetForm()
      await fetchCourses()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this course?')) return
    try {
      const token = await getToken()
      const res = await fetch(`/api/admin/courses?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Failed to delete')
      await fetchCourses()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Manage Courses</h1>
        {!showForm && (
          <button
            onClick={() => { resetForm(); setShowForm(true) }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <Plus size={16} /> Add Course
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              {editingId ? 'Edit Course' : 'New Course'}
            </h2>
            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Course title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Syllabus Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.syllabus_slug}
                onChange={(e) => setForm((f) => ({ ...f, syllabus_slug: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="e.g. python, arcgis"
              />
            </div>
          </div>

          {/* Image field */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Image</label>
            <div className="flex gap-3 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={form.image_url}
                  onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  placeholder="Paste URL or upload a file →"
                />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file)
                  e.target.value = ''
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 border px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition disabled:opacity-50 shrink-0"
              >
                <Upload size={15} />
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {form.image_url && (
              <div className="mt-2 relative w-24 h-16 rounded-lg overflow-hidden border bg-slate-50">
                <Image src={form.image_url} alt="Preview" fill className="object-cover" unoptimized />
              </div>
            )}
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50"
            >
              <Save size={16} /> {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border text-sm hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Slug</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Image</th>
              <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No courses yet. Add your first course above.
                </td>
              </tr>
            ) : (
              courses.map((course) => {
                const isExpanded = expandedCourseId === course.id
                return (
                  <Fragment key={course.id}>
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{course.title}</td>
                      <td className="px-4 py-3 text-slate-600">
                        <code className="bg-slate-100 px-2 py-0.5 rounded text-xs">
                          {course.syllabus_slug}
                        </code>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        {course.image_url ? (
                          <div className="relative w-12 h-8 rounded overflow-hidden bg-slate-100">
                            <Image src={course.image_url} alt={course.title} fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <ImageIcon size={16} className="text-slate-300" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border mr-2 transition-colors ${
                            isExpanded
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                              : 'border-slate-200 text-slate-500 hover:border-indigo-200 hover:text-indigo-600'
                          }`}
                          title="Manage course materials"
                        >
                          <FolderOpen size={13} />
                          Materials
                          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                        <button
                          onClick={() => startEdit(course)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="text-red-500 hover:text-red-700 p-1 ml-2"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={4} className="p-0">
                          <CourseMaterialsPanel courseId={course.id} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
