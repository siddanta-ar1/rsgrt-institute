import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { SupabaseProvider } from '@/lib/supabaseProvider'

export const metadata: Metadata = {
  title: 'RSGRT Institute',
  description: 'Geospatial and Environmental Research & Training',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <SupabaseProvider>  
        <main className="flex-1 mt-10">{children}</main>
        </SupabaseProvider>
        <Footer />
      </body>
    </html>
  )
}
