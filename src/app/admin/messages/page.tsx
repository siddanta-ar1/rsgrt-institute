'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSupabase } from '@/lib/supabaseProvider'
import type { Message } from '@/lib/types'

type MessageWithProfile = Message & {
  profiles?: { username: string | null; avatar_url: string | null }
}

export default function AdminMessagesPage() {
  const { supabase } = useSupabase()
  const [messages, setMessages] = useState<MessageWithProfile[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = useCallback(async () => {
    const { data } = await supabase
      .from('messages')
      .select('*, profiles(username, avatar_url)')
      .order('created_at', { ascending: false })

    setMessages((data as MessageWithProfile[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
        <span className="text-sm text-slate-500">{messages.length} total</span>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <p className="text-slate-500">No messages yet.</p>
          <p className="text-sm text-slate-400 mt-1">
            Messages sent from the contact page will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-xl shadow-sm border p-4 flex items-start gap-4"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                {(msg.profiles?.username || 'U')[0].toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-semibold text-slate-800">
                    {msg.profiles?.username || 'Unknown User'}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
