'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useSupabase } from '@/lib/supabaseProvider'
import type { Session } from '@supabase/supabase-js'

export default function Navbar() {
  const { supabase } = useSupabase()
  const [session, setSession] = useState<Session | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <nav className="bg-white shadow-sm px-4 py-3 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="RSGRT Logo" width={40} height={40} />
          <span className="font-bold text-xl">RSGRT Institute</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/courses" className="hover:text-blue-600">Courses</Link>
          <Link href="/news" className="hover:text-blue-600">News</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>

          {session?.user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Hi, {session.user.user_metadata.full_name || session.user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white shadow p-4 space-y-2">
          <Link href="/" className="block" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/courses" className="block" onClick={() => setMenuOpen(false)}>Courses</Link>
          <Link href="/news" className="block" onClick={() => setMenuOpen(false)}>News</Link>
          <Link href="/contact" className="block" onClick={() => setMenuOpen(false)}>Contact</Link>

          {session?.user ? (
            <div className="space-y-2">
              <p className="text-sm">Hi, {session.user.user_metadata.full_name || session.user.email}</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white w-full px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white w-full px-4 py-1 rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
