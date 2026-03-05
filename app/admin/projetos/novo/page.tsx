import type { Metadata } from 'next'
import ProjectForm from '@/components/admin/ProjectForm'

export const metadata: Metadata = { title: 'Novo Projeto | Admin SEMADI' }

export default function NovoProjetoPage() {
  return <ProjectForm />
}
