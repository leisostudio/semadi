import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase'
import ProjectForm from '@/components/admin/ProjectForm'

interface Props { params: { id: string } }

export const metadata: Metadata = { title: 'Editar Projeto | Admin SEMADI' }

export default async function EditarProjetoPage({ params }: Props) {
  const supabase = createSupabaseServer()
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !project) notFound()

  return <ProjectForm project={project} />
}
