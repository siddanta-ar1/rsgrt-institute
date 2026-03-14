'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Newspaper, MessageSquare, ArrowLeft } from 'lucide-react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 bg-white border-r border-slate-200 p-4 space-y-1 hidden md:block">
      <Link href="/" className="flex items-center gap-2 mb-6 group">
        <Image
          src="/logo.png"
          alt="RSGRT Logo"
          width={36}
          height={36}
          className="rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            RSGRT
          </span>
          <span className="text-xs text-slate-500">Admin Panel</span>
        </div>
      </Link>
      <div className="mb-6 border-b border-slate-200"></div>
      <div className="mb-3">
        <h2 className="text-xs font-semibold uppercase text-slate-400 tracking-wider px-3">
          Navigation
        </h2>
      </div>

      {links.map((link) => {
        const active = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
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
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Site
        </Link>
      </div>
    </aside>
  )
}
