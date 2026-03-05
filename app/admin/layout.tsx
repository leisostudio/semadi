import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createSupabaseServer } from '@/lib/supabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader  from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The /admin/login route has its own nested layout that bypasses this one.
  // This guard is a second-line defence after middleware.
  const headersList = headers()
  const pathname    = headersList.get('x-pathname') ?? ''

  // Skip auth check for the login page (handled by its own layout)
  if (!pathname.startsWith('/admin/login')) {
    const supabase = createSupabaseServer()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) redirect('/admin/login')
  }

  // For the login page, just render children without the shell
  if (pathname.startsWith('/admin/login')) {
    return <>{children}</>
  }

  const supabase  = createSupabaseServer()
  const { data: { session } } = await supabase.auth.getSession()
  const userEmail = session?.user.email ?? 'Administrador'

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <AdminSidebar />

      {/* ── Main area ────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader userEmail={userEmail} />

        <main
          id="admin-main"
          className="flex-1 overflow-y-auto px-6 py-8 lg:px-10"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
