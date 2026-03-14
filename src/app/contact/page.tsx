'use client'

import { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { Send, Mail, Phone, MapPin } from 'lucide-react'
import { useSupabase } from '@/lib/supabaseProvider'
import { SITE_CONFIG } from '@/lib/constants'
import type { Session } from '@supabase/supabase-js'

export default function ContactPage() {
  const { supabase } = useSupabase()
  const [session, setSession] = useState<Session | null>(null)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSend = async () => {
    if (!message.trim() || !session?.user) return
    setSending(true)
    setError('')

    try {
      const user = session.user
      const rawName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'user'
      const username = rawName.length >= 3 ? rawName : rawName.padEnd(3, '_')

      // Upsert profile
      await supabase.from('profiles').upsert({
        id: user.id,
        username,
        avatar_url: user.user_metadata?.avatar_url || null,
      })

      // Insert message
      const { error: msgError } = await supabase.from('messages').insert({
        content: message.trim(),
        profile_id: user.id,
      })

      if (msgError) throw msgError

      setMessage('')
      setSent(true)
      setTimeout(() => setSent(false), 4000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="max-w-4xl mt-16 mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Get in Touch</h2>
          <p className="text-slate-600">
            Have questions about our courses or want to collaborate? Reach out to us:
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600 shrink-0" size={20} />
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-blue-600 transition">
                {SITE_CONFIG.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-600 shrink-0" size={20} />
              <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-blue-600 transition">
                {SITE_CONFIG.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600 shrink-0" size={20} />
              <span>{SITE_CONFIG.address}</span>
            </div>
          </div>

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition mt-4"
          >
            <FaWhatsapp size={20} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Message Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Send a Message</h2>

          {session?.user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
                  {(session.user.user_metadata?.full_name || session.user.email || 'U')[0].toUpperCase()}
                </div>
                <span className="text-sm text-slate-700">
                  Sending as <strong>{session.user.user_metadata?.full_name || session.user.email}</strong>
                </span>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={5}
                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {sent && (
                <p className="text-green-600 text-sm font-medium">
                  ✓ Message sent successfully! We&apos;ll get back to you soon.
                </p>
              )}

              <button
                onClick={handleSend}
                disabled={sending || !message.trim()}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition disabled:opacity-50"
              >
                <Send size={16} />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-600 text-sm mb-4">
                Sign in to send us a message directly.
              </p>
              <button
                onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Sign in with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
