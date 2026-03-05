'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Globe,
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Image,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/projetos',   label: 'Projetos',   icon: FolderKanban    },
  { href: '/admin/blog',       label: 'Blog',       icon: FileText        },
  { href: '/admin/mensagens',  label: 'Mensagens',  icon: MessageSquare   },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await supabaseBrowser.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
          <Globe className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-display font-bold text-white">SEMADI</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wide">Painel Admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Menu administrativo">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-blue-600 text-white shadow-brand-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {label}
              {active && (
                <ChevronRight className="ml-auto h-4 w-4 opacity-70" aria-hidden="true" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-800 space-y-1">
        {/* View site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-150"
        >
          <ExternalLink className="h-5 w-5 shrink-0" aria-hidden="true" />
          Ver site público
        </a>
        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-red-900/40 hover:text-red-400 transition-all duration-150 disabled:opacity-50"
          aria-label="Sair do painel administrativo"
        >
          <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
          {loggingOut ? 'Saindo…' : 'Sair'}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* ── Desktop sidebar ────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex w-64 shrink-0 flex-col bg-slate-900 border-r border-slate-800"
        aria-label="Barra lateral administrativa"
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile toggle button (rendered in header area) ─────────────── */}
      <button
        type="button"
        className="
          lg:hidden fixed top-4 left-4 z-50
          flex h-10 w-10 items-center justify-center
          rounded-xl bg-slate-900 text-white shadow-lg
          focus-visible:outline-blue-500
        "
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={mobileOpen}
        aria-controls="admin-mobile-menu"
      >
        {mobileOpen
          ? <X    className="h-5 w-5" aria-hidden="true" />
          : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      {/* ── Mobile backdrop ────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      <aside
        id="admin-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu administrativo"
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col lg:hidden',
          'transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
