import type { Metadata } from 'next'
import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase'
import type { Project } from '@/types/supabase'
import { Plus, Pencil, Trash2, CheckCircle2, Clock, FolderKanban } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import DeleteProjectButton from '@/components/admin/DeleteProjectButton'

export const metadata: Metadata = { title: 'Projetos | Admin SEMADI' }

async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createSupabaseServer()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error('[AdminProjetos] fetch error:', err)
    return []
  }
}

const statusConfig = {
  active:    { label: 'Ativo',     icon: Clock,         className: 'badge-blue'  },
  completed: { label: 'Concluído', icon: CheckCircle2,  className: 'badge-green' },
}

export default async function AdminProjetosPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Projetos</h2>
          <p className="text-sm text-slate-500 mt-0.5">{projects.length} projetos cadastrados</p>
        </div>
        <Link href="/admin/projetos/novo" className="btn-primary gap-2">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Novo projeto
        </Link>
      </div>

      {/* Table */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-card py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 mb-4">
            <FolderKanban className="h-7 w-7 text-slate-400" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Nenhum projeto ainda</h3>
          <p className="text-xs text-slate-400 mb-5">Crie o primeiro projeto missionário.</p>
          <Link href="/admin/projetos/novo" className="btn-primary btn-sm gap-2">
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Criar projeto
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Lista de projetos">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th scope="col" className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Título</th>
                  <th scope="col" className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Status</th>
                  <th scope="col" className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Criado em</th>
                  <th scope="col" className="text-right px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {projects.map((project) => {
                  const status = statusConfig[project.status]
                  const StatusIcon = status.icon
                  return (
                    <tr key={project.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 line-clamp-1">{project.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{project.description}</p>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className={`badge gap-1 ${status.className}`}>
                          <StatusIcon className="h-3 w-3" aria-hidden="true" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-400 hidden lg:table-cell">
                        {formatDate(project.created_at, { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/projetos/${project.id}/editar`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                            aria-label={`Editar projeto: ${project.title}`}
                          >
                            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                          <DeleteProjectButton id={project.id} title={project.title} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
