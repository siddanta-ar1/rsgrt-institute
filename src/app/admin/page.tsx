'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from '@/lib/supabaseProvider'
import { BookOpen, Newspaper, MessageSquare } from 'lucide-react'
import type { Message } from '@/lib/types'
import Link from 'next/link'

type MessageWithProfile = Message & {
  profiles?: { username: string | null; avatar_url: string | null }
}

export default function AdminDashboard() {
  const { supabase } = useSupabase()
  const [stats, setStats] = useState({ courses: 0, news: 0, messages: 0 })
  const [recentMessages, setRecentMessages] = useState<MessageWithProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const [coursesRes, newsRes, messagesRes] = await Promise.all([
        supabase.from('courses').select('id', { count: 'exact', head: true }),
        supabase.from('news').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }),
      ])

      setStats({
        courses: coursesRes.count || 0,
        news: newsRes.count || 0,
        messages: messagesRes.count || 0,
      })

      const { data: messages } = await supabase
        .from('messages')
        .select('*, profiles(username, avatar_url)')
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentMessages((messages as MessageWithProfile[]) || [])
      setLoading(false)
    }

    fetchStats()
  }, [supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  const statCards = [
    {
      label: 'Courses',
      value: stats.courses,
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600',
      href: '/admin/courses',
    },
    {
      label: 'News Articles',
      value: stats.news,
      icon: Newspaper,
      color: 'bg-emerald-50 text-emerald-600',
      href: '/admin/news',
    },
    {
      label: 'Messages',
      value: stats.messages,
      icon: MessageSquare,
      color: 'bg-amber-50 text-amber-600',
      href: '/admin/messages',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl shadow-sm border p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}
            >
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-sm text-slate-600">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-sm border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Messages</h2>
          <Link
            href="/admin/messages"
            className="text-sm text-blue-600 hover:text-blue-800 transition"
          >
            View all →
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <p className="text-slate-500 text-sm py-4 text-center">No messages yet.</p>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-50"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold shrink-0">
                  {(msg.profiles?.username || 'U')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-800">
                      {msg.profiles?.username || 'Unknown'}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
