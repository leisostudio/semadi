import type { Metadata } from 'next'
import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase'
import type { BlogPost } from '@/types/supabase'
import { Plus, Pencil, Trash2, FileText, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import DeleteBlogPostButton from '@/components/admin/DeleteBlogPostButton'

export const metadata: Metadata = { title: 'Blog | Admin SEMADI' }

async function getPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createSupabaseServer()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error('[AdminBlog] fetch error:', err)
    return []
  }
}

export default async function AdminBlogPage() {
  const posts = await getPosts()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Blog</h2>
          <p className="text-sm text-slate-500 mt-0.5">{posts.length} posts publicados</p>
        </div>
        <Link href="/admin/blog/novo" className="btn-primary gap-2">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Novo post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-card py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 mb-4">
            <FileText className="h-7 w-7 text-slate-400" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Nenhum post ainda</h3>
          <p className="text-xs text-slate-400 mb-5">Publique o primeiro artigo do blog.</p>
          <Link href="/admin/blog/novo" className="btn-primary btn-sm gap-2">
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Criar post
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Lista de posts do blog">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th scope="col" className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Título</th>
                  <th scope="col" className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Slug</th>
                  <th scope="col" className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Data</th>
                  <th scope="col" className="text-right px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 line-clamp-1">{post.title}</p>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <code className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600 font-mono">
                        {post.slug}
                      </code>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-400 hidden lg:table-cell">
                      {formatDate(post.created_at, { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* View public */}
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition-all duration-150"
                          aria-label={`Ver post público: ${post.title}`}
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                        {/* Edit */}
                        <Link
                          href={`/admin/blog/${post.id}/editar`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                          aria-label={`Editar post: ${post.title}`}
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                        {/* Delete */}
                        <DeleteBlogPostButton id={post.id} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
