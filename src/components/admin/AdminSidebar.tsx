'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, BookOpen, Newspaper, MessageSquare,
  Video, ArrowLeft, Menu, X, ChevronRight,
} from 'lucide-react'

const links = [
  { href: '/admin',          label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/courses',  label: 'Courses',   icon: BookOpen },
  { href: '/admin/videos',   label: 'Videos',    icon: Video },
  { href: '/admin/news',     label: 'News',      icon: Newspaper },
  { href: '/admin/messages', label: 'Messages',  icon: MessageSquare },
]

function NavLinks({ pathname, onNavClick }: { pathname: string; onNavClick?: () => void }) {
  return (
    <nav className="flex-1 px-3 space-y-0.5">
      {links.map((link) => {
        const active = link.href === '/admin'
          ? pathname === '/admin'
          : pathname.startsWith(link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              active
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <link.icon size={17} className={active ? 'text-sky-400' : ''} />
            <span className="flex-1">{link.label}</span>
            {active && <ChevronRight size={14} className="text-sky-400" />}
          </Link>
        )
      })}

      <div className="pt-4 mt-4 border-t border-white/10">
        <Link
          href="/"
          onClick={onNavClick}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <ArrowLeft size={17} />
          Back to Site
        </Link>
      </div>
    </nav>
  )
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const brand = (
    <div className="flex items-center gap-3 px-4 py-5 shrink-0">
      <Image src="/logo.png" alt="RSGRT" width={34} height={34} className="rounded-lg" />
      <div>
        <p className="text-sm font-bold text-white leading-tight">RSGRT</p>
        <p className="text-xs text-slate-400 leading-tight">Admin Panel</p>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="RSGRT Logo" width={28} height={28} className="rounded-md" />
          <span className="text-sm font-bold text-white">RSGRT Admin</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg text-slate-400 hover:bg-white/10 transition"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
          <aside className="relative w-64 bg-slate-900 flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              {brand}
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-white/10">
                <X size={18} />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavClick={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-slate-900 min-h-screen shrink-0">
        {brand}
        <div className="mx-3 mb-4 h-px bg-white/10" />
        <NavLinks pathname={pathname} />
      </aside>
    </>
  )
}
