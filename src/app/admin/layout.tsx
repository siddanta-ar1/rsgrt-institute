import AdminGuard from '@/components/admin/AdminGuard'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = {
  title: 'Admin Panel | RSGRT Institute',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-[#f0f2f5]">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-5 md:p-8 overflow-auto">{children}</div>
        </div>
      </div>
    </AdminGuard>
  )
}
