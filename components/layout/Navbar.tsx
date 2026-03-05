'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, Heart } from 'lucide-react'

const navLinks = [
  { href: '/',          label: 'Início' },
  { href: '/sobre',     label: 'Sobre' },
  { href: '/projetos',  label: 'Projetos' },
  { href: '/blog',      label: 'Blog' },
  { href: '/galeria',   label: 'Galeria' },
  { href: '/contato',   label: 'Contato' },
]

export default function Navbar() {
  const pathname   = usePathname()
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // ── Shadow on scroll ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close menu on route change ───────────────────────────────────────────
  useEffect(() => { setOpen(false) }, [pathname])

  // ── Close menu on outside click ──────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // ── Lock body scroll when mobile menu is open ────────────────────────────
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header
        className={`
          fixed top-0 inset-x-0 z-50 h-[var(--navbar-height)]
          transition-all duration-300
          ${scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
            : 'bg-white border-b border-transparent'}
        `}
        role="banner"
      >
        <nav
          className="container-site flex h-full items-center justify-between"
          aria-label="Navegação principal"
        >
          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-blue-500"
            aria-label="SEMADI – Página inicial"
          >
            <span
              className="
                flex h-9 w-9 items-center justify-center rounded-xl
                bg-gradient-to-br from-blue-600 to-blue-700
                shadow-brand group-hover:shadow-brand-lg
                transition-shadow duration-300
              "
              aria-hidden="true"
            >
              <Globe className="h-5 w-5 text-white" strokeWidth={2} />
            </span>
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
              SEMADI
            </span>
          </Link>

          {/* ── Desktop Links ─────────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav-link px-3 py-2 rounded-lg ${
                    isActive(href)
                      ? 'active text-blue-600 bg-blue-50'
                      : 'hover:bg-slate-50'
                  }`}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ───────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/doacoes" className="btn-accent btn-sm gap-1.5">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              Doe Agora
            </Link>
          </div>

          {/* ── Mobile Hamburger ──────────────────────────────────────────── */}
          <button
            type="button"
            className="
              md:hidden flex items-center justify-center
              h-10 w-10 rounded-lg text-slate-600
              hover:bg-slate-100 transition-colors duration-150
              focus-visible:outline-blue-500
            "
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open
              ? <X  className="h-5 w-5" aria-hidden="true" />
              : <Menu className="h-5 w-5" aria-hidden="true" />
            }
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Drawer ────────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm
          transition-opacity duration-300 md:hidden
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`
          fixed top-[var(--navbar-height)] inset-x-0 z-40
          bg-white border-b border-slate-200
          shadow-xl
          transition-all duration-300 ease-out
          md:hidden
          ${open
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0 pointer-events-none'}
        `}
      >
        <div className="container-site py-4 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center px-4 py-3 rounded-xl text-sm font-medium
                transition-colors duration-150
                ${isActive(href)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'}
              `}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}

          <div className="pt-4 pb-2 border-t border-slate-100 mt-2">
            <Link
              href="/doacoes"
              className="btn-accent w-full gap-2 rounded-xl py-3"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              Doe Agora e Faça a Diferença
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
