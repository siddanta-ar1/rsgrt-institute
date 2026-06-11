'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/lib/supabaseProvider'
import type { Session } from '@supabase/supabase-js'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function check(session: Session | null) {
      if (!session?.user) {
        router.replace('/')
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', session.user.id)
        .single()

      if (!data) {
        router.replace('/')
        setLoading(false)
        return
      }

      setAuthorized(true)
      setLoading(false)
    }

    supabase.auth.getSession().then(({ data: { session } }) => check(session))

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => check(session)
    )

    return () => subscription.unsubscribe()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!authorized) return null

  return <>{children}</>
}
