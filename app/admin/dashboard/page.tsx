import type { Metadata } from 'next'
import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase'
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Image,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  MailOpen,
  Mail,
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = { title: 'Dashboard | Admin SEMADI' }

async function getDashboardStats() {
  const supabase = createSupabaseServer()

  const [
    { count: totalProjects },
    { count: activeProjects },
    { count: totalPosts },
    { count: totalMessages },
    { count: unreadMessages },
    { data: recentMessages },
    { data: recentPosts },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('read_status', false),
    supabase.from('contact_messages').select('id,name,email,created_at,read_status').order('created_at', { ascending: false }).limit(5),
    supabase.from('blog_posts').select('id,title,slug,created_at').order('created_at', { ascending: false }).limit(5),
  ])

  return {
    totalProjects:  totalProjects  ?? 0,
    activeProjects: activeProjects ?? 0,
    totalPosts:     totalPosts     ?? 0,
    totalMessages:  totalMessages  ?? 0,
    unreadMessages: unreadMessages ?? 0,
    recentMessages: recentMessages ?? [],
    recentPosts:    recentPosts    ?? [],
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()

  const statCards = [
    {
      label:   'Projetos ativos',
      value:   stats.activeProjects,
      sub:     `${stats.totalProjects} no total`,
      icon:    FolderKanban,
      color:   'bg-blue-50 text-blue-600',
      href:    '/admin/projetos',
    },
    {
      label:   'Posts publicados',
      value:   stats.totalPosts,
      sub:     'artigos no blog',
      icon:    FileText,
      color:   'bg-violet-50 text-violet-600',
      href:    '/admin/blog',
    },
    {
      label:   'Mensagens',
      value:   stats.totalMessages,
      sub:     `${stats.unreadMessages} não lidas`,
      icon:    MessageSquare,
      color:   'bg-amber-50 text-amber-600',
      href:    '/admin/mensagens',
    },
    {
      label:   'Projetos concluídos',
      value:   stats.totalProjects - stats.activeProjects,
      sub:     'missões finalizadas',
      icon:    CheckCircle2,
      color:   'bg-emerald-50 text-emerald-600',
      href:    '/admin/projetos',
    },
  ]

  return (
    <div className="space-y-8">
      {/* ── Welcome banner ──────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 lg:p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="h-6 w-6 text-blue-200" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Visão geral</p>
        </div>
        <h2 className="text-2xl font-display font-bold">Bem-vindo ao painel SEMADI</h2>
        <p className="mt-1 text-sm text-blue-100">
          Gerencie projetos, posts e mensagens de contato a partir daqui.
        </p>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────────────── */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Estatísticas gerais</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map(({ label, value, sub, icon: Icon, color, href }) => (
            <Link
              key={label}
              href={href}
              className="
                group flex items-start gap-4 rounded-2xl bg-white border border-slate-100
                p-5 shadow-card hover:shadow-card-hover hover:border-slate-200
                transition-all duration-200
              "
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-display font-bold text-slate-900">{value}</p>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors mt-1"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Two-column activity ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Recent messages */}
        <section
          className="rounded-2xl bg-white border border-slate-100 shadow-card overflow-hidden"
          aria-labelledby="recent-msgs-heading"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 id="recent-msgs-heading" className="text-sm font-display font-bold text-slate-900">
              Mensagens recentes
            </h2>
            <Link href="/admin/mensagens" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Ver todas →
            </Link>
          </div>
          {stats.recentMessages.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-slate-400">
              Nenhuma mensagem recebida ainda.
            </div>
          ) : (
            <ul className="divide-y divide-slate-50" role="list">
              {stats.recentMessages.map((msg: { id: string; name: string; email: string; created_at: string; read_status: boolean }) => (
                <li key={msg.id}>
                  <Link
                    href="/admin/mensagens"
                    className="flex items-start gap-3 px-6 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.read_status ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600'}`}>
                      {msg.read_status
                        ? <MailOpen className="h-4 w-4" aria-hidden="true" />
                        : <Mail     className="h-4 w-4" aria-hidden="true" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm font-semibold truncate ${msg.read_status ? 'text-slate-600' : 'text-slate-900'}`}>
                          {msg.name}
                        </p>
                        {!msg.read_status && (
                          <span className="shrink-0 h-2 w-2 rounded-full bg-blue-500" aria-label="Não lida" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate">{msg.email}</p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        <Clock className="inline h-3 w-3 mr-1" aria-hidden="true" />
                        {formatDate(msg.created_at, { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recent posts */}
        <section
          className="rounded-2xl bg-white border border-slate-100 shadow-card overflow-hidden"
          aria-labelledby="recent-posts-heading"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 id="recent-posts-heading" className="text-sm font-display font-bold text-slate-900">
              Posts recentes
            </h2>
            <Link href="/admin/blog" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Ver todos →
            </Link>
          </div>
          {stats.recentPosts.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-slate-400">
              Nenhum post publicado ainda.
            </div>
          ) : (
            <ul className="divide-y divide-slate-50" role="list">
              {stats.recentPosts.map((post: { id: string; title: string; slug: string; created_at: string }) => (
                <li key={post.id}>
                  <Link
                    href={`/admin/blog/${post.id}/editar`}
                    className="flex items-start gap-3 px-6 py-4 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                      <FileText className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        <Clock className="inline h-3 w-3 mr-1" aria-hidden="true" />
                        {formatDate(post.created_at, { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0 mt-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* ── Quick actions ────────────────────────────────────────────────── */}
      <section aria-labelledby="quick-actions-heading">
        <h2 id="quick-actions-heading" className="text-sm font-display font-bold text-slate-700 mb-3">
          Ações rápidas
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/projetos/novo"  className="btn-primary btn-sm gap-1.5">
            <FolderKanban className="h-3.5 w-3.5" aria-hidden="true" /> Novo projeto
          </Link>
          <Link href="/admin/blog/novo"      className="btn-primary btn-sm gap-1.5">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" /> Novo post
          </Link>
          <Link href="/admin/mensagens"      className="btn-outline btn-sm gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            Ver mensagens
            {stats.unreadMessages > 0 && (
              <span className="ml-1 rounded-full bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 leading-none">
                {stats.unreadMessages}
              </span>
            )}
          </Link>
        </div>
      </section>
    </div>
  )
}
