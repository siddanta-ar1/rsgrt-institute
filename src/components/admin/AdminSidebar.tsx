'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Newspaper, MessageSquare, ArrowLeft, Menu, X } from 'lucide-react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
]

function NavLinks({ pathname, onNavClick }: { pathname: string; onNavClick?: () => void }) {
  return (
    <div className="flex-1 space-y-1">
      {links.map((link) => {
        const active = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <link.icon size={18} />
            {link.label}
          </Link>
        )
      })}
      <div className="pt-6 mt-6 border-t border-slate-100">
        <Link
          href="/"
          onClick={onNavClick}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Site
        </Link>
      </div>
    </div>
  )
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shadow-sm shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="RSGRT Logo" width={30} height={30} className="rounded-md shadow" />
          <span className="text-sm font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            RSGRT Admin
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative w-64 bg-white h-full shadow-2xl flex flex-col p-4 z-10 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <Image src="/logo.png" alt="RSGRT Logo" width={36} height={36} className="rounded-lg shadow-md" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">RSGRT</span>
                  <span className="text-xs text-slate-500">Admin Panel</span>
                </div>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-4 border-b border-slate-200" />
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider px-3 mb-3">Navigation</p>
            <NavLinks pathname={pathname} onNavClick={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 p-4 space-y-1 hidden md:flex md:flex-col">
        <Link href="/" className="flex items-center gap-2 mb-6 group">
          <Image
            src="/logo.png"
            alt="RSGRT Logo"
            width={36}
            height={36}
            className="rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              RSGRT
            </span>
            <span className="text-xs text-slate-500">Admin Panel</span>
          </div>
        </Link>
        <div className="mb-6 border-b border-slate-200" />
        <div className="mb-3">
          <h2 className="text-xs font-semibold uppercase text-slate-400 tracking-wider px-3">
            Navigation
          </h2>
        </div>
        <NavLinks pathname={pathname} />
      </aside>
    </>
  )
}
