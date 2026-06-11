import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { SupabaseProvider } from '@/lib/supabaseProvider'

export const metadata: Metadata = {
  title: {
    default: 'RSGRT Institute',
    template: '%s | RSGRT Institute',
  },
  description: 'Geospatial and Environmental Research & Training',
  icons: { icon: '/logo.png' },
  openGraph: {
    siteName: 'RSGRT Institute',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SupabaseProvider>
          <Navbar />
          <main className="flex-1 mt-10">{children}</main>
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  )
}
