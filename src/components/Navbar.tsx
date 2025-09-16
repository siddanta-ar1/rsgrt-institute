'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, ChevronDown, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSupabase } from '@/lib/supabaseProvider'
import type { Session } from '@supabase/supabase-js'

export default function Navbar() {
  const { supabase } = useSupabase()
  const [session, setSession] = useState<Session | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ]

  // Avatar (Google or fallback)
  const avatarUrl =
    session?.user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      session?.user?.user_metadata?.full_name || session?.user?.email || 'U'
    )}&background=random`

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="backdrop-blur-md bg-white/70 shadow-md px-4 py-3 fixed top-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="RSGRT Logo"
            width={40}
            height={40}
            className="rounded-full shadow-md group-hover:scale-110 transition-transform duration-300"
          />
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            RSGRT Institute
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full border shadow-sm"
                />
                <ChevronDown size={18} className="text-gray-600" />
              </button>

              {/* Dropdown with only logout */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg border p-2 z-50"
                  >
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-md hover:scale-105 transition-transform duration-300"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-3 bg-white/90 backdrop-blur-md shadow-lg rounded-lg p-4 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}

            {session?.user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={avatarUrl}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full border shadow-sm"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {session.user.user_metadata.full_name || session.user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:scale-[1.02] transition-transform duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:scale-[1.02] transition-transform duration-300"
              >
                Login
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
