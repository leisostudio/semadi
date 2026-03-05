'use client'

import { Bell, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/projetos':  'Projetos',
  '/admin/blog':      'Blog',
  '/admin/mensagens': 'Mensagens',
}

interface AdminHeaderProps {
  userEmail: string
}

export default function AdminHeader({ userEmail }: AdminHeaderProps) {
  const pathname = usePathname()

  // Find best matching title (handles nested routes like /admin/blog/novo)
  const title =
    Object.entries(pageTitles)
      .sort((a, b) => b[0].length - a[0].length)
      .find(([key]) => pathname.startsWith(key))?.[1] ?? 'Admin'

  const initials = userEmail.slice(0, 2).toUpperCase()

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-10">
      {/* Page title */}
      <h1 className="text-lg font-display font-bold text-slate-900 pl-12 lg:pl-0">
        {title}
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification bell (placeholder) */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-200 pl-3 pr-4 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
            {initials}
          </div>
          <span className="hidden sm:block text-xs font-medium text-slate-700 max-w-[160px] truncate">
            {userEmail}
          </span>
        </div>
      </div>
    </header>
  )
}
