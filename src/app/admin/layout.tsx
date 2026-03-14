import AdminGuard from '@/components/admin/AdminGuard'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Admin Panel | RSGRT Institute',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-[calc(100vh-140px)]">
        <AdminSidebar />
        <div className="flex-1 p-4 md:p-6 bg-slate-50 overflow-auto">{children}</div>
      </div>
    </AdminGuard>
  )
}
